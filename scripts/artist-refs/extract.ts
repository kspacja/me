#!/usr/bin/env npx tsx
/**
 * Scan every music list and collect, per artist, where they appear.
 * Writes scripts/artist-refs/artist-refs.json and prints stats.
 *
 * Name fixes (variants, collabs, names with commas, junk) go to aliases.json:
 *   { "variant": "Canonical Name" | ["Name A", "Name B"] | null }
 *
 * Usage: npx tsx scripts/artist-refs/extract.ts
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "../..");
const LISTS_DIR = path.join(ROOT, "app/(content)/music/lists/(pages)");
const ARTISTS_DIR = path.join(ROOT, "app/(content)/music/artists/(pages)");
const ALIASES_FILE = path.join(__dirname, "aliases.json");
// related.json: { "Adam Patoh": ["Papa Dance"] } — linked both ways
const RELATED_FILE = path.join(__dirname, "related.json");
const OUTPUT_FILE = path.join(__dirname, "artist-refs.json");

const SONGWRITERS = "best-polish-songwriters";

export interface Ref {
  list: string;
  listTitle: string;
  section?: string;
  rank?: string;
  item?: string;
  anchor?: string;
  // songwriter = ranked/mentioned as a songwriter, performer = performs the item
  role: "performer" | "songwriter";
  // performer refs on the songwriters list: who wrote the song
  songwriter?: string;
  featured?: boolean;
}

export interface Artist {
  name: string;
  slug: string;
  exists: boolean;
  refs: Ref[];
  related?: { name: string; slug: string }[];
}

export function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/ł/g, "l") // ł is not NFD-decomposable
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

const aliases: Record<string, string | string[] | null> = JSON.parse(fs.readFileSync(ALIASES_FILE, "utf-8"));
const aliasBySlug = new Map(Object.entries(aliases).map(([k, v]) => [slugify(k), v]));

// existing pages: slug → title
const existing = new Map<string, string>();
for (const slug of fs.readdirSync(ARTISTS_DIR)) {
  const page = path.join(ARTISTS_DIR, slug, "page.mdx");
  if (!fs.existsSync(page)) continue;
  const layout = path.join(ARTISTS_DIR, slug, "layout.tsx");
  const title =
    (fs.existsSync(layout) && fs.readFileSync(layout, "utf-8").match(/title: "([^"]+)"/)?.[1]) ||
    fs.readFileSync(page, "utf-8").match(/^## (.+)$/m)?.[1] ||
    slug;
  existing.set(slug, title);
}
const slugByTitle = new Map([...existing].map(([slug, title]) => [slugify(title), slug]));

const artists = new Map<string, Artist & { variants: Map<string, number> }>();
const unparsed: string[] = [];

function resolveNames(raw: string): string[] {
  const alias = aliasBySlug.get(slugify(raw));
  if (alias === null) return [];
  if (alias === undefined) return [raw];
  return Array.isArray(alias) ? alias : [alias];
}

function addRef(rawName: string, ref: Ref) {
  for (const name of resolveNames(rawName.trim())) {
    const key = slugify(name);
    if (!key) continue;
    const slug = existing.has(key) ? key : slugByTitle.get(key) ?? key;
    let a = artists.get(slug);
    if (!a) {
      a = { name, slug, exists: existing.has(slug), refs: [], variants: new Map() };
      artists.set(slug, a);
    }
    a.variants.set(name, (a.variants.get(name) ?? 0) + 1);
    a.refs.push(ref);
  }
}

// "A feat. B", "A x B", "A, B" → [A, B]; names that contain separators must be in aliases.json
function splitPerformers(s: string): string[] {
  if (aliasBySlug.has(slugify(s))) return [s];
  return s
    .replace(/\s*\([^)]*\)/g, "") // "New Rome (Tomasz Bednarczyk)" → "New Rome"
    .split(/\s+(?:feat\.?|ft\.?|x|&|\/|\|)\s+|,\s+/i)
    .map((p) => p.trim())
    .filter(Boolean);
}

// "Artist - Title (2011)", "Artist: Title", "Artist- Title"
function splitItem(s: string): { artist: string; title: string } | null {
  const clean = s.replace(/<br\s*\/?>/g, "").replace(/\\([[\]])/g, "$1").trim();
  const known = [...aliasBySlug.keys()].find((k) => slugify(clean).startsWith(k + "-"));
  if (known) {
    const m = clean.match(/^(.+?)(?:\s+[-–]\s*|(?<=\S)[-–]\s+|:\s+)(.+)$/);
    // names with ":"/"," are matched by alias prefix, so re-split after the alias length
    const parts = clean.split(/\s+[-–]\s*|(?<=\S)[-–]\s+|:\s+/);
    for (let i = 1; i < parts.length; i++) {
      const artist = parts.slice(0, i).join(" - ");
      if (slugify(artist) === known) return { artist, title: parts.slice(i).join(" - ") };
    }
    if (m) return { artist: m[1].trim(), title: m[2].trim() };
  }
  const m = clean.match(/^(.+?)(?:\s+[-–]\s*|(?<=\S)[-–]\s+|:\s+)(.+)$/);
  return m ? { artist: m[1].trim(), title: m[2].trim() } : null;
}

function listTitle(dir: string, content: string): string {
  const h = content.match(/^## (.+?):?\s*$/m)?.[1];
  if (h) return h;
  const layout = path.join(dir, "layout.tsx");
  const t = fs.existsSync(layout) && fs.readFileSync(layout, "utf-8").match(/title: "([^"]+)"/)?.[1];
  return t || path.basename(dir);
}

function parseRegularList(slug: string, title: string, content: string) {
  let section: string | undefined;
  let inSmall = false;
  for (const rawLine of content.split("\n")) {
    const line = rawLine.trim();
    if (!line) continue;
    if (line.startsWith("<small")) inSmall = true;
    if (line.startsWith("</small")) {
      inSmall = false;
      continue;
    }
    if (inSmall || line.startsWith("<") || line.startsWith("import ") || line.startsWith("## ")) continue;

    const heading = line.match(/^#{3,}\s*(.+?):?\s*$/);
    if (heading) {
      // draft "to listen" notes at the bottom of some lists
      if (/^TO LIST/i.test(heading[1])) break;
      section = heading[1];
      continue;
    }
    // "Top 10 - albums:", "Najlepsze albumy:", "TOP 1 - 15:"
    if (/:\s*$/.test(line) && !/^-/.test(line)) {
      section = line.replace(/:\s*$/, "");
      continue;
    }
    // range headers without a colon: "DO TOP 26 - 40", "TOP 41 - 50", "TOP 30<br/>"
    const range = line.match(/^((?:DO )?TOP \d+(?:\s*-\s*\d+)?)\s*(?:<br\s*\/?>)?\s*$/i);
    if (range) {
      section = range[1];
      continue;
    }

    const m = line.match(/^(?:-\s*)?(?:ex aequo:?\s*)?(?:(\d+)\.\s+)?(.+)$/i);
    if (!m) continue;
    const rank = m[1];
    // favourite lyrics: '"quote" - Artist - Title'
    const body = m[2].replace(/^ex aequo:?\s*/i, "").replace(/^".*?"\s*[-–]\s*/, "");
    if (/\]\(|https?:/.test(body)) {
      unparsed.push(`${slug}: ${line}`);
      continue;
    }
    const item = splitItem(body);
    if (!item) {
      unparsed.push(`${slug}: ${line}`);
      continue;
    }
    if (item.title.startsWith("(")) continue; // placeholder like "(wybierz coś...)"
    for (const p of splitPerformers(item.artist)) {
      addRef(p, { list: slug, listTitle: title, section, rank, item: item.title, role: "performer" });
    }
  }
}

function parseSongwriters(title: string, content: string) {
  let current: { rank: string; name: string; anchor: string } | null = null;
  let inHonours = false;
  let featured = false;

  const addSong = (raw: string, line: string, extra: Partial<Ref>) => {
    const song = splitItem(raw);
    if (!song) {
      unparsed.push(`${SONGWRITERS}: ${line}`);
      return;
    }
    for (const p of splitPerformers(song.artist)) {
      addRef(p, { list: SONGWRITERS, listTitle: title, item: song.title, role: "performer", ...extra });
    }
  };

  for (const rawLine of content.split("\n")) {
    const line = rawLine.trim();

    if (/^#### Wyróżnienia/.test(line)) inHonours = true;
    if (/^### Top/.test(line)) inHonours = false;

    // "- Krzysztof Ścierański | [Ewa Bem: Pomidory](url)"
    if (inHonours) {
      const h = line.match(/^- (.+?) \| \[(.+?)\]\(/);
      if (!h) continue;
      const writer = h[1].trim();
      const base = { section: "Wyróżnienia", anchor: "wyróżnienia" };
      addRef(writer, { list: SONGWRITERS, listTitle: title, role: "songwriter", item: splitItem(h[2])?.title, ...base });
      addSong(h[2], line, { ...base, songwriter: writer, featured: true });
      continue;
    }

    // "#### 44. [Michał Pruszkowski](#44-michał-pruszkowski)"
    const head = line.match(/^#### (\d+)\. \[(.+?)\]\(#(.+?)\)/);
    if (head) {
      const name = head[2].replace(/\s*_ex aequo_\s*/g, " ").replace(/\s+/g, " ").trim();
      current = { rank: head[1], name, anchor: head[3] };
      addRef(name, { list: SONGWRITERS, listTitle: title, rank: head[1], anchor: head[3], role: "songwriter" });
      continue;
    }
    if (!current) continue;

    if (/^Piosenk[ai]:/.test(line)) featured = true;
    if (/^(Co jeszcze|Dodatkowo)/.test(line)) featured = false;

    // "Piosenka: [A - T](url)" or "- [A - T](url)"
    const link = line.match(/^(?:Piosenk[ai]:\s*|-\s*)\[([^\]]+)\]\((https?:[^)]*)\)/);
    if (link) {
      addSong(link[1], line, { rank: current.rank, anchor: current.anchor, songwriter: current.name, featured });
    }
  }
}

function parseAppendix(slug: string, title: string, content: string) {
  for (const line of content.split("\n")) {
    const m = line.match(/^- (.+?) \|/);
    if (m) addRef(m[1], { list: slug, listTitle: title, role: "songwriter", item: "playlista/audycja" });
  }
}

function findLists(dir: string): string[] {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) return findLists(p);
    return e.name === "page.mdx" && dir !== LISTS_DIR ? [p] : [];
  });
}

function main() {
  const files = findLists(LISTS_DIR).sort();
  for (const file of files) {
    const dir = path.dirname(file);
    const slug = path.basename(dir);
    const content = fs.readFileSync(file, "utf-8");
    const title = listTitle(dir, content);
    if (slug === SONGWRITERS) parseSongwriters(title, content);
    else if (slug === `${SONGWRITERS}-appendix`) parseAppendix(slug, title, content);
    else parseRegularList(slug, title, content);
  }

  const out: Artist[] = [...artists.values()]
    .map(({ variants, ...a }) => {
      // prefer the existing page title, else the most frequent spelling
      const name = existing.get(a.slug) ?? [...variants].sort((x, y) => y[1] - x[1])[0][0];
      return { ...a, name };
    })
    .sort((a, b) => a.name.localeCompare(b.name, "pl"));

  const related: Record<string, string[]> = JSON.parse(fs.readFileSync(RELATED_FILE, "utf-8"));
  const bySlug = new Map(out.map((a) => [a.slug, a]));
  const find = (name: string) => bySlug.get(slugByTitle.get(slugify(name)) ?? slugify(name));
  const link = (from: Artist | undefined, to: Artist | undefined) => {
    if (!from || !to || from.related?.some((r) => r.slug === to.slug)) return;
    (from.related ??= []).push({ name: to.name, slug: to.slug });
  };
  for (const [name, others] of Object.entries(related)) {
    for (const other of others) {
      const a = find(name);
      const b = find(other);
      if (!a || !b) console.warn(`related.json: not found "${!a ? name : other}"`);
      link(a, b);
      link(b, a);
    }
  }

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(out, null, 2) + "\n", "utf-8");

  const refs = out.reduce((n, a) => n + a.refs.length, 0);
  const existingCount = out.filter((a) => a.exists).length;
  const pagesWithoutRefs = [...existing.keys()].filter((s) => !artists.has(s));
  const top = [...out].sort((a, b) => b.refs.length - a.refs.length).slice(0, 15);

  console.log(`Lists scanned:        ${files.length}`);
  console.log(`Artists found:        ${out.length}`);
  console.log(`  existing pages:     ${existingCount}`);
  console.log(`  new pages needed:   ${out.length - existingCount}`);
  console.log(`  with 1 ref only:    ${out.filter((a) => a.refs.length === 1).length}`);
  console.log(`References total:     ${refs}`);
  console.log(`Existing pages w/o refs (${pagesWithoutRefs.length}): ${pagesWithoutRefs.join(", ")}`);
  console.log(`Top 15:`);
  top.forEach((a) => console.log(`  ${a.refs.length.toString().padStart(3)}  ${a.name}${a.exists ? "" : " (new)"}`));
  if (unparsed.length) {
    console.log(`\nUnparsed lines (${unparsed.length}):`);
    unparsed.forEach((l) => console.log(`  ${l}`));
  }
  console.log(`\nWritten: ${path.relative(ROOT, OUTPUT_FILE)}`);
}

main();
