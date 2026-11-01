import type { ResetKind } from '../utils/resets';

export interface Task {
  id: string;
  label: string;
  labelEn: string;
  category: 'daily' | 'weekly';
  reward?: string;
  rewardEn?: string;
  /** Which server reset clears this task. Defaults to the task's category. */
  reset?: ResetKind;
}

export const INITIAL_TASKS: Task[] = [
  // Dailies
  { id: 'daily-roulette', label: '每日隨機任務', labelEn: 'Daily Roulettes', category: 'daily', reward: '神典石 / 經驗值 / 金幣', rewardEn: 'Tomestones / EXP / Gil' },
  { id: 'daily-beast-tribe', label: '蠻族任務', labelEn: 'Beast Tribe Quests', category: 'daily', reset: 'gc', reward: '聲望 / 貨幣', rewardEn: 'Reputation / Currency' },
  { id: 'daily-gc-turnin', label: '軍團籌備任務', labelEn: 'GC Turn-ins', category: 'daily', reset: 'gc', reward: '軍票 / 經驗值', rewardEn: 'Grand Company Seals / EXP' },
  { id: 'daily-squadron', label: '冒險者小隊訓練', labelEn: 'Squadron Training', category: 'daily', reset: 'gc', reward: '小隊經驗值 / 屬性提升', rewardEn: 'Squadron EXP / Stat Growth' },
  { id: 'daily-retainer', label: '雇員冒險', labelEn: 'Retainer Ventures', category: 'daily', reward: '各式材料 / 裝備', rewardEn: 'Misc. Materials / Equipment' },
  { id: 'daily-mini-cactpot', label: '仙人微彩', labelEn: 'Mini Cactpot', category: 'daily', reward: 'MGP', rewardEn: 'MGP' },
  { id: 'daily-treasure-map', label: '挖寶', labelEn: 'Treasure Map', category: 'daily', reward: '稀有材料 / 金幣', rewardEn: 'Rare Materials / Gil' },

  // Weeklies
  { id: 'weekly-wondrous-tails', label: '庫洛天書', labelEn: 'Wondrous Tails', category: 'weekly', reward: '詩學 / 經驗值 / MGP', rewardEn: 'Poetics / EXP / MGP' },
  { id: 'weekly-custom-deliveries', label: '老主顧交易', labelEn: 'Custom Deliveries', category: 'weekly', reward: '工票 / 經驗值 / 金幣', rewardEn: 'Scrips / EXP / Gil' },
  { id: 'weekly-fashions-report', label: '時尚配件', labelEn: 'Fashion Report', category: 'weekly', reward: 'MGP', rewardEn: 'MGP' },
  { id: 'weekly-doman-enclave', label: '多瑪復興', labelEn: 'Doman Enclave', category: 'weekly', reward: '金幣 (200% 售價)', rewardEn: 'Gil (200% sale price)' },
  { id: 'weekly-jumbo-cactpot', label: '仙人彩', labelEn: 'Jumbo Cactpot', category: 'weekly', reward: 'MGP', rewardEn: 'MGP' },
  { id: 'weekly-challenge-log', label: '挑戰筆記', labelEn: 'Challenge Log', category: 'weekly', reward: '金幣 / MGP / 經驗值', rewardEn: 'Gil / MGP / EXP' },
  { id: 'weekly-raid-drops', label: '零式/大型副本週限制', labelEn: 'Raid Loot Lockouts', category: 'weekly', reward: '裝備 / 升級材料', rewardEn: 'Equipment / Upgrade Materials' },
];
