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
  /** Sitemap hint: how often the page content changes. */
  changefreq: 'daily' | 'weekly' | 'monthly';
  priority: number;
}

export const PAGES: PageSeo[] = [
  {
    view: 'home', path: '/', changefreq: 'daily', priority: 1.0,
    heading: 'FF14 繁中服工具箱',
    title: '艾歐澤亞助手｜FF14 繁中服工具箱',
    description: 'FF14 繁中服玩家的一站式工具箱：艾歐澤亞時間、天氣預報與稀有天氣、每日每週重置倒數、市場板價格查詢、藏寶圖位置、仙人微彩、庫洛天書、陸行鳥染色計算。',
  },
  {
    view: 'checklist', path: '/checklist', changefreq: 'monthly', priority: 0.8,
    heading: '每日／每週任務進度',
    title: 'FF14 每日每週任務清單與重置時間｜艾歐澤亞助手',
    description: '追蹤 FF14 每日隨機任務、蠻族、軍團籌備、庫洛天書、老主顧等每日與每週任務，依繁中服重置時間（每日 23:00、每週二 16:00）自動清除。',
  },
  {
    view: 'alarm', path: '/alarm', changefreq: 'monthly', priority: 0.6,
    heading: '自訂鬧鐘（ET／LT）',
    title: 'FF14 艾歐澤亞時間鬧鐘｜ET 採集提醒｜艾歐澤亞助手',
    description: '設定艾歐澤亞時間（ET）或本地時間鬧鐘，提醒限時採集點、稀有天氣與重置時間，支援瀏覽器通知與音效。',
  },
  {
    view: 'event-calendar', path: '/calendar', changefreq: 'daily', priority: 0.7,
    heading: '活動行事曆',
    title: 'FF14 繁中服活動行事曆｜官方活動與團隊排程｜艾歐澤亞助手',
    description: '自動整理 FF14 繁中服官方活動公告，並可自行加入 FC 或固定團的活動排程，一眼看出接下來的行程。',
  },
  {
    view: 'tails', path: '/wondrous-tails', changefreq: 'monthly', priority: 0.7,
    heading: '庫洛天書機率計算',
    title: 'FF14 庫洛天書機率計算器｜連線機率與洗牌建議｜艾歐澤亞助手',
    description: '點選目前的庫洛天書印花位置，計算一線、二線、三線的完成機率，並建議何時使用奇想點洗牌。',
  },
  {
    view: 'market', path: '/market', changefreq: 'daily', priority: 0.8,
    heading: '市場板價格查詢',
    title: 'FF14 市場板價格查詢｜繁中服陸行鳥物價｜艾歐澤亞助手',
    description: '整合 Universalis 即時查詢 FF14 繁中服（陸行鳥資料中心）道具最低價、平均價與成交紀錄，並可建立常用清單一次比較價格。',
  },
  {
    view: 'treasure', path: '/treasure', changefreq: 'monthly', priority: 0.9,
    heading: '藏寶圖位置查詢（G8–G18）',
    title: 'FF14 藏寶圖位置查詢 G8–G18｜挖寶座標地圖｜艾歐澤亞助手',
    description: '依藏寶圖等級與地區查詢 FF14 G8 到 G18（巨龍革、瞪羚革、纏尾蛟革、金毗羅鱷革、蛇牛革、銀狼革、獰豹革、巨獸革）的挖寶座標，並標示最近的以太之光。',
  },
  {
    view: 'cactpot', path: '/mini-cactpot', changefreq: 'monthly', priority: 0.7,
    heading: '仙人微彩期望值計算',
    title: 'FF14 仙人微彩計算器｜每條線期望值｜艾歐澤亞助手',
    description: '輸入已翻開的數字，計算 FF14 仙人微彩每條線的期望 MGP 與最高回報，選出最划算的路線。',
  },
  {
    view: 'chocobo', path: '/chocobo-color', changefreq: 'monthly', priority: 0.7,
    heading: '陸行鳥染色計算',
    title: 'FF14 陸行鳥染色計算器｜果實數量與餵食順序｜艾歐澤亞助手',
    description: '選擇目前顏色與目標顏色，計算陸行鳥染色需要的果實種類、數量與餵食順序。',
  },
  {
    view: 'weather', path: '/weather', changefreq: 'daily', priority: 0.9,
    heading: '天氣預報',
    title: 'FF14 天氣預報｜全地圖天氣與稀有天氣查詢｜艾歐澤亞助手',
    description: '查詢 FF14 各地區接下來的天氣與對應的本地時間，支援依稀有天氣篩選地圖，並顯示各天氣出現機率。',
  },
  {
    view: 'interactive-maps', path: '/maps', changefreq: 'monthly', priority: 0.6,
    heading: '互動地圖',
    title: 'FF14 互動地圖｜艾歐澤亞地圖查詢｜艾歐澤亞助手',
    description: '在互動地圖上查看艾歐澤亞各區域的地形、傳送點與資源標記。',
  },
  {
    view: 'sightseeing', path: '/sightseeing', changefreq: 'monthly', priority: 0.7,
    heading: '探索筆記',
    title: 'FF14 探索筆記時間與天氣｜現在可完成的景點｜艾歐澤亞助手',
    description: '依目前的艾歐澤亞時間與天氣，列出 FF14 探索筆記中現在就能完成的景點，並可記錄完成進度。',
  },
  {
    view: 'links', path: '/links', changefreq: 'monthly', priority: 0.5,
    heading: '好用連結',
    title: 'FF14 好用網站與攻略連結整理｜艾歐澤亞助手',
    description: '整理 FF14 常用的攻略影片、資料庫與工具網站連結。',
  },
  {
    view: 'guide', path: '/guide', changefreq: 'monthly', priority: 0.5,
    heading: '導覽說明',
    title: '使用說明｜艾歐澤亞助手',
    description: '艾歐澤亞助手各項工具的功能說明、使用技巧與常見問題。',
  },
  {
    view: 'changelog', path: '/changelog', changefreq: 'monthly', priority: 0.3,
    heading: '更新日誌',
    title: '更新日誌｜艾歐澤亞助手',
    description: '艾歐澤亞助手的功能更新、資料修正與維護紀錄，依版本整理。',
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
