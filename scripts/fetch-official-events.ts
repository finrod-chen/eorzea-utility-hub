/**
 * Fetches official TC-server news and writes public/data/official-events.json.
 * Run by .github/workflows/official-events.yml on a schedule; can also be run locally:
 *   npx tsx scripts/fetch-official-events.ts
 *
 * Env:
 *   EVENTS_LIST_URL   Official 活動公告 list page (default: category=1)
 *   EVENTS_FEED_URL   Optional RSS/Atom feed, tried only when the list page fails
 */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildEvents, parseFeed, parseNewsListHtml, RawNewsItem } from '../src/services/officialEventsParser.ts';

const LIST_URL = process.env.EVENTS_LIST_URL || 'https://www.ffxiv.com.tw/web/news/news_list.aspx?category=1';
const FEED_URL = process.env.EVENTS_FEED_URL || '';
const OUT = resolve(dirname(fileURLToPath(import.meta.url)), '../public/data/official-events.json');

async function get(url: string): Promise<string> {
  const res = await fetch(url, { headers: { 'User-Agent': 'eorzea-utility-hub (+github actions)' }, signal: AbortSignal.timeout(20_000) });
  if (!res.ok) throw new Error(`${url} → HTTP ${res.status}`);
  return res.text();
}

async function collect(): Promise<{ items: RawNewsItem[]; source: string }> {
  const errors: string[] = [];
  try {
    const items = parseNewsListHtml(await get(LIST_URL));
    if (items.length) return { items, source: LIST_URL };
    errors.push('news list had no items (page layout changed?)');
  } catch (e) { errors.push(String(e)); }
  if (FEED_URL) {
    try {
      const items = parseFeed(await get(FEED_URL));
      if (items.length) return { items, source: FEED_URL };
      errors.push('feed had no items');
    } catch (e) { errors.push(String(e)); }
  }
  throw new Error('All sources failed:\n  ' + errors.join('\n  '));
}

const { items, source } = await collect();
const events = buildEvents(items, { now: new Date(), keepPastDays: 14 });

// Only rewrite when the event list actually changed (keeps git history quiet).
let previous = '';
try { previous = JSON.stringify(JSON.parse(readFileSync(OUT, 'utf8')).events); } catch { /* first run */ }
if (previous === JSON.stringify(events)) {
  console.log(`No change (${events.length} events from ${items.length} items, ${source})`);
} else {
  mkdirSync(dirname(OUT), { recursive: true });
  writeFileSync(OUT, JSON.stringify({ generatedAt: new Date().toISOString(), source, events }, null, 2) + '\n');
  console.log(`Wrote ${events.length} events from ${items.length} items (${source})`);
}
