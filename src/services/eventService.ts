export interface OfficialEvent {
  eventid: string;
  title: string;
  url: string;
  date?: string;
}

const CACHE_KEY = 'ff14-official-events-cache';
const CACHE_TTL = 60 * 60 * 1000; // 60 minutes

interface CacheData {
  timestamp: number;
  events: OfficialEvent[];
}

export const fetchOfficialEvents = async (): Promise<OfficialEvent[]> => {
  const n8nUrl = import.meta.env.VITE_N8N_EVENTS_URL;
  
  const DEV = import.meta.env.DEV;

  // 1. Check Cache
  const cached = localStorage.getItem(CACHE_KEY);
  if (cached) {
    try {
      const { timestamp, events }: CacheData = JSON.parse(cached);
      const now = Date.now();
      if (now - timestamp < CACHE_TTL) {
        if (DEV) console.log('[eventService] Using cached official events');
        return events;
      }
    } catch (e) {
      if (DEV) console.error('[eventService] Failed to parse cached events', e);
    }
  }

  // 2. Fetch from Network
  if (n8nUrl) {
    if (DEV) console.log('[eventService] Fetching official events from:', n8nUrl);
    try {
      const response = await fetch(n8nUrl);
      if (response.ok) {
        const text = await response.text();
        if (text && text.trim() !== '') {
          try {
            const data = JSON.parse(text);
            if (Array.isArray(data)) {
              if (DEV) console.log('[eventService] Fetched', data.length, 'official events');
              // Update Cache
              const cacheData: CacheData = {
                timestamp: Date.now(),
                events: data
              };
              localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
              return data;
            } else {
              if (DEV) console.warn('[eventService] Official events data is not an array:', data);
            }
          } catch (parseError) {
            if (DEV) console.error('[eventService] Failed to parse official events JSON:', parseError);
          }
        } else {
          if (DEV) console.warn('[eventService] Official events response was empty');
        }
      } else {
        if (DEV) console.error('[eventService] Fetch failed with status:', response.status);
      }
    } catch (error) {
      if (DEV) console.error('[eventService] Network error:', error);
    }
  } else {
    if (DEV) console.warn('[eventService] VITE_N8N_EVENTS_URL is not defined');
  }

  // 3. Fallback — return empty array instead of stale hardcoded data
  return [];
};
