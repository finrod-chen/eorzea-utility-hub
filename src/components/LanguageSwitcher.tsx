import { useTranslation } from 'react-i18next';
import { languages } from '../i18n';

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const currentLang = languages.find(l => l.code === i18n.language) ?? languages[0];

  return (
    <div className="flex items-center gap-1 px-2 py-1.5 rounded-lg bg-[var(--color-bg)]">
      {languages.map(lang => (
        <button
          key={lang.code}
          onClick={() => i18n.changeLanguage(lang.code)}
          className={`
            flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-all
            ${i18n.language === lang.code
              ? 'bg-[var(--color-accent)] text-[#0E0E10] shadow-sm'
              : 'text-[var(--color-text-muted)] hover:text-white hover:bg-[var(--color-border)]'
            }
          `}
        >
          <span>{lang.flag}</span>
          <span>{lang.name}</span>
        </button>
      ))}
    </div>
  );
}
