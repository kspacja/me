import fs from "fs";
import path from "path";

const FILE = path.join(__dirname, "unpublished_draft.mdx");
const lines = fs.readFileSync(FILE, "utf-8").split("\n");

interface Entry {
  num: number;
  name: string;
  hasDash: boolean;
  hasSong: boolean;
}

const entries: Entry[] = [];
let lastEntry: Entry | null = null;

for (const line of lines) {
  const match = line.match(/^(-\s)?(\d+)\.\s+(.+)/);
  if (match) {
    const entry: Entry = {
      num: parseInt(match[2], 10),
      name: match[3].trim(),
      hasDash: match[1] !== undefined,
      hasSong: false,
    };
    entries.push(entry);
    lastEntry = entry;
    continue;
  }

  if (line.startsWith("Piosenka:") && lastEntry) {
    lastEntry.hasSong = true;
  }
}

entries.sort((a, b) => a.num - b.num);

console.log("=== Checking: unpublished_draft.mdx ===\n");

let hasErrors = false;

// --- Missing dash ---
const missingDash = entries.filter((e) => !e.hasDash);
if (missingDash.length) {
  console.log("=== Missing leading '- ' ===");
  for (const e of missingDash) {
    console.log(`  WARN: #${e.num} — ${e.name}`);
  }
  console.log();
  hasErrors = true;
}

// --- Numbering continuity ---
console.log("=== Numbering continuity ===");
let prev = 0;
for (const { num } of entries) {
  const expected = prev + 1;
  if (num !== expected) {
    console.log(`  GAP: Expected #${expected} but got #${num} (gap between ${prev} and ${num})`);
    hasErrors = true;
  }
  prev = num;
}
console.log(`  Entries found: ${entries.map((e) => e.num).join(", ")}`);
console.log(`  Total: ${entries.length} entries (last: ${prev})\n`);

// --- Missing Piosenka ---
console.log("=== Entries missing 'Piosenka:' ===");
const missingSong = entries.filter((e) => !e.hasSong);
if (missingSong.length) {
  for (const e of missingSong) {
    console.log(`  MISSING: #${e.num} — ${e.name}`);
  }
  hasErrors = true;
} else {
  console.log("  All entries have a Piosenka line.");
}

console.log();
console.log(hasErrors ? "Issues detected — see above." : "No issues found.");
process.exit(hasErrors ? 1 : 0);
