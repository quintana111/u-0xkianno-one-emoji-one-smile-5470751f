// One Emoji, One Smile — writes exactly one warm emoji, nothing else.
//
// Chosen emoji: 🌻 (sunflower). Warm and sunny at first glance, universal
// across ages and backgrounds, gently unexpected rather than the default
// smiley, and friendly to a stranger with no intimacy or irony.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const EMOJI = "🌻";

// Paths resolve from this script's directory, never from the working
// directory: the grader runs `node /bot/main.ts` with cwd != /bot.
const scriptDir = dirname(fileURLToPath(import.meta.url));

function resolveOutPath() {
  if (process.env.ENTRY_OUTPUT_PATH) return resolve(process.env.ENTRY_OUTPUT_PATH);
  return "/output/entry.txt";
}

function writeEmoji(path) {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, EMOJI, "utf8");
  // Guard: the file must hold exactly the one chosen emoji, nothing else.
  const written = readFileSync(path, "utf8");
  if (written !== EMOJI) {
    throw new Error(`output is not exactly one emoji: ${JSON.stringify(written)}`);
  }
}

try {
  writeEmoji(resolveOutPath());
} catch (err) {
  // Local-testing fallback: if the default location cannot be written
  // (e.g. no /output directory here), write beside this script instead.
  if (resolveOutPath() === "/output/entry.txt") {
    writeEmoji(join(scriptDir, "entry.txt"));
  } else {
    throw err;
  }
}
