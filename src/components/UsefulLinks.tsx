import React from 'react';
import { useTranslation } from 'react-i18next';
import { ExternalLink, Globe, Video, Book, Palette, Home, Database, Wrench, Image, Trophy, MessageSquare } from 'lucide-react';

import { LINK_CATEGORIES } from '../constants/usefulLinks';

/** Icon and colour per category, in the same order as LINK_CATEGORIES. */
const CATEGORY_STYLES = [
  { icon: Globe, color: 'text-amber-500' },
  { icon: Video, color: 'text-rose-500' },
  { icon: Book, color: 'text-indigo-500' },
  { icon: Globe, color: 'text-emerald-500' },
  { icon: Trophy, color: 'text-yellow-500' },
  { icon: MessageSquare, color: 'text-purple-500' },
  { icon: Palette, color: 'text-pink-500' },
  { icon: Home, color: 'text-sky-500' },
  { icon: Database, color: 'text-slate-400' },
  { icon: Wrench, color: 'text-orange-500' },
  { icon: Image, color: 'text-cyan-500' },
];

export default function UsefulLinks() {
  const { t } = useTranslation();

  const categories = LINK_CATEGORIES.map((c, i) => ({
    title: t(c.titleKey),
    icon: CATEGORY_STYLES[i].icon,
    color: CATEGORY_STYLES[i].color,
    links: c.links,
  }));

  return (
    <div className="space-y-10">
      <header className="space-y-4">
        <div className="flex items-center gap-3">
          <img src="/tools/UsefulLinks.png" alt="" className="w-6 h-6 object-contain" referrerPolicy="no-referrer" />
          <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-[#D39E47]">Useful Links</h2>
        </div>
        <h1 className="text-4xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
          {t('usefulLinks.title')} <span className="text-[#D39E47]">{t('usefulLinks.subtitle').split(' ')[0]}</span>
        </h1>
        <p className="text-[#9e9e9e] max-w-2xl leading-relaxed">
          {t('usefulLinks.subtitle')}
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {categories.map((category, idx) => (
          <div 
            key={idx}
            className="bg-[#1a1a1a] border border-white/5 rounded-3xl p-6 hover:border-white/10 transition-all flex flex-col"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className={`p-2.5 rounded-xl bg-white/5 ${category.color}`}>
                <category.icon size={20} />
              </div>
              <h3 className="font-bold text-white tracking-wide">{category.title}</h3>
            </div>
            
            <div className="space-y-2 flex-1">
              {category.links.map((link, lIdx) => (
                <a
                  key={lIdx}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors group"
                >
                  <span className="text-sm text-[#9e9e9e] group-hover:text-white transition-colors line-clamp-1">
                    {link.title}
                  </span>
                  <ExternalLink size={14} className="text-white/20 group-hover:text-[#D39E47] transition-colors shrink-0" />
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>

      <footer className="pt-10 pb-6 border-t border-white/5">
        <p className="text-[11px] text-[#9e9e9e] leading-relaxed">
          {t('usefulLinks.footer')}
        </p>
      </footer>
    </div>
  );
}
