import React, { useState, useMemo } from 'react';
import { BookOpen, Info, RotateCcw } from 'lucide-react';
import { motion } from 'motion/react';

const LINES = [
  // Rows
  [0, 1, 2, 3], [4, 5, 6, 7], [8, 9, 10, 11], [12, 13, 14, 15],
  // Cols
  [0, 4, 8, 12], [1, 5, 9, 13], [2, 6, 10, 14], [3, 7, 11, 15],
  // Diagonals
  [0, 5, 10, 15], [3, 6, 9, 12]
];

function countLines(currentStickers: boolean[]) {
  let lines = 0;
  for (const line of LINES) {
    if (line.every(idx => currentStickers[idx])) {
      lines++;
    }
  }
  return lines;
}

function getCombinations(arr: number[], k: number): number[][] {
  const result: number[][] = [];
  function backtrack(start: number, current: number[]) {
    if (current.length === k) {
      result.push([...current]);
      return;
    }
    for (let i = start; i < arr.length; i++) {
      current.push(arr[i]);
      backtrack(i + 1, current);
      current.pop();
    }
  }
  backtrack(0, []);
  return result;
}

export default function WondrousTails() {
  const [stickers, setStickers] = useState<boolean[]>(Array(16).fill(false));

  const stickerCount = stickers.filter(s => s).length;

  const probabilities = useMemo(() => {
    if (stickerCount > 9) return { 1: 0, 2: 0, 3: 0 };
    
    const emptySlots: number[] = [];
    stickers.forEach((s, i) => {
      if (!s) emptySlots.push(i);
    });

    const remaining = 9 - stickerCount;
    const combinations = getCombinations(emptySlots, remaining);
    
    let oneLine = 0;
    let twoLines = 0;
    let threeLines = 0;

    combinations.forEach(combo => {
      const tempStickers = [...stickers];
      combo.forEach(idx => tempStickers[idx] = true);
      const lines = countLines(tempStickers);
      if (lines >= 1) oneLine++;
      if (lines >= 2) twoLines++;
      if (lines >= 3) threeLines++;
    });

    const total = combinations.length || 1;
    return {
      1: (oneLine / total) * 100,
      2: (twoLines / total) * 100,
      3: (threeLines / total) * 100
    };
  }, [stickers, stickerCount]);

  const toggleSticker = (i: number) => {
    const newStickers = [...stickers];
    if (!newStickers[i] && stickerCount >= 9) return;
    newStickers[i] = !newStickers[i];
    setStickers(newStickers);
  };

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <div className="flex items-center gap-2 text-[#00B0FF]">
          <img src="/tools/WondrousTails.png" alt="" className="w-5 h-5 object-contain" referrerPolicy="no-referrer" />
          <span className="text-xs font-bold uppercase tracking-widest">Wondrous Tails</span>
        </div>
        <h1 className="text-3xl font-bold text-white">庫洛天書機率預測</h1>
        <p className="text-[#9e9e9e] text-sm max-w-md">點擊格子標記您的印花位置，我們將計算達成 1/2/3 條連線的剩餘機率。</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-[#1a1a1a] rounded-3xl p-8 border border-white/5">
          <div className="max-w-md mx-auto">
            <div className="grid grid-cols-4 gap-3 aspect-square">
              {stickers.map((active, i) => (
                <button
                  key={i}
                  onClick={() => toggleSticker(i)}
                  className={`
                    relative rounded-2xl border-2 transition-all duration-200 flex items-center justify-center
                    ${active 
                      ? 'bg-[#00B0FF] border-[#00B0FF] shadow-lg shadow-[#00B0FF]/20 scale-95' 
                      : 'bg-black/40 border-white/5 hover:border-white/20'}
                  `}
                >
                  {active && (
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                      <div className="w-4 h-4 rounded-full bg-white" />
                    </div>
                  )}
                </button>
              ))}
            </div>
            
            <div className="mt-8 flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-xs text-[#9e9e9e] uppercase font-bold">Stickers Placed</p>
                <p className="text-2xl font-bold text-white">{stickerCount} / 9</p>
              </div>
              <div className="flex gap-3">
                <button 
                  onClick={() => {
                    const count = stickers.filter(s => s).length;
                    const newStickers = Array(16).fill(false);
                    const indices = Array.from({length: 16}, (_, i) => i);
                    for (let i = 0; i < count; i++) {
                      const randIdx = Math.floor(Math.random() * indices.length);
                      newStickers[indices[randIdx]] = true;
                      indices.splice(randIdx, 1);
                    }
                    setStickers(newStickers);
                  }}
                  disabled={stickerCount < 3 || stickerCount > 7}
                  className="px-6 py-2 bg-amber-500/10 hover:bg-amber-500/20 text-amber-500 rounded-xl text-sm transition-colors disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-2"
                  title="消耗 2 點奇想點洗牌 (3-7 枚印花時可用)"
                >
                  <RotateCcw size={14} />
                  洗牌
                </button>
                <button 
                  onClick={() => setStickers(Array(16).fill(false))}
                  className="px-6 py-2 bg-white/5 hover:bg-white/10 rounded-xl text-sm transition-colors"
                >
                  重置印花
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-[#1a1a1a] rounded-3xl p-6 border border-white/5 space-y-6">
            <h3 className="text-sm font-bold text-[#00B0FF] uppercase tracking-widest">Probability Analysis</h3>
            
            <div className="space-y-6">
              {[
                { label: '1 條線', prob: probabilities[1], color: 'bg-emerald-500' },
                { label: '2 條線', prob: probabilities[2], color: 'bg-blue-500' },
                { label: '3 條線', prob: probabilities[3], color: 'bg-amber-500' },
              ].map((item, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#9e9e9e]">{item.label}</span>
                    <span className="text-white font-mono font-bold">
                      {stickerCount === 0 ? '---' : `${item.prob.toFixed(1)}%`}
                    </span>
                  </div>
                  <div className="h-2 bg-black/40 rounded-full overflow-hidden">
                    <motion.div 
                      className={`h-full ${item.color}`}
                      initial={{ width: 0 }}
                      animate={{ width: stickerCount === 0 ? 0 : `${item.prob}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-white/5 flex gap-3 text-xs text-[#9e9e9e] leading-relaxed">
              <Info size={16} className="shrink-0 text-[#00B0FF]" />
              <p>機率計算基於剩餘印花隨機落點的模擬結果。建議在 7 枚印花後使用洗牌功能優化佈局。</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
