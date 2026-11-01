import { describe, it, expect } from 'vitest';
import { getNextReset, getPrevReset, getNextLevequestReset, getNextOceanFishing, formatCountdown } from '../utils/resets';
import { pruneExpired } from '../utils/taskUtils';

const utc = (s: string) => new Date(s + 'Z');

describe('daily / GC resets', () => {
  it('daily reset is 15:00 UTC (23:00 GMT+8)', () => {
    expect(getNextReset('daily', utc('2026-11-02T10:00:00'))).toEqual(utc('2026-11-02T15:00:00'));
    expect(getNextReset('daily', utc('2026-11-02T15:00:00'))).toEqual(utc('2026-11-03T15:00:00'));
    expect(getPrevReset('daily', utc('2026-11-02T14:59:59'))).toEqual(utc('2026-11-01T15:00:00'));
  });

  it('GC / tribe reset is 20:00 UTC (04:00 GMT+8)', () => {
    expect(getNextReset('gc', utc('2026-11-02T19:00:00'))).toEqual(utc('2026-11-02T20:00:00'));
    expect(getPrevReset('gc', utc('2026-11-02T19:00:00'))).toEqual(utc('2026-11-01T20:00:00'));
  });
});

describe('weekly reset (Tuesday 08:00 UTC)', () => {
  it('from a Sunday points at the coming Tuesday', () => {
    expect(getNextReset('weekly', utc('2026-11-01T12:00:00'))).toEqual(utc('2026-11-03T08:00:00'));
  });
  it('on Tuesday before 08:00 the previous reset is last week', () => {
    expect(getPrevReset('weekly', utc('2026-11-03T07:59:00'))).toEqual(utc('2026-10-27T08:00:00'));
  });
  it('on Tuesday after 08:00 the previous reset is today', () => {
    expect(getPrevReset('weekly', utc('2026-11-03T08:00:00'))).toEqual(utc('2026-11-03T08:00:00'));
  });
});

describe('other timers', () => {
  it('levequest allowances at 00:00 / 12:00 UTC', () => {
    expect(getNextLevequestReset(utc('2026-11-02T03:00:00'))).toEqual(utc('2026-11-02T12:00:00'));
    expect(getNextLevequestReset(utc('2026-11-02T13:00:00'))).toEqual(utc('2026-11-03T00:00:00'));
  });
  it('ocean fishing every even hour', () => {
    expect(getNextOceanFishing(utc('2026-11-02T23:10:00'))).toEqual(utc('2026-11-03T00:00:00'));
    expect(getNextOceanFishing(utc('2026-11-02T04:00:00'))).toEqual(utc('2026-11-02T06:00:00'));
  });
  it('formats countdowns', () => {
    const now = utc('2026-11-02T00:00:00');
    expect(formatCountdown(utc('2026-11-02T01:02:03'), now)).toBe('1h 2m 3s');
    expect(formatCountdown(utc('2026-11-04T00:00:05'), now)).toBe('2d 0h 0m 5s');
    expect(formatCountdown(utc('2026-11-01T00:00:00'), now)).toBe('0m 0s');
  });
});

describe('pruneExpired', () => {
  it('keeps tasks done after their reset and drops older ones', () => {
    const now = utc('2026-11-02T16:00:00'); // after daily reset, before GC reset
    const result = pruneExpired({
      'daily-roulette': '2026-11-02T14:00:00Z',     // before 15:00 daily reset → cleared
      'daily-gc-turnin': '2026-11-02T14:00:00Z',    // GC reset was 11-01 20:00 → kept
      'weekly-wondrous-tails': '2026-10-28T00:00:00Z', // after 10-27 weekly → kept
      'weekly-challenge-log': '2026-10-26T00:00:00Z',  // before 10-27 weekly → cleared
      'unknown-task': '2026-11-02T15:30:00Z',
      'daily-retainer': null,
    }, now);
    expect(result).toEqual({
      'daily-gc-turnin': '2026-11-02T14:00:00Z',
      'weekly-wondrous-tails': '2026-10-28T00:00:00Z',
    });
  });
});
