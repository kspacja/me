#!/usr/bin/env npx tsx
/**
 * Remove the 'Piosenki' section (from 'Piosenki' up to and including '---')
 * from artist page.mdx files.
 *
 * Usage:
 *   npx tsx scripts/remove-piosenki-section.ts            # all artist pages
 *   npx tsx scripts/remove-piosenki-section.ts path/to/page.mdx ...
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function processFile(filePath: string): boolean {
  const text = fs.readFileSync(filePath, "utf-8");

  // Match from a line starting with 'Piosenk' (covers 'Piosenki' and 'Piosenka')
  // through the next '---' line (inclusive), including any blank lines before the block.
  const pattern = /\n*^Piosenk[^\n]*\n[\s\S]*?^---[ \t]*\n?/m;

  const newText = text.replace(pattern, "");

  if (newText === text) {
    return false;
  }

  fs.writeFileSync(filePath, newText, "utf-8");
  return true;
}

function main() {
  let files: string[];

  if (process.argv.length > 2) {
    files = process.argv.slice(2);
  } else {
    const root = path.resolve(__dirname, "..");
    const pagesDir = path.join(root, "app/(content)/music/artists/(pages)");
    files = fs
      .readdirSync(pagesDir, { withFileTypes: true })
      .filter((d) => d.isDirectory())
      .map((d) => path.join(pagesDir, d.name, "page.mdx"))
      .filter((f) => fs.existsSync(f));
  }

  if (files.length === 0) {
    console.error("No files found.");
    process.exit(1);
  }

  for (const file of files.sort()) {
    const modified = processFile(file);
    console.log(`  ${modified ? "modified" : "skipped  "}  ${file}`);
  }
}

main();

