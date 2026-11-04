import { describe, it, expect, beforeEach } from 'vitest';

class MemoryStorage {
  private m = new Map<string, string>();
  getItem(k: string) { return this.m.has(k) ? this.m.get(k)! : null; }
  setItem(k: string, v: string) { this.m.set(k, String(v)); }
  removeItem(k: string) { this.m.delete(k); }
}

beforeEach(() => {
  (globalThis as any).localStorage = new MemoryStorage();
  (globalThis as any).window = globalThis;
  delete (globalThis as any).gtag;
  (globalThis as any).dataLayer = [];
});

describe('consent', () => {
  it('has no choice until the visitor picks one', async () => {
    const { getConsent } = await import('../utils/consent');
    expect(getConsent()).toBeNull();
  });

  it('stores the choice and sends a Consent Mode update', async () => {
    const { getConsent, setConsent } = await import('../utils/consent');
    setConsent('denied');
    expect(getConsent()).toBe('denied');
    const last = (globalThis as any).dataLayer.at(-1);
    expect(Array.from(last)).toEqual(['consent', 'update', {
      ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied', analytics_storage: 'denied',
    }]);
  });

  it('ignores garbage in storage', async () => {
    const { getConsent } = await import('../utils/consent');
    localStorage.setItem('ff14-consent', 'maybe');
    expect(getConsent()).toBeNull();
  });
});
