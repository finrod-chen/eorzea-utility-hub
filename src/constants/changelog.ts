/**
 * Release notes shown on the changelog page and written into its prerendered HTML.
 * Newest version first. The sitemap lastmod of /changelog follows the newest entry's date.
 */
export type ChangeType = "feature" | "improvement";

export interface ChangelogEntry {
  version: string;
  /** YYYY-MM-DD */
  date: string;
  title: string;
  items: { type: ChangeType; text: string }[];
}

export const CHANGELOG: ChangelogEntry[] = [
  {
    version: 'v1.10.0',
    date: '2026-11-01',
    title: '自動重置、資料備份與繁中服 7.25',
    items: [
      { type: 'feature', text: '任務進度會在每日 23:00、軍票/蠻族 04:00、每週二 16:00（GMT+8）重置後自動清除打勾。' },
      { type: 'feature', text: '新增資料匯出/匯入，可把任務、鬧鐘、行事曆、收藏等資料搬到其他瀏覽器。' },
      { type: 'feature', text: '天氣預報每個時段顯示本地時間與開始/結束倒數。' },
      { type: 'feature', text: '市場查詢新增常用清單價格總覽，一次比較收藏道具的最低價與成交量。' },
      { type: 'improvement', text: '首頁版本資訊更新為繁中服 7.25（7.2「探究永久之人」）。' },
      { type: 'improvement', text: '官方活動改由 GitHub Actions 定時擷取，網站直接讀取靜態資料。' },
      { type: 'improvement', text: '修正陸行鳥染色選單會導致頁面錯誤的問題，並拆分各頁程式碼加快首頁載入。' }
    ]
  },
  {
    version: 'v1.9.0',
    date: '2026-03-31',
    title: '互動地圖與市場查詢優化',
    items: [
      { type: 'feature', text: '新增「互動地圖 (Interactive Maps)」功能，整合 FFCafe 肥肥咖啡的艾歐澤亞地圖工具。' },
      { type: 'feature', text: '市場查詢 (Market Board) 整合 Cafekit 懸浮窗，支援滑鼠懸停顯示道具詳細屬性。' },
      { type: 'improvement', text: '優化互動地圖介面，移除冗餘搜尋功能並將資料來源移至底部。' },
      { type: 'improvement', text: '優化側邊選單分類，將地圖相關工具整合至「地圖與天氣」分組。' }
    ]
  },
  {
    version: 'v1.8.0',
    date: '2026-03-24',
    title: '活動行事曆功能上線',
    items: [
      { type: 'feature', text: '新增「活動行事曆 (Event Calendar)」功能，支援 FC/固定團活動排程管理。' },
      { type: 'feature', text: '整合官方活動資訊，自動抓取最新冒險消息並支援外部連結跳轉。' },
      { type: 'feature', text: '實作客戶端快取機制 (TTL 60min)，優化載入速度並降低伺服器負擔。' },
      { type: 'improvement', text: '統一全站活動時間顯示格式為「MM/DD 下午HH:mm」。' },
      { type: 'feature', text: '首頁新增「接下來的活動」預覽區塊，快速查看未來 3 個活動。' }
    ]
  },
  {
    version: 'v1.7.0',
    date: '2026-03-24',
    title: '藏寶搜尋與鬧鐘功能上線',
    items: [
      { type: 'feature', text: '新增「自訂鬧鐘 (Alarm Clock)」功能，支援每日/每週任務提醒與倒數計時。' },
      { type: 'feature', text: '新增「藏寶搜尋 (Treasure Hunt)」功能，支援各類藏寶圖挖掘點查詢。' },
      { type: 'improvement', text: '優化行動裝置導覽體驗，點選側邊連結後自動捲動至頁面頂部。' },
      { type: 'improvement', text: '新增「回到頂部 (Back to Top)」按鈕，方便快速瀏覽長頁面。' }
    ]
  },
  {
    version: 'v1.6.0',
    date: '2026-03-23',
    title: '市場查詢優化與好用連結上線',
    items: [
      { type: 'feature', text: '新增「好用連結 (Useful Links)」頁面，分類彙整官方資訊、攻略、幻化與裝修等優質資源。' },
      { type: 'feature', text: '市場查詢 (Market Board) 新增「最愛清單」功能，可快速收藏並查詢常用道具價格。' },
      { type: 'improvement', text: '市場查詢 (Market Board) 新增專屬圖示，並優化搜尋提示。' },
      { type: 'improvement', text: '導覽輔助頁面移除「存取次數 (Accesses Counter)」，介面更簡潔。' },
      { type: 'improvement', text: '導覽輔助頁面更新市場查詢說明，標註支援中文/英文道具名稱查詢。' }
    ]
  },
  {
    version: 'v1.5.0',
    date: '2026-03-23',
    title: '天氣預報系統全面升級',
    items: [
      { type: 'feature', text: '天氣預報 (Skywatcher) 新增天氣篩選功能，支援依據天氣類型過濾地圖。' },
      { type: 'improvement', text: '全面更新天氣預報數據集，修正部分地圖天氣資料不全的問題。' },
      { type: 'improvement', text: '新增「月塵 (Moon Dust)」與「宇宙磁暴 (Astromagnetic Storm)」等特殊天氣翻譯與圖示。' },
      { type: 'improvement', text: '地圖列表新增「區域 (Region)」顯示，優化大量地圖時的辨識度。' }
    ]
  },
  {
    version: 'v1.4.0',
    date: '2026-03-23',
    title: '進度追蹤與導覽優化',
    items: [
      { type: 'feature', text: '新增「任務進度 (Duty Checklist)」功能，支援每日與每週任務勾選追蹤。' },
      { type: 'improvement', text: '重新調整側邊選單順序，優化常用功能的存取效率。' },
      { type: 'improvement', text: '陸行鳥染色計算機新增 LocalStorage 儲存功能，自動恢復上次的計算結果與餵食進度。' },
      { type: 'improvement', text: '陸行鳥染色計算機新增「上次餵食時間」提醒，方便推算下次變色時間。' }
    ]
  },
  {
    version: 'v1.3.0',
    date: '2026-03-20',
    title: '陸行鳥染色功能與細節優化',
    items: [
      { type: 'feature', text: '新增陸行鳥染色計算機，支援精確 RGB 差值計算與交替餵食順序建議。' },
      { type: 'improvement', text: '陸行鳥染色計算機整合水果圖示，提升視覺辨識度。' },
      { type: 'improvement', text: '更新日誌介面優化，提升版本資訊的可讀性。' }
    ]
  },
  {
    version: 'v1.2.0',
    date: '2026-03-20',
    title: '系統同步與演算法優化',
    items: [
      { type: 'feature', text: '接入正確的艾歐澤亞天氣預報演算法，支援全地圖未來 24 小時預測。' },
      { type: 'feature', text: '實作仙人微彩 (Mini Cactpot) 期望值計算邏輯，並新增視覺化建議路線。' },
      { type: 'feature', text: '側邊欄新增本地時間 (LT) 顯示，方便冒險者對時。' },
      { type: 'feature', text: '探索筆記助手新增自動過濾功能，可即時顯示當前天氣與時間符合的目標。' },
      { type: 'improvement', text: '優化行動裝置導覽體驗，側邊欄互動更流暢。' }
    ]
  },
  {
    version: 'v1.1.0',
    date: '2026-03-15',
    title: '基礎功能上線',
    items: [
      { type: 'feature', text: '新增庫洛天書 (Wondrous Tails) 連線機率預測功能。' },
      { type: 'feature', text: '新增探索筆記 (Sightseeing Log) 基礎清單與進度追蹤。' },
      { type: 'improvement', text: '優化 UI 視覺設計，採用艾歐澤亞風格配色。' }
    ]
  },
  {
    version: 'v1.0.0',
    date: '2026-03-10',
    title: '正式發布',
    items: [
      { type: 'feature', text: '艾歐澤亞生活助手正式發布。' },
      { type: 'feature', text: '支援基礎艾歐澤亞時間 (ET) 顯示。' }
    ]
  }
];
