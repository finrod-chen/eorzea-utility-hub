import React, { useState, useEffect } from 'react';
import { CheckSquare, Calendar, Clock, RotateCcw, Info, Star, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { INITIAL_TASKS } from '../constants/tasks';
import { formatTimestamp, pruneExpired } from '../utils/taskUtils';

export default function DutyChecklist() {
  const { t, i18n } = useTranslation();
  const isEnglish = i18n.language === 'en';
  const [completed, setCompleted] = useState<Record<string, string | null>>({});
  const [isLoaded, setIsLoaded] = useState(false);

  // Load state
  useEffect(() => {
    const saved = localStorage.getItem('ff14-duty-checklist-v2');
    if (saved) {
      try {
        setCompleted(pruneExpired(JSON.parse(saved)));
      } catch (e) {
        console.warn('[DutyChecklist] Failed to load checklist v2, starting fresh:', e);
      }
    } else {
      // Migration from v1 if exists
      const oldSaved = localStorage.getItem('ff14-duty-checklist');
      if (oldSaved) {
        try {
          const oldData = JSON.parse(oldSaved);
          const newData: Record<string, string | null> = {};
          Object.keys(oldData).forEach(key => {
            if (oldData[key]) newData[key] = new Date().toISOString();
          });
          setCompleted(pruneExpired(newData));
        } catch (e) {
          console.warn('[DutyChecklist] Migration from v1 failed, starting fresh:', e);
        }
      }
    }
    setIsLoaded(true);
  }, []);

  // Auto-clear tasks once their server reset passes (checked every 30 s)
  useEffect(() => {
    const timer = setInterval(() => {
      setCompleted(prev => {
        const next = pruneExpired(prev);
        return Object.keys(next).length === Object.keys(prev).filter(k => prev[k]).length ? prev : next;
      });
    }, 30_000);
    return () => clearInterval(timer);
  }, []);

  // Save state
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('ff14-duty-checklist-v2', JSON.stringify(completed));
    }
  }, [completed, isLoaded]);

  const toggleTask = (id: string) => {
    setCompleted(prev => ({ 
      ...prev, 
      [id]: prev[id] ? null : new Date().toISOString() 
    }));
  };

  const resetCategory = (category: 'daily' | 'weekly') => {
    const newCompleted = { ...completed };
    INITIAL_TASKS.filter(t => t.category === category).forEach(t => {
      delete newCompleted[t.id];
    });
    setCompleted(newCompleted);
  };

  const getProgress = (category: 'daily' | 'weekly') => {
    const tasks = INITIAL_TASKS.filter(t => t.category === category);
    const completedTasks = tasks.filter(t => !!completed[t.id]);
    const done = completedTasks.length;
    
    let allDoneTime = null;
    if (done === tasks.length && tasks.length > 0) {
      // Get the latest timestamp among all tasks in this category
      const timestamps = completedTasks.map(t => new Date(completed[t.id]!).getTime());
      allDoneTime = new Date(Math.max(...timestamps)).toISOString();
    }

    return { 
      done, 
      total: tasks.length, 
      percent: Math.round((done / tasks.length) * 100),
      allDoneTime
    };
  };

  const dailyProgress = getProgress('daily');
  const weeklyProgress = getProgress('weekly');

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <div className="flex items-center gap-2">
          <img src="/tools/DutyChecklist.png" alt="" className="w-5 h-5 object-contain" referrerPolicy="no-referrer" />
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-400">Duty Checklist</span>
        </div>
        <h1 className="text-3xl font-bold text-white">{t('dutyChecklist.title')}</h1>
        <p className="text-[#9e9e9e] text-sm max-w-md">{t('dutyChecklist.subtitle')}</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Daily Section */}
        <section className="space-y-4">
          <div className="flex items-center justify-between bg-[#1a1a1a] p-4 rounded-2xl border border-white/5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-500">
                <Clock size={20} />
              </div>
              <div>
                <h2 className="font-bold text-white">{t('dutyChecklist.dailyTasks')}</h2>
                <p className="text-[10px] text-[#9e9e9e] uppercase tracking-widest">{t('dutyChecklist.daily')} 23:00 (GMT+8) {t('dutyChecklist.resetAt')}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="flex flex-col items-end">
                  <span className="text-sm font-bold text-white">{dailyProgress.done}/{dailyProgress.total}</span>
                  {dailyProgress.allDoneTime && (
                    <span className="text-[10px] text-emerald-500 font-medium bg-emerald-500/10 px-2 py-0.5 rounded-full mt-1">
                      {t('dutyChecklist.achievedAt')}: {formatTimestamp(dailyProgress.allDoneTime)}
                    </span>
                  )}
                </div>
                <div className="w-24 h-1 bg-white/5 rounded-full mt-1 overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${dailyProgress.percent}%` }}
                    className="h-full bg-emerald-500"
                  />
                </div>
              </div>
              <button 
                onClick={() => resetCategory('daily')}
                className="p-2 hover:bg-white/5 rounded-lg text-[#9e9e9e] hover:text-white transition-colors"
                title={t('dutyChecklist.resetDaily')}
              >
                <RotateCcw size={16} />
              </button>
            </div>
          </div>

          <div className="space-y-2">
            {INITIAL_TASKS.filter(t => t.category === 'daily').map(task => (
              <motion.button
                key={task.id}
                onClick={() => toggleTask(task.id)}
                className={`w-full flex items-center gap-4 p-4 rounded-2xl border transition-all ${
                  completed[task.id] 
                    ? 'bg-emerald-500/5 border-emerald-500/20 opacity-60' 
                    : 'bg-[#1a1a1a] border-white/5 hover:border-white/10'
                }`}
              >
                <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${
                  completed[task.id] 
                    ? 'bg-emerald-500 border-emerald-500 text-black' 
                    : 'border-white/10'
                }`}>
                  {completed[task.id] && <Star size={14} fill="currentColor" />}
                </div>
                <div className="flex-1 text-left">
                  <div className="flex justify-between items-start">
                    <span className={`text-sm font-medium ${completed[task.id] ? 'text-[#9e9e9e] line-through' : 'text-white'}`}>
                      {isEnglish ? task.labelEn : task.label}
                    </span>
                    {completed[task.id] && (
                      <span className="text-[10px] text-emerald-500 font-mono ml-2 shrink-0 bg-emerald-500/10 px-2 py-0.5 rounded-md">
                        {t('dutyChecklist.completedAt')} {formatTimestamp(completed[task.id])}
                      </span>
                    )}
                  </div>
                  {task.reward && (
                    <p className="text-[10px] text-[#666] mt-0.5">{isEnglish ? task.rewardEn : task.reward}</p>
                  )}
                </div>
              </motion.button>
            ))}
          </div>
        </section>

        {/* Weekly Section */}
        <section className="space-y-4">
          <div className="flex items-center justify-between bg-[#1a1a1a] p-4 rounded-2xl border border-white/5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-500/10 rounded-xl flex items-center justify-center text-indigo-400">
                <Calendar size={20} />
              </div>
              <div>
                <h2 className="font-bold text-white">{t('dutyChecklist.weeklyTasks')}</h2>
                <p className="text-[10px] text-[#9e9e9e] uppercase tracking-widest">{t('dutyChecklist.weekly')} 16:00 (GMT+8) {t('dutyChecklist.resetAt')}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="flex flex-col items-end">
                  <span className="text-sm font-bold text-white">{weeklyProgress.done}/{weeklyProgress.total}</span>
                  {weeklyProgress.allDoneTime && (
                    <span className="text-[10px] text-indigo-400 font-medium bg-indigo-500/10 px-2 py-0.5 rounded-full mt-1">
                      {t('dutyChecklist.achievedAt')}: {formatTimestamp(weeklyProgress.allDoneTime)}
                    </span>
                  )}
                </div>
                <div className="w-24 h-1 bg-white/5 rounded-full mt-1 overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${weeklyProgress.percent}%` }}
                    className="h-full bg-indigo-500"
                  />
                </div>
              </div>
              <button 
                onClick={() => resetCategory('weekly')}
                className="p-2 hover:bg-white/5 rounded-lg text-[#9e9e9e] hover:text-white transition-colors"
                title={t('dutyChecklist.resetWeekly')}
              >
                <RotateCcw size={16} />
              </button>
            </div>
          </div>

          <div className="space-y-2">
            {INITIAL_TASKS.filter(t => t.category === 'weekly').map(task => (
              <motion.button
                key={task.id}
                onClick={() => toggleTask(task.id)}
                className={`w-full flex items-center gap-4 p-4 rounded-2xl border transition-all ${
                  completed[task.id] 
                    ? 'bg-indigo-500/5 border-indigo-500/20 opacity-60' 
                    : 'bg-[#1a1a1a] border-white/5 hover:border-white/10'
                }`}
              >
                <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${
                  completed[task.id] 
                    ? 'bg-indigo-500 border-indigo-500 text-black' 
                    : 'border-white/10'
                }`}>
                  {completed[task.id] && <Star size={14} fill="currentColor" />}
                </div>
                <div className="flex-1 text-left">
                  <div className="flex justify-between items-start">
                    <span className={`text-sm font-medium ${completed[task.id] ? 'text-[#9e9e9e] line-through' : 'text-white'}`}>
                      {isEnglish ? task.labelEn : task.label}
                    </span>
                    {completed[task.id] && (
                      <span className="text-[10px] text-indigo-400 font-mono ml-2 shrink-0 bg-indigo-500/10 px-2 py-0.5 rounded-md">
                        {t('dutyChecklist.completedAt')} {formatTimestamp(completed[task.id])}
                      </span>
                    )}
                  </div>
                  {task.reward && (
                    <p className="text-[10px] text-[#666] mt-0.5">{isEnglish ? task.rewardEn : task.reward}</p>
                  )}
                </div>
              </motion.button>
            ))}
          </div>
        </section>
      </div>

      {/* Info Footer */}
      <div className="bg-white/5 rounded-3xl p-6 border border-white/5 flex gap-4">
        <Info className="text-indigo-400 shrink-0" size={20} />
        <div className="space-y-1">
          <h4 className="text-sm font-bold text-white">{t('dutyChecklist.aboutReset')}</h4>
          <p className="text-xs text-[#9e9e9e] leading-relaxed">
            {t('dutyChecklist.resetNote')}. {t('dutyChecklist.clearCacheWarning')}.
          </p>
        </div>
      </div>
    </div>
  );
}
