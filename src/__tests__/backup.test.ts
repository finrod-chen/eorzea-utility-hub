import { describe, it, expect, beforeEach } from 'vitest';
import { createBackup, validateBackup, restoreBackup, BackupError } from '../utils/backup';

class MemoryStorage implements Storage {
  private m = new Map<string, string>();
  get length() { return this.m.size; }
  clear() { this.m.clear(); }
  getItem(k: string) { return this.m.has(k) ? this.m.get(k)! : null; }
  key(i: number) { return [...this.m.keys()][i] ?? null; }
  removeItem(k: string) { this.m.delete(k); }
  setItem(k: string, v: string) { this.m.set(k, String(v)); }
}

let store: MemoryStorage;
beforeEach(() => {
  store = new MemoryStorage();
  store.setItem('ff14-alarms', '[]');
  store.setItem('ff14-events', '[{"id":"1"}]');
  store.setItem('ff14-official-events-cache', '{"x":1}');
  store.setItem('i18nextLng', 'zh-TW');
  store.setItem('unrelated', 'keep me');
});

describe('backup', () => {
  it('exports app keys only (no caches, no foreign keys)', () => {
    const b = createBackup(store, new Date('2026-11-01T00:00:00Z'));
    expect(b.data).toEqual({ 'ff14-alarms': '[]', 'ff14-events': '[{"id":"1"}]', i18nextLng: 'zh-TW' });
    expect(b.exportedAt).toBe('2026-11-01T00:00:00.000Z');
  });

  it('round-trips through JSON and restores exactly', () => {
    const b = validateBackup(JSON.parse(JSON.stringify(createBackup(store))));
    store.setItem('ff14-alarms', '[{"changed":true}]');
    store.setItem('ff14-market-favorites', '[1]'); // not in backup → removed
    restoreBackup(b, store);
    expect(store.getItem('ff14-alarms')).toBe('[]');
    expect(store.getItem('ff14-market-favorites')).toBeNull();
    expect(store.getItem('unrelated')).toBe('keep me');
    expect(store.getItem('ff14-official-events-cache')).toBe('{"x":1}');
  });

  it('rejects foreign or malformed files', () => {
    expect(() => validateBackup(null)).toThrow(BackupError);
    expect(() => validateBackup({ app: 'other', version: 1, data: {} })).toThrow('backup.errors.wrongApp');
    expect(() => validateBackup({ app: 'eorzea-utility-hub', version: 99, data: {} })).toThrow('backup.errors.version');
    expect(() => validateBackup({ app: 'eorzea-utility-hub', version: 1, data: { evil: 'x' } })).toThrow('backup.errors.invalid');
  });
});
