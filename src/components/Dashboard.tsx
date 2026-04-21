import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Grid3X3, BookOpen, CloudSun, Clock, ArrowRight, Bird, CheckSquare, ShoppingCart, Settings, Map as MapIcon, Bell, Calendar, ExternalLink } from 'lucide-react';
import { CalendarEvent } from './EventCalendar';
import ResetCountdown from './ResetCountdown';
import { INITIAL_TASKS } from '../constants/tasks';

import { fetchOfficialEvents, OfficialEvent } from '../services/eventService';

interface DashboardProps {
  et: { hours: number; minutes: number };
  onViewChange: (view: any) => void;
  events: CalendarEvent[];
}

export default function Dashboard({ et, onViewChange, events }: DashboardProps) {
  const [progress, setProgress] = useState({
    daily: { done: 0, total: 0 },
    weekly: { done: 0, total: 0 }
  });
  const [officialEvents, setOfficialEvents] = useState<OfficialEvent[]>([]);

  const upcomingEvents = events
    .filter(e => new Date(e.date) > new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 3);

  const formatEventDate = (dateStr?: string) => {
    if (!dateStr) return null;
    try {
      const date = new Date(dateStr);
      return date.toLocaleString('zh-TW', {
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      }).replace(/\//g, '/');
    } catch (e) {
      return dateStr;
    }
  };

  useEffect(() => {
    // Fetch official events from service (with cache)
    const loadEvents = async () => {
      const data = await fetchOfficialEvents();
      setOfficialEvents(data);
    };

    loadEvents();

    const saved = localStorage.getItem('ff14-duty-checklist-v2');
    if (saved) {
      try {
        const completed = JSON.parse(saved);
        const getProgress = (category: 'daily' | 'weekly') => {
          const tasks = INITIAL_TASKS.filter(t => t.category === category);
          const done = tasks.filter(t => !!completed[t.id]).length;
          return { done, total: tasks.length };
        };
        setProgress({
          daily: getProgress('daily'),
          weekly: getProgress('weekly')
        });
      } catch (e) {}
    } else {
      setProgress({
        daily: { done: 0, total: INITIAL_TASKS.filter(t => t.category === 'daily').length },
        weekly: { done: 0, total: INITIAL_TASKS.filter(t => t.category === 'weekly').length }
      });
    }
  }, []);

  const handleViewChange = (view: any) => {
    onViewChange(view);
    const main = document.getElementById('main-content');
    if (main) main.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const tools = [
    { id: 'checklist', label: '任務進度', icon: CheckSquare, image: '/tools/DutyChecklist.png', desc: '追蹤每日與每週任務，確保不遺漏任何獎勵。', color: 'bg-indigo-500' },
    { id: 'alarm', label: '自訂鬧鐘', icon: Bell, image: '/tools/SetAlarm.png', desc: '設定各類遊戲內提醒，確保不錯過任何冒險節奏。', color: 'bg-amber-500' },
    { id: 'market', label: '市場查詢', icon: ShoppingCart, image: '/tools/MarketBoard.png', desc: '整合 Universalis API，即時查詢道具售價與交易紀錄。', color: 'bg-rose-500' },
    { id: 'weather', label: '天氣預報', icon: CloudSun, image: '/tools/Skywatcher.png', desc: '全地圖天氣查詢，支援稀有天氣篩選級。', color: 'bg-emerald-500' },
    { id: 'interactive-maps', label: '互動地圖', icon: MapIcon, image: '/tools/InteractiveMaps.png', desc: '探索艾歐澤亞的地理資訊，查看各區域的資源與標記。', color: 'bg-blue-500' },
    { id: 'treasure', label: '藏寶搜尋', icon: MapIcon, image: '/tools/TreasureHunt.png', desc: '對照藏寶圖碎片，快速定位寶藏位置。', color: 'bg-amber-500' },
    { id: 'cactpot', label: '仙人微彩', icon: Grid3X3, image: '/tools/MiniCactpot.png', desc: '期望值計算器，協助選擇最高回報路線。', color: 'bg-amber-500' },
    { id: 'event-calendar', label: '活動行事曆', icon: Calendar, image: '/tools/EventCalendar.png', desc: '管理 FC 或固定團的活動排程，快速查看接下來的行程。', color: 'bg-rose-500' },
    { id: 'tails', label: '庫洛天書', icon: BookOpen, image: '/tools/WondrousTails.png', desc: '連線機率預測，視覺化模擬成功機率。', color: 'bg-blue-500' },
    { id: 'chocobo', label: '陸行鳥染色', icon: Bird, image: '/tools/ChocoboColor.png', desc: '精確計算所需水果數量與餵食順序。', color: 'bg-amber-600' },
    { id: 'sightseeing', label: '探索筆記', icon: Clock, image: '/tools/SightseeingLog.png', desc: '整合時間與天氣，提示當前可完成目標。', color: 'bg-blue-600' },
    { id: 'links', label: '好用連結', icon: Settings, image: '/tools/UsefulLinks.png', desc: '整理各類實用的影片與文字站點，快速找到資源。', color: 'bg-slate-600' },
  ];

  const getNextWeatherChange = () => {
    const currentTotalMinutes = et.hours * 60 + et.minutes;
    const changePoints = [0, 480, 960, 1440]; // 0:00, 8:00, 16:00, 24:00
    const nextPoint = changePoints.find(p => p > currentTotalMinutes) || 1440;
    const diffMinutes = nextPoint - currentTotalMinutes;
    
    // 1 ET minute = 175/60 seconds = 2.916 seconds
    const realSeconds = Math.floor(diffMinutes * (175 / 60));
    const realMinutes = Math.floor(realSeconds / 60);
    const remainingSeconds = realSeconds % 60;
    
    return `${realMinutes} 分 ${remainingSeconds} 秒`;
  };

  return (
    <div className="space-y-10">
      <header className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="h-1 w-12 bg-[#D39E47] rounded-full" />
          <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-[#D39E47]">Dashboard</h2>
        </div>
        <h1 className="text-4xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
          歡迎來到 <span className="text-[#D39E47]">艾歐澤亞</span><br />
          冒險者的生活助手
        </h1>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ET Card */}
        <div className="bg-[#1a1a1a] border border-white/5 rounded-3xl p-8 flex flex-col justify-between group hover:border-[#D39E47]/30 transition-colors">
          <div className="space-y-2">
            <p className="text-xs font-bold text-[#9e9e9e] uppercase tracking-widest">Current Eorzea Time</p>
            <div className="text-7xl font-mono font-medium text-white tracking-tighter">
              {String(et.hours).padStart(2, '0')}:{String(et.minutes).padStart(2, '0')}
            </div>
          </div>
          <div className="mt-8 flex items-center gap-4">
            <div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-[#D39E47]"
                initial={{ width: 0 }}
                animate={{ width: `${((et.hours * 60 + et.minutes) / 1440) * 100}%` }}
              />
            </div>
            <span className="text-xs font-mono text-[#9e9e9e]">
              {Math.floor(((et.hours * 60 + et.minutes) / 1440) * 100)}% Day
            </span>
          </div>
        </div>

        {/* Weather Preview */}
        <div className="bg-[#1a1a1a] border border-white/5 rounded-3xl p-8 flex flex-col justify-between hover:border-[#00B0FF]/30 transition-colors">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <p className="text-xs font-bold text-[#9e9e9e] uppercase tracking-widest">Next Weather Change</p>
              <h3 className="text-2xl font-bold text-white">下一段天氣變換</h3>
            </div>
            <div className="p-3 bg-[#00B0FF]/10 rounded-2xl">
              <CloudSun className="text-[#00B0FF]" size={24} />
            </div>
          </div>
          <div className="mt-8 space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-[#9e9e9e]">倒數計時</span>
              <span className="text-white font-mono">{getNextWeatherChange()}</span>
            </div>
            <button 
              onClick={() => handleViewChange('weather')}
              className="w-full py-3 bg-white/5 hover:bg-white/10 rounded-xl text-sm font-medium transition-colors flex items-center justify-center gap-2 group"
            >
              查看詳細預報
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Reset Countdowns */}
      <ResetCountdown dailyProgress={progress.daily} weeklyProgress={progress.weekly} />

      {/* Upcoming Events Section */}
      <div className="bg-[#1a1a1a] border border-white/5 rounded-3xl p-8 space-y-8">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold uppercase tracking-widest text-[#D39E47]">接下來的活動</h3>
          <button 
            onClick={() => handleViewChange('event-calendar')}
            className="text-xs text-[#9e9e9e] hover:text-white transition-colors flex items-center gap-1"
          >
            查看完整行事曆 <ArrowRight size={12} />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Official Events */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-[#00B0FF]">
              <Bird size={16} />
              <h4 className="text-xs font-bold uppercase tracking-wider">官方活動</h4>
            </div>
            <div className="space-y-3">
              {officialEvents.length > 0 ? (
                officialEvents.map(event => (
                  <a 
                    key={event.eventid}
                    href={event.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-4 bg-black/20 rounded-2xl border border-white/5 hover:border-[#00B0FF]/30 transition-all group"
                  >
                    <div className="flex justify-between items-start gap-4">
                      <h5 className="font-bold text-white group-hover:text-[#00B0FF] transition-colors">{event.title}</h5>
                      <ExternalLink size={14} className="text-[#9e9e9e] shrink-0" />
                    </div>
                    {event.date && <p className="text-[10px] font-mono text-[#9e9e9e] mt-2">{formatEventDate(event.date)}</p>}
                  </a>
                ))
              ) : (
                <p className="text-sm text-[#9e9e9e] italic py-4">目前沒有官方活動資訊</p>
              )}
            </div>
          </div>

          {/* Personal Events */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-[#D39E47]">
              <Calendar size={16} />
              <h4 className="text-xs font-bold uppercase tracking-wider">個人行程</h4>
            </div>
            <div className="space-y-3">
              {upcomingEvents.length > 0 ? (
                upcomingEvents.map(event => (
                  <div key={event.id} className="p-4 bg-black/20 rounded-2xl border border-white/5">
                    <h5 className="font-bold text-white mb-1">{event.title}</h5>
                    <div className="flex items-center gap-2 text-[10px] font-mono text-[#9e9e9e] mb-2">
                      <Clock size={10} />
                      {formatEventDate(event.date)}
                    </div>
                    {event.desc && <p className="text-[10px] text-[#E0E0E0] line-clamp-1">{event.desc}</p>}
                  </div>
                ))
              ) : (
                <div className="h-full flex flex-col items-center justify-center py-8 text-center space-y-2 bg-black/10 rounded-2xl border border-dashed border-white/5">
                  <Calendar size={24} className="text-white/10" />
                  <p className="text-sm text-[#9e9e9e]">目前沒有活動安排</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tools.map((tool) => (
          <button
            key={tool.id}
            onClick={() => handleViewChange(tool.id)}
            className="bg-[#1a1a1a] border border-white/5 rounded-2xl p-6 text-left hover:bg-[#222] hover:border-white/10 transition-all group"
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`w-12 h-12 ${tool.color} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform overflow-hidden p-2`}>
                {tool.image ? (
                  <img src={tool.image} alt="" className="w-full h-full object-contain" referrerPolicy="no-referrer" />
                ) : (
                  <tool.icon size={24} className="text-white" />
                )}
              </div>
            </div>
            <h4 className="font-bold text-white mb-2">{tool.label}</h4>
            <p className="text-xs text-[#9e9e9e] leading-relaxed">{tool.desc}</p>
          </button>
        ))}
      </div>

      {/* Current Version Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="h-1 w-8 bg-[#D39E47] rounded-full" />
          <h3 className="text-sm font-bold uppercase tracking-widest text-[#D39E47]">繁中服目前版本：Patch 7.05</h3>
        </div>
        <a 
          href="https://www.ffxiv.com.tw/web/news/news_list.aspx?category=2" 
          target="_blank" 
          rel="noopener noreferrer"
          className="block group relative overflow-hidden rounded-3xl border border-white/5 hover:border-[#D39E47]/30 transition-all"
        >
          <img 
            src="/patch/7-1.jpg" 
            alt="繁中服目前版本" 
            className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
            <span className="text-white text-sm font-medium flex items-center gap-2">
              2026/04/21 正式更新Patch 7.1！ <ArrowRight size={16} />
            </span>
          </div>
        </a>
      </div>

      {/* Copyright Footer */}
      <footer className="pt-10 pb-6 border-t border-white/5">
        <div className="space-y-4">
          <h5 className="text-xs font-bold text-[#D39E47] uppercase tracking-widest mb-2">版權與使用聲明</h5>
          <p className="text-[11px] text-[#9e9e9e] leading-relaxed max-w-4xl">
            Final Fantasy XIV 遊戲由 SQUARE ENIX 製作。繁體中文版由宇峻奧汀與智寶國際聯合代理營運。<br />
            本網站為非官方粉絲向作品，不放置廣告、不設置任何盈利手段。所涉及的公司名稱、商標、產品等均為其各自所有者的資產，僅供玩家識別所用。<br />
            網站內使用的遊戲圖片（截圖、圖示等）版權為 SQUARE ENIX 所有。相關圖示來自 FFXIV Fan Kit，遵循官方使用條款與規範。所有遊戲相關圖片僅用於學習、研究和非商業用途，如有侵權請聯繫我們立即移除。<br />
            記載されている会社名・製品名・システム名などは、各社の商標、または登録商標です。<br />
            Copyright (C) 2010 - 2025 SQUARE ENIX CO., LTD. All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
