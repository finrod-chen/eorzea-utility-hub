import React from 'react';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
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
    labelEn: 'Alarm Clock',
    icon: Bell,
    image: '/tools/SetAlarm.png',
    color: 'text-amber-500',
    bg: 'bg-amber-500/10',
    descEn: 'Set various in-game reminders. Browser notifications fire when timers are up.',
    tipsEn: [
      'Supports daily & weekly reset reminders.',
      'Countdown timers for Levequests or squad training.',
      'Alarm settings auto-save — they survive page refresh.',
    ]
  },
  {
    id: 'event-calendar',
    labelEn: 'Event Calendar',
    icon: Calendar,
    image: '/tools/EventCalendar.png',
    color: 'text-rose-500',
    bg: 'bg-rose-500/10',
    descEn: 'Manage FC/party schedules with auto-synced official event data. Add, edit, or delete personal events.',
    tipsEn: [
      'Official events marked in blue "OFFICIAL" with external link icon.',
      'Client-side cache refreshes every 60 minutes.',
      'Shows next 3 upcoming events on the dashboard.',
      'Data stored in browser — persists across sessions.',
    ]
  },
  {
    id: 'checklist',
    labelEn: 'Duty Checklist',
    icon: CheckSquare,
    image: '/tools/DutyChecklist.png',
    color: 'text-emerald-500',
    bg: 'bg-emerald-500/10',
    descEn: 'Track daily & weekly tasks. Tap to mark complete; completion time is auto-logged.',
    tipsEn: [
      'Daily tasks reset at 23:00 (TW time).',
      'Weekly tasks reset every Tuesday at 16:00.',
      'Final completion timestamp shown when all tasks are done.',
    ]
  },
  {
    id: 'treasure',
    labelEn: 'Treasure Hunt',
    icon: MapIcon,
    image: '/tools/TreasureHunt.png',
    color: 'text-amber-500',
    bg: 'bg-amber-500/10',
    descEn: 'Look up excavation points and rewards for all treasure map types.',
    tipsEn: [
      'Select the corresponding treasure map tier.',
      'Map highlights possible excavation points for that tier.',
      'Tap the map to see precise coordinates.',
    ]
  },
  {
    id: 'market',
    labelEn: 'Market Board',
    icon: ShoppingCart,
    image: '/tools/MarketBoard.png',
    color: 'text-rose-500',
    bg: 'bg-rose-500/10',
    descEn: 'Universalis API integration. Real-time pricing & transaction history across servers.',
    tipsEn: [
      'Search supports both Chinese and English item names.',
      'Hover over item names to see Cafekit tooltips with full stats.',
      'Query by specific server or entire Data Center.',
      'Data refresh rate depends on player uploads to Universalis.',
    ]
  },
  {
    id: 'weather',
    labelEn: 'Skywatcher',
    icon: CloudSun,
    image: '/tools/Skywatcher.png',
    color: 'text-[#00B0FF]',
    bg: 'bg-[#00B0FF]/10',
    descEn: 'Query Eorzea weather across all regions. Rare weather filter available.',
    tipsEn: [
      'Weather changes every 8 hours (Eorzea Time).',
      'Change points are ET 0:00, 8:00, and 16:00.',
      'Use the filter to quickly find specific weather like Rain or Thunder.',
    ]
  },
  {
    id: 'interactive-maps',
    labelEn: 'Interactive Maps',
    icon: MapIcon,
    image: '/tools/InteractiveMaps.png',
    color: 'text-blue-500',
    bg: 'bg-blue-500/10',
    descEn: 'Explore Eorzea geography. Resource nodes & markers. Powered by FFCafe.',
    tipsEn: [
      'Pinch to zoom and drag to pan. Tap markers for details.',
      'Data provided by FFCafe 肥肥咖啡.',
    ]
  },
  {
    id: 'cactpot',
    labelEn: 'Mini Cactpot',
    icon: Grid3X3,
    image: '/tools/MiniCactpot.png',
    color: 'text-amber-500',
    bg: 'bg-amber-500/10',
    descEn: 'Gold Saucer scratch-off assistant. Input known numbers to calculate expected values.',
    tipsEn: [
      'Prioritize routes with the highest expected value.',
      '1-2-3 (sum=6) and 7-8-9 (sum=24) are typically the top prizes.',
      'Tap a cell to enter a number.',
    ]
  },
  {
    id: 'tails',
    labelEn: 'Wondrous Tails',
    icon: BookOpen,
    image: '/tools/WondrousTails.png',
    color: 'text-blue-500',
    bg: 'bg-blue-500/10',
    descEn: 'Simulate Wondrous Tails sticker-line probabilities. Helps decide when to use rerolls.',
    tipsEn: [
      'Enter current sticker positions to see 1/2/3-line probabilities.',
      'Rerolling at 7 stickers is usually the optimal strategy.',
      'Visual display of all possible line paths.',
    ]
  },
  {
    id: 'chocobo',
    labelEn: 'Chocobo Color',
    icon: Bird,
    image: '/tools/ChocoboColor.png',
    color: 'text-amber-600',
    bg: 'bg-amber-600/10',
    descEn: 'Calculate how many fruits to retime your chocobo from current to target color.',
    tipsEn: [
      'Select your current color and target color.',
      'System calculates the precise feeding sequence.',
      'Alternate fruits in the suggested order for best results.',
    ]
  },
  {
    id: 'sightseeing',
    labelEn: 'Sightseeing Log',
    icon: Clock,
    image: '/tools/SightseeingLog.png',
    color: 'text-blue-600',
    bg: 'bg-blue-600/10',
    descEn: 'Cross-reference time & weather to show which sightseeing log targets are currently achievable.',
    tipsEn: [
      'List auto-sorts by current ET time.',
      'Each target notes the required emote.',
      'Combine with Skywatcher to plan ahead.',
    ]
  },
  {
    id: 'links',
    labelEn: 'Useful Links',
    icon: ExternalLink,
    image: '/tools/UsefulLinks.png',
    color: 'text-slate-500',
    bg: 'bg-slate-500/10',
    descEn: 'Curated video & text resources: official info, guides, glam & housing sites.',
    tipsEn: [
      'Categorized video and text resources for quick lookup.',
      'Covers TW official, savage guides, glam builds, and housing decor.',
      'Links open in a new tab.',
    ]
  }
];

interface NavigationGuideProps {
  onViewChange?: (view: any) => void;
}

export default function NavigationGuide({ onViewChange }: NavigationGuideProps) {
  const { t } = useTranslation();

  const handleViewChange = (view: any) => {
    onViewChange?.(view);
    const main = document.getElementById('main-content');
    if (main) main.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getLocalizedTips = (tipsEn: string[]) => {
    return tipsEn;
  };

  return (
    <div className="space-y-10">
      <header className="space-y-4">
        <div className="flex items-center gap-3">
          <img src="/tools/NavigationGuide.png" alt="" className="w-5 h-5 object-contain" referrerPolicy="no-referrer" />
          <span className="text-sm font-bold uppercase tracking-[0.3em] text-[#D39E47]">Guide</span>
        </div>
        <h1 className="text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
          {t('navigationGuide.title')} <span className="text-[#D39E47]">{t('navigationGuide.subtitle')}</span>
        </h1>
        <p className="text-[#9e9e9e] max-w-2xl leading-relaxed">
          {t('navigationGuide.description')}
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
                  {t('navigationGuide.toolGuide')}
                </div>
              </div>
            </div>

            <button 
              onClick={() => handleViewChange(item.id)}
              className="text-left group/title"
            >
              <h3 className="text-xl font-bold text-white mb-3 group-hover/title:text-[#D39E47] transition-colors">{item.labelEn}</h3>
            </button>
            <p className="text-sm text-[#9e9e9e] leading-relaxed mb-4">
              {item.descEn}
            </p>
            <div className="flex items-center gap-1.5 text-[10px] text-[#D39E47] font-bold uppercase tracking-wider mb-6 opacity-50 group-hover:opacity-100 transition-opacity">
              <ExternalLink size={10} />
              {t('navigationGuide.tips')}
            </div>

              <div className="space-y-3 pt-6 border-t border-white/5">
                <div className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-wider">
                  <Info size={14} className="text-[#D39E47]" />
                  {t('navigationGuide.tips')}
                </div>
              <ul className="space-y-2">
                {getLocalizedTips(item.tipsEn).map((tip, i) => (
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
