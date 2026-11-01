// Fails if en.json and zh-TW.json do not have the same set of keys.
import { readFileSync } from 'node:fs';

const load = (p) => JSON.parse(readFileSync(new URL(`../src/i18n/locales/${p}`, import.meta.url), 'utf8'));
const flatten = (obj, prefix = '') =>
  Object.entries(obj).flatMap(([k, v]) =>
    v && typeof v === 'object' && !Array.isArray(v) ? flatten(v, `${prefix}${k}.`) : [`${prefix}${k}`],
  );

const en = new Set(flatten(load('en.json')));
const zh = new Set(flatten(load('zh-TW.json')));
const missingInZh = [...en].filter((k) => !zh.has(k));
const missingInEn = [...zh].filter((k) => !en.has(k));

if (missingInZh.length || missingInEn.length) {
  if (missingInZh.length) console.error('Missing in zh-TW.json:\n  ' + missingInZh.join('\n  '));
  if (missingInEn.length) console.error('Missing in en.json:\n  ' + missingInEn.join('\n  '));
  process.exit(1);
}
console.log(`Locale keys OK (${en.size} keys)`);
