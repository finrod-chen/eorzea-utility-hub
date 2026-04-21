import React from 'react';
import { History, CheckCircle2, Star, Zap } from 'lucide-react';
import { motion } from 'motion/react';

const updates = [
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

export default function Changelog() {
  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <div className="flex items-center gap-2">
          <img src="/tools/Changelog.png" alt="" className="w-5 h-5 object-contain" referrerPolicy="no-referrer" />
          <span className="text-xs font-bold uppercase tracking-widest text-amber-500">Changelog</span>
        </div>
        <h1 className="text-3xl font-bold text-white flex items-center gap-3">
          <History className="text-amber-500" size={32} />
          更新日誌
        </h1>
        <p className="text-[#9e9e9e] text-sm max-w-md">追蹤艾歐澤亞生活助手的成長足跡與功能改進。</p>
      </header>

      <div className="space-y-6">
        {updates.map((update, idx) => (
          <motion.div 
            key={update.version}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-[#1a1a1a] rounded-3xl p-8 border border-white/5 relative overflow-hidden group hover:border-amber-500/30 transition-all"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 bg-amber-500 text-black text-[10px] font-bold rounded-full">
                    {update.version}
                  </span>
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <History size={18} className="text-amber-500/50" />
                    {update.title}
                  </h2>
                </div>
                <p className="text-xs text-[#9e9e9e] font-mono">{update.date}</p>
              </div>
            </div>

            <div className="space-y-4">
              {update.items.map((item, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className="mt-1 shrink-0">
                    {item.type === 'feature' ? (
                      <div className="p-1.5 bg-emerald-500/20 rounded-lg">
                        <Zap size={14} className="text-emerald-500" />
                      </div>
                    ) : (
                      <div className="p-1.5 bg-blue-500/20 rounded-lg">
                        <CheckCircle2 size={14} className="text-blue-500" />
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-[#E0E0E0] leading-relaxed pt-0.5">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>

            {idx === 0 && (
              <div className="absolute top-0 right-0 p-4">
                <Star size={24} className="text-amber-500/20 group-hover:text-amber-500/40 transition-colors" />
              </div>
            )}
          </motion.div>
        ))}
      </div>

      <footer className="pt-10 text-center">
        <p className="text-xs text-[#9e9e9e]">
          持續為艾歐澤亞的冒險者提供更好的服務。
        </p>
      </footer>
    </div>
  );
}
