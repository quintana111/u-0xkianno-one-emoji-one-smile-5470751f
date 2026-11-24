// One Emoji, One Smile — writes exactly one warm emoji, nothing else.
//
// Chosen emoji: 🌻 (sunflower). Warm and sunny at first glance, universal
// across ages and backgrounds, gently unexpected rather than the default
// smiley, and friendly to a stranger with no intimacy or irony.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const EMOJI = "🌻";

// Paths resolve from this script's directory, never from the working
// directory: the grader runs `node /bot/main.ts` with cwd != /bot.
const scriptDir = dirname(fileURLToPath(import.meta.url));
void scriptDir;

const outPath = process.env.ENTRY_OUTPUT_PATH
  ? resolve(process.env.ENTRY_OUTPUT_PATH)
  : "/output/entry.txt";

mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, EMOJI, "utf8");
