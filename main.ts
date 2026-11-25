import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "My alarm clock screams at 6 AM on a Saturday like I owe it rent.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outDir) {
  console.error("MAKEFUN_OUTPUT_DIR is not set");
  process.exit(1);
}

if (LINE.length < 1 || LINE.length > 200) {
  console.error(`entry must be 1-200 characters, got ${LINE.length}`);
  process.exit(1);
}
if (LINE.trim().length === 0 || LINE.includes("\n")) {
  console.error("entry must be a single non-blank line");
  process.exit(1);
}

mkdirSync(outDir, { recursive: true });
const target = join(outDir, "entry.txt");
writeFileSync(target, LINE, "utf8");

// Read-back check: what landed on disk must be byte-identical to the line.
const back = readFileSync(target, "utf8");
if (back !== LINE) {
  console.error("read-back mismatch: entry.txt differs from the line");
  process.exit(1);
}
if (back.length !== 64) {
  console.error(`entry must be 64 characters, got ${back.length}`);
  process.exit(1);
}
