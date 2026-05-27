import React, { useState, useEffect } from 'react';
import { Bell, Clock, Trash2, CalendarDays, CalendarRange, FileText, Anchor, Briefcase, Compass, Sword, ShieldCheck, Volume2 } from 'lucide-react';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';

import { Alarm } from '../types';

interface SetAlarmProps {
  alarms: Alarm[];
  setAlarms: React.Dispatch<React.SetStateAction<Alarm[]>>;
  now: Date;
}

interface AlarmDef {
  labelKey: string;   // i18n key for display
  labelCn: string;    // Chinese label for includes() logic
  isReset?: boolean;
  duration?: number;
  offsetMinutes?: number;
  icon: React.ComponentType<{ size: number }>;
  color: string;
}

export default function SetAlarm({ alarms, setAlarms, now }: SetAlarmProps) {
  const { t } = useTranslation();

  const formatCountdown = (target: Date) => {
    const diff = target.getTime() - now.getTime();
    if (diff <= 0) return t('setAlarm.timeUp');
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    return `${days > 0 ? days + t('setAlarm.day') : ''}${hours}${t('setAlarm.hour')} ${minutes}${t('setAlarm.min')} ${seconds}${t('setAlarm.sec')}`;
  };

  const getDailyReset = () => {
    const reset = new Date(now);
    reset.setUTCHours(15, 0, 0, 0);
    if (now > reset) reset.setUTCDate(reset.getUTCDate() + 1);
    return reset;
  };

  const getWeeklyReset = () => {
    const reset = new Date(now);
    reset.setUTCHours(8, 0, 0, 0);
    const currentDay = reset.getUTCDay();
    let daysUntilTuesday = (2 - currentDay + 7) % 7;
    if (daysUntilTuesday === 0 && now > reset) daysUntilTuesday = 7;
    reset.setUTCDate(reset.getUTCDate() + daysUntilTuesday);
    return reset;
  };

  const getLevequestReset = () => {
    const nowGmt8 = new Date(now.getTime() + (8 * 60 * 60 * 1000));
    const reset1 = new Date(nowGmt8);
    reset1.setUTCHours(8, 0, 0, 0);
    const reset2 = new Date(nowGmt8);
    reset2.setUTCHours(20, 0, 0, 0);
    let nextReset = reset1;
    if (nowGmt8 >= reset1 && nowGmt8 < reset2) nextReset = reset2;
    else if (nowGmt8 >= reset2) nextReset = new Date(reset1.getTime() + 24 * 60 * 60 * 1000);
    return new Date(nextReset.getTime() - (8 * 60 * 60 * 1000));
  };

  const getOceanFishingDeparture = () => {
    const nowGmt8 = new Date(now.getTime() + (8 * 60 * 60 * 1000));
    const hour = nowGmt8.getUTCHours();
    const nextDepartureHour = (Math.floor(hour / 2) + 1) * 2;
    const departure = new Date(nowGmt8);
    departure.setUTCHours(nextDepartureHour % 24, 0, 0, 0);
    if (nextDepartureHour >= 24) departure.setUTCDate(departure.getUTCDate() + 1);
    return new Date(departure.getTime() - (8 * 60 * 60 * 1000));
  };

  const toggleAlarm = (def: AlarmDef) => {
    // Match by stable i18n key (new alarms) OR legacy Chinese label (backward compat).
    const existing = alarms.find(a => a.label === def.labelKey || a.label === def.labelCn);
    if (existing) {
      setAlarms(prev => prev.filter(a => a.id !== existing.id));
    } else {
      let targetTime: Date;
      if (def.isReset) {
        if (def.labelKey.includes('dailyReset'))   targetTime = getDailyReset();
        else if (def.labelKey.includes('weeklyReset')) targetTime = getWeeklyReset();
        else if (def.labelKey.includes('gcSupply'))    targetTime = getLevequestReset();
        else if (def.labelKey.includes('fishing'))     targetTime = new Date(getOceanFishingDeparture().getTime() - (def.offsetMinutes || 0) * 60 * 1000);
        else targetTime = new Date();
      } else {
        targetTime = new Date(new Date().getTime() + (def.duration || 0) * 60 * 60 * 1000);
      }
      // Store the i18n key as the stable label — displayed via t(alarm.label).
      setAlarms(prev => [...prev, { id: crypto.randomUUID(), label: def.labelKey, targetTime, active: true, isReset: !!def.isReset }]);
    }
  };

  const alarmDefinitions: AlarmDef[] = [
    { labelKey: 'setAlarm.dailyReset',  labelCn: '每日任務重設提醒',   isReset: true, icon: CalendarDays,   color: 'text-amber-500' },
    { labelKey: 'setAlarm.weeklyReset', labelCn: '每週任務重設提醒',   isReset: true, icon: CalendarRange,  color: 'text-rose-500' },
    { labelKey: 'setAlarm.gcSupply',    labelCn: '理符受理限額補充提醒', isReset: true, icon: FileText,      color: 'text-sky-500' },
    { labelKey: 'setAlarm.fishingReady', labelCn: '出海垂釣準備',       isReset: true, icon: Anchor,        color: 'text-indigo-500' },
    { labelKey: 'setAlarm.gathering',   labelCn: '雇員籌集委託',        duration: 1,  icon: Briefcase,     color: 'text-emerald-500' },
    { labelKey: 'setAlarm.exploration', labelCn: '雇員探索委託',        duration: 18, icon: Compass,       color: 'text-amber-500' },
    { labelKey: 'setAlarm.free',        labelCn: '雇員自由委託',        duration: 1,  icon: Briefcase,     color: 'text-emerald-500' },
    { labelKey: 'setAlarm.squadTraining', labelCn: '冒險者小隊訓練',    duration: 1,  icon: Sword,         color: 'text-rose-500' },
    { labelKey: 'setAlarm.squadMission', labelCn: '冒險者小隊分隊任務', duration: 18, icon: ShieldCheck,   color: 'text-sky-500' },
  ];

  const requestPermission = () => {
    if (typeof Notification !== 'undefined') {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          alert(t('setAlarm.notificationsOn'));
        } else {
          alert(t('setAlarm.notificationsOff'));
        }
      });
    }
  };

  const testNotification = () => {
    if (typeof Notification !== 'undefined' && Notification.permission === 'granted') {
      new Notification(t('setAlarm.appName') + ' - ' + t('setAlarm.testNotification'), {
        body: t('setAlarm.testMessage'),
        icon: '/logo.png'
      });
    } else {
      alert(t('setAlarm.browserNotSupported'));
    }
    try {
      const audio = new Audio('/audio/alarm.mp3');
      audio.volume = 0.5;
      audio.play().catch(() => {});
    } catch {
      // Audio playback blocked by browser — silent fail is acceptable
    }
  };

  return (
    <div className="space-y-8">
      <header className="space-y-4">
        <div className="flex items-center gap-3">
          <img src="/tools/SetAlarm.png" alt="" className="w-6 h-6 object-contain" referrerPolicy="no-referrer" />
          <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-[#D39E47]">{t('setAlarm.customAlarm')}</h2>
        </div>
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-4">
            <h1 className="text-4xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
              {t('setAlarm.title1')} <span className="text-[#D39E47]">{t('setAlarm.title2')}</span>
            </h1>
            <p className="text-[#9e9e9e] max-w-2xl">
              {t('setAlarm.subtitle')}
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={requestPermission}
              className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-bold text-white transition-colors flex items-center gap-2"
            >
              <Bell size={14} /> {t('setAlarm.enableNotifications')}
            </button>
            <button
              onClick={testNotification}
              className="px-4 py-2 bg-[#D39E47]/10 hover:bg-[#D39E47]/20 border border-[#D39E47]/20 rounded-xl text-xs font-bold text-[#D39E47] transition-colors flex items-center gap-2"
            >
              <Volume2 size={14} /> {t('setAlarm.testNotification')}
            </button>
          </div>
        </div>
        <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-2xl">
          <p className="text-xs text-amber-200 leading-relaxed">
            <span className="font-bold">{t('setAlarm.infoTitle')}：</span> {t('setAlarm.browserNotSupported')}
          </p>
        </div>
      </header>

      <div className="space-y-2">
        {alarmDefinitions.map((def, i) => {
          // Match by stable i18n key (new) or legacy Chinese label (backward compat).
          const alarm = alarms.find(a => a.label === def.labelKey || a.label === def.labelCn);
          return (
            <div key={i} className="bg-[#1a1a1a] border border-white/5 rounded-xl p-4 flex items-center justify-between hover:border-white/10 transition-colors">
              <div className="flex items-center gap-4">
                <div className={`p-2 bg-white/5 rounded-lg ${def.color}`}>
                  <def.icon size={20} />
                </div>
                <div className="flex flex-col">
                  <h4 className="font-bold text-white">{t(def.labelKey)}</h4>
                  <span className="text-sm font-mono text-[#9e9e9e] md:hidden">
                    {alarm?.active ? formatCountdown(alarm.targetTime) : '--:--:--'}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm font-mono text-[#9e9e9e] hidden md:block">
                  {alarm?.active ? formatCountdown(alarm.targetTime) : '--:--:--'}
                </span>
                <button
                  onClick={() => toggleAlarm(def)}
                  className={`w-12 h-6 rounded-full transition-colors relative ${alarm?.active ? 'bg-emerald-500' : 'bg-gray-600'}`}
                >
                  <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-all ${alarm?.active ? 'left-7' : 'left-1'}`} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
