// Usage: node scripts/add-locale-keys.mjs <locale-file> <after-key-line-substring> <json-object-text>
// Inserts new keys textually (preserving the file's existing formatting) after the line containing the anchor.
import { readFileSync, writeFileSync } from 'node:fs';
const [file, anchor, insertion] = process.argv.slice(2);
const lines = readFileSync(file, 'utf8').split('\n');
const i = lines.findIndex((l) => l.includes(anchor));
if (i < 0) { console.error('anchor not found: ' + anchor); process.exit(1); }
if (!lines[i].trimEnd().endsWith(',')) lines[i] = lines[i].replace(/\s*$/, ',');
lines.splice(i + 1, 0, insertion);
const out = lines.join('\n');
JSON.parse(out); // validate
writeFileSync(file, out);
