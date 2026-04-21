import React from 'react';
import { motion } from 'motion/react';
import { 
  CheckSquare, 
  CloudSun, 
  Grid3X3, 
  BookOpen, 
  Bird, 
  Clock, 
  HelpCircle,
  Info,
  ExternalLink,
  ShoppingCart,
  Map as MapIcon,
  Bell,
  Calendar,
  Layers
} from 'lucide-react';

const guideItems = [
  {
    id: 'alarm',
    label: '自訂鬧鐘 (Alarm Clock)',
    icon: Bell,
    image: '/tools/SetAlarm.png',
    color: 'text-amber-500',
    bg: 'bg-amber-500/10',
    desc: '設定各類遊戲內提醒，確保不錯過任何冒險節奏。當計時到達時，將透過瀏覽器發送通知。',
    tips: [
      '支援每日、每週重設任務提醒。',
      '支援倒數計時功能，適用於雇員委託或小隊訓練。',
      '鬧鐘設定會自動儲存，重新整理頁面也不會遺失。'
    ]
  },
  {
    id: 'event-calendar',
    label: '活動行事曆 (Event Calendar)',
    icon: Calendar,
    image: '/tools/EventCalendar.png',
    color: 'text-rose-500',
    bg: 'bg-rose-500/10',
    desc: '管理 FC 或固定團的活動排程，並同步整合官方活動資訊。您可以新增、編輯或刪除個人行程，並在首頁快速查看接下來的行程。',
    tips: [
      '官方活動標記為藍色「OFFICIAL」，並提供外部連結圖示。',
      '實作快取機制，每 60 分鐘重新抓取一次官方資料。',
      '在首頁會顯示接下來的 3 個活動。',
      '資料會儲存在瀏覽器中，不會遺失。'
    ]
  },
  {
    id: 'checklist',
    label: '任務進度 (Duty Checklist)',
    icon: CheckSquare,
    image: '/tools/DutyChecklist.png',
    color: 'text-emerald-500',
    bg: 'bg-emerald-500/10',
    desc: '追蹤每日與每週任務。點擊任務即可標記完成，系統會自動記錄完成時間。',
    tips: [
      '每日任務於台灣時間 23:00 重置。',
      '每週任務於每週二 16:00 重置。',
      '完成所有任務後，頂部會顯示最終達成時間。'
    ]
  },
  {
    id: 'treasure',
    label: '藏寶搜尋 (Treasure Hunt)',
    icon: MapIcon,
    image: '/tools/TreasureHunt.png',
    color: 'text-amber-500',
    bg: 'bg-amber-500/10',
    desc: '查詢各類藏寶圖的挖掘點與獎勵資訊。',
    tips: [
      '選擇對應的藏寶圖等級。',
      '地圖會標示出該等級藏寶圖的可能挖掘點。',
      '點擊地圖即可查看詳細座標。'
    ]
  },
  {
    id: 'market',
    label: '市場查詢 (Market Board)',
    icon: ShoppingCart,
    image: '/tools/MarketBoard.png',
    color: 'text-rose-500',
    bg: 'bg-rose-500/10',
    desc: '整合 Universalis API，即時查詢各伺服器道具售價與交易紀錄。支援跨伺服器價格對比。',
    tips: [
      '搜尋功能支援「中文/英文」道具名稱查詢。',
      '滑鼠懸停在道具名稱上可顯示 Cafekit 懸浮窗，查看詳細屬性。',
      '可以選擇特定伺服器或整個大區 (Data Center) 進行查詢。',
      '數據更新頻率取決於玩家上傳至 Universalis 的情況。'
    ]
  },
  {
    id: 'weather',
    label: '天氣預報 (Skywatcher)',
    icon: CloudSun,
    image: '/tools/Skywatcher.png',
    color: 'text-[#00B0FF]',
    bg: 'bg-[#00B0FF]/10',
    desc: '查詢艾歐澤亞各地的天氣變換。支援稀有天氣篩選，是狩獵與探索筆記的好幫手。',
    tips: [
      '天氣每 8 小時（艾歐澤亞時間）變換一次。',
      '變換點分別為 ET 0:00, 8:00, 16:00。',
      '可以使用篩選功能快速找出「雨天」或「雷雨」等特定天氣。'
    ]
  },
  {
    id: 'interactive-maps',
    label: '互動地圖 (Interactive Maps)',
    icon: MapIcon,
    image: '/tools/InteractiveMaps.png',
    color: 'text-blue-500',
    bg: 'bg-blue-500/10',
    desc: '探索艾歐澤亞的地理資訊，查看各區域的資源與標記。整合 FFCafe 肥肥咖啡的互動地圖工具。',
    tips: [
      '支援縮放與拖拽，點擊標記可查看詳細資訊。',
      '資料來源由 FFCafe 肥肥咖啡提供。'
    ]
  },
  {
    id: 'cactpot',
    label: '仙人微彩 (Mini Cactpot)',
    icon: Grid3X3,
    image: '/tools/MiniCactpot.png',
    color: 'text-amber-500',
    bg: 'bg-amber-500/10',
    desc: '金碟遊樂場的刮刮樂輔助工具。輸入已知的數字，系統會計算每一條線的期望值。',
    tips: [
      '優先選擇期望值最高的路線。',
      '通常 1-2-3 (6) 或 7-8-9 (24) 是最高獎勵的組合。',
      '點擊格子即可輸入數字。'
    ]
  },
  {
    id: 'tails',
    label: '庫洛天書 (Wondrous Tails)',
    icon: BookOpen,
    image: '/tools/WondrousTails.png',
    color: 'text-blue-500',
    bg: 'bg-blue-500/10',
    desc: '模擬庫洛天書的貼紙連線機率。幫助你判斷是否該使用「重洗」點數。',
    tips: [
      '輸入當前貼紙位置，查看 1/2/3 連線的機率。',
      '在 7 張貼紙時使用重洗通常是最佳策略。',
      '視覺化顯示所有可能的連線路徑。'
    ]
  },
  {
    id: 'chocobo',
    label: '陸行鳥染色 (Chocobo Color)',
    icon: Bird,
    image: '/tools/ChocoboColor.png',
    color: 'text-amber-600',
    bg: 'bg-amber-600/10',
    desc: '計算陸行鳥從當前顏色變更為目標顏色所需的水果數量。',
    tips: [
      '選擇當前顏色與目標顏色。',
      '系統會計算出最精確的餵食清單。',
      '請依照清單順序交叉餵食，以獲得最佳效果。'
    ]
  },
  {
    id: 'sightseeing',
    label: '探索筆記 (Sightseeing Log)',
    icon: Clock,
    image: '/tools/SightseeingLog.png',
    color: 'text-blue-600',
    bg: 'bg-blue-600/10',
    desc: '整合時間與天氣條件，提示當前哪些探索筆記目標可以完成。',
    tips: [
      '列表會根據當前 ET 時間自動排序。',
      '標註了每個目標所需的特定表情動作。',
      '結合天氣預報功能，提前規劃行程。'
    ]
  },
  {
    id: 'links',
    label: '好用連結 (Useful Links)',
    icon: ExternalLink,
    image: '/tools/UsefulLinks.png',
    color: 'text-slate-500',
    bg: 'bg-slate-500/10',
    desc: '整理各類實用的影片與文字站點，包含官方資訊、攻略、幻化與裝修等優質網站。',
    tips: [
      '分類整理了影片與文字資源，方便快速查找。',
      '包含繁中官方、高難攻略、幻化搭配與房屋裝修等類別。',
      '點擊連結會在新分頁開啟。'
    ]
  }
];

interface NavigationGuideProps {
  onViewChange?: (view: any) => void;
}

export default function NavigationGuide({ onViewChange }: NavigationGuideProps) {
  const handleViewChange = (view: any) => {
    onViewChange?.(view);
    const main = document.getElementById('main-content');
    if (main) main.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-10">
      <header className="space-y-4">
        <div className="flex items-center gap-3">
          <img src="/tools/NavigationGuide.png" alt="" className="w-5 h-5 object-contain" referrerPolicy="no-referrer" />
          <span className="text-sm font-bold uppercase tracking-[0.3em] text-[#D39E47]">Guide</span>
        </div>
        <h1 className="text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
          導覽輔助 <span className="text-[#D39E47]">使用指南</span>
        </h1>
        <p className="text-[#9e9e9e] max-w-2xl leading-relaxed">
          歡迎使用艾歐澤亞助手。本工具旨在協助冒險者更輕鬆地處理日常事務。
          下方詳細介紹了各項工具的功能與使用小技巧。
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {guideItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-[#1a1a1a] border border-white/5 rounded-3xl p-8 hover:border-white/10 transition-all group"
          >
            <div className="flex items-start justify-between mb-6">
              <button 
                onClick={() => handleViewChange(item.id)}
                className={`w-14 h-14 ${item.bg} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform p-3 cursor-pointer`}
              >
                <img src={item.image} alt="" className="w-full h-full object-contain" referrerPolicy="no-referrer" />
              </button>
              <div className="flex gap-2">
                <div className="px-3 py-1 bg-white/5 rounded-full text-[10px] font-bold text-[#D39E47] uppercase tracking-widest">
                  Tool Guide
                </div>
              </div>
            </div>

            <button 
              onClick={() => handleViewChange(item.id)}
              className="text-left group/title"
            >
              <h3 className="text-xl font-bold text-white mb-3 group-hover/title:text-[#D39E47] transition-colors">{item.label}</h3>
            </button>
            <p className="text-sm text-[#9e9e9e] leading-relaxed mb-4">
              {item.desc}
            </p>
            <div className="flex items-center gap-1.5 text-[10px] text-[#D39E47] font-bold uppercase tracking-wider mb-6 opacity-50 group-hover:opacity-100 transition-opacity">
              <ExternalLink size={10} />
              點擊工具名稱或圖示可連結至該工具
            </div>

            <div className="space-y-3 pt-6 border-t border-white/5">
              <div className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-wider">
                <Info size={14} className="text-[#D39E47]" />
                使用小技巧
              </div>
              <ul className="space-y-2">
                {item.tips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-[#9e9e9e] leading-relaxed">
                    <span className={`w-1.5 h-1.5 rounded-full ${item.color.replace('text-', 'bg-')} mt-1.5 shrink-0`} />
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>

    </div>
  );
}
