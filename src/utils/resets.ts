/**
 * Server reset boundaries for the Traditional Chinese (GMT+8) data centre.
 * All functions are pure and take `now` so they can be unit tested.
 *
 *  - Daily duty reset:            15:00 UTC (23:00 GMT+8)
 *  - Grand Company / tribe reset: 20:00 UTC (04:00 GMT+8)
 *  - Weekly reset:                Tuesday 08:00 UTC (16:00 GMT+8)
 */

export type ResetKind = 'daily' | 'gc' | 'weekly';

const HOUR = 60 * 60 * 1000;
const DAY = 24 * HOUR;
const WEEK = 7 * DAY;

/** Most recent instant (<= now) at the given UTC hour. */
function prevDailyAt(now: Date, utcHour: number): Date {
  const d = new Date(now);
  d.setUTCHours(utcHour, 0, 0, 0);
  if (d.getTime() > now.getTime()) d.setTime(d.getTime() - DAY);
  return d;
}

export function getPrevReset(kind: ResetKind, now: Date = new Date()): Date {
  switch (kind) {
    case 'daily':
      return prevDailyAt(now, 15);
    case 'gc':
      return prevDailyAt(now, 20);
    case 'weekly': {
      const d = new Date(now);
      d.setUTCHours(8, 0, 0, 0);
      const back = (d.getUTCDay() - 2 + 7) % 7; // 2 = Tuesday
      d.setTime(d.getTime() - back * DAY);
      if (d.getTime() > now.getTime()) d.setTime(d.getTime() - WEEK);
      return d;
    }
  }
}

export function getNextReset(kind: ResetKind, now: Date = new Date()): Date {
  const prev = getPrevReset(kind, now);
  return new Date(prev.getTime() + (kind === 'weekly' ? WEEK : DAY));
}

/** Levequest allowances: 00:00 and 12:00 UTC (08:00 / 20:00 GMT+8). */
export function getNextLevequestReset(now: Date = new Date()): Date {
  const d = new Date(now);
  d.setUTCMinutes(0, 0, 0);
  const h = now.getUTCHours();
  d.setUTCHours(h < 12 ? 12 : 24);
  return d;
}

/** Ocean fishing departs every 2 hours on even GMT+8 hours (= even UTC hours). */
export function getNextOceanFishing(now: Date = new Date()): Date {
  const d = new Date(now);
  d.setUTCMinutes(0, 0, 0);
  d.setUTCHours(Math.floor(now.getUTCHours() / 2) * 2 + 2);
  return d;
}

/** "1h 02m 03s" style countdown. */
export function formatCountdown(target: Date, now: Date = new Date()): string {
  const diff = Math.max(0, target.getTime() - now.getTime());
  const days = Math.floor(diff / DAY);
  const hours = Math.floor((diff % DAY) / HOUR);
  const minutes = Math.floor((diff % HOUR) / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);
  const parts: string[] = [];
  if (days > 0) parts.push(`${days}d`);
  if (days > 0 || hours > 0) parts.push(`${hours}h`);
  parts.push(`${minutes}m`, `${seconds}s`);
  return parts.join(' ');
}
