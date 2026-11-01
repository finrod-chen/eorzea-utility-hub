/**
 * Pure parsing helpers for official TC-server news → OfficialEvent[].
 * Used by scripts/fetch-official-events.ts (GitHub Actions) and covered by unit tests.
 */

export interface OfficialEvent {
  eventid: string;
  title: string;
  url: string;
  /** ISO 8601 with +08:00 offset; the event start date found in the title. */
  date?: string;
}

export interface RawNewsItem {
  title: string;
  url: string;
  publishedAt?: string;
}

const ENTITIES: Record<string, string> = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ' };

export function decodeEntities(s: string): string {
  return s
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&([a-z]+);/gi, (m, n) => ENTITIES[n.toLowerCase()] ?? m)
    .trim();
}

/** Minimal RSS 2.0 / Atom item extraction (no dependency needed for this shape). */
export function parseFeed(xml: string): RawNewsItem[] {
  const items: RawNewsItem[] = [];
  const blocks = xml.match(/<(item|entry)\b[\s\S]*?<\/\1>/gi) ?? [];
  for (const block of blocks) {
    const pick = (tag: string) => block.match(new RegExp(`<${tag}\\b[^>]*>([\\s\\S]*?)</${tag}>`, 'i'))?.[1];
    const title = decodeEntities(pick('title') ?? '');
    const link = decodeEntities(pick('link') ?? '') || block.match(/<link\b[^>]*href="([^"]+)"/i)?.[1] || '';
    const published = pick('pubDate') ?? pick('published') ?? pick('updated');
    if (title && link) items.push({ title, url: link, publishedAt: published ? decodeEntities(published) : undefined });
  }
  return items;
}

/** Fallback: pull news links straight from the official news-list HTML. */
export function parseNewsListHtml(html: string, baseUrl = 'https://www.ffxiv.com.tw/web/news/'): RawNewsItem[] {
  const seen = new Set<string>();
  const items: RawNewsItem[] = [];
  const re = /<a\b[^>]*href="([^"]*news_content\.aspx\?id=[^"&]+)[^"]*"[^>]*>([\s\S]*?)<\/a>/gi;
  for (const m of html.matchAll(re)) {
    const url = new URL(decodeEntities(m[1]), baseUrl).toString();
    const title = decodeEntities(m[2].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' '));
    if (!title || seen.has(url)) continue;
    seen.add(url);
    items.push({ title, url });
  }
  return items;
}

/**
 * Finds the first MM/DD in the title and resolves the year relative to `now`
 * (handles Dec→Jan rollover). Returns an ISO string at 14:00 GMT+8 (usual maintenance end).
 */
export function extractEventDate(title: string, now: Date): string | undefined {
  const m = title.match(/(?<!\d)(0?[1-9]|1[0-2])\/(0?[1-9]|[12]\d|3[01])(?!\d)/);
  if (!m) return undefined;
  const month = Number(m[1]);
  const day = Number(m[2]);
  const tw = new Date(now.getTime() + 8 * 3600_000); // wall clock in Taipei
  const curMonth = tw.getUTCMonth() + 1;
  let year = tw.getUTCFullYear();
  if (curMonth >= 11 && month <= 2) year += 1;
  else if (curMonth <= 2 && month >= 11) year -= 1;
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${year}-${pad(month)}-${pad(day)}T14:00:00+08:00`;
}

/** Stable id derived from the URL so React keys and calendar entries don't shuffle. */
export function stableId(url: string): string {
  let h = 2166136261;
  for (let i = 0; i < url.length; i++) {
    h ^= url.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return 'event-' + (h >>> 0).toString(36);
}

export interface BuildOptions {
  now: Date;
  /** Drop events whose date is more than this many days in the past. */
  keepPastDays?: number;
  /** Only keep titles that look like events (default: has a date). */
  include?: RegExp;
  exclude?: RegExp;
}

export function buildEvents(items: RawNewsItem[], opts: BuildOptions): OfficialEvent[] {
  const keepPastMs = (opts.keepPastDays ?? 14) * 86400_000;
  const seen = new Set<string>();
  const out: OfficialEvent[] = [];
  for (const it of items) {
    if (seen.has(it.url)) continue;
    if (opts.include && !opts.include.test(it.title)) continue;
    if (opts.exclude && opts.exclude.test(it.title)) continue;
    const date = extractEventDate(it.title, opts.now);
    if (!date) continue;
    if (opts.now.getTime() - new Date(date).getTime() > keepPastMs) continue;
    seen.add(it.url);
    out.push({ eventid: stableId(it.url), title: it.title, url: it.url, date });
  }
  return out.sort((a, b) => (a.date ?? '').localeCompare(b.date ?? ''));
}

/** Accepts either a bare array (legacy n8n) or `{ events: [...] }`, and repairs known n8n quirks. */
export function normalizeEventsPayload(data: unknown): OfficialEvent[] {
  const arr = Array.isArray(data) ? data : (data as { events?: unknown })?.events;
  if (!Array.isArray(arr)) return [];
  return arr
    .filter((e): e is OfficialEvent => !!e && typeof e.title === 'string' && typeof e.url === 'string')
    .map(e => {
      // The old n8n flow produced "=2026-..." because of a doubled expression prefix.
      const date = typeof e.date === 'string' ? e.date.replace(/^=+/, '') : undefined;
      return {
        eventid: typeof e.eventid === 'string' && e.eventid ? e.eventid : stableId(e.url),
        title: e.title,
        url: e.url,
        date: date && !Number.isNaN(new Date(date).getTime()) ? date : undefined,
      };
    });
}
