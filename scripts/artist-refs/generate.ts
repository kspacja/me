#!/usr/bin/env npx tsx
/**
 * Create/update artist pages from scripts/artist-refs/artist-refs.json.
 * Existing page → only the list-refs block is (re)written; new artist → layout.tsx + page.mdx.
 * The block sits between list-refs markers, so re-running replaces it instead of duplicating.
 *
 * Usage:
 *   npx tsx scripts/artist-refs/generate.ts --dry-run            # print, write nothing
 *   npx tsx scripts/artist-refs/generate.ts --limit 5            # first 5 artists
 *   npx tsx scripts/artist-refs/generate.ts --only papa-dance,adam-patoh
 *   npx tsx scripts/artist-refs/generate.ts                      # everything
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import type { Artist, Ref } from "./extract";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "../..");
const ARTISTS_DIR = path.join(ROOT, "app/(content)/music/artists/(pages)");
const LISTS_DIR = path.join(ROOT, "app/(content)/music/lists/(pages)");
const DATA_FILE = path.join(__dirname, "artist-refs.json");

const START = "{/* list-refs:start */}";
const END = "{/* list-refs:end */}";

const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const argValue = (flag: string) => {
  const i = args.indexOf(flag);
  return i === -1 ? undefined : args[i + 1];
};
const limit = argValue("--limit") ? Number(argValue("--limit")) : undefined;
const only = argValue("--only")?.split(",").map((s) => s.trim());

// list slug → page.mdx content, for anchor checks
const listFiles = new Map<string, string>();
(function walk(dir: string) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.name === "page.mdx" && dir !== LISTS_DIR) listFiles.set(path.basename(dir), fs.readFileSync(p, "utf-8"));
  }
})(LISTS_DIR);

const warnings: string[] = [];

// MDX treats these as syntax inside list items
function escapeMdx(s: string): string {
  return s.replace(/([\\_*[\]<>{}])/g, "\\$1");
}

function refUrl(ref: Ref): string {
  const base = `/music/lists/${ref.list}`;
  if (!ref.anchor) return base;
  const content = listFiles.get(ref.list) ?? "";
  if (!content.includes(`id="${ref.anchor}"`)) warnings.push(`missing anchor #${ref.anchor} in ${ref.list}`);
  return `${base}#${ref.anchor}`;
}

function refLine(ref: Ref): string {
  const parts: string[] = [];
  if (ref.section) parts.push(escapeMdx(ref.section));
  if (ref.rank) parts.push(`#${ref.rank}`);
  let detail = parts.join(" · ");
  if (ref.songwriter) detail += `${detail ? " " : ""}${escapeMdx(ref.songwriter)}:`;
  if (ref.item) detail += `${detail ? " " : ""}_${escapeMdx(ref.item)}_`;
  return `- [${escapeMdx(ref.listTitle)}](${refUrl(ref)})${detail ? ` — ${detail}` : ""}`;
}

function buildBlock(artist: Artist): string {
  // songwriter refs first, then the rest grouped by list in first-seen order
  const order = new Map<string, number>();
  artist.refs.forEach((r) => order.has(r.list) || order.set(r.list, order.size));
  const refs = [...artist.refs].sort(
    (a, b) =>
      Number(b.role === "songwriter") - Number(a.role === "songwriter") || order.get(a.list)! - order.get(b.list)!
  );

  // same rule as "---", with extra space above
  const lines = [START, "", "<hr style={{ marginTop: '3em', marginBottom: '1.5em' }} />", "", "<h4>Na listach:</h4>", "", ...refs.map(refLine)];
  if (artist.related?.length) {
    const links = artist.related.map((r) => `[${escapeMdx(r.name)}](/music/artists/${r.slug})`).join(" • ");
    lines.push("", `Zobacz też: ${links}`);
  }
  lines.push("", END);
  return lines.join("\n");
}

function layoutFile(name: string): string {
  return `import PassThrough from "components/PassThrough";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: ${JSON.stringify(name)},
};

export default PassThrough;
`;
}

// drop older hand-made refs that the block replaces
function stripLegacyRefs(content: string): string {
  return (
    content
      // any standalone "→ [...](/music/lists/...)" line
      .replace(/^→ \[[^\]]*\]\(\/music\/lists\/[^)]*\)\s*$/gm, "")
      // "---" + "... [...](/music/lists/...):" intro + its "- ..." list
      .replace(/(?:^---[ \t]*\n+)?^[^\n]*\]\(\/music\/lists\/[^)]*\)[^\n]*:[ \t]*\n+(?:^- [^\n]*\n?)+/gm, "")
  );
}

function updatePage(artist: Artist): "created" | "updated" | "unchanged" {
  const dir = path.join(ARTISTS_DIR, artist.slug);
  const pageFile = path.join(dir, "page.mdx");
  const layoutPath = path.join(dir, "layout.tsx");

  let content: string;
  let status: "created" | "updated";
  if (fs.existsSync(pageFile)) {
    const old = fs.readFileSync(pageFile, "utf-8");
    const start = old.indexOf(START);
    const end = old.indexOf(END);
    const body = (start !== -1 && end !== -1 ? old.slice(0, start) + old.slice(end + END.length) : stripLegacyRefs(old)).trimEnd();
    content = `${body}\n\n${buildBlock(artist)}\n`;
    if (content === old) return "unchanged";
    status = "updated";
  } else {
    content = `## ${artist.name}\n\n${buildBlock(artist)}\n`;
    status = "created";
  }

  if (dryRun) {
    console.log(`\n===== ${status}: ${path.relative(ROOT, pageFile)}\n${content}`);
    return status;
  }
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(pageFile, content, "utf-8");
  if (!fs.existsSync(layoutPath)) fs.writeFileSync(layoutPath, layoutFile(artist.name), "utf-8");
  return status;
}

function main() {
  let artists: Artist[] = JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
  if (only) artists = artists.filter((a) => only.includes(a.slug));
  if (limit) artists = artists.slice(0, limit);

  const counts = { created: 0, updated: 0, unchanged: 0 };
  for (const artist of artists) {
    const status = updatePage(artist);
    counts[status]++;
    if (!dryRun) console.log(`${status.padEnd(9)} ${artist.slug}`);
  }

  console.log(`\n${dryRun ? "[dry-run] " : ""}created: ${counts.created}, updated: ${counts.updated}, unchanged: ${counts.unchanged}`);
  const unique = [...new Set(warnings)];
  if (unique.length) {
    console.log(`\nWarnings (${unique.length}):`);
    unique.forEach((w) => console.log(`  ${w}`));
  }
}

main();
