import React, { useEffect, useRef, useState } from 'react';
import { Map as MapIcon, Info, ExternalLink, Search } from 'lucide-react';

declare global {
  interface Window {
    YZWF: any;
    $: any;
  }
}

const MAP_LIST = [
  { id: 92, name: '中拉諾西亞' },
  { id: 93, name: '拉諾西亞低地' },
  { id: 94, name: '東拉諾西亞' },
  { id: 95, name: '西拉諾西亞' },
  { id: 96, name: '拉諾西亞高地' },
  { id: 97, name: '拉諾西亞外地' },
  { id: 128, name: '黑衣森林中央林區' },
  { id: 129, name: '黑衣森林東部林區' },
  { id: 130, name: '黑衣森林南部林區' },
  { id: 131, name: '黑衣森林北部林區' },
  { id: 140, name: '西薩納蘭' },
  { id: 141, name: '中薩納蘭' },
  { id: 145, name: '東薩納蘭' },
  { id: 146, name: '南薩納蘭' },
  { id: 147, name: '北薩納蘭' },
  { id: 156, name: '摩杜納' },
  { id: 155, name: '庫爾札斯中央高地' },
];

export default function InteractiveMaps() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const [selectedMapId, setSelectedMapId] = useState(92);

  useEffect(() => {
    const initMap = async () => {
      if (window.YZWF && window.YZWF.eorzeaMap && mapRef.current) {
        try {
          const map = await window.YZWF.eorzeaMap.create(mapRef.current);
          mapInstanceRef.current = map;
          await map.loadMapKey(selectedMapId);
        } catch (error) {
          console.error('Failed to initialize map:', error);
        }
      }
    };

    // Wait a bit for scripts to load if they haven't yet
    const timer = setTimeout(initMap, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleMapChange = async (id: number) => {
    setSelectedMapId(id);
    if (mapInstanceRef.current) {
      try {
        await mapInstanceRef.current.loadMapKey(id);
      } catch (error) {
        console.error('Failed to load map:', error);
      }
    }
  };

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-blue-500">
            <img src="/tools/InteractiveMaps.png" alt="Interactive Maps" className="w-6 h-6 object-contain" referrerPolicy="no-referrer" />
            <span className="text-xs font-bold uppercase tracking-widest">Interactive Maps</span>
          </div>
          <h1 className="text-3xl font-bold text-white">艾歐澤亞互動地圖</h1>
          <p className="text-[#9e9e9e] text-sm max-w-md">探索艾歐澤亞的地理資訊，查看各區域的資源與標記。</p>
        </div>
      </header>

      <div className="space-y-6">
        {/* Map Container */}
        <div className="w-full space-y-6">
          <div className="bg-[#1a1a1a] rounded-3xl p-1 border border-white/5 overflow-hidden min-h-[600px] relative">
            <section className="erozea-map-outer w-full h-[600px]">
              <div className="eorzea-map-glass"></div>
              <div className="eorzea-map-inner w-full h-full" id="eorzea-map" ref={mapRef}></div>
              <div className="eorzea-map-resize-handler"></div>
            </section>
          </div>

          <div className="bg-black/20 rounded-2xl p-6 border border-white/5 flex gap-4 items-start">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <Info size={20} className="text-blue-500" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white mb-1">地圖操作指南</h4>
              <p className="text-xs text-[#9e9e9e] leading-relaxed">
                使用滑鼠滾輪進行縮放，點擊並拖拽可移動地圖。點擊地圖上的標記以查看詳細內容。
              </p>
            </div>
          </div>

          {/* Data Source Box */}
          <div className="bg-blue-500/5 border border-blue-500/20 rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-blue-400">
                <Info size={16} />
                <span className="text-xs font-bold uppercase tracking-wider">資料來源</span>
              </div>
              <p className="text-xs text-[#9e9e9e] leading-relaxed">
                互動地圖工具由 <span className="text-white font-medium">FFCafe 肥肥咖啡</span> 開發。
              </p>
            </div>
            <a 
              href="https://www.ffcafe.cn/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 transition-colors bg-blue-500/10 px-4 py-2 rounded-xl border border-blue-500/20"
            >
              訪問官網 <ExternalLink size={12} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
