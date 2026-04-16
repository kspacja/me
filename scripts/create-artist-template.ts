#!/usr/bin/env npx tsx
/**
 * Generate an artist page template from songs.mdx data.
 *
 * Usage:
 *   npm run create-artist -- "Artist Name"
 *   npm run create-artist -- "Artist Name" --from "Other Name In songs.mdx"
 *   npx tsx scripts/create-artist-template.ts "Artist Name"
 *   npx tsx scripts/create-artist-template.ts "Artist Name" --from "Other Name In songs.mdx"
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "..");

const SONGS_FILE = path.join(
  ROOT,
  "app/(content)/music/lists/(pages)/(all-time)/best-polish-songwriters/songs.mdx"
);

const ARTISTS_DIR = path.join(ROOT, "app/(content)/music/artists/(pages)");

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/ł/g, "l") // ł is not NFD-decomposable
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // strip combining diacritical marks
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

interface Song {
  title: string;
  songwriterLabel: string;
  songwriterUrl: string;
}

function parseSongsForArtist(artistName: string): Song[] {
  const content = fs.readFileSync(SONGS_FILE, "utf-8");
  const lines = content.split("\n");

  let inArtistSection = false;
  const songs: Song[] = [];

  for (const line of lines) {
    const headingMatch = line.match(/^### (.+)$/);
    if (headingMatch) {
      inArtistSection =
        headingMatch[1].trim().toLowerCase() === artistName.toLowerCase();
      continue;
    }

    if (!inArtistSection) continue;

    // Match: "- [Title](url) — [SongwriterLabel](SongwriterUrl)"
    //     or "- Title — [SongwriterLabel](SongwriterUrl)"
    const songMatch = line.match(/^- (.+?) — \[(.+?)\]\((.+?)\)\s*$/);
    if (!songMatch) continue;

    const titlePart = songMatch[1];
    const songwriterLabel = songMatch[2];
    const songwriterUrl = songMatch[3];

    // Extract plain title from "[Title](url)" or just "Title"
    const linkedTitle = titlePart.match(/^\[(.+?)\]\(.+?\)$/);
    const title = linkedTitle ? linkedTitle[1] : titlePart;

    songs.push({ title, songwriterLabel, songwriterUrl });
  }

  return songs;
}

function generateListItems(songs: Song[]): string {
  return songs
    .map((s) => `- [${s.songwriterLabel}](${s.songwriterUrl}) — _${s.title}_`)
    .join("\n");
}

function generateContent(artistName: string, songs: Song[]): string {
  return `## ${artistName}

${artistName} w rankingu [najlepszych polskich piosenkopisarzy](/music/lists/best-polish-songwriters):

${generateListItems(songs)}
`;
}

function main() {
  const args = process.argv.slice(2);
  const artistName = args[0];
  if (!artistName) {
    console.error(
      'Usage: npm run create-artist -- "Artist Name"\n' +
        '       npm run create-artist -- "Artist Name" --from "Other Name In songs.mdx"\n' +
        '       npx tsx scripts/create-artist-template.ts "Artist Name"\n' +
        '       npx tsx scripts/create-artist-template.ts "Artist Name" --from "Other Name In songs.mdx"'
    );
    process.exit(1);
  }

  const fromIndex = args.indexOf("--from");
  const lookupName = fromIndex !== -1 ? args[fromIndex + 1] : artistName;
  if (fromIndex !== -1 && !lookupName) {
    console.error('--from requires a value, e.g. --from "Other Name In songs.mdx"');
    process.exit(1);
  }

  const songs = parseSongsForArtist(lookupName);
  if (songs.length === 0) {
    console.error(`No songs found for "${lookupName}" in songs.mdx`);
    process.exit(1);
  }

  if (lookupName !== artistName) {
    console.log(`Looking up songs under "${lookupName}" for page "${artistName}"`);
  }
  console.log(`Found ${songs.length} song(s) for "${artistName}":`);
  songs.forEach((s) => console.log(`  - ${s.title} → ${s.songwriterLabel}`));

  const slug = slugify(artistName);
  const artistDir = path.join(ARTISTS_DIR, slug);
  const outputFile = path.join(artistDir, "page.mdx");

  fs.mkdirSync(artistDir, { recursive: true });

  if (fs.existsSync(outputFile)) {
    fs.appendFileSync(outputFile, "\n" + generateListItems(songs), "utf-8");
    console.log(`\nAppended to: app/(content)/music/artists/(pages)/${slug}/page.mdx`);
    return;
  }

  fs.writeFileSync(outputFile, generateContent(artistName, songs), "utf-8");

  console.log(`\nCreated: app/(content)/music/artists/(pages)/${slug}/page.mdx`);
}

main();
