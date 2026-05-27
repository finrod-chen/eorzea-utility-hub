import { useTranslation } from 'react-i18next';
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Shield, 
  Heart, 
  Sword, 
  Info, 
  Zap, 
  AlertTriangle, 
  ChevronDown, 
  ChevronUp, 
  MapPin, 
  Layers,
  ExternalLink,
  Filter
} from 'lucide-react';
import { DUNGEONS, Dungeon, Boss, Mechanic, RoleType } from '../data/dungeons';

const roleConfig: Record<RoleType, { icon: any; color: string; bg: string; label: string }> = {
  tank: { icon: Shield, color: 'text-blue-400', bg: 'bg-blue-400/10', label: t('dungeonGuide.roles.tank') },
  healer: { icon: Heart, color: 'text-emerald-400', bg: 'bg-emerald-400/10', label: t('dungeonGuide.roles.healer') },
  dps: { icon: Sword, color: 'text-rose-400', bg: 'bg-rose-400/10', label: t('dungeonGuide.roles.dps') },
  all: { icon: Zap, color: 'text-amber-400', bg: 'bg-amber-400/10', label: t('dungeonGuide.roles.all') }
};

const expansionTabs = [
  { id: 'all', label: '全部' },
  { id: '7.0', label: '7.0' },
  { id: '6.0', label: '6.0' },
  { id: '5.0', label: '5.0' },
  { id: '4.0', label: '4.0' },
  { id: '3.0', label: '3.0' },
  { id: '2.0', label: '2.0' }
];

export default function DungeonGuide() {
  const { t } = useTranslation();
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filteredDungeons = useMemo(() => {
    return DUNGEONS.filter(d => {
      const matchesSearch = d.name.toLowerCase().includes(search.toLowerCase());
      const matchesTab = activeTab === 'all' || d.expansion === activeTab;
      return matchesSearch && matchesTab;
    });
  }, [search, activeTab]);

  return (
    <div className="space-y-8">
      <header className="space-y-4">
        <div className="flex items-center gap-3">
          <img src="/tools/DungeonGuide.png" alt="" className="w-5 h-5 object-contain" referrerPolicy="no-referrer" />
          <span className="text-sm font-bold uppercase tracking-[0.3em] text-[#D39E47]">Cheat Sheet</span>
        </div>
        <h1 className="text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
          {t('dungeonGuide.title')} <span className="text-[#D39E47]">{t('dungeonGuide.subtitle')}</span>
        </h1>
        <p className="text-[#9e9e9e] max-w-2xl leading-relaxed">
          {t('dungeonGuide.subtitle')}
        </p>
      </header>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={20} />
          <input
            type="text"
            placeholder={t('dungeonGuide.searchPlaceholder')}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#1a1a1a] border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-[#D39E47]/50 transition-colors"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
          {expansionTabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                activeTab === tab.id 
                ? 'bg-[#D39E47] text-black' 
                : 'bg-white/5 text-[#9e9e9e] hover:bg-white/10'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Dungeon List */}
      <div className="grid grid-cols-1 gap-4">
        <AnimatePresence mode="popLayout">
          {filteredDungeons.map((dungeon, index) => (
            <motion.div
              key={dungeon.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: index * 0.05 }}
              className="bg-[#1a1a1a] border border-white/5 rounded-3xl overflow-hidden hover:border-white/10 transition-all"
            >
              <button
                onClick={() => setExpandedId(expandedId === dungeon.id ? null : dungeon.id)}
                aria-expanded={expandedId === dungeon.id}
                aria-controls={`dungeon-content-${dungeon.id}`}
                className="w-full p-6 flex items-center justify-between text-left group"
              >
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-[#D39E47] group-hover:scale-110 transition-transform">
                    <Layers size={24} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      {dungeon.level > 0 && (
                        <span className="text-[10px] font-bold text-[#D39E47] uppercase tracking-widest px-2 py-0.5 bg-[#D39E47]/10 rounded-full">
                          Lv.{dungeon.level} {dungeon.type.toUpperCase()}
                        </span>
                      )}
                      <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest">
                        {dungeon.expansion}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-white group-hover:text-[#D39E47] transition-colors">{dungeon.name}</h3>
                  </div>
                </div>
                {expandedId === dungeon.id ? <ChevronUp className="text-white/20" /> : <ChevronDown className="text-white/20" />}
              </button>

              <AnimatePresence>
                {expandedId === dungeon.id && (
                  <motion.div
                    id={`dungeon-content-${dungeon.id}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="border-t border-white/5"
                  >
                    <div className="p-6 pt-0 space-y-8">
                      {dungeon.bosses.map((boss, bIdx) => (
                        <div key={bIdx} className="space-y-4">
                          <div className="flex items-center gap-3 border-b border-white/5 pb-2">
                            <div className="w-1.5 h-6 bg-[#D39E47] rounded-full" />
                            <h4 className="text-lg font-bold text-white">{boss.name}</h4>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {boss.mechanics.map((mech, mIdx) => {
                              const RoleIcon = roleConfig[mech.role].icon;
                              return (
                                <div key={mIdx} className={`bg-white/5 rounded-2xl p-4 space-y-2 border ${mech.isDeadly ? 'border-rose-500/30' : 'border-transparent'} hover:border-white/10 transition-all relative overflow-hidden`}>
                                  {mech.isDeadly && (
                                    <div className="absolute top-0 right-0 px-2 py-0.5 bg-rose-500 text-[8px] font-bold text-white uppercase tracking-tighter rounded-bl-lg">
                                      Deadly
                                    </div>
                                  )}
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                      <div className={`p-1.5 ${roleConfig[mech.role].bg} rounded-lg`}>
                                        <RoleIcon size={14} className={roleConfig[mech.role].color} />
                                      </div>
                                      <span className="text-sm font-bold text-white">{mech.title}</span>
                                    </div>
                                    <span className={`text-[10px] font-bold uppercase tracking-widest ${roleConfig[mech.role].color}`}>
                                      {roleConfig[mech.role].label}
                                    </span>
                                  </div>
                                  <p className="text-xs text-[#9e9e9e] leading-relaxed">
                                    {mech.desc}
                                  </p>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </AnimatePresence>

        {filteredDungeons.length === 0 && (
          <div className="text-center py-20 bg-[#1a1a1a] rounded-3xl border border-dashed border-white/10">
            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search size={32} className="text-white/20" />
            </div>
<h3 className="text-xl font-bold text-white mb-2">{t('dungeonGuide.noMatch')}</h3>
            <p className="text-[#9e9e9e] text-sm">{t('dungeonGuide.feedback')}</p>
          </div>
        )}
      </div>

      {/* Tips Section */}
      <div className="bg-[#D39E47]/5 border border-[#D39E47]/20 rounded-3xl p-6 flex gap-4 items-start">
        <div className="p-3 bg-[#D39E47]/10 rounded-2xl shrink-0">
          <Info className="text-[#D39E47]" size={24} />
        </div>
        <div className="space-y-1">
<h4 className="text-sm font-bold text-[#D39E47] uppercase tracking-widest">{t('dungeonGuide.coreMechanic')}</h4>
          <p className="text-xs text-[#9e9e9e] leading-relaxed">
            {t('dungeonGuide.quickGuide')}
            {t('dungeonGuide.disclaimer')}
          </p>
        </div>
      </div>
    </div>
  );
}
