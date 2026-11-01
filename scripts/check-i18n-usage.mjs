// Fails if a literal t('some.key') in src/ has no entry in en.json.
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const root = new URL('../src/', import.meta.url).pathname;
const en = JSON.parse(readFileSync(join(root, 'i18n/locales/en.json'), 'utf8'));
const has = (key) => key.split('.').reduce((o, k) => (o && typeof o === 'object' ? o[k] : undefined), en) !== undefined;

const files = [];
const walk = (d) => readdirSync(d).forEach((f) => {
  const p = join(d, f);
  if (statSync(p).isDirectory()) { if (f !== '__tests__') walk(p); }
  else if (/\.tsx?$/.test(f)) files.push(p);
});
walk(root);

const missing = [];
for (const f of files) {
  const src = readFileSync(f, 'utf8');
  for (const m of src.matchAll(/\bt\(\s*'([a-zA-Z][\w-]*(?:\.[\w-]+)+)'\s*(,\s*\{[^}]*defaultValue)?/g)) {
    if (!m[2] && !has(m[1])) missing.push(`${f.replace(root, 'src/')}: ${m[1]}`);
  }
}
if (missing.length) { console.error('Missing translation keys:\n  ' + [...new Set(missing)].join('\n  ')); process.exit(1); }
console.log(`i18n usage OK (${files.length} files)`);
