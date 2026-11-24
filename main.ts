// Entry for the make.fun bounty "Real-Life Patch Notes: The Comedy Changelog":
// reads ENTRY.md and writes it to $MAKEFUN_OUTPUT_DIR/entry.txt.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const entry = readFileSync(join(here, "ENTRY.md"), "utf8");
// The bounty caps the patch note at 160 characters. Fail loudly instead of
// writing an entry that is too long to count.
if (entry.length > 160) {
  process.stderr.write(`patch note must be at most 160 characters, got ${entry.length}\n`);
  process.exit(1);
}
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "out";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), entry, "utf8");
process.stdout.write(entry);
