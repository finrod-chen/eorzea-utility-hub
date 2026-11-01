import { normalizeEventsPayload, OfficialEvent } from './officialEventsParser';

export type { OfficialEvent };

const CACHE_KEY = 'ff14-official-events-cache';
const CACHE_TTL = 30 * 60 * 1000; // 30 minutes

interface CacheData {
  timestamp: number;
  events: OfficialEvent[];
}

/**
 * Sources, in order:
 *  1. Static JSON committed by the "Update official events" GitHub Action (same origin, no CORS).
 *  2. Optional VITE_N8N_EVENTS_URL webhook (legacy).
 */
function sources(): string[] {
  const list = [`${import.meta.env.BASE_URL}data/official-events.json`];
  const n8n = import.meta.env.VITE_N8N_EVENTS_URL;
  if (n8n) list.push(n8n);
  return list;
}

async function tryFetch(url: string): Promise<OfficialEvent[] | null> {
  try {
    const res = await fetch(url, { cache: 'no-cache' });
    if (!res.ok) return null;
    const text = await res.text();
    if (!text.trim()) return null;
    return normalizeEventsPayload(JSON.parse(text));
  } catch (e) {
    if (import.meta.env.DEV) console.warn('[eventService] source failed:', url, e);
    return null;
  }
}

export const fetchOfficialEvents = async (): Promise<OfficialEvent[]> => {
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      const { timestamp, events }: CacheData = JSON.parse(cached);
      if (Date.now() - timestamp < CACHE_TTL && Array.isArray(events)) return normalizeEventsPayload(events);
    }
  } catch { /* ignore corrupt cache */ }

  for (const url of sources()) {
    const events = await tryFetch(url);
    if (events && events.length > 0) {
      localStorage.setItem(CACHE_KEY, JSON.stringify({ timestamp: Date.now(), events } satisfies CacheData));
      return events;
    }
  }
  return [];
};
