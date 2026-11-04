import React from 'react';
import { ChevronDown, HelpCircle, ListOrdered } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { TOOL_GUIDES } from '../constants/toolGuides';
import type { View } from '../types';

/** "How to use" + FAQ block shown at the bottom of each tool page. */
export default function ToolGuide({ view }: { view: View }) {
  const { t, i18n } = useTranslation();
  const guide = TOOL_GUIDES[view];
  if (!guide) return null;
  const g = i18n.language === 'zh-TW' ? guide.zh : guide.en;

  return (
    <section aria-labelledby="tool-guide-heading" className="mt-16 pt-10 border-t border-[var(--color-border)] space-y-8 max-w-3xl">
      <div className="space-y-4">
        <h2 id="tool-guide-heading" className="text-lg font-bold text-white flex items-center gap-2">
          <ListOrdered size={18} className="text-[var(--color-accent)]" /> {t('toolGuide.howTo')}
        </h2>
        <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">{g.intro}</p>
        <ol className="space-y-2">
          {g.steps.map((step, i) => (
            <li key={i} className="flex gap-3 text-sm text-[var(--color-text)] leading-relaxed">
              <span className="shrink-0 w-6 h-6 rounded-full bg-[var(--color-accent-dim)] text-[var(--color-accent)] text-xs font-bold flex items-center justify-center">{i + 1}</span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      </div>

      {g.faq.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <HelpCircle size={18} className="text-[var(--color-accent)]" /> {t('toolGuide.faq')}
          </h2>
          <div className="space-y-2">
            {g.faq.map((item, i) => (
              <details key={i} className="group bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl px-5 py-4">
                <summary className="flex items-center justify-between gap-4 cursor-pointer list-none text-sm font-semibold text-white [&::-webkit-details-marker]:hidden">
                  <h3 className="font-semibold">{item.q}</h3>
                  <ChevronDown size={16} className="shrink-0 text-[var(--color-text-muted)] transition-transform group-open:rotate-180" />
                </summary>
                <p className="mt-3 text-sm text-[var(--color-text-muted)] leading-relaxed">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
