/**
 * Final Fantasy XIV Utility Logic
 */
import i18n from '../i18n';

// Eorzea Time
// 1 Eorzea Day  = 1440 ET minutes = 70 real minutes
// 1 Eorzea Hour = 60  ET minutes = 175 real seconds
const ET_MINUTES_PER_REAL_MINUTE = 1440 / 70; // ≈ 20.5714
const REAL_SECONDS_PER_ET_MINUTE  = 175 / 60;  // ≈ 2.9167

export function getEorzeaTime(date: Date = new Date()): { hours: number; minutes: number; totalHours: number } {
  const unixSeconds  = date.getTime() / 1000;
  const etSeconds    = unixSeconds * ET_MINUTES_PER_REAL_MINUTE;
  const totalMinutes = Math.floor(etSeconds / 60);
  const totalHours    = Math.floor(totalMinutes / 60);
  return {
    hours:      totalHours % 24,  // ET hour within the current day (0–23)
    minutes:    totalMinutes % 60, // ET minute within the current hour (0–59)
    totalHours,
  };
}

// --- Weather Logic (LCG) ---
// Formula: (totalDays * 100 + (totalHours + 8 - (totalHours % 8))) % 100
export function calculateWeatherSeed(totalHours: number) {
  // totalHours is bell (8-hour window start)
  // The increment is the start hour of the NEXT window
  const bell = totalHours;
  const increment = (bell + 8 - (bell % 8)) % 24;
  
  // Total Eorzea days since epoch
  const totalDays = Math.floor(bell / 24);
  
  // Calculate base for LCG
  const calcBase = ((totalDays * 100) + increment) >>> 0;
  
  // LCG step
  const step1 = ((calcBase << 11) ^ calcBase) >>> 0;
  const step2 = ((step1 >>> 8) ^ step1) >>> 0;
  
  return step2 % 100;
}

// --- Mini Cactpot Logic ---
// Possible sums and their payouts (standard FF14 values)
export const CACTPOT_PAYOUTS: Record<number, number> = {
  6: 10000, 7: 36, 8: 720, 9: 360, 10: 80, 11: 252, 12: 108, 13: 72, 14: 54, 
  15: 180, 16: 72, 17: 180, 18: 119, 19: 36, 20: 306, 21: 1080, 22: 144, 23: 1800, 24: 3600
};

// --- Weather Translation ---
// Keys stored in i18n as weather.Clear_Skies, weather.Fog, etc.
export function translateWeather(weather: string): string {
  const key = `weather.${weather.replace(/ /g, '_')}`;
  return i18n.t(key, { defaultValue: weather });
}

// --- Region Translation ---
// Keys stored in i18n as region.la-noscea, region.shroud, etc.
export function translateRegion(region: string): string {
  return i18n.t(`region.${region}`, { defaultValue: region });
}

// --- Emote Translation ---
// Strip leading slash and trailing whitespace before lookup.
// Keys stored in i18n as emote.lookout, emote.pray, etc.
export function translateEmote(emote: string): string {
  const key = emote.trim().replace(/^\//, '');
  return i18n.t(`emote.${key}`, { defaultValue: emote.trim() });
}
