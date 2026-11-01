import { useTranslation } from 'react-i18next';
import React, { useState, useEffect, useMemo } from 'react';
import { Bird, ArrowRight, Info, RotateCcw, ListOrdered, Search, ChevronDown, Check, X, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import chocoboData from '../data/chocobo-colors.json';

interface Color {
  id: string;
  rgb: [number, number, number];
  names: {
    zh: string;
    en: string;
    ja: string;
  };
}

interface Fruit {
  id: string;
  effect: { r: number; g: number; b: number };
  color: string;
  names: {
    zh: string;
    en: string;
    ja: string;
  };
}

interface ColorSelectorProps {
  label: string;
  selectedId: string;
  onSelect: (id: string) => void;
  colors: Color[];
}

function ColorSelector({ label, selectedId, onSelect, colors }: ColorSelectorProps) {
  const { t, i18n } = useTranslation();
  const nameOf = (c: Color) => (i18n.language === 'zh-TW' ? c.names.zh : c.names.en);
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  
  const selectedColor = colors.find(c => c.id === selectedId);
  
  const filteredColors = useMemo(() => {
    if (!search) return colors;
    const lowerSearch = search.toLowerCase();
    return colors.filter(c => 
      c.names.zh.includes(search) || 
      c.names.en.toLowerCase().includes(lowerSearch) ||
      c.names.ja.includes(search) ||
      c.id.toLowerCase().includes(lowerSearch)
    );
  }, [search, colors]);

  // Popular colors for quick access
  const popularColors = ['desert-yellow', 'snow-white', 'soot-black', 'dalamud-red', 'royal-blue', 'hunter-green'];

  useEffect(() => {
    if (!isOpen) setSearch('');
  }, [isOpen]);

  return (
    <div className="flex-1 w-full space-y-3">
      <label className="text-xs font-bold text-[#9e9e9e] uppercase tracking-wider block">{label}</label>
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full bg-black/40 border rounded-2xl px-4 py-4 text-left flex items-center justify-between transition-all duration-300 ${isOpen ? 'border-amber-500/50 ring-2 ring-amber-500/10' : 'border-white/10 hover:border-amber-500/30'}`}
        >
          <div className="flex items-center gap-3">
            <div 
              className="w-8 h-8 rounded-lg border border-white/20 shadow-inner shrink-0 transition-transform group-hover:scale-105"
              style={{ backgroundColor: selectedColor ? `rgb(${selectedColor.rgb.join(',')})` : 'transparent' }}
            />
            <div className="flex flex-col">
              <span className="text-white font-bold">{(selectedColor && nameOf(selectedColor)) || t('chocoboColor.selectColor')}</span>
              <span className="text-[10px] text-[#9e9e9e] font-mono uppercase tracking-tighter">{selectedColor?.id}</span>
            </div>
          </div>
          <ChevronDown size={18} className={`text-[#9e9e9e] transition-transform duration-300 ${isOpen ? 'rotate-180 text-amber-500' : ''}`} />
        </button>

        <AnimatePresence>
          {isOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className="absolute top-full left-0 right-0 mt-3 bg-[#1a1a1a] border border-white/10 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-20 overflow-hidden flex flex-col max-h-[500px]"
              >
                <div className="p-4 space-y-4 border-b border-white/5 bg-black/40 backdrop-blur-md">
                  <div className="relative group">
                    <Search size={14} className={`absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors ${search ? 'text-amber-500' : 'text-[#9e9e9e]'}`} />
                    <input
                      autoFocus
                      type="text"
                      placeholder={t('chocoboColor.searchPlaceholder')}
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="w-full bg-black/40 border border-white/10 rounded-xl pl-10 pr-10 py-3 text-sm text-white placeholder:text-[#666] focus:outline-none focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/5 transition-all"
                    />
                    {search && (
                      <button 
                        onClick={() => setSearch('')}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[#666] hover:text-white transition-colors"
                      >
                        <X size={14} />
                      </button>
                    )}
                  </div>
                  
                  {!search && (
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between">
                        <p className="text-[10px] font-bold text-[#9e9e9e] uppercase tracking-widest">{t('chocoboColor.popularColors')}</p>
                      </div>
                      <div className="flex flex-wrap gap-2.5">
                        {popularColors.map(id => {
                          const color = colors.find(c => c.id === id);
                          if (!color) return null;
                          const isSelected = selectedId === id;
                          return (
                            <button
                              key={id}
                              onClick={() => {
                                onSelect(id);
                                setIsOpen(false);
                              }}
                              title={nameOf(color)}
                              className={`w-9 h-9 rounded-xl border-2 transition-all duration-300 hover:scale-110 hover:shadow-lg active:scale-95 ${isSelected ? 'border-amber-500 ring-4 ring-amber-500/20 scale-110' : 'border-white/10 hover:border-white/30'}`}
                              style={{ backgroundColor: `rgb(${color.rgb.join(',')})` }}
                            />
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>

                <div className="overflow-y-auto flex-1 custom-scrollbar py-2">
                  {filteredColors.length > 0 ? (
                    <div className="px-2 space-y-1">
                      {filteredColors.map(color => (
                        <button
                          key={color.id}
                          onClick={() => {
                            onSelect(color.id);
                            setIsOpen(false);
                          }}
                          className={`w-full flex items-center gap-4 px-3 py-3 rounded-xl transition-all duration-200 group ${selectedId === color.id ? 'bg-amber-500/10' : 'hover:bg-white/5'}`}
                        >
                          <div 
                            className="w-8 h-8 rounded-lg border border-white/10 shrink-0 shadow-lg group-hover:scale-110 transition-transform"
                            style={{ backgroundColor: `rgb(${color.rgb.join(',')})` }}
                          />
                          <div className="flex-1 text-left">
                            <p className={`text-sm font-bold transition-colors ${selectedId === color.id ? 'text-amber-500' : 'text-white'}`}>{nameOf(color)}</p>
                            <p className="text-[10px] text-[#666] font-mono group-hover:text-[#9e9e9e] transition-colors">{color.names.en}</p>
                          </div>
                          {selectedId === color.id ? (
                            <div className="w-6 h-6 rounded-full bg-amber-500 flex items-center justify-center">
                              <Check size={14} className="text-black" />
                            </div>
                          ) : (
                            <ChevronRight size={14} className="text-[#333] group-hover:text-[#666] transition-colors" />
                          )}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="p-12 text-center space-y-3">
                      <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mx-auto text-[#333]">
                        <Search size={20} />
                      </div>
                      <p className="text-[#666] text-sm italic">{t('chocoboColor.noMatch')}</p>
                    </div>
                  )}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function ChocoboColor() {
  const { t } = useTranslation();
  const [currentColorId, setCurrentColorId] = useState(chocoboData.meta.defaultColor);
  const [targetColorId, setTargetColorId] = useState('snow-white');
  const [showOrder, setShowOrder] = useState(false);
  const [result, setResult] = useState<{ fruit: Fruit; count: number }[] | null>(null);
  const [fedCounts, setFedCounts] = useState<Record<string, number>>({});
  const [lastFedTime, setLastFedTime] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const colors = chocoboData.colors as Color[];
  const fruits = chocoboData.fruits as Fruit[];

  // Load state from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('ff14-chocobo-color-state');
    if (saved) {
      try {
        const state = JSON.parse(saved);
        setCurrentColorId(state.currentColorId || chocoboData.meta.defaultColor);
        setTargetColorId(state.targetColorId || 'snow-white');
        setResult(state.result || null);
        setFedCounts(state.fedCounts || {});
        setLastFedTime(state.lastFedTime || null);
        setShowOrder(state.showOrder || false);
      } catch (e) {
        console.error('Failed to load chocobo state', e);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save state to localStorage on change
  useEffect(() => {
    if (!isLoaded) return;
    const state = {
      currentColorId,
      targetColorId,
      result,
      fedCounts,
      lastFedTime,
      showOrder
    };
    localStorage.setItem('ff14-chocobo-color-state', JSON.stringify(state));
  }, [currentColorId, targetColorId, result, fedCounts, showOrder, isLoaded]);

  const currentColor = useMemo(() => colors.find(c => c.id === currentColorId), [currentColorId, colors]);
  const targetColor = useMemo(() => colors.find(c => c.id === targetColorId), [targetColorId, colors]);

  const calculate = () => {
    if (!currentColor || !targetColor) return;

    const diff = {
      r: targetColor.rgb[0] - currentColor.rgb[0],
      g: targetColor.rgb[1] - currentColor.rgb[1],
      b: targetColor.rgb[2] - currentColor.rgb[2]
    };

    const fruitMap = {
      r: { positive: 'xelphatol-apple', negative: 'doman-plum' },
      g: { positive: 'mamook-pear', negative: 'valfruit' },
      b: { positive: 'oghomoro-berries', negative: 'cieldalaes-pineapple' }
    };

    const required: { fruit: Fruit; count: number }[] = [];

    for (const channel of ['r', 'g', 'b'] as const) {
      const value = diff[channel];
      if (value === 0) continue;

      const fruitId = value > 0 ? fruitMap[channel].positive : fruitMap[channel].negative;
      const fruit = fruits.find(f => f.id === fruitId);
      if (fruit) {
        required.push({
          fruit,
          count: Math.ceil(Math.abs(value) / 5)
        });
      }
    }

    setResult(required);
    setFedCounts({});
    setLastFedTime(null);
    setShowOrder(false);
  };

  const feedingOrder = useMemo(() => {
    if (!result) return [];
    
    const order: Fruit[] = [];
    const remaining = result.map(item => ({ ...item }));
    
    let hasRemaining = true;
    while (hasRemaining) {
      hasRemaining = false;
      for (const item of remaining) {
        if (item.count > 0) {
          order.push(item.fruit);
          item.count--;
          hasRemaining = true;
        }
      }
    }
    return order;
  }, [result]);

  const fruitIcons: Record<string, string> = {
    'xelphatol-apple': '/chocobo/Xelphatol_Apple.png',
    'doman-plum': '/chocobo/Doman_Plum.png',
    'mamook-pear': '/chocobo/Mamook_Pear.png',
    'valfruit': '/chocobo/Valfruit.png',
    'oghomoro-berries': '/chocobo/O\'Ghomoro_Berries.png',
    'cieldalaes-pineapple': '/chocobo/Cieldalaes_Pineapple.png',
  };

  const getContrastColor = (hexColor: string) => {
    const hex = hexColor.replace('#', '');
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 128 ? '#1a1a1a' : '#ffffff';
  };

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <div className="flex items-center gap-2 text-amber-500">
          <img src="/tools/ChocoboColor.png" alt="" className="w-5 h-5 object-contain" referrerPolicy="no-referrer" />
          <span className="text-xs font-bold uppercase tracking-widest">Chocobo Color</span>
        </div>
<h1 className="text-3xl font-bold text-white">{t('chocoboColor.title')}</h1>
        <p className="text-[#9e9e9e] text-sm max-w-md">{t('chocoboColor.subtitle')}</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Selection Area */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[#1a1a1a] rounded-3xl p-8 border border-white/5 space-y-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
<ColorSelector 
                label={t('chocoboColor.currentColor')}
                selectedId={currentColorId}
                onSelect={setCurrentColorId}
                colors={colors}
              />

              <div className="hidden md:flex items-center justify-center text-[#9e9e9e] mt-6">
                <ArrowRight size={24} />
              </div>

<ColorSelector 
                label={t('chocoboColor.targetColor')}
                selectedId={targetColorId}
                onSelect={setTargetColorId}
                colors={colors}
              />
            </div>

            <div className="flex justify-center pt-4">
              <button 
                onClick={calculate}
                className="bg-amber-500 hover:bg-amber-400 text-black font-bold px-12 py-4 rounded-2xl transition-all shadow-lg shadow-amber-500/20 active:scale-95"
              >
                {t('chocoboColor.calculate')}
              </button>
            </div>
          </div>

          {/* Results Area */}
          <AnimatePresence mode="wait">
            {result && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <div className="bg-[#1a1a1a] rounded-3xl p-8 border border-white/5">
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                      <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        <Bird size={20} className="text-amber-500" />
                        {t('chocoboColor.requiredFruit')}
                      </h3>
                      {Object.keys(fedCounts).length > 0 && (
                        <button 
                          onClick={() => {
                            setFedCounts({});
                            setLastFedTime(null);
                          }}
                          className="p-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-[#9e9e9e] hover:text-white transition-colors"
                          title={t('chocoboColor.reset')}
                        >
                          <RotateCcw size={14} />
                        </button>
                      )}
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      {lastFedTime && (
<span className="text-[10px] text-[#9e9e9e] font-medium">
                          {t('chocoboColor.lastFed')}: {lastFedTime}
                        </span>
                      )}
                      {result.length > 0 && (
                      <button 
                        onClick={() => setShowOrder(!showOrder)}
                        className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${showOrder ? 'bg-amber-500 text-black' : 'bg-white/5 text-[#9e9e9e] hover:bg-white/10'}`}
                      >
                        <ListOrdered size={14} />
                        {showOrder ? t('chocoboColor.hideSequence') : t('chocoboColor.showSequence')}
                      </button>
                    )}
                  </div>
                </div>

                {result.length === 0 ? (
                    <div className="text-center py-12 text-[#9e9e9e] bg-black/20 rounded-2xl border border-dashed border-white/10">
                      {t('chocoboColor.sameColor')}
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {result.map(({ fruit, count }) => {
                        const fedCount = fedCounts[fruit.id] || 0;
                        const isDone = fedCount >= count;
                        
                        return (
                          <button 
                            key={fruit.id} 
                            onClick={() => {
                              setFedCounts(prev => ({ ...prev, [fruit.id]: (prev[fruit.id] || 0) + 1 }));
                              setLastFedTime(new Date().toLocaleString('zh-TW', { 
                                month: 'numeric', 
                                day: 'numeric', 
                                hour: '2-digit', 
                                minute: '2-digit',
                                hour12: false 
                              }));
                            }}
                            onContextMenu={(e) => {
                              e.preventDefault();
                              setFedCounts(prev => ({ ...prev, [fruit.id]: Math.max(0, (prev[fruit.id] || 0) - 1) }));
                            }}
                            className={`bg-black/20 rounded-2xl p-5 border flex items-center gap-5 group transition-all duration-300 text-left relative overflow-hidden active:scale-[0.98] ${isDone ? 'border-emerald-500/30 bg-emerald-500/5' : 'border-white/5 hover:border-amber-500/30 hover:bg-white/5 hover:shadow-[0_10px_30px_rgba(0,0,0,0.3)]'}`}
                          >
                            <div className="relative">
                              <div className={`absolute inset-0 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${isDone ? 'bg-emerald-500/20' : 'bg-amber-500/20'}`} />
                              {fruitIcons[fruit.id] ? (
                                <img 
                                  src={fruitIcons[fruit.id]} 
                                  alt={fruit.names.zh} 
                                  className="w-12 h-12 object-contain drop-shadow-lg relative z-10 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300"
                                  referrerPolicy="no-referrer"
                                />
                              ) : (
                                <div 
                                  className="w-12 h-12 rounded-xl shrink-0 shadow-lg relative z-10 group-hover:scale-110 transition-transform"
                                  style={{ backgroundColor: fruit.color }}
                                />
                              )}
                              
                              {fedCount > 0 && (
                                <motion.div 
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  className={`absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold shadow-lg z-20 ring-2 ring-black/50 ${isDone ? 'bg-emerald-500 text-white' : 'bg-amber-500 text-black'}`}
                                >
                                  {fedCount}
                                </motion.div>
                              )}
                            </div>
                            <div className="flex-1">
                              <p className={`text-sm font-bold transition-colors ${isDone ? 'text-emerald-500' : 'text-white group-hover:text-amber-500'}`}>{fruit.names.zh}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <p className="text-xs text-[#9e9e9e]">
                                  {t('chocoboColor.progress')}: <span className={`font-mono font-bold text-base ml-1 transition-colors ${isDone ? 'text-emerald-500' : 'text-amber-500 group-hover:text-amber-400'}`}>{fedCount}</span> / {count}
                                </p>
                              </div>
                            </div>
                            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <div className="flex flex-col gap-1">
<span className="text-[8px] text-[#666] bg-black/40 px-1.5 py-0.5 rounded uppercase font-bold">{t('chocoboColor.leftClick')}</span>
                                <span className="text-[8px] text-[#666] bg-black/40 px-1.5 py-0.5 rounded uppercase font-bold">{t('chocoboColor.rightClick')}</span>
                              </div>
                            </div>
                            {isDone && (
                              <motion.div 
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="text-emerald-500 ml-auto"
                              >
                                <Check size={20} />
                              </motion.div>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* Feeding Order */}
                  <AnimatePresence>
                    {showOrder && feedingOrder.length > 0 && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-10 pt-10 border-t border-white/5 overflow-hidden"
                      >
                        <div className="flex items-center justify-between mb-8">
                          <div className="space-y-1">
<h4 className="text-sm font-bold text-white uppercase tracking-widest">{t('chocoboColor.suggestedSequence')}</h4>
                            <p className="text-[10px] text-[#9e9e9e]">{t('chocoboColor.sequenceTip')}</p>
                          </div>
                          <div className="px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full">
                            <span className="text-[10px] text-amber-500 font-bold">{t('chocoboColor.totalFruit')} {feedingOrder.length} {t('chocoboColor.fruit')}</span>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-3">
                          {feedingOrder.map((fruit, idx) => (
                            <motion.div 
                              key={idx}
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: Math.min(idx * 0.01, 1) }}
                              className="relative bg-black/40 border border-white/5 rounded-xl p-2.5 flex items-center gap-2.5 group hover:border-amber-500/30 transition-all min-w-[120px]"
                            >
                              <div className="flex-shrink-0 w-6 h-6 bg-[#222] border border-white/10 rounded-lg flex items-center justify-center text-[10px] font-mono text-amber-500 font-bold shadow-lg">
                                {idx + 1}
                              </div>
                              {fruitIcons[fruit.id] ? (
                                <img 
                                  src={fruitIcons[fruit.id]} 
                                  alt="" 
                                  className="w-7 h-7 object-contain drop-shadow-md group-hover:scale-110 transition-transform" 
                                  referrerPolicy="no-referrer"
                                />
                              ) : (
                                <div 
                                  className="w-7 h-7 rounded-lg shadow-inner"
                                  style={{ backgroundColor: fruit.color }}
                                />
                              )}
                              <span className="text-[11px] font-bold text-white line-clamp-1">{fruit.names.zh}</span>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Info Sidebar */}
        <div className="space-y-6">
          <div className="bg-amber-500/5 rounded-3xl p-6 border border-amber-500/10 space-y-4">
<h3 className="text-amber-500 font-bold flex items-center gap-2">
              <Info size={18} />
              {t('chocoboColor.feedingTip')}
            </h3>
            <ul className="space-y-3 text-sm text-[#9e9e9e] leading-relaxed">
<li className="flex gap-2">
                <span className="text-amber-500">•</span>
                <span>{t('chocoboColor.capNote')}</span>
              </li>
              <li className="flex gap-2">
                <span className="text-amber-500">•</span>
                <span>{t('chocoboColor.waitNote', { hours: t('chocoboColor.hours') })}</span>
              </li>
              <li className="flex gap-2">
                <span className="text-amber-500">•</span>
                <span>{t('chocoboColor.feedingTipDesc')}</span>
              </li>
              <li className="flex gap-2">
                <span className="text-amber-500">•</span>
                <span>{t('chocoboColor.sequenceAction')}</span>
              </li>
            </ul>
          </div>

          <div className="bg-[#1a1a1a] rounded-3xl p-6 border border-white/5 space-y-4">
            <h3 className="text-white font-bold flex items-center gap-2 text-sm">
              <RotateCcw size={16} className="text-indigo-400" />
              資料來源
            </h3>
            <p className="text-xs text-[#9e9e9e] leading-relaxed">
              染色計算器的顏色資料來源參考自 <a href="https://ffxivchocobo.com/" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:underline">ffxivchocobo.com</a>，感謝原作者的貢獻。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
