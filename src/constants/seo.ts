/**
 * Per-page URL and search metadata.
 * Pure data (no React / browser imports) so the build-time prerender script can use it too.
 *
 * Titles target what Traditional Chinese players actually search for
 * (e.g. 「FF14 藏寶圖」「FF14 天氣」), keep the brand at the end, and stay under ~32 CJK chars.
 */
import type { View } from '../types';

export const SITE_URL = 'https://ff14-tw.xyz';
export const SITE_NAME = '艾歐澤亞助手';

export interface PageSeo {
  view: View;
  /** URL path, always with a leading slash and no trailing slash (home is '/'). */
  path: string;
  title: string;
  description: string;
  /** Short heading used in the prerendered HTML. */
  heading: string;
  /** Date (YYYY-MM-DD) the page's substantive content last changed — used as sitemap lastmod. */
  updated: string;
  /** Sitemap hint: how often the page content changes. */
  changefreq: 'daily' | 'weekly' | 'monthly';
  priority: number;
}

export const PAGES: PageSeo[] = [
  {
    view: 'home', path: '/', updated: '2026-11-05', changefreq: 'daily', priority: 1.0,
    heading: 'FF14 繁中服工具箱',
    title: '艾歐澤亞助手｜FF14 繁中服工具箱',
    description: 'FF14 繁中服玩家的一站式工具箱：艾歐澤亞時間、天氣預報與稀有天氣、每日每週重置倒數、市場板價格查詢、藏寶圖位置、仙人微彩、庫洛天書、陸行鳥染色計算。',
  },
  {
    view: 'checklist', path: '/checklist', updated: '2026-11-05', changefreq: 'monthly', priority: 0.8,
    heading: '每日／每週任務進度',
    title: 'FF14 每日每週任務清單與重置時間｜艾歐澤亞助手',
    description: '追蹤 FF14 每日隨機任務、蠻族、軍團籌備、庫洛天書、老主顧等每日與每週任務，依繁中服重置時間（每日 23:00、每週二 16:00）自動清除。',
  },
  {
    view: 'alarm', path: '/alarm', updated: '2026-11-05', changefreq: 'monthly', priority: 0.6,
    heading: '自訂鬧鐘',
    title: 'FF14 艾歐澤亞時間鬧鐘｜ET 採集提醒｜艾歐澤亞助手',
    description: 'FF14 鬧鐘：一鍵開啟每日與每週重置、理符受理限額、出海垂釣出航、雇員探險與冒險者分隊的倒數提醒，時間一到以瀏覽器通知和提示音通知你，共 9 項內建提醒。',
  },
  {
    view: 'event-calendar', path: '/calendar', updated: '2026-11-05', changefreq: 'daily', priority: 0.7,
    heading: '活動行事曆',
    title: 'FF14 繁中服活動行事曆｜官方活動與團隊排程｜艾歐澤亞助手',
    description: '自動整理 FF14 繁中服官網活動公告裡的官方活動，也能新增 FC 與固定團的團練、聚會行程，在同一份清單查看接下來要做的事，首頁還會預覽最近的活動。',
  },
  {
    view: 'tails', path: '/wondrous-tails', updated: '2026-11-05', changefreq: 'monthly', priority: 0.7,
    heading: '庫洛天書機率計算',
    title: 'FF14 庫洛天書機率計算器｜連線機率與洗牌建議｜艾歐澤亞助手',
    description: '點選天書奇談（庫洛天書）目前貼上的印花位置，精算最後連成 1、2、3 條故事線的機率，附印花隨機落點機率表，並說明奇想點與重新貼印花的判斷方式。',
  },
  {
    view: 'market', path: '/market', updated: '2026-11-05', changefreq: 'daily', priority: 0.8,
    heading: '市場板價格查詢',
    title: 'FF14 市場板價格查詢｜繁中服陸行鳥物價｜艾歐澤亞助手',
    description: '整合 Universalis 即時查詢 FF14 繁中服（陸行鳥資料中心）道具最低價、平均價與成交紀錄，並可建立常用清單一次比較價格。',
  },
  {
    view: 'treasure', path: '/treasure', updated: '2026-11-05', changefreq: 'monthly', priority: 0.9,
    heading: '藏寶圖位置查詢（G8–G18）',
    title: 'FF14 藏寶圖位置查詢 G8–G18｜挖寶座標地圖｜艾歐澤亞助手',
    description: '依藏寶圖等級與地區查詢 FF14 G8 到 G18（巨龍革、瞪羚革、纏尾蛟革、金毗羅鱷革、蛇牛革、銀狼革、獰豹革、巨獸革）的挖寶座標，並標示最近的以太之光。',
  },
  {
    view: 'cactpot', path: '/mini-cactpot', updated: '2026-11-05', changefreq: 'monthly', priority: 0.7,
    heading: '仙人微彩期望值計算',
    title: 'FF14 仙人微彩計算器｜每條線期望值｜艾歐澤亞助手',
    description: '輸入仙人微彩已翻開的數字，算出 8 條線各自的期望金碟幣與最高獎金，附完整獎金表與最佳策略的平均獎金，幫你每天 3 次都選對線。',
  },
  {
    view: 'chocobo', path: '/chocobo-color', updated: '2026-11-05', changefreq: 'monthly', priority: 0.7,
    heading: '陸行鳥染色計算',
    title: 'FF14 陸行鳥染色計算器｜果實數量與餵食順序｜艾歐澤亞助手',
    description: '選擇陸行鳥目前與目標羽色，算出染色所需的果實種類、數量與餵食順序，收錄 85 種顏色可搜尋，並記錄餵食進度，下次開啟仍會保留。',
  },
  {
    view: 'weather', path: '/weather', updated: '2026-11-05', changefreq: 'daily', priority: 0.9,
    heading: '天氣預報',
    title: 'FF14 天氣預報｜全地圖天氣與稀有天氣查詢｜艾歐澤亞助手',
    description: 'FF14 天氣預報：查詢 2.0 到 7.0 共 68 張地圖接下來的天氣，換算成本地時間與倒數，可用天氣篩選尋找稀有天氣，並列出各地圖的天氣出現機率。',
  },
  {
    view: 'interactive-maps', path: '/maps', updated: '2026-11-05', changefreq: 'monthly', priority: 0.6,
    heading: '互動地圖',
    title: 'FF14 互動地圖｜艾歐澤亞地圖查詢｜艾歐澤亞助手',
    description: '艾歐澤亞互動地圖：在網頁上縮放、拖曳中拉諾西亞、黑衣森林、薩納蘭等 17 張地圖，點擊標記查看地點資訊，並說明 FF14 座標的讀法。',
  },
  {
    view: 'sightseeing', path: '/sightseeing', updated: '2026-11-05', changefreq: 'monthly', priority: 0.7,
    heading: '探索筆記',
    title: 'FF14 探索筆記時間與天氣｜現在可完成的景點｜艾歐澤亞助手',
    description: '依目前的艾歐澤亞時間與天氣，列出探索筆記中現在能完成的景點，收錄 340 個景點可依版本篩選與排序，並記錄完成進度，資料只存在你的瀏覽器。',
  },
  {
    view: 'links', path: '/links', updated: '2026-05-27', changefreq: 'monthly', priority: 0.5,
    heading: '好用連結',
    title: 'FF14 好用網站與攻略連結整理｜艾歐澤亞助手',
    description: '整理 FF14 玩家常用的繁中服官方、幻化影片、高難度攻略、劇情、房屋裝潢、資料庫與製作釣魚工具網站，分成 11 類共 44 個連結，方便快速找到資源。',
  },
  {
    view: 'guide', path: '/guide', updated: '2026-05-27', changefreq: 'monthly', priority: 0.5,
    heading: '導覽說明',
    title: '使用說明｜艾歐澤亞助手',
    description: '艾歐澤亞助手導覽：介紹 11 項 FF14 工具的用途與使用技巧，包含任務進度、天氣預報、藏寶圖、市場查詢、仙人微彩與天書奇談，並說明如何備份資料。',
  },
  {
    view: 'changelog', path: '/changelog', updated: '2026-11-01', changefreq: 'monthly', priority: 0.3,
    heading: '更新日誌',
    title: '更新日誌｜艾歐澤亞助手',
    description: '艾歐澤亞助手的版本更新日誌：依版本由新到舊記錄新增的 FF14 工具、功能調整、資料修正與介面改善，並標示每次更新的日期，方便追蹤網站的改版。',
  },
  {
    view: 'privacy', path: '/privacy', updated: '2026-11-04', changefreq: 'monthly', priority: 0.2,
    heading: '隱私權政策',
    title: '隱私權政策｜艾歐澤亞助手',
    description: '艾歐澤亞助手隱私權政策：說明網站不需登入、資料只存在瀏覽器，列出 Google 廣告 Cookie、第三方服務與變更 Cookie 設定的方式。',
  },
];

const BY_VIEW = new Map(PAGES.map(p => [p.view, p]));
const BY_PATH = new Map(PAGES.map(p => [p.path, p]));

export function pageForView(view: View): PageSeo {
  return BY_VIEW.get(view) ?? PAGES[0];
}

/** Resolves a location pathname ("/weather", "/weather/", "/") to a page, or undefined if unknown. */
export function pageForPath(pathname: string): PageSeo | undefined {
  const clean = pathname.replace(/\/+$/, '') || '/';
  return BY_PATH.get(clean);
}

export function canonicalUrl(page: PageSeo): string {
  return page.path === '/' ? `${SITE_URL}/` : `${SITE_URL}${page.path}`;
}
