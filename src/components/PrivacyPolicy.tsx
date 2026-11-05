import React from 'react';
import { ShieldCheck, Cookie } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { CONTACT_EMAIL, PRIVACY_UPDATED } from '../constants/site';
import { PRIVACY_CONTENT } from '../constants/privacy';
import { openConsentSettings } from '../utils/consent';

export default function PrivacyPolicy() {
  const { t, i18n } = useTranslation();
  const c = i18n.language === 'zh-TW' ? PRIVACY_CONTENT.zh : PRIVACY_CONTENT.en;

  return (
    <article className="space-y-10 max-w-3xl">
      <header className="space-y-3">
        <div className="flex items-center gap-2 text-[var(--color-accent)]">
          <ShieldCheck size={18} />
          <span className="text-xs font-bold uppercase tracking-widest">Privacy</span>
        </div>
        <h1 className="text-3xl font-bold text-white">{c.title}</h1>
        <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">{c.intro}</p>
      </header>

      {c.sections.map((s) => (
        <section key={s.title} className="space-y-3">
          <h2 className="text-lg font-bold text-white flex items-center gap-3">
            <span className="h-1 w-6 bg-[var(--color-accent)] rounded-full" />
            {s.title}
          </h2>
          {s.paragraphs?.map((p, i) => (
            <p key={i} className="text-sm text-[var(--color-text-muted)] leading-relaxed">{p}</p>
          ))}
          {s.items && (
            <ul className="space-y-1.5">
              {s.items.map((it) => (
                <li key={it} className="text-sm text-[var(--color-text)] flex gap-2 leading-relaxed">
                  <span className="text-[var(--color-accent)]">•</span>{it}
                </li>
              ))}
            </ul>
          )}
        </section>
      ))}

      <section className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-3xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Cookie size={16} className="text-[var(--color-accent)]" /> {t('consent.settingsTitle')}
          </h2>
          <p className="text-xs text-[var(--color-text-muted)]">{t('consent.settingsDesc')}</p>
        </div>
        <button
          onClick={openConsentSettings}
          className="shrink-0 px-5 py-2.5 rounded-xl bg-[var(--color-accent)] text-[#0E0E10] text-sm font-semibold hover:brightness-110 transition-all"
        >
          {t('consent.settingsButton')}
        </button>
      </section>

      <footer className="space-y-1 text-xs text-[var(--color-text-muted)] border-t border-[var(--color-border)] pt-6">
        <p>
          {t('consent.contact')}{' '}
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-[var(--color-accent)] hover:underline">{CONTACT_EMAIL}</a>
        </p>
        <p>{t('consent.lastUpdated', { date: PRIVACY_UPDATED })}</p>
      </footer>
    </article>
  );
}
