import React from 'react';
import { ChevronDown, HelpCircle, Link2, ListOrdered } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { TOOL_GUIDES, type GuideSection } from '../constants/toolGuides';
import { NAV_GROUPS } from '../constants/tools';
import { pageForView } from '../constants/seo';
import { isModifiedClick } from '../utils/pageMeta';
import type { View } from '../types';

interface Props {
  view: View;
  /** In-app navigation; without it the related links fall back to normal page loads. */
  onNavigate?: (view: View) => void;
}

const NAV_LABEL_KEY = new Map<View, string>(NAV_GROUPS.flatMap(g => g.items.map(i => [i.id, i.label] as const)));

function Section({ s }: { s: GuideSection }) {
  return (
    <div className="space-y-3">
      <h2 className="text-lg font-bold text-white">{s.heading}</h2>
      {s.paragraphs?.map((p, i) => (
        <p key={i} className="text-sm text-[var(--color-text-muted)] leading-relaxed">{p}</p>
      ))}
      {s.list && (
        <ul className="space-y-1.5">
          {s.list.map((item, i) => (
            <li key={i} className="flex gap-2 text-sm text-[var(--color-text)] leading-relaxed">
              <span className="text-[var(--color-accent)]">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}
      {s.table && (
        <div className="overflow-x-auto rounded-2xl border border-[var(--color-border)]">
          <table className="w-full text-sm">
            {s.table.caption && (
              <caption className="text-left text-xs text-[var(--color-text-muted)] px-4 pt-3 pb-1">{s.table.caption}</caption>
            )}
            <thead>
              <tr className="text-left text-xs text-[var(--color-text-muted)] border-b border-[var(--color-border)]">
                {s.table.head.map((h) => (
                  <th key={h} scope="col" className="px-4 py-2.5 font-semibold whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {s.table.rows.map((row, r) => (
                <tr key={r} className="border-b border-[var(--color-border)] last:border-0">
                  {row.map((cell, c) => (
                    <td key={c} className={`px-4 py-2.5 ${c === 0 ? 'text-white' : 'text-[var(--color-text-muted)]'}`}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {s.note && <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">{s.note}</p>}
    </div>
  );
}

/** Intro, sections, how-to, FAQ and related tools shown at the bottom of each page. */
export default function ToolGuide({ view, onNavigate }: Props) {
  const { t, i18n } = useTranslation();
  const guide = TOOL_GUIDES[view];
  if (!guide) return null;
  const isZh = i18n.language === 'zh-TW';
  const g = isZh ? guide.zh : guide.en;

  return (
    <section aria-labelledby="tool-guide-heading" className="mt-16 pt-10 border-t border-[var(--color-border)] space-y-10 max-w-3xl">
      <div className="space-y-4">
        <h2 id="tool-guide-heading" className="text-lg font-bold text-white flex items-center gap-2">
          <ListOrdered size={18} className="text-[var(--color-accent)]" /> {t('toolGuide.howTo')}
        </h2>
        <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">{g.intro}</p>
        {g.steps.length > 0 && (
          <ol className="space-y-2">
            {g.steps.map((step, i) => (
              <li key={i} className="flex gap-3 text-sm text-[var(--color-text)] leading-relaxed">
                <span className="shrink-0 w-6 h-6 rounded-full bg-[var(--color-accent-dim)] text-[var(--color-accent)] text-xs font-bold flex items-center justify-center">{i + 1}</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        )}
      </div>

      {g.sections?.map((s) => <Section key={s.heading} s={s} />)}

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

      {guide.related && guide.related.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Link2 size={18} className="text-[var(--color-accent)]" /> {t('toolGuide.related')}
          </h2>
          <ul className="space-y-2">
            {guide.related.map((r) => {
              const page = pageForView(r.view);
              const labelKey = NAV_LABEL_KEY.get(r.view);
              const label = isZh || !labelKey ? page.heading : t(labelKey);
              return (
                <li key={r.view} className="text-sm leading-relaxed">
                  <a
                    href={page.path}
                    onClick={(e) => {
                      if (!onNavigate || isModifiedClick(e)) return;
                      e.preventDefault();
                      onNavigate(r.view);
                      document.getElementById('main-content')?.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="text-[var(--color-accent)] hover:underline font-medium"
                  >
                    {label}
                  </a>
                  {isZh && <span className="text-[var(--color-text-muted)]">：{r.note}</span>}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </section>
  );
}
