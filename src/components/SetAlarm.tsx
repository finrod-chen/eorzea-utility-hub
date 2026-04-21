import React, { useState, useEffect } from 'react';
import { Bell, Clock, Trash2, CalendarDays, CalendarRange, FileText, Anchor, Briefcase, Compass, Sword, ShieldCheck, Volume2 } from 'lucide-react';
import { motion } from 'motion/react';

import { Alarm } from '../types';

interface SetAlarmProps {
  alarms: Alarm[];
  setAlarms: React.Dispatch<React.SetStateAction<Alarm[]>>;
  now: Date;
}

export default function SetAlarm({ alarms, setAlarms, now }: SetAlarmProps) {

  const formatCountdown = (target: Date) => {
    const diff = target.getTime() - now.getTime();
    if (diff <= 0) return '時間已到';
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    return `${days > 0 ? days + '天 ' : ''}${hours}小時 ${minutes}分 ${seconds}秒`;
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

  const toggleAlarm = (def: any) => {
    const existing = alarms.find(a => a.label === def.label);
    if (existing) {
      setAlarms(prev => prev.filter(a => a.id !== existing.id));
    } else {
      let targetTime: Date;
      if (def.isReset) {
        if (def.label.includes('每日')) targetTime = getDailyReset();
        else if (def.label.includes('每週')) targetTime = getWeeklyReset();
        else if (def.label.includes('理符')) targetTime = getLevequestReset();
        else if (def.label.includes('出海')) targetTime = new Date(getOceanFishingDeparture().getTime() - (def.offsetMinutes || 0) * 60 * 1000);
        else targetTime = new Date();
      } else {
        // Correctly calculate target time from NOW for duration-based alarms
        targetTime = new Date(new Date().getTime() + (def.duration || 0) * 60 * 60 * 1000);
      }
      setAlarms(prev => [...prev, { id: Math.random().toString(36), label: def.label, targetTime, active: true, isReset: !!def.isReset }]);
    }
  };

  const alarmDefinitions = [
    { label: '每日任務重設提醒', isReset: true, icon: CalendarDays, color: 'text-amber-500' },
    { label: '每週任務重設提醒', isReset: true, icon: CalendarRange, color: 'text-rose-500' },
    { label: '理符受理限額補充提醒', isReset: true, icon: FileText, color: 'text-sky-500' },
    { label: '出海垂釣準備', isReset: true, icon: Anchor, color: 'text-indigo-500' },
    { label: '雇員籌集委託', duration: 1, icon: Briefcase, color: 'text-emerald-500' },
    { label: '雇員探索委託', duration: 18, icon: Compass, color: 'text-amber-500' },
    { label: '雇員自由委託', duration: 1, icon: Briefcase, color: 'text-emerald-500' },
    { label: '冒險者小隊訓練', duration: 1, icon: Sword, color: 'text-rose-500' },
    { label: '冒險者小隊分隊任務', duration: 18, icon: ShieldCheck, color: 'text-sky-500' },
  ];

  const requestPermission = () => {
    if (typeof Notification !== 'undefined') {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          alert('通知權限已開啟！');
        } else {
          alert('通知權限被拒絕，請在瀏覽器設定中手動開啟。');
        }
      });
    }
  };

  const testNotification = () => {
    // Test browser notification
    if (typeof Notification !== 'undefined' && Notification.permission === 'granted') {
      new Notification('艾歐澤亞助手 - 測試通知', {
        body: '這是一個測試通知，如果您看到這個，代表瀏覽器通知功能正常。',
        icon: '/logo.png'
      });
    } else {
      alert('瀏覽器通知權限尚未開啟，或您的瀏覽器不支援。');
    }

    // Test sound
    try {
      const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
      audio.volume = 0.5;
      audio.play().catch(e => console.log('Audio play blocked:', e));
    } catch (e) {}
  };

  return (
    <div className="space-y-8">
      <header className="space-y-4">
        <div className="flex items-center gap-3">
          <img src="/tools/SetAlarm.png" alt="" className="w-6 h-6 object-contain" referrerPolicy="no-referrer" />
          <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-[#D39E47]">Alarm Clock</h2>
        </div>
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-4">
            <h1 className="text-4xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
              自訂 <span className="text-[#D39E47]">鬧鐘提醒</span>
            </h1>
            <p className="text-[#9e9e9e] max-w-2xl">
              設定各類遊戲內提醒，確保不錯過任何冒險節奏。當計時到達時，將透過瀏覽器發送通知並播放提示音。
            </p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={requestPermission}
              className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-bold text-white transition-colors flex items-center gap-2"
            >
              <Bell size={14} /> 請求通知權限
            </button>
            <button 
              onClick={testNotification}
              className="px-4 py-2 bg-[#D39E47]/10 hover:bg-[#D39E47]/20 border border-[#D39E47]/20 rounded-xl text-xs font-bold text-[#D39E47] transition-colors flex items-center gap-2"
            >
              <Volume2 size={14} /> 測試提醒功能
            </button>
          </div>
        </div>
        <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-2xl">
          <p className="text-xs text-amber-200 leading-relaxed">
            <span className="font-bold">提示：</span> 如果您在 iframe 中使用本工具，瀏覽器可能會封鎖通知。建議點擊右上角「在新分頁開啟」以獲得最佳提醒體驗。
          </p>
        </div>
      </header>

      <div className="space-y-2">
        {alarmDefinitions.map((def, i) => {
          const alarm = alarms.find(a => a.label === def.label);
          return (
            <div key={i} className="bg-[#1a1a1a] border border-white/5 rounded-xl p-4 flex items-center justify-between hover:border-white/10 transition-colors">
              <div className="flex items-center gap-4">
                <div className={`p-2 bg-white/5 rounded-lg ${def.color}`}>
                  <def.icon size={20} />
                </div>
                <div className="flex flex-col">
                  <h4 className="font-bold text-white">{def.label}</h4>
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
