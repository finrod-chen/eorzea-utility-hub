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
  
  // 1. Check Cache
  const cached = localStorage.getItem(CACHE_KEY);
  if (cached) {
    try {
      const { timestamp, events }: CacheData = JSON.parse(cached);
      const now = Date.now();
      if (now - timestamp < CACHE_TTL) {
        console.log('Using cached official events');
        return events;
      }
    } catch (e) {
      console.error('Failed to parse cached events', e);
    }
  }

  // 2. Fetch from Network
  if (n8nUrl) {
    console.log('Attempting to fetch official events from:', n8nUrl);
    try {
      const response = await fetch(n8nUrl);
      if (response.ok) {
        const text = await response.text();
        console.log('Fetch successful, response length:', text.length);
        if (text && text.trim() !== '') {
          try {
            const data = JSON.parse(text);
            if (Array.isArray(data)) {
              console.log('Successfully parsed official events array');
              // Update Cache
              const cacheData: CacheData = {
                timestamp: Date.now(),
                events: data
              };
              localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
              return data;
            } else {
              console.warn('Official events data is not an array:', data);
            }
          } catch (parseError) {
            console.error('Failed to parse official events JSON:', parseError);
          }
        } else {
          console.warn('Official events response was empty');
        }
      } else {
        console.error('Official events fetch failed with status:', response.status);
      }
    } catch (error) {
      console.error('Failed to fetch official events (Network Error):', error);
    }
  } else {
    console.warn('VITE_N8N_EVENTS_URL is not defined in the environment');
  }

  // 3. Fallback
  return [
    {
      eventid: 'mogumogu-2024',
      title: '03/24 莫古莫古★大收集～黃金的魔典～',
      url: 'https://www.ffxiv.com.tw/web/news/news_content.aspx?id=QAYgDD96jjqO',
      date: '2024-03-24T00:00:00.000Z'
    }
  ];
};
