/**
 * Current patch on the Traditional Chinese (繁中服) data centre.
 * Update this file when the TC server moves to a new patch — the Dashboard reads it.
 *
 * To show a banner image, put it in /public/patch/ and set `image`.
 */
export interface PatchInfo {
  version: string;
  /** Major patch the current minor belongs to, e.g. 7.25 → 7.2 */
  series: string;
  title: { zh: string; en: string };
  /** Release date of the major patch on the TC server (YYYY-MM-DD). */
  seriesReleasedAt: string;
  highlights: { zh: string[]; en: string[] };
  image?: string;
  specialUrl: string;
  notesUrl: string;
}

export const CURRENT_PATCH: PatchInfo = {
  version: '7.25',
  series: '7.2',
  title: { zh: '探究永久之人', en: 'Seekers of Eternity' },
  seriesReleasedAt: '2026-07-28',
  highlights: {
    zh: [
      '7.25：蜃景幻界 新月島：南征之章',
      '7.25：幻影武器強化任務',
      '7.25：新友好部族任務、希爾迪布蘭德新篇章',
      '7.2：主線「探究永久之人」、澤蓮尼亞殲滅戰、紛爭前線新地圖',
    ],
    en: [
      '7.25: Occult Crescent: South Horn',
      '7.25: Phantom relic weapon quests',
      '7.25: New allied society quests and the next Hildibrand chapter',
      '7.2: “Seekers of Eternity” main story, Zelenia trial, new Frontline map',
    ],
  },
  image: '/patch/7-25.webp',
  specialUrl: 'https://www.ffxiv.com.tw/web/special/dawntrail/patch_7_2/',
  notesUrl: 'https://www.ffxiv.com.tw/web/special/patchnote_log/patch_7.25_notes.html',
};
