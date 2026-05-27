import React, { useState, useMemo } from 'react';
import { Clock, CheckCircle2, Circle, MapPin, Info, Filter, AlertCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { SIGHTSEEING_LOGS, MAPS } from '../data/ff14Data';
import { translateWeather, translateEmote, calculateWeatherSeed } from '../utils/ff14';

export default function SightseeingLog({ et }: { et: any }) {
  const { t } = useTranslation();
  const [completed, setCompleted] = useState<string[]>([]);
  const [selectedVersion, setSelectedVersion] = useState<string>('All');
  const [showOnlyAvailable, setShowOnlyAvailable] = useState(false);
  const [sortBy, setSortBy] = useState<'id' | 'version' | 'map'>('id');

  const versions = ['All', '2.0', '3.0', '4.0', '5.0', '6.0', '7.0'];

  const isTimeMatch = (timeRange: string, currentHours: number) => {
    if (timeRange === 'Any') return true;
    const [startStr, endStr] = timeRange.split('-');
    const start = parseInt(startStr.split(':')[0]);
    const end = parseInt(endStr.split(':')[0]);
    
    const currentHour = currentHours % 24;
    if (start < end) {
      return currentHour >= start && currentHour < end;
    } else {
      // Over midnight, e.g. 18:00-05:00
      return currentHour >= start || currentHour < end;
    }
  };

  const getCurrentWeather = (mapName: string, totalHours: number) => {
    const map = MAPS.find(m => m.name === mapName);
    if (!map) return "Any";
    const seed = calculateWeatherSeed(totalHours);
    const weather = map.rates.find(r => seed < r.rate) || map.rates[map.rates.length - 1];
    return weather.name;
  };

  const logsWithStatus = useMemo(() => {
    return SIGHTSEEING_LOGS.map(log => {
      const timeMatch = isTimeMatch(log.time, et.hours);
      const currentWeather = getCurrentWeather(log.map, et.totalHours);
      const weatherMatch = log.weather.includes('Any') || log.weather.includes(currentWeather);
      
      return {
        ...log,
        isAvailable: timeMatch && weatherMatch,
        currentWeather
      };
    });
  }, [et.hours, et.totalHours]);

  const filteredLogs = useMemo(() => {
    return logsWithStatus.filter(log => {
      const matchesVersion = selectedVersion === 'All' || log.version === selectedVersion;
      const matchesAvailability = showOnlyAvailable ? log.isAvailable : true;
      return matchesVersion && matchesAvailability;
    });
  }, [logsWithStatus, selectedVersion, showOnlyAvailable]);

  const sortedLogs = useMemo(() => {
    const sorted = [...filteredLogs];
    if (sortBy === 'version') {
      sorted.sort((a, b) => a.version.localeCompare(b.version) || a.id.localeCompare(b.id));
    } else if (sortBy === 'map') {
      sorted.sort((a, b) => a.map.localeCompare(b.map) || a.id.localeCompare(b.id));
    } else {
      sorted.sort((a, b) => a.id.localeCompare(b.id));
    }
    return sorted;
  }, [filteredLogs, sortBy]);

  const toggleComplete = (id: string) => {
    setCompleted(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-indigo-400">
            <img src="/tools/SightseeingLog.png" alt="" className="w-5 h-5 object-contain" referrerPolicy="no-referrer" />
            <span className="text-xs font-bold uppercase tracking-widest">Sightseeing Log</span>
          </div>
          <h1 className="text-3xl font-bold text-white">{t('sightseeingLog.title')}</h1>
          <p className="text-[#9e9e9e] text-sm max-w-md">{t('sightseeingLog.subtitle')}</p>
        </div>
        <div className="flex flex-col items-end gap-3">
          <div className="bg-[#1a1a1a] px-4 py-2 rounded-xl border border-white/5 flex items-center gap-3">
            <span className="text-xs text-[#9e9e9e]">{t('sightseeingLog.progress')}</span>
            <span className="text-indigo-400 font-bold">{completed.length} / {SIGHTSEEING_LOGS.length}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 bg-[#1a1a1a] px-3 py-1.5 rounded-xl border border-white/5">
              <span className="text-[10px] text-[#9e9e9e] uppercase font-bold px-1">{t('sightseeingLog.sortBy')}</span>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent text-xs text-white font-bold focus:outline-none cursor-pointer"
              >
                <option value="id" className="bg-[#1a1a1a]">{t('sightseeingLog.defaultOrder')}</option>
                <option value="version" className="bg-[#1a1a1a]">{t('sightseeingLog.patch')}</option>
                <option value="map" className="bg-[#1a1a1a]">{t('sightseeingLog.zoneName')}</option>
              </select>
            </div>
            <button 
              onClick={() => setShowOnlyAvailable(!showOnlyAvailable)}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all
                ${showOnlyAvailable ? 'bg-emerald-500 text-white' : 'bg-white/5 text-[#9e9e9e] hover:bg-white/10'}
              `}
            >
              <Filter size={14} />
              {t('sightseeingLog.showCompletableOnly')}
            </button>
          </div>
        </div>
      </header>

      {/* Version Tabs */}
      <div className="flex flex-wrap gap-2">
        {versions.map(v => (
          <button
            key={v}
            onClick={() => setSelectedVersion(v)}
            className={`
              px-4 py-2 rounded-xl text-sm font-bold transition-all
              ${selectedVersion === v 
                ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/20' 
                : 'bg-white/5 text-[#9e9e9e] hover:bg-white/10 hover:text-white'}
            `}
          >
            v{v}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4">
        {sortedLogs.length > 0 ? (
          sortedLogs.map(log => {
            const isDone = completed.includes(log.id);
            return (
              <div 
                key={log.id}
                className={`
                  bg-[#1a1a1a] rounded-2xl p-6 border transition-all flex flex-col md:flex-row gap-6 relative overflow-hidden
                  ${isDone ? 'border-emerald-500/20 opacity-60' : log.isAvailable ? 'border-emerald-500/40 bg-emerald-500/5' : 'border-white/5 hover:border-indigo-500/30'}
                `}
              >
                {log.isAvailable && !isDone && (
                  <div className="absolute top-0 right-0 px-3 py-1 bg-emerald-500 text-white text-[10px] font-bold rounded-bl-lg">
                    {t('sightseeingLog.completableNow')}
                  </div>
                )}
                
                <div className="flex items-start gap-4 flex-1">
                  <button 
                    onClick={() => toggleComplete(log.id)}
                    className={`mt-1 transition-colors ${isDone ? 'text-emerald-500' : 'text-[#9e9e9e] hover:text-white'}`}
                  >
                    {isDone ? <CheckCircle2 size={24} /> : <Circle size={24} />}
                  </button>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono text-indigo-400 font-bold">#{log.id}</span>
                      <h3 className="font-bold text-white">{log.name}</h3>
                      {log.version && (
                        <span className="px-2 py-0.5 bg-indigo-500/20 text-indigo-300 text-[10px] rounded font-bold">
                          v{log.version}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-4 text-xs text-[#9e9e9e]">
                      <div className="flex items-center gap-1">
                        <MapPin size={14} />
                        {log.map}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock size={14} />
                        {log.time === 'Any' ? t('sightseeingLog.anyTime') : log.time}
                      </div>
                      <div className="flex items-center gap-1">
                        <Info size={14} />
                        {translateEmote(log.emote)}
                      </div>
                    </div>
                    <p className="text-sm text-[#9e9e9e] italic">「{log.hint}」</p>
                  </div>
                </div>

                <div className="flex flex-wrap md:flex-col gap-2 justify-center md:items-end">
                  <div className="text-[10px] text-[#9e9e9e] uppercase font-bold mb-1">{t('sightseeingLog.requiredWeather')}</div>
                  <div className="flex flex-wrap gap-2 justify-end">
                    {log.weather.map(w => (
                      <span 
                        key={w} 
                        className={`
                          px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider
                          ${w === log.currentWeather || w === 'Any' ? 'bg-emerald-500 text-white' : 'bg-white/5 text-[#9e9e9e]'}
                        `}
                      >
                        {translateWeather(w)}
                      </span>
                    ))}
                  </div>
                  {log.isAvailable && !isDone && (
                    <div className="mt-2 text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                      <CheckCircle2 size={12} />
                      {t('sightseeingLog.conditionMet')}
                    </div>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div className="bg-[#1a1a1a] rounded-2xl p-12 border border-white/5 text-center space-y-4">
            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto text-[#9e9e9e]">
              <AlertCircle size={32} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">{t('sightseeingLog.noMatch')}</h3>
              <p className="text-sm text-[#9e9e9e]">{t('sightseeingLog.noMatchDesc')}</p>
            </div>
            {showOnlyAvailable && (
              <button 
                onClick={() => setShowOnlyAvailable(false)}
                className="text-indigo-400 text-sm font-bold hover:underline"
              >
                {t('sightseeingLog.showAll')}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
