/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Home, 
  CloudSun, 
  Grid3X3, 
  BookOpen, 
  Settings, 
  MessageSquare, 
  Clock,
  ChevronRight,
  Menu,
  X,
  History,
  Bird,
  CheckSquare,
  HelpCircle,
  ShoppingCart,
  Map as MapIcon,
  Bell,
  Calendar,
  Volume2
} from 'lucide-react';
import { Toaster, toast } from 'sonner';
import { getEorzeaTime } from './utils/ff14';

// Components
import MiniCactpot from './components/MiniCactpot';
import WondrousTails from './components/WondrousTails';
import Skywatcher from './components/Skywatcher';
import SightseeingLog from './components/SightseeingLog';
import Dashboard from './components/Dashboard';
import Changelog from './components/Changelog';
import ChocoboColor from './components/ChocoboColor';
import DutyChecklist from './components/DutyChecklist';
import NavigationGuide from './components/NavigationGuide';
import MarketBoard from './components/MarketBoard';
import UsefulLinks from './components/UsefulLinks';
import TreasureHunt from './components/TreasureHunt';
import EventCalendar, { CalendarEvent } from './components/EventCalendar';
import SetAlarm from './components/SetAlarm';
import InteractiveMaps from './components/InteractiveMaps';

import { Alarm, EorzeaTime } from './types';

type View = 'home' | 'cactpot' | 'tails' | 'weather' | 'sightseeing' | 'changelog' | 'chocobo' | 'checklist' | 'guide' | 'market' | 'links' | 'treasure' | 'alarm' | 'event-calendar' | 'interactive-maps';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('home');
  const [events, setEvents] = useState<CalendarEvent[]>(() => {
    const saved = localStorage.getItem('ff14-events');
    return saved ? JSON.parse(saved) : [];
  });

  const [alarms, setAlarms] = useState<Alarm[]>(() => {
    const saved = localStorage.getItem('ff14-alarms');
    if (saved) {
      try {
        return JSON.parse(saved).map((a: any) => ({ ...a, targetTime: new Date(a.targetTime) }));
      } catch (e) { return []; }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('ff14-events', JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    localStorage.setItem('ff14-alarms', JSON.stringify(alarms));
  }, [alarms]);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [now, setNow] = useState(new Date());
  const [et, setEt] = useState<EorzeaTime>(getEorzeaTime());
  const [localTime, setLocalTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      const currentTime = new Date();
      setNow(currentTime);
      setEt(getEorzeaTime());
      setLocalTime(currentTime);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    let changed = false;
    const nextAlarms = alarms.map(alarm => {
      if (alarm.active && now >= alarm.targetTime) {
        // Trigger notification
        if (typeof Notification !== 'undefined' && Notification.permission === 'granted') {
          new Notification('艾歐澤亞助手 - 鬧鐘提醒', {
            body: `${alarm.label} 時間到了！`,
            icon: '/logo.png',
            tag: alarm.id
          });
        }

        // Trigger in-app toast
        toast.success(`${alarm.label} 時間到了！`, {
          description: `設定時間：${alarm.targetTime.toLocaleTimeString()}`,
          duration: 10000,
          icon: <Bell className="text-amber-500" size={18} />
        });

        // Play sound
        try {
          const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
          audio.volume = 0.5;
          audio.play().catch(e => console.log('Audio play blocked:', e));
        } catch (e) {}

        changed = true;
        return { ...alarm, active: false };
      }
      return alarm;
    });

    if (changed) {
      setAlarms(nextAlarms);
    }
  }, [now, alarms]);

  useEffect(() => {
    if (typeof Notification !== 'undefined' && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  // Stagger children 50ms per nav item when group opens
  const navItemVariants = {
    hidden: { opacity: 0, x: -8 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.05, duration: 0.2, ease: [0.22, 1, 0.36, 1] }
    }),
  };
  const navContainerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.05 } },
  };

  const [openGroups, setOpenGroups] = useState<string[]>([]);

  const toggleGroup = (label: string) => {
    setOpenGroups(prev =>
      prev.includes(label) ? prev.filter(g => g !== label) : [...prev, label]
    );
  };

  const navGroups = [
    {
      label: '日常任務',
      items: [
        { id: 'home', label: '總覽', icon: Home, image: '/tools/Dashboard.png' },
        { id: 'checklist', label: '任務進度', icon: CheckSquare, image: '/tools/DutyChecklist.png' },
        { id: 'alarm', label: '自訂鬧鐘', icon: Bell, image: '/tools/SetAlarm.png' },
        { id: 'event-calendar', label: '活動行事曆', icon: Calendar, image: '/tools/EventCalendar.png' },
      ]
    },
    {
      label: '實用工具',
      items: [
        { id: 'tails', label: '庫洛天書', icon: BookOpen, image: '/tools/WondrousTails.png' },
        { id: 'market', label: '市場查詢', icon: ShoppingCart, image: '/tools/MarketBoard.png' },
        { id: 'treasure', label: '藏寶搜尋', icon: MapIcon, image: '/tools/TreasureHunt.png' },
        { id: 'cactpot', label: '仙人微彩', icon: Grid3X3, image: '/tools/MiniCactpot.png' },
        { id: 'chocobo', label: '陸行鳥染色', icon: Bird, image: '/tools/ChocoboColor.png' },
      ]
    },
    {
      label: '地圖與天氣',
      items: [
        { id: 'weather', label: '天氣預報', icon: CloudSun, image: '/tools/Skywatcher.png' },
        { id: 'interactive-maps', label: '互動地圖', icon: MapIcon, image: '/tools/InteractiveMaps.png' },
        { id: 'sightseeing', label: '探索筆記', icon: Clock, image: '/tools/SightseeingLog.png' },
      ]
    },
    {
      label: '其他資源',
      items: [
        { id: 'links', label: '好用連結', icon: Settings, image: '/tools/UsefulLinks.png' },
        { id: 'guide', label: '導覽輔助', icon: HelpCircle, image: '/tools/NavigationGuide.png' },
        { id: 'changelog', label: '更新日誌', icon: History, image: '/tools/Changelog.png' },
      ]
    }
  ];

  const renderView = () => {
    switch (currentView) {
      case 'home': return <Dashboard et={et} onViewChange={setCurrentView} events={events} />;
      case 'checklist': return <DutyChecklist />;
      case 'market': return <MarketBoard />;
      case 'alarm': return <SetAlarm alarms={alarms} setAlarms={setAlarms} now={now} />;
      case 'event-calendar': return <EventCalendar events={events} setEvents={setEvents} />;
      case 'cactpot': return <MiniCactpot />;
      case 'tails': return <WondrousTails />;
      case 'weather': return <Skywatcher et={et} />;
      case 'interactive-maps': return <InteractiveMaps />;
      case 'treasure': return <TreasureHunt />;
      case 'chocobo': return <ChocoboColor />;
      case 'sightseeing': return <SightseeingLog et={et} />;
      case 'links': return <UsefulLinks />;
      case 'changelog': return <Changelog />;
      case 'guide': return <NavigationGuide onViewChange={setCurrentView} />;
      default: return <Dashboard et={et} onViewChange={setCurrentView} events={events} />;
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] font-sans selection:bg-[var(--color-accent)]">
      <Toaster position="top-right" theme="dark" richColors closeButton />
      {/* Mobile Header */}
      <header className="lg:hidden flex items-center justify-between p-4 border-b border-[var(--color-border)] bg-[var(--color-surface)]">
        <button 
          onClick={() => setCurrentView('home')}
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <img src="/logo.png" alt="Logo" className="w-8 h-8 rounded-lg" referrerPolicy="no-referrer" />
          <h1 className="font-bold text-lg tracking-tight text-white">艾歐澤亞助手</h1>
        </button>
        <button 
          onClick={() => setIsSidebarOpen(true)}
          className="p-2 hover:bg-[var(--color-border)] rounded-lg transition-colors"
        >
          <Menu size={24} />
        </button>
      </header>

      <div className="flex h-[calc(100vh-64px)] lg:h-screen overflow-hidden">
        {/* Sidebar */}
        <aside className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-[var(--color-surface)] border-r border-[var(--color-border)] transform transition-transform duration-300 ease-in-out
          lg:relative lg:translate-x-0
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
          <div className="flex flex-col h-full">
            <button 
              onClick={() => setCurrentView('home')}
              className="p-6 hidden lg:flex items-center gap-3 hover:opacity-80 transition-opacity text-left"
            >
              <img src="/logo.png" alt="Logo" className="w-10 h-10 rounded-xl shadow-lg shadow-[var(--color-accent-glow)]" referrerPolicy="no-referrer" />
              <div>
                <h1 className="font-display font-bold text-lg tracking-tight text-white leading-tight">艾歐澤亞助手</h1>
                <p className="text-[10px] uppercase tracking-widest text-[var(--color-accent)] font-semibold font-sans">Utility Hub V1.9.0</p>
              </div>
            </button>

            <nav className="flex-1 px-4 py-4 space-y-6 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {navGroups.map((group) => (
                <div key={group.label} className="space-y-1">
                  <button 
                    onClick={() => toggleGroup(group.label)}
                    className="w-full flex items-center justify-between px-4 text-[10px] font-bold text-[var(--color-text-faint)] uppercase tracking-widest mb-2 hover:text-[var(--color-text-muted)] transition-colors"
                  >
                    {group.label}
                    <ChevronRight size={14} className={`transition-transform ${openGroups.includes(group.label) ? 'rotate-90' : ''}`} />
                  </button>
                  {openGroups.includes(group.label) && (
                    <motion.div
                      key={group.label}
                      variants={navContainerVariants}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      className="space-y-1"
                    >
                      {group.items.map((item, i) => (
                        <motion.button
                          key={item.id}
                          custom={i}
                          variants={navItemVariants}
                          onClick={() => {
                            setCurrentView(item.id as View);
                            setIsSidebarOpen(false);
                            setOpenGroups([]);
                            const main = document.getElementById('main-content');
                            if (main) main.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className={`
                            w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 group
                            ${currentView === item.id
                              ? 'bg-[var(--color-accent)] text-[#0E0E10] font-semibold shadow-lg shadow-[var(--color-accent-glow)]'
                              : 'hover:bg-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-text)]'}
                          `}
                        >
                          {item.image ? (
                            <img
                              src={item.image}
                              alt=""
                              className={`w-5 h-5 object-contain transition-transform ${currentView === item.id ? 'scale-110' : 'group-hover:scale-110 opacity-70 hover:opacity-100'}`}
                              referrerPolicy="no-referrer"
                            />
                          ) : (
                            <item.icon size={20} className={currentView === item.id ? 'text-[#0E0E10]' : 'group-hover:scale-110 transition-transform text-[var(--color-text-muted)]'} />
                          )}
                          <span className="text-sm">{item.label}</span>
                        </motion.button>
                      ))}
                    </motion.div>
                  )}
                </div>
              ))}
            </nav>

            <div className="p-4 border-t border-[var(--color-border)] space-y-2">
              <div className="bg-[var(--color-bg)] rounded-2xl p-3 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[var(--color-accent-dim)] flex items-center justify-center shrink-0">
                  <Clock size={16} className="text-[var(--color-accent)]" />
                </div>
                <div>
                  <p className="text-[10px] text-[var(--color-text-muted)] uppercase font-bold tracking-tighter">艾歐澤亞時間 (ET)</p>
                  <p className="text-lg font-mono font-medium text-white leading-none">
                    {String(et.hours).padStart(2, '0')}:{String(et.minutes).padStart(2, '0')}
                  </p>
                </div>
              </div>
              <div className="bg-[var(--color-bg)] rounded-2xl p-3 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                  <Clock size={16} className="text-emerald-500" />
                </div>
                <div>
                  <p className="text-[10px] text-[var(--color-text-muted)] uppercase font-bold tracking-tighter">本地時間 (LT)</p>
                  <p className="text-lg font-mono font-medium text-white leading-none">
                    {localTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Close Button */}
          <button 
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden absolute top-4 right-4 p-2 text-[var(--color-text-muted)]"
          >
            <X size={24} />
          </button>
        </aside>

        {/* Main Content */}
        <main id="main-content" className="flex-1 overflow-y-auto bg-[var(--color-bg)] relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentView}
              initial={{ opacity: 0, scale: 0.97, filter: 'blur(4px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 0.97, filter: 'blur(4px)' }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="p-6 lg:p-10 max-w-7xl mx-auto"
            >
              {renderView()}
            </motion.div>
          </AnimatePresence>
          {/* Back to Top Button — inside main so it scrolls with content */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => {
              const main = document.getElementById('main-content');
              if (main) main.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="fixed bottom-6 right-6 p-3 bg-[var(--color-accent)] text-[#0E0E10] rounded-full shadow-lg hover:brightness-110 transition-all z-50"
          >
            <ChevronRight className="rotate-[-90deg]" size={24} />
          </motion.button>
        </main>
      </div>

      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}
