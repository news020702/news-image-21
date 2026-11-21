// "WORLD NOW" — a modern news graphic summing up Saturday
// 21 November 2026's world news, as a single 1024x1024 image.
//
// The entry is the image beside this file (entry.png), drawn in this
// repository. This program (Node 22, standard library only) copies it to
// /output/entry.png, which is what the judge sees. Nothing is drawn at
// run time and no network is used, so both runs write identical bytes.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, existsSync, mkdirSync, statSync } from "node:fs";
import { join } from "node:path";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const src = new URL("./entry.png", import.meta.url);
const dest = join(outDir, "entry.png");

// The grader provides /output, but creating it makes the program robust
// when it is run by hand with a fresh MAKEFUN_OUTPUT_DIR.
if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });
copyFileSync(src, dest);

// Guard: the judge must see exactly the image in this repository, so
// refuse a truncated or partial copy rather than submitting bad bytes.
if (statSync(dest).size !== statSync(src).size) {
  throw new Error("entry.png copy is incomplete");
}
