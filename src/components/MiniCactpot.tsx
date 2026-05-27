import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Grid3X3, RotateCcw, HelpCircle, TrendingUp, Star, AlertCircle } from 'lucide-react';
import { CACTPOT_PAYOUTS } from '../utils/ff14';
import { useTranslation } from 'react-i18next';

const LINES = [
  { name: 'Row 1', indices: [0, 1, 2] },
  { name: 'Row 2', indices: [3, 4, 5] },
  { name: 'Row 3', indices: [6, 7, 8] },
  { name: 'Col 1', indices: [0, 3, 6] },
  { name: 'Col 2', indices: [1, 4, 7] },
  { name: 'Col 3', indices: [2, 5, 8] },
  { name: 'Diag 1', indices: [0, 4, 8] },
  { name: 'Diag 2', indices: [2, 4, 6] },
];

export default function MiniCactpot() {
  const { t } = useTranslation();
  const [grid, setGrid] = useState<(number | null)[]>(Array(9).fill(null));
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const reset = () => {
    setGrid(Array(9).fill(null));
    setSelectedIndex(null);
  };

  const setCell = (index: number, val: number | null) => {
    const newGrid = [...grid];
    // If setting a number that already exists elsewhere, clear that cell
    if (val !== null) {
      const existingIndex = newGrid.indexOf(val);
      if (existingIndex !== -1) newGrid[existingIndex] = null;
    }
    newGrid[index] = val;
    setGrid(newGrid);
  };

  const analysis = useMemo(() => {
    const usedNumbers = grid.filter((n): n is number => n !== null);
    const availableNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9].filter(n => !usedNumbers.includes(n));

    return LINES.map(line => {
      const lineValues = line.indices.map(i => grid[i]);
      const knownValues = lineValues.filter((v): v is number => v !== null);
      const unknownCount = 3 - knownValues.length;

      let expectedValue = 0;
      let maxPossible = 0;
      let minPossible = Infinity;
      let combinations = 0;

      if (unknownCount === 0) {
        const sum = knownValues.reduce((a, b) => a + b, 0);
        expectedValue = CACTPOT_PAYOUTS[sum];
        maxPossible = expectedValue;
        minPossible = expectedValue;
        combinations = 1;
      } else if (unknownCount === 1) {
        availableNumbers.forEach(n => {
          const sum = knownValues.reduce((a, b) => a + b, 0) + n;
          const payout = CACTPOT_PAYOUTS[sum];
          expectedValue += payout;
          maxPossible = Math.max(maxPossible, payout);
          minPossible = Math.min(minPossible, payout);
          combinations++;
        });
        expectedValue /= availableNumbers.length;
      } else if (unknownCount === 2) {
        for (let i = 0; i < availableNumbers.length; i++) {
          for (let j = i + 1; j < availableNumbers.length; j++) {
            const sum = knownValues.reduce((a, b) => a + b, 0) + availableNumbers[i] + availableNumbers[j];
            const payout = CACTPOT_PAYOUTS[sum];
            expectedValue += payout;
            maxPossible = Math.max(maxPossible, payout);
            minPossible = Math.min(minPossible, payout);
            combinations++;
          }
        }
        expectedValue /= combinations || 1;
      } else if (unknownCount === 3) {
        for (let i = 0; i < availableNumbers.length; i++) {
          for (let j = i + 1; j < availableNumbers.length; j++) {
            for (let k = j + 1; k < availableNumbers.length; k++) {
              const sum = availableNumbers[i] + availableNumbers[j] + availableNumbers[k];
              const payout = CACTPOT_PAYOUTS[sum];
              expectedValue += payout;
              maxPossible = Math.max(maxPossible, payout);
              minPossible = Math.min(minPossible, payout);
              combinations++;
            }
          }
        }
        expectedValue /= combinations || 1;
      }

      return {
        ...line,
        expectedValue,
        maxPossible,
        minPossible,
        isComplete: unknownCount === 0
      };
    }).sort((a, b) => {
      if (isNaN(a.expectedValue)) return 1;
      if (isNaN(b.expectedValue)) return -1;
      return b.expectedValue - a.expectedValue;
    });
  }, [grid]);

  const bestLine = analysis[0];
  const isBestLine = (index: number) => bestLine && bestLine.indices.includes(index) && grid.filter(n => n !== null).length >= 1;

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-[#D39E47]">
            <img src="/tools/MiniCactpot.png" alt="" className="w-5 h-5 object-contain" referrerPolicy="no-referrer" />
            <span className="text-xs font-bold uppercase tracking-widest">Mini Cactpot</span>
          </div>
<h1 className="text-3xl font-bold text-white">{t('miniCactpot.title')}</h1>
          <p className="text-[#9e9e9e] text-sm max-w-md">{t('miniCactpot.subtitle')}</p>
        </div>
        <div className="flex gap-3">
          <button onClick={reset} className="p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-colors text-[#9e9e9e] hover:text-white">
            <RotateCcw size={20} />
          </button>
          <button className="p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-colors text-[#9e9e9e] hover:text-white">
            <HelpCircle size={20} />
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Grid Input */}
        <div className="lg:col-span-2 bg-[#1a1a1a] rounded-3xl p-8 border border-white/5">
          <div className="grid grid-cols-3 gap-4 max-w-md mx-auto aspect-square">
            {grid.map((cell, i) => (
              <button
                key={i}
                onClick={() => setSelectedIndex(i)}
                className={`
                  relative w-full h-full rounded-2xl text-3xl font-bold transition-all border-2 flex items-center justify-center
                  ${selectedIndex === i ? 'border-[#D39E47] bg-[#D39E47]/10' : 'border-white/5 bg-black/40'}
                  ${isBestLine(i) ? 'shadow-[0_0_15px_rgba(211,158,71,0.3)]' : ''}
                `}
              >
                {cell || '?'}
                {isBestLine(i) && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#D39E47] rounded-full shadow-lg" />
                )}
              </button>
            ))}
          </div>
          
          <div className="mt-10 grid grid-cols-3 md:grid-cols-5 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => (
              <button 
                key={n}
                onClick={() => {
                  if (selectedIndex !== null) {
                    setCell(selectedIndex, n);
                    setSelectedIndex((selectedIndex + 1) % 9);
                  }
                }}
                className={`py-4 rounded-xl font-bold transition-all ${grid.includes(n) ? 'bg-[#D39E47] text-black' : 'bg-white/5 hover:bg-white/10 text-white'}`}
              >
                {n}
              </button>
            ))}
            <button 
              onClick={() => {
                if (selectedIndex !== null) setCell(selectedIndex, null);
              }}
              className="py-4 rounded-xl font-bold bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-all"
            >
              {t('miniCactpot.clear')}
            </button>
          </div>
        </div>

        {/* Analysis */}
        <div className="space-y-6">
          <div className="bg-[#1a1a1a] rounded-3xl p-6 border border-white/5">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp size={18} className="text-[#D39E47]" />
              <h3 className="text-sm font-bold text-[#D39E47] uppercase tracking-widest">{t('miniCactpot.suggestedRoutes')}</h3>
            </div>
            
            {analysis.some(l => isNaN(l.expectedValue)) && (
              <div className="mb-4 p-4 bg-amber-500/10 border border-amber-500/20 rounded-2xl flex gap-3">
                <AlertCircle className="text-amber-500 shrink-0" size={18} />
                <p className="text-[11px] text-[#9e9e9e] leading-relaxed">
<span className="text-amber-500 font-bold block mb-1">{t('miniCactpot.analysisTips')}</span>
                  {t('miniCactpot.notEnoughData')}
                </p>
              </div>
            )}

            <div className="space-y-3">
              {analysis.slice(0, 4).map((line, idx) => (
                <div 
                  key={line.name} 
                  className={`p-4 rounded-2xl border transition-all ${idx === 0 ? 'bg-[#D39E47]/10 border-[#D39E47]' : 'bg-black/20 border-white/5'}`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-xs font-bold text-[#9e9e9e]">{line.name}</span>
                    {idx === 0 && <Star size={14} className="text-[#D39E47] fill-[#D39E47]" />}
                  </div>
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-[10px] text-[#9e9e9e] uppercase font-bold tracking-tighter">{t('miniCactpot.expectedValue')}</p>
                      <p className={`text-lg font-mono font-bold ${idx === 0 && !isNaN(line.expectedValue) ? 'text-[#D39E47]' : 'text-white'}`}>
                        {isNaN(line.expectedValue) ? '---' : Math.round(line.expectedValue).toLocaleString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] text-[#9e9e9e] uppercase font-bold tracking-tighter">{t('miniCactpot.maxReturn')}</p>
                      <p className="text-sm font-mono font-bold text-white">
                        {line.maxPossible.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#1a1a1a] rounded-3xl p-6 border border-white/5">
            <h3 className="text-sm font-bold text-[#9e9e9e] uppercase tracking-widest mb-4">Payout Reference</h3>
            <div className="space-y-2 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
              {Object.entries(CACTPOT_PAYOUTS).sort((a, b) => Number(b[1]) - Number(a[1])).map(([sum, payout]) => (
                <div key={sum} className="flex justify-between items-center py-2 border-b border-white/5 last:border-0">
                  <span className="text-xs text-[#9e9e9e]">Sum: <span className="text-white font-bold">{sum}</span></span>
                  <span className={`text-sm font-mono font-bold ${Number(payout) >= 1000 ? 'text-amber-400' : 'text-white'}`}>
                    {payout.toLocaleString()} MGP
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#D39E47] rounded-3xl p-6 text-black">
<h3 className="font-bold mb-2">{t('miniCactpot.bestTip')}</h3>
            <p className="text-sm opacity-80 leading-relaxed">
              {t('miniCactpot.priorityFind')} 1-2-3 ({t('miniCactpot.sum')} 6) {t('miniCactpot.or')} 7-8-9 ({t('miniCactpot.sum')} 24) {t('miniCactpot.lines')}. {t('miniCactpot.ifKnown')} 1 {t('miniCactpot.or')} 2 {t('miniCactpot.lookAtConnected')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
