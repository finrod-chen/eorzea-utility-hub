import { describe, it, expect } from 'vitest';
import {
  parseFeed, parseNewsListHtml, extractEventDate, buildEvents, normalizeEventsPayload, stableId,
} from '../services/officialEventsParser';

const now = new Date('2026-11-01T04:00:00Z'); // 2026-11-01 12:00 Taipei

describe('extractEventDate', () => {
  it('reads MM/DD from the title in GMT+8', () => {
    expect(extractEventDate('【活動】萬聖節活動 10/14 開跑', now)).toBe('2026-10-14T14:00:00+08:00');
    expect(extractEventDate('1/5 新年活動', now)).toBe('2027-01-05T14:00:00+08:00'); // Nov → Jan rolls forward
    expect(extractEventDate('12/20 星芒祭', new Date('2027-01-10T00:00:00Z'))).toBe('2026-12-20T14:00:00+08:00');
    expect(extractEventDate('7.25 版本更新', now)).toBeUndefined();
    expect(extractEventDate('2026/13/40', now)).toBeUndefined();
  });
});

describe('parseFeed', () => {
  it('handles RSS with CDATA and entities', () => {
    const xml = `<rss><channel>
      <item><title><![CDATA[【活動】守護天節 10/14 開始]]></title><link>https://example.tw/a?id=1&amp;x=2</link><pubDate>Mon, 13 Oct 2026</pubDate></item>
      <item><title>維護公告</title><link>https://example.tw/b</link></item>
    </channel></rss>`;
    expect(parseFeed(xml)).toEqual([
      { title: '【活動】守護天節 10/14 開始', url: 'https://example.tw/a?id=1&x=2', publishedAt: 'Mon, 13 Oct 2026' },
      { title: '維護公告', url: 'https://example.tw/b', publishedAt: undefined },
    ]);
  });
  it('handles Atom links', () => {
    expect(parseFeed('<feed><entry><title>X 11/02</title><link href="https://e.tw/x"/></entry></feed>'))
      .toEqual([{ title: 'X 11/02', url: 'https://e.tw/x', publishedAt: undefined }]);
  });
});

describe('parseNewsListHtml', () => {
  // Trimmed from the real 活動公告 page (category=1), including a nav-menu link that must be ignored.
  const html = `
    <ul><li><a href="https://www.ffxiv.com.tw/web/news/news_content.aspx?id=NAV"><p>10/27 商城新品上架</p></a></li></ul>
    <div class="item">     <div class="first_block">        <div class="news_id">201</div>        <div class="type event">            <div class="type_icon"><svg></svg></div>        </div>    </div>    <div class="second_block">        <div class="title"><a href="/web/news/news_content.aspx?id=mP1K80yova">10/23 守護天節-魔物的慶典 滿懷感謝</a></div>        <div class="publish_date">2026/10/16</div>        <div class="view_count">1234</div>    </div></div>
    <div class="item">     <div class="first_block">        <div class="news_id">3</div>        <div class="type other"></div>    </div>    <div class="second_block">        <div class="title"><span class="badge top">置頂</span><a href="/web/news/news_content.aspx?id=LENEEYbBA">一步步帶您踏入 &amp; 世界！</a></div>        <div class="publish_date">2025/8/9</div>    </div></div>`;

  it('reads .item blocks with publish dates and skips nav links', () => {
    expect(parseNewsListHtml(html)).toEqual([
      { title: '10/23 守護天節-魔物的慶典 滿懷感謝', url: 'https://www.ffxiv.com.tw/web/news/news_content.aspx?id=mP1K80yova', publishedAt: '2026-10-16T00:00:00+08:00' },
      { title: '一步步帶您踏入 & 世界！', url: 'https://www.ffxiv.com.tw/web/news/news_content.aspx?id=LENEEYbBA', publishedAt: '2025-08-09T00:00:00+08:00' },
    ]);
  });

  it('uses the publish date to pick the year', () => {
    const items = parseNewsListHtml(html);
    const events = buildEvents(items, { now: new Date('2026-10-30T00:00:00Z') });
    expect(events).toHaveLength(1);
    expect(events[0].date).toBe('2026-10-23T14:00:00+08:00');
    // A December post announcing a January event lands in the next year.
    expect(buildEvents([{ title: '01/06 新年活動', url: 'x', publishedAt: '2026-12-20T00:00:00+08:00' }], { now: new Date('2027-01-01T00:00:00Z') })[0].date)
      .toBe('2027-01-06T14:00:00+08:00');
  });
});

describe('buildEvents', () => {
  it('keeps dated, recent items with stable ids, sorted by date', () => {
    const events = buildEvents([
      { title: '活動 B 11/20', url: 'u2' },
      { title: '活動 A 10/25', url: 'u1' },
      { title: '太舊 09/01', url: 'u3' },
      { title: '沒有日期', url: 'u4' },
      { title: '活動 A 10/25', url: 'u1' },
    ], { now, keepPastDays: 14 });
    expect(events.map(e => e.url)).toEqual(['u1', 'u2']);
    expect(events[0].eventid).toBe(stableId('u1'));
  });
});

describe('normalizeEventsPayload', () => {
  it('accepts legacy arrays and repairs the "=" date prefix from n8n', () => {
    const out = normalizeEventsPayload([{ eventid: 'event-01', title: 't', url: 'u', date: '=2026-10-14T14:00:00.000+08:00' }]);
    expect(out[0].date).toBe('2026-10-14T14:00:00.000+08:00');
  });
  it('accepts { events } and drops junk', () => {
    expect(normalizeEventsPayload({ events: [{ title: 't', url: 'u', date: 'bad' }, null, { title: 1 }] }))
      .toEqual([{ eventid: stableId('u'), title: 't', url: 'u', date: undefined }]);
    expect(normalizeEventsPayload('nope')).toEqual([]);
  });
});
