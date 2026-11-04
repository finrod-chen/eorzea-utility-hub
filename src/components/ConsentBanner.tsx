import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cookie } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { getConsent, setConsent, OPEN_CONSENT_EVENT, type ConsentChoice } from '../utils/consent';

interface Props {
  onOpenPrivacy: () => void;
}

/** Bottom consent card: shown until the visitor chooses, re-openable from the privacy page. */
export default function ConsentBanner({ onOpenPrivacy }: Props) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(() => getConsent() === null);

  useEffect(() => {
    const reopen = () => setOpen(true);
    window.addEventListener(OPEN_CONSENT_EVENT, reopen);
    return () => window.removeEventListener(OPEN_CONSENT_EVENT, reopen);
  }, []);

  const choose = (c: ConsentChoice) => {
    setConsent(c);
    setOpen(false);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-live="polite"
          aria-labelledby="consent-title"
          aria-describedby="consent-desc"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-4 left-4 right-4 lg:left-auto lg:right-6 lg:bottom-6 lg:max-w-md z-[60] bg-[var(--color-surface)] border border-[var(--color-border)] rounded-3xl shadow-2xl shadow-black/50 p-5"
        >
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-[var(--color-accent-dim)] flex items-center justify-center shrink-0">
              <Cookie size={18} className="text-[var(--color-accent)]" />
            </div>
            <div className="space-y-1.5">
              <h2 id="consent-title" className="text-sm font-bold text-white">{t('consent.title')}</h2>
              <p id="consent-desc" className="text-xs text-[var(--color-text-muted)] leading-relaxed">
                {t('consent.body')}{' '}
                <a
                  href="/privacy"
                  onClick={(e) => { e.preventDefault(); onOpenPrivacy(); }}
                  className="text-[var(--color-accent)] hover:underline"
                >
                  {t('consent.policyLink')}
                </a>
              </p>
            </div>
          </div>
          <div className="mt-4 flex gap-2">
            <button
              onClick={() => choose('denied')}
              className="flex-1 px-4 py-2.5 rounded-xl bg-[var(--color-bg)] border border-[var(--color-border)] text-sm text-[var(--color-text)] hover:bg-[var(--color-border)] transition-colors"
            >
              {t('consent.reject')}
            </button>
            <button
              onClick={() => choose('granted')}
              className="flex-1 px-4 py-2.5 rounded-xl bg-[var(--color-accent)] text-[#0E0E10] text-sm font-semibold hover:brightness-110 transition-all"
            >
              {t('consent.accept')}
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
