export interface Task {
  id: string;
  label: string;
  category: 'daily' | 'weekly';
  reward?: string;
  resetDay?: number; // 0-6 for weekly, null for daily
}

export const INITIAL_TASKS: Task[] = [
  // Dailies
  { id: 'daily-roulette', label: '每日隨機任務 (Roulettes)', category: 'daily', reward: '軍票 / 詩學 / 經驗值' },
  { id: 'daily-beast-tribe', label: '蠻族任務 (Beast Tribe Quests)', category: 'daily', reward: '聲望 / 貨幣' },
  { id: 'daily-gc-turnin', label: '軍團籌備任務 (GC Turn-ins)', category: 'daily', reward: '軍票 / 經驗值' },
  { id: 'daily-squadron', label: '冒險者小隊訓練 (Squadron Training)', category: 'daily', reward: '小隊經驗值 / 屬性提升' },
  { id: 'daily-retainer', label: '雇員冒險 (Retainer Ventures)', category: 'daily', reward: '各式材料 / 裝備' },
  { id: 'daily-mini-cactpot', label: '仙人微彩 (Mini Cactpot)', category: 'daily', reward: 'MGP' },
  { id: 'daily-treasure-map', label: '挖寶 (Treasure Map)', category: 'daily', reward: '稀有材料 / 金幣' },
  
  // Weeklies
  { id: 'weekly-wondrous-tails', label: '庫洛天書 (Wondrous Tails)', category: 'weekly', reward: '詩學 / 經驗值 / 獎牌', resetDay: 2 },
  { id: 'weekly-custom-deliveries', label: '老主顧交易 (Custom Deliveries)', category: 'weekly', reward: '黃貨 / 白貨', resetDay: 2 },
  { id: 'weekly-fashions-report', label: '時尚配件 (Fashion Report)', category: 'weekly', reward: 'MGP', resetDay: 5 },
  { id: 'weekly-doman-enclave', label: '多瑪復興 (Doman Enclave)', category: 'weekly', reward: '金幣 (200% 售價)', resetDay: 2 },
  { id: 'weekly-jumbo-cactpot', label: '仙人彩 (Jumbo Cactpot)', category: 'weekly', reward: 'MGP', resetDay: 6 },
  { id: 'weekly-challenge-log', label: '挑戰筆記 (Challenge Log)', category: 'weekly', reward: '金幣 / MGP / 經驗值', resetDay: 2 },
  { id: 'weekly-raid-drops', label: '零式/大型副本週限制 (Raid Loot)', category: 'weekly', reward: '裝備 / 升級材料', resetDay: 2 },
];
