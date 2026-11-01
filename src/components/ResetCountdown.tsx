import React from 'react';
import { getNextReset, getNextLevequestReset, getNextOceanFishing, formatCountdown as fmt } from '../utils/resets';
import { Clock, Calendar, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';

interface ResetCountdownProps {
  now: Date;
  dailyProgress?: { done: number; total: number };
  weeklyProgress?: { done: number; total: number };
}

export default function ResetCountdown({ now, dailyProgress, weeklyProgress }: ResetCountdownProps) {
  const { t } = useTranslation();
  const formatCountdown = (target: Date) => fmt(target, now);

  const dailyReset = getNextReset('daily', now);
  const weeklyReset = getNextReset('weekly', now);
  const levequestReset = getNextLevequestReset(now);
  const oceanFishingDeparture = getNextOceanFishing(now);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-[#1a1a1a] border border-white/5 rounded-2xl p-5 flex items-center justify-between group hover:border-emerald-500/30 transition-colors">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-500">
            <Clock size={20} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <p className="text-[10px] text-[#9e9e9e] uppercase font-bold tracking-widest">Daily Reset</p>
              {dailyProgress && (
                <span className="px-1.5 py-0.5 bg-emerald-500/10 text-emerald-500 text-[10px] font-bold rounded">
                  {dailyProgress.done}/{dailyProgress.total}
                </span>
              )}
            </div>
            <h3 className="text-lg font-bold text-white">{t('resetCountdown.daily')}</h3>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xl font-mono font-medium text-emerald-500">
            {formatCountdown(dailyReset)}
          </p>
          <p className="text-[10px] text-[#666]">23:00 (GMT+8)</p>
        </div>
      </div>

      <div className="bg-[#1a1a1a] border border-white/5 rounded-2xl p-5 flex items-center justify-between group hover:border-indigo-500/30 transition-colors">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-indigo-500/10 rounded-xl flex items-center justify-center text-indigo-400">
            <Calendar size={20} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <p className="text-[10px] text-[#9e9e9e] uppercase font-bold tracking-widest">Weekly Reset</p>
              {weeklyProgress && (
                <span className="px-1.5 py-0.5 bg-indigo-500/10 text-indigo-400 text-[10px] font-bold rounded">
                  {weeklyProgress.done}/{weeklyProgress.total}
                </span>
              )}
            </div>
            <h3 className="text-lg font-bold text-white">{t('resetCountdown.weekly')}</h3>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xl font-mono font-medium text-indigo-400">
            {formatCountdown(weeklyReset)}
          </p>
          <p className="text-[10px] text-[#666]">{t('resetCountdown.weeklyTime')}</p>
        </div>
      </div>

      <div className="bg-[#1a1a1a] border border-white/5 rounded-2xl p-5 flex items-center justify-between group hover:border-amber-500/30 transition-colors">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-amber-500/10 rounded-xl flex items-center justify-center text-amber-500">
            <Clock size={20} />
          </div>
          <div>
            <p className="text-[10px] text-[#9e9e9e] uppercase font-bold tracking-widest">Levequest Allowance</p>
            <h3 className="text-lg font-bold text-white">{t('resetCountdown.levequest')}</h3>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xl font-mono font-medium text-amber-500">
            {formatCountdown(levequestReset)}
          </p>
          <p className="text-[10px] text-[#666]">08:00 / 20:00 (GMT+8)</p>
        </div>
      </div>

      <div className="bg-[#1a1a1a] border border-white/5 rounded-2xl p-5 flex items-center justify-between group hover:border-sky-500/30 transition-colors">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-sky-500/10 rounded-xl flex items-center justify-center text-sky-500">
            <Clock size={20} />
          </div>
          <div>
            <p className="text-[10px] text-[#9e9e9e] uppercase font-bold tracking-widest">Ocean Fishing</p>
            <h3 className="text-lg font-bold text-white">{t('resetCountdown.oceanFishing')}</h3>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xl font-mono font-medium text-sky-500">
            {formatCountdown(oceanFishingDeparture)}
          </p>
          <p className="text-[10px] text-[#666]">{t('resetCountdown.oceanFishingTime')}</p>
        </div>
      </div>
    </div>
  );
}
