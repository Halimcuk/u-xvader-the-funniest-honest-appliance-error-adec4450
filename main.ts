// The Funniest Honest Appliance Error
// make.fun competition: u-xvader-the-funniest-honest-appliance-error-adec4450
//
// A washing machine, in its own flat deadpan voice, honestly reporting
// that it has eaten one sock and refuses to discuss the matter further.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry: one line, at most 200 characters, machine voice throughout.
const ENTRY =
  "ERROR 04: One sock consumed during spin cycle. It is gone. I will not be discussing this further.";

// The gate: 1 to 200 characters of UTF-8 text, not only whitespace.
// Check both the character count and the UTF-8 byte length, since the
// gate is defined over UTF-8 text.
const utf8Bytes = Buffer.byteLength(ENTRY, "utf8");
if (
  ENTRY.length < 1 ||
  ENTRY.length > 200 ||
  utf8Bytes > 200 ||
  ENTRY.trim().length === 0
) {
  throw new Error(
    `Entry failed the length gate: ${ENTRY.length} characters, ${utf8Bytes} UTF-8 bytes (must be 1-200).`,
  );
}
if (ENTRY.includes("\n") || ENTRY.includes("\r")) {
  throw new Error("Entry must be a single line.");
}

// Output folder comes from the environment, falling back to the default.
// The default "output" folder is used when OUTPUT_DIR is unset.
const outputDir = process.env.OUTPUT_DIR ?? "output";
mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, "entry.txt"), ENTRY + "\n", "utf8");

console.log(`Wrote ${ENTRY.length}-character entry to ${join(outputDir, "entry.txt")}`);
