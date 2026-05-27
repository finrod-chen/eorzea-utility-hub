import React, { useState, useEffect } from 'react';
import { CloudSun, Search, Filter, MapPin, Sun, Cloud, CloudRain, CloudLightning, CloudSnow, Wind, CloudFog, Info } from 'lucide-react';
import { MAPS } from '../data/ff14Data';
import { calculateWeatherSeed, translateWeather, translateRegion } from '../utils/ff14';
import { useTranslation } from 'react-i18next';
import type { EorzeaTime } from '../types';

const getWeatherIcon = (weather: string) => {
  switch (weather) {
    case 'Clear Skies': return <Sun size={18} className="text-yellow-400" />;
    case 'Fair Skies': return <CloudSun size={18} className="text-yellow-200" />;
    case 'Clouds': return <Cloud size={18} className="text-gray-400" />;
    case 'Fog': return <CloudFog size={18} className="text-gray-300" />;
    case 'Rain': return <CloudRain size={18} className="text-blue-400" />;
    case 'Showers': return <CloudRain size={18} className="text-blue-600" />;
    case 'Thunder': return <CloudLightning size={18} className="text-purple-400" />;
    case 'Thunderstorms': return <CloudLightning size={18} className="text-purple-600" />;
    case 'Snow': return <CloudSnow size={18} className="text-white" />;
    case 'Blizzards': return <CloudSnow size={18} className="text-blue-100" />;
    case 'Heat Waves': return <Sun size={18} className="text-orange-500" />;
    case 'Gloom': return <Cloud size={18} className="text-indigo-400" />;
    case 'Dust Storms':
    case 'Sandstorms':
    case 'Wind':
    case 'Gales': return <Wind size={18} className="text-emerald-300" />;
    case 'Moon Dust': return <Cloud size={18} className="text-stone-400" />;
    case 'Astromagnetic Storm': return <CloudLightning size={18} className="text-cyan-400" />;
    default: return <Cloud size={18} className="text-gray-400" />;
  }
};

export default function Skywatcher({ et }: { et: EorzeaTime }) {
  const { t, i18n } = useTranslation();
  const [selectedVersion, setSelectedVersion] = useState<string>('2.0');
  const [selectedMap, setSelectedMap] = useState(MAPS[0]);
  const [forecast, setForecast] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedWeather, setSelectedWeather] = useState<string>('All');

  const versions = ['2.0', '3.0', '4.0', '5.0', '6.0', '7.0'];

  const allWeatherTypes = React.useMemo(() => {
    const weathers = new Set<string>();
    MAPS.forEach(map => {
      map.rates.forEach(r => weathers.add(r.name));
    });
    return Array.from(weathers).sort((a, b) => translateWeather(a).localeCompare(translateWeather(b)));
  // Re-sort when language changes so translated names are in the correct locale order.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i18n.language]);
  
  const filteredMaps = React.useMemo(() => {
    return MAPS.filter(map => {
      const matchesVersion = map.version === selectedVersion;
      const matchesSearch = map.name.toLowerCase().includes(searchQuery.toLowerCase());
      
      if (!matchesVersion || !matchesSearch) return false;
      
      if (selectedWeather === 'All') return true;
      
      // Check if any of the next 8 forecasts (approx 24h) match selectedWeather
      const currentTotalHours = et.totalHours;
      for (let i = 0; i < 8; i++) {
        const targetHours = currentTotalHours + (i * 8);
        const seed = calculateWeatherSeed(targetHours);
        const weather = map.rates.find(r => seed < r.rate) || map.rates[map.rates.length - 1];
        if (weather.name === selectedWeather) return true;
      }
      
      return false;
    });
  }, [selectedVersion, searchQuery, selectedWeather, et.totalHours]);

  const probabilities = selectedMap.rates.map((r, i) => ({
    name: r.name,
    probability: i === 0 ? r.rate : r.rate - selectedMap.rates[i - 1].rate
  }));

  // Update selected map if version changes and current map is not in new version
  useEffect(() => {
    if (selectedMap.version !== selectedVersion) {
      const firstInVersion = MAPS.find(m => m.version === selectedVersion);
      if (firstInVersion) setSelectedMap(firstInVersion);
    }
  }, [selectedVersion]);

  useEffect(() => {
    const generateForecast = () => {
      const results = [];
      const currentTotalHours = et.totalHours;
      
      for (let i = 0; i < 8; i++) {
        const targetHours = currentTotalHours + (i * 8);
        const seed = calculateWeatherSeed(targetHours);
        const weather = selectedMap.rates.find(r => seed < r.rate) || selectedMap.rates[selectedMap.rates.length - 1];
        
        const displayHours = (Math.floor(targetHours / 8) * 8) % 24;
        
        results.push({
          time: `${String(displayHours).padStart(2, '0')}:00`,
          name: weather.name,
          seed
        });
      }
      setForecast(results);
    };

    generateForecast();
  }, [selectedMap, et.totalHours]);

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-emerald-500">
            <img src="/tools/Skywatcher.png" alt="Skywatcher" className="w-6 h-6 object-contain" referrerPolicy="no-referrer" />
            <span className="text-xs font-bold uppercase tracking-widest">Skywatcher</span>
          </div>
<h1 className="text-3xl font-bold text-white">{t('skywatcher.title')}</h1>
          <p className="text-[#9e9e9e] text-sm max-w-md">{t('skywatcher.subtitle')}</p>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Map List */}
        <div className="lg:col-span-1 space-y-4">
          <div className="flex flex-wrap gap-1 mb-4">
            {versions.map(v => (
              <button
                key={v}
                onClick={() => setSelectedVersion(v)}
                className={`
                  flex-1 px-2 py-1.5 rounded-lg text-[10px] font-bold transition-all
                  ${selectedVersion === v 
                    ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' 
                    : 'bg-white/5 text-[#9e9e9e] hover:bg-white/10 hover:text-white'}
                `}
              >
                v{v}
              </button>
            ))}
          </div>

          <div className="relative space-y-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9e9e9e]" size={16} />
              <input 
                type="text" 
                placeholder={t('skywatcher.searchZone')} 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#1a1a1a] border border-white/5 rounded-xl py-2 pl-10 pr-4 text-sm focus:border-emerald-500 outline-none transition-all"
              />
            </div>

            <div className="bg-[#1a1a1a] rounded-xl border border-white/5 p-2">
              <div className="flex items-center justify-between px-2 mb-2">
                <span className="text-[10px] font-bold text-[#9e9e9e] uppercase">{t('skywatcher.weatherFilter')}</span>
                {selectedWeather !== 'All' && (
                  <button 
                    onClick={() => setSelectedWeather('All')}
                    className="text-[10px] text-emerald-500 hover:underline"
                  >
                    {t('skywatcher.clear')}
                  </button>
                )}
              </div>
              <div className="grid grid-cols-5 gap-1 max-h-32 overflow-y-auto custom-scrollbar p-1">
                <button
                  onClick={() => setSelectedWeather('All')}
                  className={`
                    p-1.5 rounded-lg flex items-center justify-center transition-all
                    ${selectedWeather === 'All' ? 'bg-emerald-500/20 text-emerald-500 ring-1 ring-emerald-500/50' : 'hover:bg-white/5 text-[#9e9e9e]'}
                  `}
                  title={t('skywatcher.all')}
                >
                  <Filter size={14} />
                </button>
                {allWeatherTypes.map(w => (
                  <button
                    key={w}
                    onClick={() => setSelectedWeather(w)}
                    className={`
                      p-1.5 rounded-lg flex items-center justify-center transition-all
                      ${selectedWeather === w ? 'bg-emerald-500/20 text-emerald-500 ring-1 ring-emerald-500/50' : 'hover:bg-white/5 text-[#9e9e9e]'}
                    `}
                    title={translateWeather(w)}
                  >
                    {getWeatherIcon(w)}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <div className="bg-[#1a1a1a] rounded-2xl border border-white/5 overflow-hidden">
            <div className="p-3 border-b border-white/5 bg-white/5 flex items-center justify-between">
              <span className="text-xs font-bold text-[#9e9e9e] uppercase">{t('skywatcher.zoneList')} (v{selectedVersion})</span>
              <Filter size={14} className="text-[#9e9e9e]" />
            </div>
            <div className="max-h-[50vh] overflow-y-auto custom-scrollbar">
              {filteredMaps.map(map => (
                <button
                  key={map.id}
                  onClick={() => setSelectedMap(map)}
                  className={`
                    w-full flex items-center gap-3 px-4 py-3 text-sm transition-all
                    ${selectedMap.id === map.id ? 'bg-emerald-500/10 text-emerald-400 border-l-2 border-emerald-500' : 'text-[#9e9e9e] hover:bg-white/5 hover:text-white'}
                  `}
                >
                  <MapPin size={14} />
                  <div className="flex flex-col items-start">
                    <span className="font-medium">{map.name}</span>
                    {map.region && (
                      <span className="text-[10px] text-[#9e9e9e]">{translateRegion(map.region)}</span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Forecast Display */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-[#1a1a1a] rounded-3xl p-8 border border-white/5">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-bold text-white flex items-center gap-3">
                {selectedMap.name}
                <span className="text-xs font-normal text-[#9e9e9e] bg-white/5 px-2 py-1 rounded-md">Forecast</span>
              </h2>
<div className="text-xs text-[#9e9e9e]">
                {t('skywatcher.updateFreq')}：{t('skywatcher.each')} 8 {t('skywatcher.etHours')}
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {forecast.map((item, i) => (
                <div 
                  key={i} 
                  className={`
                    p-6 rounded-2xl border transition-all
                    ${i === 0 ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-black/20 border-white/5'}
                  `}
                >
                  <p className="text-xs font-mono text-[#9e9e9e] mb-2">{item.time} ET</p>
                  <div className="flex items-center gap-2 mb-1">
                    {getWeatherIcon(item.name)}
                    <p className="text-lg font-bold text-white">{translateWeather(item.name)}</p>
                  </div>
                  <div className="h-1 w-8 bg-emerald-500 rounded-full opacity-50" />
                  {i === 0 && <p className="mt-3 text-[10px] text-emerald-400 font-bold uppercase tracking-widest">Current</p>}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#1a1a1a] rounded-3xl p-8 border border-white/5">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-emerald-500/20 rounded-lg">
                <Info size={18} className="text-emerald-500" />
              </div>
              <div>
<h3 className="text-lg font-bold text-white">{t('skywatcher.weatherDist')}</h3>
                <p className="text-xs text-[#9e9e9e]">{selectedMap.name} {t('skywatcher.weatherDist')}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {probabilities.map((p, i) => (
                <div key={i} className="bg-black/20 border border-white/5 rounded-xl p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {getWeatherIcon(p.name)}
                    <span className="text-sm font-medium text-white">{translateWeather(p.name)}</span>
                  </div>
                  <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-md">
                    {p.probability}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-black/20 rounded-2xl p-6 border border-white/5 flex gap-4 items-start">
            <div className="p-2 bg-emerald-500/20 rounded-lg">
              <Filter size={20} className="text-emerald-500" />
            </div>
            <div>
<h4 className="text-sm font-bold text-white mb-1">{t('skywatcher.filterTip')}</h4>
              <p className="text-xs text-[#9e9e9e] leading-relaxed">{t('skywatcher.filterTipDesc')} {t('skywatcher.filterTipAction')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
