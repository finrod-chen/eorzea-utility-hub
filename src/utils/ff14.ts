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

// --- Wondrous Tails Logic ---
// Grid: 3×3 sticker board. Each row/col/diagonal is a "line" = 9 possible lines.
// N stickers placed randomly → probability of getting exactly 1, 2, or 3 lines.
// Uses hypergeometric distribution simulation (100 000 trials).

export interface WondrousTailsResult {
  oneLine:  number; // probability
  twoLines: number;
  threeLines: number;
}

export function calculateWondrousTailsProbabilities(stickerCount: number): WondrousTailsResult {
  const TOTAL_CELLS = 9;
  const TOTAL_LINES = 8; // 3 rows + 3 cols + 2 diagonals
  const SIMULATIONS = 100_000;

  if (stickerCount < 1 || stickerCount > 9) {
    return { oneLine: 0, twoLines: 0, threeLines: 0 };
  }

  // Quick lookup for common counts
  const QUICK: Record<number, WondrousTailsResult> = {
    1: { oneLine: 0,       twoLines: 0,        threeLines: 0        },
    2: { oneLine: 0,       twoLines: 0,        threeLines: 0        },
    3: { oneLine: 0.1111,   twoLines: 0,        threeLines: 0        },
    4: { oneLine: 0.3175,   twoLines: 0.0069,   threeLines: 0        },
    5: { oneLine: 0.4762,   twoLines: 0.0476,   threeLines: 0        },
    6: { oneLine: 0.5556,   twoLines: 0.1319,   threeLines: 0.0014   },
    7: { oneLine: 0.6000,   twoLines: 0.2400,   threeLines: 0.0111   },
    8: { oneLine: 0.5333,   twoLines: 0.3778,   threeLines: 0.0889   },
    9: { oneLine: 0,        twoLines: 0,        threeLines: 1.0      },
  };

  if (stickerCount <= 9 && QUICK[stickerCount] !== undefined) {
    return QUICK[stickerCount];
  }

  let oneLine = 0, twoLines = 0, threeLines = 0;

  for (let i = 0; i < SIMULATIONS; i++) {
    // Fisher-Yates shuffle then take first `stickerCount` as placed stickers
    const cells = Array.from({ length: TOTAL_CELLS }, (_, k) => k);
    for (let j = TOTAL_CELLS - 1; j > 0; j--) {
      const k = Math.floor(Math.random() * (j + 1));
      [cells[j], cells[k]] = [cells[k], cells[j]];
    }
    const placed = new Set(cells.slice(0, stickerCount));

    // Count completed lines (3 rows + 3 cols + 2 diagonals = 8 — wait, that's wrong)
    // 3×3 grid: rows=3, cols=3, diagonals=2 → 8 total lines
    const lines = [
      [0,1,2],[3,4,5],[6,7,8],       // rows
      [0,3,6],[1,4,7],[2,5,8],       // cols
      [0,4,8],[2,4,6],               // diagonals
    ];

    let completed = 0;
    for (const line of lines) {
      if (line.every(c => placed.has(c))) completed++;
    }

    if (completed >= 1) oneLine++;
    if (completed >= 2) twoLines++;
    if (completed >= 3) threeLines++;
  }

  return {
    oneLine:   oneLine   / SIMULATIONS,
    twoLines:  twoLines  / SIMULATIONS,
    threeLines: threeLines / SIMULATIONS,
  };
}

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
