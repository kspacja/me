import fs from "fs";
import path from "path";

const FILE = path.join(__dirname, "page.mdx");
const content = fs.readFileSync(FILE, "utf-8");

interface Entry {
  rank: number;
  name: string;
}

const entries: Entry[] = [];

for (const line of content.split("\n")) {
  const match = line.match(/^####\s+(\d+)\.\s+\[([^\]]+)\]/);
  if (match) {
    entries.push({ rank: parseInt(match[1], 10), name: match[2] });
  }
}

entries.sort((a, b) => b.rank - a.rank);

for (const { rank, name } of entries) {
  console.log(`${rank}. ${name}`);
}

console.log("-".repeat(50));
console.log(`Razem: ${entries.length}`);
