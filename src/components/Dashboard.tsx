import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useMotionValue, useTransform } from 'motion/react';
import { ArrowRight, Bird, Calendar, CloudSun, Clock, ExternalLink, Map as MapIcon, ShoppingCart } from 'lucide-react';
import { CalendarEvent } from './EventCalendar';
import ResetCountdown from './ResetCountdown';
import { INITIAL_TASKS } from '../constants/tasks';
import { getProgress, pruneExpired } from '../utils/taskUtils';
import { CURRENT_PATCH } from '../constants/patch';
import { pageForView } from '../constants/seo';
import { isModifiedClick } from '../utils/pageMeta';
import { NAV_GROUPS } from '../constants/tools';
import { View } from '../types';
import KoFiWidget from './KoFiWidget';
import type { OfficialEvent } from '../services/eventService';

// ── 3D Tilt Card ────────────────────────────────────────────────────────────
interface TiltCardProps {
  tool: {
    id: string;
    label: string;
    icon: React.ComponentType<{ size: number; className?: string }>;
    image?: string;
    desc: string;
    color: string;
  };
  href: string;
  onClick: () => void;
}

function TiltCard({ tool, href, onClick }: TiltCardProps) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-8, 8]);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={cardRef}
      href={href}
      onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
        if (isModifiedClick(e)) return;
        e.preventDefault();
        onClick();
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="block bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-6 text-left group"
    >
      <div
        className="flex justify-between items-start mb-4"
        style={{ transform: 'translateZ(24px)' }}
      >
        <div
          className={`w-12 h-12 ${tool.color} rounded-xl flex items-center justify-center shadow-lg overflow-hidden p-2`}
          style={{ transform: 'translateZ(16px)' }}
        >
          {tool.image ? (
            <img src={tool.image} alt="" className="w-full h-full object-contain" referrerPolicy="no-referrer" />
          ) : (
            <tool.icon size={24} className="text-white" />
          )}
        </div>
      </div>
      <div style={{ transform: 'translateZ(12px)' }}>
        <h4 className="font-bold text-white mb-2">{tool.label}</h4>
        <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">{tool.desc}</p>
      </div>
    </motion.a>
  );
}

interface DashboardProps {
  et: { hours: number; minutes: number };
  now: Date;
  onViewChange: (view: View) => void;
  events: CalendarEvent[];
  officialEvents: OfficialEvent[];
}
export default function Dashboard({ et, now, onViewChange, events, officialEvents }: DashboardProps) {
  const { t, i18n } = useTranslation();
  const isZh = i18n.language === 'zh-TW';
  const [progress, setProgress] = useState({
    daily: { done: 0, total: 0 },
    weekly: { done: 0, total: 0 }
  });

  const upcomingEvents = events
    .filter(e => new Date(e.date) > new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 3);

  const formatEventDate = (dateStr?: string) => {
    if (!dateStr) return null;
    try {
      const date = new Date(dateStr);
      const locale = i18n.language === 'zh-TW' ? 'zh-TW' : 'en-US';
      return date.toLocaleString(locale, {
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      });
    } catch (e) {
      return dateStr;
    }
  };

  useEffect(() => {
    const saved = localStorage.getItem('ff14-duty-checklist-v2');
    if (saved) {
      try {
        const completed = pruneExpired(JSON.parse(saved));
        setProgress({
          daily: getProgress(completed, 'daily'),
          weekly: getProgress(completed, 'weekly'),
        });
      } catch (e) {
        console.warn('[Dashboard] Failed to load duty checklist, starting fresh:', e);
      }
    } else {
      setProgress({
        daily: { done: 0, total: INITIAL_TASKS.filter(t => t.category === 'daily').length },
        weekly: { done: 0, total: INITIAL_TASKS.filter(t => t.category === 'weekly').length },
      });
    }
  }, []);

  const handleViewChange = (view: View) => {
    onViewChange(view);
    const main = document.getElementById('main-content');
    if (main) main.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Flat list for Dashboard tool cards — single source of truth from NAV_GROUPS.
  // Memoised so we only re-resolve i18n strings when the language actually changes.
  const resolvedTools = useMemo(
    () =>
      NAV_GROUPS.flatMap(g =>
        g.items.map(tool => ({
          ...tool,
          label: t(tool.label),
          desc: t(tool.desc),
        }))
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [i18n.language] // t() is stable per language; re-run only on language switch
  );

  // ── Named constants ──────────────────────────────────────────────────────
  const WEATHER_CHANGE_INTERVAL_MINUTES = 480; // ET minutes between weather changes

  const getNextWeatherChange = () => {
    const currentTotalMinutes = et.hours * 60 + et.minutes;
    // Use floor+1 so that being exactly on a weather-change boundary shows the full
    // interval ahead (480 ET min), not 0. Math.ceil fails for exact multiples.
    const currentBell = Math.floor(currentTotalMinutes / WEATHER_CHANGE_INTERVAL_MINUTES);
    const diffMinutes = (currentBell + 1) * WEATHER_CHANGE_INTERVAL_MINUTES - currentTotalMinutes;
    const realSeconds = Math.floor(diffMinutes * (175 / 60));
    const realMinutes = Math.floor(realSeconds / 60);
    const remainingSeconds = realSeconds % 60;
    return `${realMinutes} ${t('dashboard.min')} ${remainingSeconds} ${t('dashboard.sec')}`;
  };

  return (
    <div className="space-y-10">
      <header className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="h-px w-10 bg-[var(--color-accent)]" />
          <span className="section-label">Dashboard</span>
        </div>
        <h1 className="display-heading text-4xl lg:text-6xl text-white">
          {t('dashboard.welcome')}&nbsp;<span className="text-[var(--color-accent)]">{t('dashboard.eorzea')}</span><br />
          {t('dashboard.subtitle')}
        </h1>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ET Card */}
        <div className="bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-accent)]/30 transition-colors rounded-3xl p-8 flex flex-col justify-between group">
          <div className="space-y-2">
            <p className="text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-widest">Current Eorzea Time</p>
            <div className="text-7xl font-mono font-medium text-white tracking-tighter">
              {String(et.hours).padStart(2, '0')}:{String(et.minutes).padStart(2, '0')}
            </div>
          </div>
          <div className="mt-8 flex items-center gap-4">
            <div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-[var(--color-accent)]"
                initial={{ width: 0 }}
                animate={{ width: `${((et.hours * 60 + et.minutes) / 1440) * 100}%` }}
              />
            </div>
            <span className="text-xs font-mono text-[var(--color-text-muted)]">
              {Math.floor(((et.hours * 60 + et.minutes) / 1440) * 100)}% Day
            </span>
          </div>
        </div>

        {/* Weather Preview */}
        <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-3xl p-8 flex flex-col justify-between hover:border-[var(--color-accent)]/30 transition-colors">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <p className="text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-widest">Next Weather Change</p>
              <h3 className="text-2xl font-bold text-white">{t('dashboard.nextWeather')}</h3>
            </div>
            <div className="p-3 bg-[var(--color-accent)]/10 rounded-2xl">
              <CloudSun className="text-[var(--color-accent)]" size={24} />
            </div>
          </div>
          <div className="mt-8 space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-[var(--color-text-muted)]">{t('dashboard.countdown')}</span>
              <span className="text-white font-mono">{getNextWeatherChange()}</span>
            </div>
            <button 
              onClick={() => handleViewChange('weather')}
              className="w-full py-3 bg-white/5 hover:bg-white/10 rounded-xl text-sm font-medium transition-colors flex items-center justify-center gap-2 group"
            >
              {t('dashboard.viewWeather')}
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Reset Countdowns */}
      <ResetCountdown now={now} dailyProgress={progress.daily} weeklyProgress={progress.weekly} />

      {/* Support / Ko-fi */}
      <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#D39E47]/20 flex items-center justify-center shrink-0">
            <span className="text-base">☕</span>
          </div>
          <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
            {t('dashboard.supportTitle')}<br className="hidden sm:block" />
            {t('dashboard.supportSubtitle')}
          </p>
        </div>
        <div className="shrink-0">
          <KoFiWidget />
        </div>
      </div>

      {/* Upcoming Events Section */}
      <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-3xl p-8 space-y-8">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold uppercase tracking-widest text-[var(--color-accent)]">{t('dashboard.upcomingEvents')}</h3>
          <button 
            onClick={() => handleViewChange('event-calendar')}
            className="text-xs text-[var(--color-text-muted)] hover:text-white transition-colors flex items-center gap-1"
          >
            {t('dashboard.viewCalendar')} <ArrowRight size={12} />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Official Events */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-[var(--color-accent)]">
              <Bird size={16} />
              <h4 className="text-xs font-bold uppercase tracking-wider">{t('dashboard.officialEvents')}</h4>
            </div>
            <div className="space-y-3">
              {officialEvents.length > 0 ? (
                officialEvents.map(event => (
                  <a 
                    key={event.eventid}
                    href={event.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-4 bg-black/20 rounded-2xl border border-[var(--color-border)] hover:border-[var(--color-accent)]/30 transition-all group"
                  >
                    <div className="flex justify-between items-start gap-4">
                      <h5 className="font-bold text-white group-hover:text-[var(--color-accent)] transition-colors">{event.title}</h5>
                      <ExternalLink size={14} className="text-[var(--color-text-muted)] shrink-0" />
                    </div>
                    {event.date && <p className="text-[10px] font-mono text-[var(--color-text-muted)] mt-2">{formatEventDate(event.date)}</p>}
                  </a>
                ))
              ) : (
                <p className="text-sm text-[var(--color-text-muted)] italic py-4">{t('dashboard.noOfficialEvents')}</p>
              )}
            </div>
          </div>

          {/* Personal Events */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-[var(--color-accent)]">
              <Calendar size={16} />
              <h4 className="text-xs font-bold uppercase tracking-wider">{t('dashboard.personalEvents')}</h4>
            </div>
            <div className="space-y-3">
              {upcomingEvents.length > 0 ? (
                upcomingEvents.map(event => (
                  <div key={event.id} className="p-4 bg-black/20 rounded-2xl border border-[var(--color-border)]">
                    <h5 className="font-bold text-white mb-1">{event.title}</h5>
                    <div className="flex items-center gap-2 text-[10px] font-mono text-[var(--color-text-muted)] mb-2">
                      <Clock size={10} />
                      {formatEventDate(event.date)}
                    </div>
                    {event.desc && <p className="text-[10px] text-[var(--color-text)] line-clamp-1">{event.desc}</p>}
                  </div>
                ))
              ) : (
                <div className="h-full flex flex-col items-center justify-center py-8 text-center space-y-2 bg-black/10 rounded-2xl border border-dashed border-[var(--color-border)]">
                  <Calendar size={24} className="text-white/10" />
                  <p className="text-sm text-[var(--color-text-muted)]">{t('dashboard.noPersonalEvents')}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {resolvedTools.map((tool) => (
          <TiltCard
            key={tool.id}
            tool={tool}
            href={pageForView(tool.id).path}
            onClick={() => handleViewChange(tool.id)}
          />
        ))}
      </div>
      {/* Current Version Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="h-1 w-8 bg-[var(--color-accent)] rounded-full" />
          <h3 className="text-sm font-bold uppercase tracking-widest text-[var(--color-accent)]">{t('dashboard.patchVersion')}</h3>
        </div>
        <div className="relative overflow-hidden rounded-3xl border border-[var(--color-border)] bg-gradient-to-br from-[#2a2112] via-[var(--color-surface)] to-[var(--color-bg)]">
          {CURRENT_PATCH.image && (
            <a href={CURRENT_PATCH.notesUrl} target="_blank" rel="noopener noreferrer" className="block group overflow-hidden">
              <img
                src={CURRENT_PATCH.image}
                alt={`FINAL FANTASY XIV ${CURRENT_PATCH.version} ${isZh ? CURRENT_PATCH.title.zh : CURRENT_PATCH.title.en}`}
                width={1920}
                height={502}
                loading="lazy"
                decoding="async"
                className="w-full h-auto block group-hover:scale-[1.02] transition-transform duration-500"
              />
            </a>
          )}
          <div className="relative p-6 lg:p-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3">
              <div className="flex items-baseline gap-3">
                <span className="text-5xl font-display font-bold text-[var(--color-accent)]">{CURRENT_PATCH.version}</span>
                <span className="text-xl font-bold text-white">{isZh ? CURRENT_PATCH.title.zh : CURRENT_PATCH.title.en}</span>
              </div>
              <p className="text-xs text-[var(--color-text-muted)]">
                {t('dashboard.patchSeries', { series: CURRENT_PATCH.series, date: CURRENT_PATCH.seriesReleasedAt })}
              </p>
              <ul className="space-y-1">
                {(isZh ? CURRENT_PATCH.highlights.zh : CURRENT_PATCH.highlights.en).map(h => (
                  <li key={h} className="text-sm text-[var(--color-text)] flex gap-2">
                    <span className="text-[var(--color-accent)]">•</span>{h}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-2 shrink-0">
              <a
                href={CURRENT_PATCH.specialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-[var(--color-accent)] text-[#0E0E10] text-sm font-semibold hover:brightness-110 transition-all"
              >
                {t('dashboard.patchSpecial')} <ArrowRight size={14} />
              </a>
              <a
                href={CURRENT_PATCH.notesUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-white/5 text-white text-sm hover:bg-white/10 transition-all"
              >
                {t('dashboard.patchNote')} <ArrowRight size={14} />
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* Copyright Footer */}
      <footer className="pt-10 pb-6 border-t border-[var(--color-border)]">
        <div className="space-y-4">
          <h5 className="text-xs font-bold text-[var(--color-accent)] uppercase tracking-widest mb-2">{t('dashboard.footer.copyrightTitle')}</h5>

          <p className="text-[11px] text-[var(--color-text-muted)] leading-relaxed max-w-4xl">
            {t('dashboard.footer.copyright1')}<br />
            {t('dashboard.footer.copyright2')}<br />
            {t('dashboard.footer.copyright3')}<br />
            {t('dashboard.footer.copyright4')}<br />
            {t('dashboard.footer.copyright5')}
          </p>
        </div>
      </footer>
    </div>
  );
}
