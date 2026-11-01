export interface Alarm {
  id: string;
  label: string;
  targetTime: Date;
  active: boolean;
  isReset: boolean;
  durationHours?: number;
  offsetMinutes?: number;
}

export interface EorzeaTime {
  hours: number;
  minutes: number;
  totalHours: number;
}

export type View =
  | 'home' | 'cactpot' | 'tails' | 'weather' | 'sightseeing'
  | 'changelog' | 'chocobo' | 'checklist' | 'guide' | 'market'
  | 'links' | 'treasure' | 'alarm' | 'event-calendar' | 'interactive-maps';
