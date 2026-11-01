import { describe, it, expect } from 'vitest';
import { getEorzeaTime, calculateWeatherSeed, CACTPOT_PAYOUTS, etHourToRealDate, weatherWindowStart } from '../utils/ff14';

/** Reference implementation of the community weather formula, driven by real unix seconds. */
function referenceSeed(unixSeconds: number): number {
  const bell = Math.floor(unixSeconds / 175);
  const increment = (bell + 8 - (bell % 8)) % 24;
  const totalDays = Math.floor(unixSeconds / 4200);
  const calcBase = (totalDays * 100 + increment) >>> 0;
  const step1 = ((calcBase << 11) ^ calcBase) >>> 0;
  const step2 = ((step1 >>> 8) ^ step1) >>> 0;
  return step2 % 100;
}

describe('getEorzeaTime', () => {
  it('starts at 00:00 at the unix epoch', () => {
    expect(getEorzeaTime(new Date(0))).toEqual({ hours: 0, minutes: 0, totalHours: 0 });
  });

  it('advances one Eorzea hour every 175 real seconds', () => {
    expect(getEorzeaTime(new Date(175_000))).toMatchObject({ hours: 1, minutes: 0, totalHours: 1 });
  });

  it('wraps to a new Eorzea day every 70 real minutes', () => {
    expect(getEorzeaTime(new Date(4200_000))).toMatchObject({ hours: 0, minutes: 0, totalHours: 24 });
  });
});

describe('calculateWeatherSeed', () => {
  it('matches the reference formula across many timestamps', () => {
    const start = Date.UTC(2026, 0, 1) / 1000;
    for (let i = 0; i < 500; i++) {
      const unix = start + i * 1234;
      const { totalHours } = getEorzeaTime(new Date(unix * 1000));
      expect(calculateWeatherSeed(totalHours)).toBe(referenceSeed(unix));
    }
  });

  it('stays in 0..99 and is constant inside one 8-hour window', () => {
    const base = 24 * 1000; // ET hour 24000 is a window start (divisible by 8)
    const seed = calculateWeatherSeed(base);
    expect(seed).toBeGreaterThanOrEqual(0);
    expect(seed).toBeLessThan(100);
    for (let h = 1; h < 8; h++) expect(calculateWeatherSeed(base + h)).toBe(seed);
  });
});

describe('CACTPOT_PAYOUTS', () => {
  it('covers every possible line sum 6..24', () => {
    for (let sum = 6; sum <= 24; sum++) expect(CACTPOT_PAYOUTS[sum]).toBeGreaterThan(0);
  });
});

describe('weather windows in real time', () => {
  it('converts ET hours back to real time (round trip)', () => {
    const d = etHourToRealDate(123_456);
    expect(getEorzeaTime(d).totalHours).toBe(123_456);
    expect(getEorzeaTime(new Date(d.getTime() - 1)).totalHours).toBe(123_455);
  });
  it('an 8-ET-hour window lasts 23m20s of real time', () => {
    const start = weatherWindowStart(1000);
    expect(start).toBe(1000);
    expect(weatherWindowStart(1007)).toBe(1000);
    expect(etHourToRealDate(start + 8).getTime() - etHourToRealDate(start).getTime()).toBe(1400_000);
  });
});
