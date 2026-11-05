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
      expect(p.description.length).toBeGreaterThanOrEqual(60);
      expect(p.description.length).toBeLessThanOrEqual(80);
    }
  });

  it('has a real last-updated date per page, and the data pages agree with their sources', async () => {
    for (const p of PAGES) {
      expect(p.updated).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(Number.isNaN(Date.parse(p.updated))).toBe(false);
    }
    const { CHANGELOG } = await import('../constants/changelog');
    const { PRIVACY_UPDATED } = await import('../constants/site');
    expect(pageForView('changelog').updated).toBe(CHANGELOG[0].date);
    expect(pageForView('privacy').updated).toBe(PRIVACY_UPDATED);
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
  it('has substantial zh content, FAQ and valid cross-links for every guided page', async () => {
    const { TOOL_GUIDES } = await import('../constants/toolGuides');
    const entries = Object.entries(TOOL_GUIDES);
    expect(entries.length).toBeGreaterThanOrEqual(12);
    const toolViews = ['checklist', 'alarm', 'event-calendar', 'tails', 'market', 'treasure', 'cactpot', 'chocobo', 'weather', 'interactive-maps', 'sightseeing'];
    for (const [view, g] of entries) {
      expect(PAGES.some(p => p.view === view)).toBe(true);
      expect(g!.zh.intro.length).toBeGreaterThan(30);
      expect(g!.en.intro.length).toBeGreaterThan(30);
      for (const r of g!.related ?? []) {
        expect(PAGES.some(p => p.view === r.view)).toBe(true);
        expect(r.view).not.toBe(view);
        expect(r.note.length).toBeGreaterThan(5);
      }
      if (toolViews.includes(view)) {
        expect(g!.zh.steps.length).toBeGreaterThanOrEqual(3);
        expect(g!.zh.faq.length).toBeGreaterThanOrEqual(3);
        expect(g!.zh.faq.length).toBeLessThanOrEqual(5);
        expect(g!.related?.length ?? 0).toBeGreaterThanOrEqual(2);
        expect((g!.zh.sections ?? []).length).toBeGreaterThanOrEqual(2);
      }
      for (const t of (g!.zh.sections ?? []).flatMap(x => (x.table ? [x.table] : []))) {
        for (const row of t.rows) expect(row.length).toBe(t.head.length);
      }
    }
  });

  it('sightseeing guide counts match the data', async () => {
    const { TOOL_GUIDES } = await import('../constants/toolGuides');
    const { SIGHTSEEING_LOGS } = await import('../data/ff14Data');
    const text = JSON.stringify(TOOL_GUIDES['sightseeing']!.zh);
    expect(text).toContain(String(SIGHTSEEING_LOGS.length));
  });
});
