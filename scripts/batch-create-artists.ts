#!/usr/bin/env npx tsx
/**
 * Batch-create artist pages. Edit the ARTISTS array below, then run:
 *   npx tsx scripts/batch-create-artists.ts
 *   npm run batch-create-artists
 *
 * Each entry is either:
 *   "Artist Name"                       — looks up songs under that name
 *   ["Artist Name", "Name In songs.mdx"] — looks up songs under a different name
 */

import { execFileSync } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ─── Edit this array ───────────────────────────────────────────────────────
const ARTISTS: Array<string | [string, string]> = [
  "Ewa Bem",
  ["Jerzy Rogiewicz", "Jerz Igor"],
  ["100% Rabbit", "Małgola, No"],
  "Afro Kolektyw",
  ["Adam Aston", "Henryk Wars"],
  ["Ala Zastary", "Jakub Sikora"],
  "Andrzej Dąbrowski",
  "Andrzej i Eliza",
  "Andrzej Zaucha",
  "Bajm",
  "Anna Jurksztowicz",
  "Anna Maria Jopek",
  ["Bemibek", "Ewa Bem"],
  ["Bemibem", "Ewa Bem"],
  ["Better Person", "Adam Byczkowski"],
  "Bielizna",
  ["Bohdan Łazuka", "Kabaret Starszych Panów"],
  "Car Is On Fire",
  ["Chór Dana", "Henryk Wars"],
  ["Christopher", "Czerwone Gitary"],
  ["Crab Invasion", "Jakub Sikora"],
  ["Czan", "Tymon Tymański"],
]
//   "Czesław Niemen",
//   "Czerwone Gitary",
//   "Damiano Cz",
//   "Danuta Błażejczyk",
//   "Drivealone",
//   "Edyta Bartosiewicz",
//   "Edyta Górniak",
//   "Eleni",
//   "Elżbieta Adamiak",
//   "Enchanted Hunters",
//   "Eugeniusz Bodo",
//   "Ewa Bem",
//   "Ewa Sad",
//   "Fasolki",
//   "Gaba Kulka",
//   "Grażyna Łobaszewska",
//   "Grzegorz Turnau",
//   "Halina Frąckowiak",
//   "Hanka Ordonówna",
//   "Hanna Bannaszak",
//   "Hey",
//   "Holloee Polloy",
//   "Irena Jarocka",
//   "Irena Santor",
//   "Iza Lach",
//   "Jacek Skubikowski",
//   "Jerz Igor",
//   "Joasia Łosowska",
//   "Jola Literska",
//   "Jolanta Jaszkowska",
//   "Justyna Steczkowska",
//   "Kabaret OT.TO",
//   "Kalina Jędrusik",
//   "Kasia Lesing",
//   "Kasia Stankiewicz",
//   "Katarzyna Cerekwicka",
//   "Kayah",
//   "Klaus Mitffoch",
//   "Kobiety",
//   "Kombi",
//   "Krystyna Prońko",
//   "Krzysztof Antkowiak",
//   "Kulfon i Monika",
//   "Kury",
//   "Lady Pank",
//   "Lech Janerka",
//   "Mafia",
//   "Magdalena Fronczewska",
//   "Małgola, No",
//   "Małgorzata Panecka",
//   "Manhattan",
//   "Maria Koterbska",
//   "Marlena Drozdowska",
//   "Maryla Rodowicz",
//   "Mateusz Tomczak",
//   "Mietek Szcześniak",
//   "Mira Kubasińska / Breakout",
//   "Muchy",
//   "Nasz Kochana Basia",
//   "Nerwowe Wakacje",
//   "Newest Zealand, The",
//   "New People",
//   "No Cześć",
//   "Novi",
//   "Obywatel G.C.",
//   "P. Milewski",
//   "Papa Dance",
//   "Pasts",
//   "Piotr Schulz",
//   "Piotr Szczepanik",
//   "Republika",
//   "Reni Jusis",
//   "Rosalie., Chloe Martini",
//   "Róża",
//   "Selfi",
//   "Skaldowie",
//   "Soniamiki",
//   "Sorja Morja",
//   "Surowa Kara Za Grzechy",
//   "Truskawkowe Studio",
//   "Trzy Korony",
//   "Twilite",
//   "Tymon & The Transistors",
//   "Urszula Dudziak",
//   "Varius Manx",
//   "VOX",
//   "Wiesława Sós",
//   "Wrak",
//   "Zbigniew Wodecki",
//   "Zdzisława Sośnicka",
// ];
// ───────────────────────────────────────────────────────────────────────────

const SCRIPT = path.resolve(__dirname, "create-artist-template.ts");

let created = 0;
let skipped = 0;
let failed = 0;

for (const entry of ARTISTS) {
  const [artistName, fromName] = Array.isArray(entry) ? entry : [entry];
  const args = fromName ? [artistName, "--from", fromName] : [artistName];

  process.stdout.write(`${artistName}${fromName ? ` (from "${fromName}")` : ""}... `);

  try {
    const stdout = execFileSync("npx", ["tsx", SCRIPT, ...args], { stdio: "pipe" }).toString();
    if (stdout.includes("Appended")) {
      console.log("appended");
      skipped++;
    } else {
      console.log("created");
      created++;
    }
  } catch (err: any) {
    const stderr: string = err.stderr?.toString() ?? "";
    if (stderr.includes("No songs found")) {
      console.log(`FAILED — not found in songs.mdx`);
    } else {
      console.log(`FAILED — ${stderr.trim()}`);
    }
    failed++;
  }
}

console.log(`\nDone: ${created} created, ${skipped} appended, ${failed} failed.`);
