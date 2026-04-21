/**
 * Central tool registry — single source of truth for all nav tools.
 * Icons are resolved in App.tsx via lucide-react imports.
 * If you add/remove/rename a tool, update this file AND the constants/tasks.ts.
 */

import { CheckSquare, Bell, Calendar, BookOpen, ShoppingCart, Map as MapIcon, Grid3X3, Bird, CloudSun, Clock, Settings, HelpCircle, History, Volume2 } from 'lucide-react';
import { View } from '../types';

export interface NavTool {
  id: View;
  label: string;
  icon: React.ComponentType<{ size: number; className?: string }>;
  image: string;
  desc: string;
  color: string;
}

export interface NavGroup {
  label: string;
  items: NavTool[];
}

export const NAV_GROUPS: NavGroup[] = [
  {
    label: '日常任務',
    items: [
      { id: 'home',           label: '總覽',         icon: CheckSquare, image: '/tools/Dashboard.png',       desc: '快速掌握每日與每週任務進度。',                        color: 'bg-indigo-500' },
      { id: 'checklist',      label: '任務進度',      icon: CheckSquare, image: '/tools/DutyChecklist.png',  desc: '追蹤每日與每週任務，確保不遺漏任何獎勵。',            color: 'bg-indigo-500' },
      { id: 'alarm',          label: '自訂鬧鐘',      icon: Bell,        image: '/tools/SetAlarm.png',        desc: '設定各類遊戲內提醒，確保不錯過任何冒險節奏。',          color: 'bg-amber-500' },
      { id: 'event-calendar', label: '活動行事曆',    icon: Calendar,   image: '/tools/EventCalendar.png',    desc: '管理 FC 或固定團的活動排程，快速查看接下來的行程。',      color: 'bg-rose-500' },
    ],
  },
  {
    label: '實用工具',
    items: [
      { id: 'tails',      label: '庫洛天書',    icon: BookOpen,    image: '/tools/WondrousTails.png',  desc: '連線機率預測，視覺化模擬成功機率。',                        color: 'bg-blue-500' },
      { id: 'market',     label: '市場查詢',    icon: ShoppingCart,image: '/tools/MarketBoard.png',    desc: '整合 Universalis API，即時查詢道具售價與交易紀錄。',       color: 'bg-rose-500' },
      { id: 'treasure',   label: '藏寶搜尋',    icon: MapIcon,     image: '/tools/TreasureHunt.png',   desc: '對照藏寶圖碎片，快速定位寶藏位置。',                        color: 'bg-amber-500' },
      { id: 'cactpot',    label: '仙人微彩',    icon: Grid3X3,     image: '/tools/MiniCactpot.png',    desc: '期望值計算器，協助選擇最高回報路線。',                      color: 'bg-amber-500' },
      { id: 'chocobo',    label: '陸行鳥染色',  icon: Bird,        image: '/tools/ChocoboColor.png',   desc: '精確計算所需水果數量與餵食順序。',                          color: 'bg-amber-600' },
    ],
  },
  {
    label: '地圖與天氣',
    items: [
      { id: 'weather',          label: '天氣預報',    icon: CloudSun,  image: '/tools/Skywatcher.png',       desc: '全地圖天氣查詢，支援稀有天氣篩選級。',   color: 'bg-emerald-500' },
      { id: 'interactive-maps', label: '互動地圖',    icon: MapIcon,   image: '/tools/InteractiveMaps.png',  desc: '探索艾歐澤亞的地理資訊，查看各區域的資源與標記。', color: 'bg-blue-500' },
      { id: 'sightseeing',       label: '探索筆記',    icon: Clock,     image: '/tools/SightseeingLog.png',  desc: '整合時間與天氣，提示當前可完成目標。',   color: 'bg-blue-600' },
    ],
  },
  {
    label: '其他資源',
    items: [
      { id: 'links',     label: '好用連結',   icon: Settings,   image: '/tools/UsefulLinks.png',    desc: '整理各類實用的影片與文字站點，快速找到資源。', color: 'bg-slate-600' },
      { id: 'guide',     label: '導覽輔助',   icon: HelpCircle, image: '/tools/NavigationGuide.png',desc: '遊戲機制與系統說明，協助新手快速上手。',   color: 'bg-slate-600' },
      { id: 'changelog', label: '更新日誌',   icon: History,    image: '/tools/Changelog.png',      desc: '記錄網站功能更新與維護歷程。',              color: 'bg-slate-600' },
    ],
  },
];
