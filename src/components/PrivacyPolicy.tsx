import React from 'react';
import { ShieldCheck, Cookie } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { CONTACT_EMAIL, PRIVACY_UPDATED } from '../constants/site';
import { openConsentSettings } from '../utils/consent';

interface Section {
  title: string;
  paragraphs?: string[];
  items?: string[];
}

const CONTENT: Record<'zh' | 'en', { title: string; intro: string; sections: Section[] }> = {
  zh: {
    title: '隱私權政策',
    intro: '艾歐澤亞助手（ff14-tw.xyz，以下稱「本站」）是 FF14 玩家自發製作的非官方工具網站。本政策說明本站會處理哪些資料、使用哪些第三方服務，以及你可以如何控制這些設定。',
    sections: [
      {
        title: '本站不會收集的資料',
        paragraphs: [
          '本站沒有會員系統，不需要註冊或登入，也不會要求你提供姓名、電子郵件、遊戲帳號等個人資料。本站沒有自己的資料庫，不會把你在網站上的操作傳回本站的伺服器。',
        ],
      },
      {
        title: '儲存在你瀏覽器裡的資料',
        paragraphs: ['為了記住你的設定，本站會使用瀏覽器的 localStorage 儲存以下資料，這些資料只存在你的裝置上：'],
        items: [
          '任務進度的勾選狀態與完成時間',
          '自訂鬧鐘、活動行事曆中你自己新增的活動',
          '市場查詢的常用清單、陸行鳥染色進度、探索筆記完成紀錄',
          '介面語言，以及你對 Cookie 與廣告的選擇',
          '官方活動資料的暫存（加快載入用）',
        ],
      },
      {
        title: '廣告與 Cookie',
        paragraphs: [
          '本站使用 Google AdSense 顯示廣告，以支持網站的維運費用。Google 及其合作夥伴可能會使用 Cookie 或類似技術，依照你造訪本站與其他網站的紀錄提供廣告，並衡量廣告成效。',
          '你可以隨時透過下方的「Cookie 設定」改變選擇：選擇「僅必要」後，本站會要求 Google 只顯示不使用個人化資料的廣告。你也可以到 Google 的「廣告設定」(adssettings.google.com) 管理個人化廣告。更多說明請參考 Google 的「Google 如何使用合作夥伴網站或應用程式的資訊」(policies.google.com/technologies/partner-sites)。',
          '若你位於歐洲經濟區、英國或瑞士，在你同意之前，本站預設不會允許廣告 Cookie。',
        ],
      },
      {
        title: '本站使用的第三方服務',
        paragraphs: ['為了提供各項功能，你的瀏覽器會直接連線到下列服務。這些服務可能會依其各自的隱私權政策記錄你的 IP 位址、瀏覽器資訊等連線紀錄：'],
        items: [
          'Cloudflare：網站代管與傳輸',
          'Google AdSense：廣告；Google Fonts：網頁字型',
          'Universalis：市場查詢的道具價格資料',
          'XIVAPI：道具圖示',
          '肥肥咖啡（FFCafe）互動地圖程式庫（由 code.bdstatic.com 提供）',
          '道具資訊懸浮窗程式庫（由 unpkg.com 提供）',
          'Ko-fi：贊助按鈕圖片',
        ],
      },
      {
        title: '你的選擇',
        items: [
          '隨時用下方按鈕重新選擇是否允許廣告 Cookie。',
          '清除瀏覽器的網站資料，就能刪除本站儲存在你裝置上的所有資料；清除前可以先用側邊欄的「匯出資料」備份。',
          '多數瀏覽器都可以封鎖或刪除 Cookie，請參考你所使用瀏覽器的說明。',
        ],
      },
      {
        title: '政策更新',
        paragraphs: ['本站可能會因功能或法規調整而更新本政策，更新後會修改本頁的「最後更新日期」。'],
      },
    ],
  },
  en: {
    title: 'Privacy Policy',
    intro: 'Eorzea Utility Hub (ff14-tw.xyz, “the site”) is an unofficial, fan-made FFXIV toolbox. This policy explains what data the site handles, which third-party services it uses and how you can control them.',
    sections: [
      {
        title: 'What we do not collect',
        paragraphs: [
          'There are no accounts and no sign-in. The site never asks for your name, email or game account, has no database of its own and does not send what you do on the site back to our servers.',
        ],
      },
      {
        title: 'Data stored in your browser',
        paragraphs: ['To remember your settings, the site uses your browser’s localStorage. This data stays on your device:'],
        items: [
          'Task Progress ticks and completion times',
          'Custom alarms and events you add to the calendar',
          'Market watchlist, chocobo dye progress and sightseeing log progress',
          'Interface language and your cookie / ad choice',
          'A cache of official event data to speed up loading',
        ],
      },
      {
        title: 'Advertising and cookies',
        paragraphs: [
          'The site shows ads through Google AdSense to cover running costs. Google and its partners may use cookies or similar technologies to serve ads based on your visits to this and other sites, and to measure ad performance.',
          'You can change your choice at any time with “Cookie settings” below. If you choose “Necessary only”, the site asks Google to show only non-personalised ads. You can also manage personalised ads at Google Ad Settings (adssettings.google.com). See “How Google uses information from sites or apps that use our services” (policies.google.com/technologies/partner-sites).',
          'If you are in the European Economic Area, the UK or Switzerland, ad cookies are off by default until you agree.',
        ],
      },
      {
        title: 'Third-party services',
        paragraphs: ['To provide its features, your browser connects directly to the services below, which may log connection data such as your IP address and browser under their own privacy policies:'],
        items: [
          'Cloudflare: hosting and delivery',
          'Google AdSense: ads; Google Fonts: web fonts',
          'Universalis: market price data',
          'XIVAPI: item icons',
          'FFCafe interactive map library (served from code.bdstatic.com)',
          'Item tooltip library (served from unpkg.com)',
          'Ko-fi: donation button image',
        ],
      },
      {
        title: 'Your choices',
        items: [
          'Use the button below to change your ad cookie choice at any time.',
          'Clearing your browser’s site data removes everything the site stored on your device; use “Export data” in the sidebar first if you want a backup.',
          'Most browsers let you block or delete cookies — see your browser’s help pages.',
        ],
      },
      {
        title: 'Changes to this policy',
        paragraphs: ['We may update this policy when features or regulations change; the “last updated” date below will change accordingly.'],
      },
    ],
  },
};

export default function PrivacyPolicy() {
  const { t, i18n } = useTranslation();
  const c = i18n.language === 'zh-TW' ? CONTENT.zh : CONTENT.en;

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
