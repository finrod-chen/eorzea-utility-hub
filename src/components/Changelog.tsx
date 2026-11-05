import React from 'react';
import { useTranslation } from 'react-i18next';
import { History, CheckCircle2, Star, Zap } from 'lucide-react';
import { motion } from 'motion/react';
import { CHANGELOG } from '../constants/changelog';

const updates = CHANGELOG;

export default function Changelog() {
  const { t } = useTranslation();

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <div className="flex items-center gap-2">
          <img src="/tools/Changelog.png" alt="" className="w-5 h-5 object-contain" referrerPolicy="no-referrer" />
          <span className="text-xs font-bold uppercase tracking-widest text-amber-500">Changelog</span>
        </div>
        <h1 className="text-3xl font-bold text-white flex items-center gap-3">
          <History className="text-amber-500" size={32} />
          {t('changelog.title')}
        </h1>
        <p className="text-[#9e9e9e] text-sm max-w-md">{t('changelog.latest')}</p>
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
          {t('changelog.footer')}
        </p>
      </footer>
    </div>
  );
}
