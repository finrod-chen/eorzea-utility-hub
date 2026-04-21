import React, { useState, useEffect } from 'react';
import { Clock, Calendar, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';

interface ResetCountdownProps {
  dailyProgress?: { done: number; total: number };
  weeklyProgress?: { done: number; total: number };
}

export default function ResetCountdown({ dailyProgress, weeklyProgress }: ResetCountdownProps) {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const getDailyReset = () => {
    // Daily reset at 23:00 GMT+8
    const reset = new Date(now);
    reset.setUTCHours(15, 0, 0, 0); // 15:00 UTC is 23:00 GMT+8
    if (now > reset) {
      reset.setUTCDate(reset.getUTCDate() + 1);
    }
    return reset;
  };

  const getWeeklyReset = () => {
    // Weekly reset at Tuesday 16:00 GMT+8 (08:00 UTC)
    const reset = new Date(now);
    reset.setUTCHours(8, 0, 0, 0);
    
    // Day 2 is Tuesday
    const currentDay = reset.getUTCDay();
    let daysUntilTuesday = (2 - currentDay + 7) % 7;
    
    if (daysUntilTuesday === 0 && now > reset) {
      daysUntilTuesday = 7;
    }
    
    reset.setUTCDate(reset.getUTCDate() + daysUntilTuesday);
    return reset;
  };

  const formatCountdown = (target: Date) => {
    const diff = target.getTime() - now.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    const parts = [];
    if (hours > 0) parts.push(`${hours}h`);
    parts.push(`${minutes}m`);
    parts.push(`${seconds}s`);
    
    return parts.join(' ');
  };

  const getLevequestReset = () => {
    // Levequest allowance restoration at 08:00 and 20:00 GMT+8
    const nowGmt8 = new Date(now.getTime() + (8 * 60 * 60 * 1000));
    const reset1 = new Date(nowGmt8);
    reset1.setUTCHours(8, 0, 0, 0);
    const reset2 = new Date(nowGmt8);
    reset2.setUTCHours(20, 0, 0, 0);
    
    let nextReset = reset1;
    if (nowGmt8 >= reset1 && nowGmt8 < reset2) {
      nextReset = reset2;
    } else if (nowGmt8 >= reset2) {
      nextReset = new Date(reset1.getTime() + 24 * 60 * 60 * 1000);
    }
    
    // Convert back to local time (or just return the target time)
    return new Date(nextReset.getTime() - (8 * 60 * 60 * 1000));
  };

  const getOceanFishingDeparture = () => {
    // Ocean fishing departs every 2 hours (00:00, 02:00, ..., 22:00 GMT+8)
    const nowGmt8 = new Date(now.getTime() + (8 * 60 * 60 * 1000));
    const hour = nowGmt8.getUTCHours();
    const nextDepartureHour = (Math.floor(hour / 2) + 1) * 2;
    
    const departure = new Date(nowGmt8);
    departure.setUTCHours(nextDepartureHour % 24, 0, 0, 0);
    if (nextDepartureHour >= 24) {
      departure.setUTCDate(departure.getUTCDate() + 1);
    }
    
    return new Date(departure.getTime() - (8 * 60 * 60 * 1000));
  };

  const dailyReset = getDailyReset();
  const weeklyReset = getWeeklyReset();
  const levequestReset = getLevequestReset();
  const oceanFishingDeparture = getOceanFishingDeparture();

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
            <h3 className="text-lg font-bold text-white">每日任務重設倒數</h3>
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
            <h3 className="text-lg font-bold text-white">每週任務重設倒數</h3>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xl font-mono font-medium text-indigo-400">
            {formatCountdown(weeklyReset)}
          </p>
          <p className="text-[10px] text-[#666]">週二 16:00 (GMT+8)</p>
        </div>
      </div>

      <div className="bg-[#1a1a1a] border border-white/5 rounded-2xl p-5 flex items-center justify-between group hover:border-amber-500/30 transition-colors">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-amber-500/10 rounded-xl flex items-center justify-center text-amber-500">
            <Clock size={20} />
          </div>
          <div>
            <p className="text-[10px] text-[#9e9e9e] uppercase font-bold tracking-widest">Levequest Allowance</p>
            <h3 className="text-lg font-bold text-white">理符受理限額補充</h3>
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
            <h3 className="text-lg font-bold text-white">出海垂釣時間</h3>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xl font-mono font-medium text-sky-500">
            {formatCountdown(oceanFishingDeparture)}
          </p>
          <p className="text-[10px] text-[#666]">每2小時一班 (GMT+8)</p>
        </div>
      </div>
    </div>
  );
}
