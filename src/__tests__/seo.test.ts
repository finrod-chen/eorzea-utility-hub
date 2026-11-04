import { describe, it, expect } from 'vitest';
import { PAGES, pageForPath, pageForView, canonicalUrl } from '../constants/seo';
import { NAV_GROUPS } from '../constants/tools';

describe('page SEO config', () => {
  it('covers every navigable view exactly once with a unique path', () => {
    const views = NAV_GROUPS.flatMap(g => g.items.map(i => i.id));
    for (const v of views) expect(PAGES.filter(p => p.view === v)).toHaveLength(1);
    expect(new Set(PAGES.map(p => p.path)).size).toBe(PAGES.length);
  });

  it('keeps titles and descriptions within sensible lengths', () => {
    for (const p of PAGES) {
      expect(p.title.length).toBeLessThanOrEqual(40);
      expect(p.description.length).toBeGreaterThan(20);
      expect(p.description.length).toBeLessThanOrEqual(120);
    }
  });

  it('resolves paths with or without trailing slash', () => {
    expect(pageForPath('/weather')?.view).toBe('weather');
    expect(pageForPath('/weather/')?.view).toBe('weather');
    expect(pageForPath('/')?.view).toBe('home');
    expect(pageForPath('/nope')).toBeUndefined();
    expect(canonicalUrl(pageForView('home'))).toBe('https://ff14-tw.xyz/');
    expect(canonicalUrl(pageForView('treasure'))).toBe('https://ff14-tw.xyz/treasure');
  });
});

describe('tool guides', () => {
  it('has zh and en text with matching shape for every guided page', async () => {
    const { TOOL_GUIDES } = await import('../constants/toolGuides');
    const entries = Object.entries(TOOL_GUIDES);
    expect(entries.length).toBeGreaterThanOrEqual(12);
    for (const [view, g] of entries) {
      expect(PAGES.some(p => p.view === view)).toBe(true);
      for (const lang of [g!.zh, g!.en]) {
        expect(lang.intro.length).toBeGreaterThan(30);
        expect(lang.steps.length).toBeGreaterThanOrEqual(3);
      }
      expect(g!.zh.steps.length).toBe(g!.en.steps.length);
      expect(g!.zh.faq.length).toBe(g!.en.faq.length);
    }
  });
});
