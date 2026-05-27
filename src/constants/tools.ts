/**
 * Central tool registry — single source of truth for all nav tools.
 * Icons are resolved in App.tsx via lucide-react imports.
 * If you add/remove/rename a tool, update this file AND the constants/tasks.ts.
 *
 * i18n: labels and descriptions are stored as i18n keys (e.g. 'tools.home.label').
 * Render time resolution happens in Dashboard.tsx via useTranslation().
 */

import { CheckSquare, Bell, Calendar, BookOpen, ShoppingCart, Map as MapIcon, Grid3X3, Bird, CloudSun, Clock, Settings, HelpCircle, History } from 'lucide-react';
import { View } from '../types';

export interface NavTool {
  id: View;
  label: string;       // i18n key, e.g. 'tools.home.label'
  desc: string;        // i18n key, e.g. 'tools.home.desc'
  icon: React.ComponentType<{ size: number; className?: string }>;
  image: string;
  color: string;
}

export interface NavGroup {
  key: string;       // stable identifier e.g. 'daily', 'tools' — used for state keys
  label: string;     // i18n key e.g. 'nav.daily'
  items: NavTool[];
}

export const NAV_GROUPS: NavGroup[] = [
  {
    key: 'daily',
    label: 'nav.daily',
    items: [
      { id: 'home',           label: 'tools.home.label',       desc: 'tools.home.desc',       icon: CheckSquare,   image: '/tools/Dashboard.png',       color: 'bg-indigo-500' },
      { id: 'checklist',      label: 'tools.checklist.label',  desc: 'tools.checklist.desc',  icon: CheckSquare,   image: '/tools/DutyChecklist.png',  color: 'bg-indigo-500' },
      { id: 'alarm',          label: 'tools.alarm.label',      desc: 'tools.alarm.desc',      icon: Bell,         image: '/tools/SetAlarm.png',       color: 'bg-amber-500' },
      { id: 'event-calendar', label: 'tools.calendar.label',   desc: 'tools.calendar.desc',   icon: Calendar,     image: '/tools/EventCalendar.png',  color: 'bg-rose-500' },
    ],
  },
  {
    key: 'tools',
    label: 'nav.tools',
    items: [
      { id: 'tails',      label: 'tools.tails.label',    desc: 'tools.tails.desc',    icon: BookOpen,     image: '/tools/WondrousTails.png',  color: 'bg-blue-500' },
      { id: 'market',     label: 'tools.market.label',   desc: 'tools.market.desc',   icon: ShoppingCart, image: '/tools/MarketBoard.png',  color: 'bg-rose-500' },
      { id: 'treasure',   label: 'tools.treasure.label', desc: 'tools.treasure.desc', icon: MapIcon,      image: '/tools/TreasureHunt.png',  color: 'bg-amber-500' },
      { id: 'cactpot',    label: 'tools.cactpot.label',  desc: 'tools.cactpot.desc',  icon: Grid3X3,     image: '/tools/MiniCactpot.png',   color: 'bg-amber-500' },
      { id: 'chocobo',    label: 'tools.chocobo.label',  desc: 'tools.chocobo.desc',  icon: Bird,         image: '/tools/ChocoboColor.png',  color: 'bg-amber-600' },
    ],
  },
  {
    key: 'weatherGroup',
    label: 'nav.weatherGroup',
    items: [
      { id: 'weather',          label: 'tools.weather.label',    desc: 'tools.weather.desc',    icon: CloudSun, image: '/tools/Skywatcher.png',       color: 'bg-emerald-500' },
      { id: 'interactive-maps', label: 'tools.maps.label',       desc: 'tools.maps.desc',       icon: MapIcon,  image: '/tools/InteractiveMaps.png',  color: 'bg-blue-500' },
      { id: 'sightseeing',      label: 'tools.sightseeing.label', desc: 'tools.sightseeing.desc', icon: Clock, image: '/tools/SightseeingLog.png',  color: 'bg-blue-600' },
    ],
  },
  {
    key: 'other',
    label: 'nav.other',
    items: [
      { id: 'links',     label: 'tools.links.label',    desc: 'tools.links.desc',    icon: Settings,   image: '/tools/UsefulLinks.png',      color: 'bg-slate-600' },
      { id: 'guide',     label: 'tools.guide.label',    desc: 'tools.guide.desc',   icon: HelpCircle, image: '/tools/NavigationGuide.png', color: 'bg-slate-600' },
      { id: 'changelog', label: 'tools.changelog.label', desc: 'tools.changelog.desc', icon: History,  image: '/tools/Changelog.png',        color: 'bg-slate-600' },
    ],
  },
];
