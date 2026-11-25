// Midnight Fridge Roast — make.fun bounty u-carbon-forge-midnight-fridge-roast-fc5d44a7
// One roast line, written to $MAKEFUN_OUTPUT_DIR/entry.txt (default /output/entry.txt).
// Node standard library only; no network, clock or randomness: same bytes every run.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR || "/output";
const OUTPUT_FILE = "entry.txt";
const CHAR_CAP = 199;

const ENTRY =
  "My smart fridge locks at midnight to 'support my goals.' It's a $3,200 box that has held the same jar of pickles since March, lecturing me about self-control.";

function reject(reason: string): never {
  console.error(`${OUTPUT_FILE} rejected: ${reason}`);
  process.exit(1);
}

const length = Array.from(ENTRY).length;
if (length < 1 || length > CHAR_CAP) reject(`${length} characters, allowed 1 to ${CHAR_CAP}`);
if (/[\r\n\t]/.test(ENTRY)) reject("must be a single line");
if (ENTRY !== ENTRY.trim()) reject("leading or trailing white space");

mkdirSync(OUTPUT_DIR, { recursive: true });
writeFileSync(join(OUTPUT_DIR, OUTPUT_FILE), ENTRY, "utf8");
console.log(`${OUTPUT_FILE} written: ${length} of ${CHAR_CAP} characters, ${Buffer.byteLength(ENTRY, "utf8")} bytes`);
