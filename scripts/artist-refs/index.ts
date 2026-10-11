#!/usr/bin/env npx tsx
/**
 * Rebuild the artists index (/music/artists) from every artist page directory.
 * Labels already used in the index are kept; other artists use their layout.tsx title.
 *
 * Usage: npx tsx scripts/artist-refs/index.ts
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "../..");
const ARTISTS_DIR = path.join(ROOT, "app/(content)/music/artists/(pages)");
const INDEX_FILE = path.join(ROOT, "app/(content)/music/artists/page.mdx");

const old = fs.readFileSync(INDEX_FILE, "utf-8");
const oldLabels = new Map(
  [...old.matchAll(/\[([^\]]+)\]\(\/music\/artists\/([^)]+)\)/g)].map((m) => [m[2], m[1]])
);

const artists = fs
  .readdirSync(ARTISTS_DIR)
  .filter((slug) => fs.existsSync(path.join(ARTISTS_DIR, slug, "page.mdx")))
  .map((slug) => {
    const layout = path.join(ARTISTS_DIR, slug, "layout.tsx");
    const page = fs.readFileSync(path.join(ARTISTS_DIR, slug, "page.mdx"), "utf-8");
    const title =
      (fs.existsSync(layout) && fs.readFileSync(layout, "utf-8").match(/title: "([^"]+)"/)?.[1]) ||
      page.match(/^## (.+)$/m)?.[1] ||
      slug;
    return { slug, label: oldLabels.get(slug) ?? title };
  });

// letters with more artists than this get two-letter subgroups ("Ba", "Be", ...)
const SUBGROUP_FROM = 30;

// base letter: "Ł" → L, "Ż" → Z; digits and non-Latin → #
function baseChar(c: string): string {
  return c.toUpperCase().replace("Ł", "L").normalize("NFD").charAt(0);
}

function letter(label: string): string {
  const first = baseChar(label.trim().charAt(0));
  return /[A-Z]/.test(first) ? first : "#";
}

// "Ba", "Be"; a non-letter second char ("Mk.gee" → "Mk", "M83" → "M") falls back to the letter
function subletter(label: string): string {
  const second = baseChar(label.trim().charAt(1) || "");
  return letter(label) + (/[A-Z]/.test(second) ? second.toLowerCase() : "");
}

const groups = new Map<string, typeof artists>();
for (const a of artists.sort((x, y) => x.label.localeCompare(y.label, "pl", { sensitivity: "base" }))) {
  const l = letter(a.label);
  groups.set(l, [...(groups.get(l) ?? []), a]);
}

const letters = [...groups.keys()].sort((a, b) => (a === "#" ? -1 : b === "#" ? 1 : a.localeCompare(b)));
const escape = (s: string) => s.replace(/([\\[\]<>{}*_])/g, "\\$1");
const linkList = (list: typeof artists) =>
  list.map((a) => `[${escape(a.label)}](/music/artists/${a.slug})`).join(" •\n");

const sections = letters.map((l) => {
  const list = groups.get(l)!;
  if (l === "#" || list.length <= SUBGROUP_FROM) return `${l}\n\n${linkList(list)}`;

  const subgroups = new Map<string, typeof artists>();
  for (const a of list) {
    const s = subletter(a.label);
    subgroups.set(s, [...(subgroups.get(s) ?? []), a]);
  }
  // subgroup label: own line, smaller and faded
  const parts = [...subgroups].map(
    ([s, sub]) => `<div style={{ fontSize: '0.8em', opacity: 0.3 }}>${s.toLowerCase()}</div>\n\n${linkList(sub)}`
  );
  return `${l}\n\n${parts.join("\n\n")}`;
});

fs.writeFileSync(INDEX_FILE, `## Artists\n\n${sections.join("\n\n<br/>\n\n")}\n`, "utf-8");

const dead = [...oldLabels.keys()].filter((slug) => !artists.some((a) => a.slug === slug));
console.log(`Index: ${artists.length} artists in ${letters.length} letter groups`);
if (dead.length) console.log(`Dropped links without a page: ${dead.join(", ")}`);
