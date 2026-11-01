/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo, lazy, Suspense } from 'react';
import { useTranslation } from 'react-i18next';
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
import { fetchOfficialEvents, OfficialEvent } from './services/eventService';

// Components — Dashboard is eager (landing page); every other view is lazy-loaded
import Dashboard from './components/Dashboard';
import type { CalendarEvent } from './components/EventCalendar';
const MiniCactpot = lazy(() => import('./components/MiniCactpot'));
const WondrousTails = lazy(() => import('./components/WondrousTails'));
const Skywatcher = lazy(() => import('./components/Skywatcher'));
const SightseeingLog = lazy(() => import('./components/SightseeingLog'));
const Changelog = lazy(() => import('./components/Changelog'));
const ChocoboColor = lazy(() => import('./components/ChocoboColor'));
const DutyChecklist = lazy(() => import('./components/DutyChecklist'));
const NavigationGuide = lazy(() => import('./components/NavigationGuide'));
const MarketBoard = lazy(() => import('./components/MarketBoard'));
const UsefulLinks = lazy(() => import('./components/UsefulLinks'));
const TreasureHunt = lazy(() => import('./components/TreasureHunt'));
const EventCalendar = lazy(() => import('./components/EventCalendar'));
const SetAlarm = lazy(() => import('./components/SetAlarm'));
const InteractiveMaps = lazy(() => import('./components/InteractiveMaps'));

import KoFiWidget from './components/KoFiWidget';
import LanguageSwitcher from './components/LanguageSwitcher';
import DataBackup from './components/DataBackup';
import { Alarm, EorzeaTime, View } from './types';
import { NAV_GROUPS } from './constants/tools';
import { version as appVersion } from '../package.json';

export default function App() {
  // ── i18n (declared first so effects below can reference `t`) ────────────
  const { t } = useTranslation();

  const [currentView, setCurrentView] = useState<View>('home');
  const [events, setEvents] = useState<CalendarEvent[]>(() => {
    const saved = localStorage.getItem('ff14-events');
    if (!saved) return [];
    try {
      const parsed = JSON.parse(saved);
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      console.warn('[App] Failed to parse saved events, starting fresh:', e);
      return [];
    }
  });

  const [alarms, setAlarms] = useState<Alarm[]>(() => {
    const saved = localStorage.getItem('ff14-alarms');
    if (saved) {
      try {
        return JSON.parse(saved).map((a: { id: string; label: string; targetTime: string; active: boolean; isReset?: boolean }) => ({
          ...a,
          targetTime: new Date(a.targetTime),
          isReset: a.isReset ?? false,
        }));
      } catch (e) {
        console.warn('[App] Failed to parse saved alarms, starting fresh:', e);
        return [];
      }
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
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [now, setNow] = useState(new Date());
  const [officialEvents, setOfficialEvents] = useState<OfficialEvent[]>([]);

  // ── Clock tick (single source of truth) ──────────────────────────────────
  useEffect(() => {
    const tick = () => setNow(new Date());
    tick();
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, []);

  // ── Derive ET from now ────────────────────────────────────────────────────
  const et: EorzeaTime = useMemo(() => getEorzeaTime(now), [now]);

  // ── Official events (single fetch, shared by Dashboard + EventCalendar) ──
  useEffect(() => {
    fetchOfficialEvents().then(setOfficialEvents);
  }, []);

  // ── Back-to-top visibility ─────────────────────────────────────────────────
  useEffect(() => {
    const main = document.getElementById('main-content');
    if (!main) return;
    const onScroll = () => setShowBackToTop(main.scrollTop > 200);
    main.addEventListener('scroll', onScroll, { passive: true });
    return () => main.removeEventListener('scroll', onScroll);
  }, []);

  // ── ESC key closes mobile sidebar ─────────────────────────────────────────
  useEffect(() => {
    if (!isSidebarOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setIsSidebarOpen(false); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isSidebarOpen]);

  // ── Alarm trigger ──────────────────────────────────────────────────────────
  useEffect(() => {
    let changed = false;
    const nextAlarms = alarms.map(alarm => {
      if (!alarm.active || now < alarm.targetTime) return alarm;

      // alarm.label may be an i18n key (new format) or a legacy Chinese string.
      // t() returns the key unchanged when it has no translation, so legacy labels
      // still display correctly without any migration step.
      const alarmLabel = t(alarm.label, { defaultValue: alarm.label });

      if (typeof Notification !== 'undefined' && Notification.permission === 'granted') {
        new Notification(t('setAlarm.appName') + ' - ' + t('setAlarm.timeUp'), {
          body: `${alarmLabel} ${t('setAlarm.timeUp')}`,
          icon: '/logo.png',
          tag: alarm.id,
        });
      }

      toast.success(`${alarmLabel} ${t('setAlarm.timeUp')}`, {
        description: `${t('setAlarm.customAlarm')}：${alarm.targetTime.toLocaleTimeString()}`,
        duration: 10000,
        icon: <Bell className="text-amber-500" size={18} />,
      });

      try {
        const audio = new Audio('/audio/alarm.mp3');
        audio.volume = 0.5;
        audio.play().catch(() => {});
      } catch {
        // Audio playback blocked by browser — silent fail is acceptable
      }

      changed = true;
      return { ...alarm, active: false };
    });

    if (changed) setAlarms(nextAlarms);
  }, [now, alarms]);

  // Stagger children 50ms per nav item when group opens
  const navItemVariants = {
    hidden: { opacity: 0, x: -8 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.05, duration: 0.2, ease: [0.22, 1, 0.36, 1] as const }
    }),
  };
  const navContainerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.05 } },
  };

  const [openGroups, setOpenGroups] = useState<string[]>([]);

  const toggleGroup = (key: string) => {
    setOpenGroups(prev =>
      prev.includes(key) ? prev.filter(g => g !== key) : [...prev, key]
    );
  };

  const navGroups = NAV_GROUPS;

  // Map OfficialEvent[] → CalendarEvent[] once here (shared by EventCalendar)
  const mappedOfficialEvents = officialEvents.map(e => ({
    id: e.eventid,
    title: e.title,
    date: e.date || new Date().toISOString(),
    type: 'official' as const,
    desc: t('eventCalendar.officialDesc'),
    url: e.url,
  }));

  const renderView = () => {
    switch (currentView) {
      case 'home': return <Dashboard et={et} now={now} onViewChange={setCurrentView} events={events} officialEvents={officialEvents} />;
      case 'checklist': return <DutyChecklist />;
      case 'market': return <MarketBoard />;
      case 'alarm': return <SetAlarm alarms={alarms} setAlarms={setAlarms} now={now} />;
      case 'event-calendar': return <EventCalendar events={events} setEvents={setEvents} officialEvents={mappedOfficialEvents} />;
      case 'cactpot': return <MiniCactpot />;
      case 'tails': return <WondrousTails />;
      case 'weather': return <Skywatcher et={et} now={now} />;
      case 'interactive-maps': return <InteractiveMaps />;
      case 'treasure': return <TreasureHunt />;
      case 'chocobo': return <ChocoboColor />;
      case 'sightseeing': return <SightseeingLog et={et} />;
      case 'links': return <UsefulLinks />;
      case 'changelog': return <Changelog />;
      case 'guide': return <NavigationGuide onViewChange={setCurrentView} />;
      default: return <Dashboard et={et} now={now} onViewChange={setCurrentView} events={events} officialEvents={officialEvents} />;
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
          <h1 className="font-bold text-lg tracking-tight text-white">{t('nav.appName')}</h1>
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
                <h1 className="font-display font-bold text-lg tracking-tight text-white leading-tight">{t('nav.appName')}</h1>
                <p className="text-[10px] uppercase tracking-widest text-[var(--color-accent)] font-semibold font-sans">Utility Hub V{appVersion}</p>
              </div>
            </button>

            <nav className="flex-1 px-4 py-4 space-y-6 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {navGroups.map((group) => (
                <div key={group.key} className="space-y-1">
                  <button
                    onClick={() => toggleGroup(group.key)}
                    className="w-full flex items-center justify-between px-4 text-[10px] font-bold text-[var(--color-text-faint)] uppercase tracking-widest mb-2 hover:text-[var(--color-text-muted)] transition-colors"
                  >
                    {t(group.label)}
                    <ChevronRight size={14} className={`transition-transform ${openGroups.includes(group.key) ? 'rotate-90' : ''}`} />
                  </button>
                  {openGroups.includes(group.key) && (
                    <motion.div
                      key={group.key}
                      variants={navContainerVariants}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      className="space-y-1"
                    >
                      {group.items.map((item) => (
                        <motion.button
                          key={item.id}
                          variants={navItemVariants}
                          custom={0}
                          onClick={() => {
                            setCurrentView(item.id);
                            setOpenGroups(prev => prev.filter(g => g !== group.key));
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
                          <span className="text-sm">{t(item.label)}</span>
                        </motion.button>
                      ))}
                    </motion.div>
                  )}
                </div>
              ))}
            </nav>

            <div className="p-4 border-t border-[var(--color-border)] space-y-3">
              <div className="bg-[var(--color-bg)] rounded-2xl p-3 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[var(--color-accent-dim)] flex items-center justify-center shrink-0">
                  <Clock size={16} className="text-[var(--color-accent)]" />
                </div>
                <div>
                  <p className="text-[10px] text-[var(--color-text-muted)] uppercase font-bold tracking-tighter">{t('nav.et')}</p>
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
                  <p className="text-[10px] text-[var(--color-text-muted)] uppercase font-bold tracking-tighter">{t('nav.lt')}</p>
                  <p className="text-lg font-mono font-medium text-white leading-none">
                    {now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
                  </p>
                </div>
              </div>
              <DataBackup />
              <div className="kofi-widget-wrapper">
                <KoFiWidget />
              </div>
              <div className="flex justify-center">
                <LanguageSwitcher />
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
              <Suspense fallback={<div className="py-24 text-center text-[var(--color-text-muted)] text-sm">{t('common.loading', { defaultValue: 'Loading…' })}</div>}>
                {renderView()}
              </Suspense>
            </motion.div>
          </AnimatePresence>
          {/* Back to Top Button — only visible after scrolling 200 px */}
          <AnimatePresence>
            {showBackToTop && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.18 }}
                aria-label={t('nav.backToTop')}
                onClick={() => {
                  const main = document.getElementById('main-content');
                  if (main) main.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="fixed bottom-6 right-6 p-3 bg-[var(--color-accent)] text-[#0E0E10] rounded-full shadow-lg hover:brightness-110 transition-all z-50"
              >
                <ChevronRight className="rotate-[-90deg]" size={24} />
              </motion.button>
            )}
          </AnimatePresence>
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
