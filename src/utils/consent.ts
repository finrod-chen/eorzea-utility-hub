/**
 * Cookie / ad consent (Google Consent Mode v2).
 *
 * index.html sets the *default* consent state before AdSense loads:
 *   - a saved choice wins;
 *   - otherwise EEA / UK / CH default to "denied", everywhere else to "granted".
 * This module records the visitor's choice and sends the consent update.
 */
export type ConsentChoice = 'granted' | 'denied';

export const CONSENT_KEY = 'ff14-consent';
export const OPEN_CONSENT_EVENT = 'ff14:open-consent';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function getConsent(): ConsentChoice | null {
  try {
    const v = localStorage.getItem(CONSENT_KEY);
    return v === 'granted' || v === 'denied' ? v : null;
  } catch {
    return null;
  }
}

export function setConsent(choice: ConsentChoice) {
  try { localStorage.setItem(CONSENT_KEY, choice); } catch { /* private mode */ }
  const gtag = window.gtag ?? ((...args: unknown[]) => { (window.dataLayer ??= []).push(args); });
  gtag('consent', 'update', {
    ad_storage: choice,
    ad_user_data: choice,
    ad_personalization: choice,
    analytics_storage: choice,
  });
}

/** Re-open the consent banner (used by the privacy page's "cookie settings" button). */
export function openConsentSettings() {
  window.dispatchEvent(new Event(OPEN_CONSENT_EVENT));
}
