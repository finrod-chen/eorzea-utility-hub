import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Map as MapIcon, Search, X, ChevronRight, Info, ExternalLink, Filter } from 'lucide-react';
import { TREASURE_DATA } from '../constants/treasureData';
import { ZONE_TRANSLATIONS } from '../constants/zoneTranslations';
import { AETHERYTE_DATA } from '../constants/aetheryteData';
import { CoordinateUtils } from '../utils/coordinateUtils';

const ZONE_MAPPING: Record<string, string> = {
  'coerthascentralhighlands': 'coerthas_central_highlands',
  'coerthaswesternhighlands': 'coerthas_western_highlands',
  'theseaofclouds': 'the_sea_of_clouds',
  'thedravanianforelands': 'the_dravanian_forelands',
  'thechurningmists': 'the_churning_mists',
  'thedravanianhinterlands': 'the_dravanian_hinterlands',
  'thefringes': 'the_fringes',
  'thepeaks': 'the_peaks',
  'thelochs': 'the_lochs',
  'therubysea': 'the_ruby_sea',
  'yanxia': 'yanxia',
  'theazimsteppe': 'the_azim_steppe',
  'lakeland': 'lakeland',
  'kholusia': 'kholusia',
  'amharaeng': 'amh_araeng',
  'ilmheg': 'il_mheg',
  'theraktikagreatwood': 'the_rak_tika_greatwood',
  'thetempest': 'the_tempest',
  'labyrinthos': 'labyrinthos',
  'thavnair': 'thavnair',
  'garlemald': 'garlemald',
  'marelamentorum': 'mare_lamentorum',
  'ultimathule': 'ultima_thule',
  'elpis': 'elpis',
  'urqopacha': 'urqopacha',
  'kozamauka': 'kozamauka',
  'yaktel': 'yaktel',
  'shaaloani': 'shaaloani',
  'heritagefound': 'heritage_found',
  'livingmemory': 'living_memory'
};

export default function TreasureHunt() {
  const [selectedLevelId, setSelectedLevelId] = useState<string>(TREASURE_DATA.mapLevels[0].id);
  const [selectedLocation, setSelectedLocation] = useState<any | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [copied, setCopied] = useState(false);

  const copyCoords = () => {
    if (selectedLocation) {
      const text = `${selectedLocation.coords.x}, ${selectedLocation.coords.y}`;
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const selectedLevel = TREASURE_DATA.mapLevels.find(l => l.id === selectedLevelId)!;
  
  const filteredMaps = TREASURE_DATA.maps.filter(m => 
    m.level === selectedLevelId && 
    (ZONE_TRANSLATIONS[m.zoneId]?.includes(searchTerm) || m.zoneId.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const groupedMaps = filteredMaps.reduce((acc, map) => {
    if (!acc[map.zoneId]) {
      acc[map.zoneId] = [];
    }
    acc[map.zoneId].push(map);
    return acc;
  }, {} as Record<string, typeof filteredMaps>);

  return (
    <div className="space-y-8">
      <header>
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-amber-500/10 rounded-xl">
            <MapIcon className="text-amber-500" size={24} />
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">藏寶搜尋 (Treasure Hunt)</h2>
        </div>
        <p className="text-[#9e9e9e] text-sm">對照藏寶圖碎片，快速定位寶藏位置。</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar: Map Types */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-[#1a1a1a] border border-white/5 rounded-3xl p-6">
            <h3 className="text-xs font-bold text-[#9e9e9e] uppercase tracking-widest mb-4 flex items-center gap-2">
              <Filter size={14} className="text-amber-500" /> 選擇地圖種類
            </h3>
            <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-2">
              {TREASURE_DATA.mapLevels.map(level => (
                <button
                  key={level.id}
                  onClick={() => {
                    setSelectedLevelId(level.id);
                    setSelectedLocation(null);
                  }}
                  className={`w-full flex flex-col items-start p-4 rounded-2xl border transition-all text-left ${
                    selectedLevelId === level.id 
                    ? 'bg-amber-500/10 border-amber-500/50' 
                    : 'bg-black/20 border-white/5 hover:border-white/20'
                  }`}
                >
                  <span className={`font-bold text-sm ${selectedLevelId === level.id ? 'text-amber-500' : 'text-white'}`}>
                    {level.name}
                  </span>
                  <span className="text-[10px] text-[#9e9e9e] mt-1">Lv.{level.minLevel}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-[#1a1a1a] border border-white/5 rounded-3xl p-6">
            <h3 className="text-xs font-bold text-[#9e9e9e] uppercase tracking-widest mb-4 flex items-center gap-2">
              <Search size={14} className="text-amber-500" /> 快速篩選區域
            </h3>
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="輸入區域名稱 (中文)..."
                className="w-full bg-black/40 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:border-amber-500 outline-none transition-colors"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9e9e9e]" size={18} />
            </div>
          </div>
        </div>

        {/* Main: Map Fragments Grid */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-[#1a1a1a] border border-white/5 rounded-3xl p-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-lg font-bold text-white mb-1">{selectedLevel.name} 碎片對照</h3>
                <p className="text-xs text-[#9e9e9e]">點擊下方碎片以查看完整地圖位置</p>
              </div>
              <div className="px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full">
                <span className="text-[10px] font-bold text-amber-500 uppercase tracking-widest">共 {filteredMaps.length} 個位置</span>
              </div>
            </div>

            <div className="space-y-8">
              {Object.entries(groupedMaps).map(([zoneId, maps]) => (
                <div key={zoneId} className="space-y-4">
                  <h4 className="text-sm font-bold text-amber-500 border-b border-white/5 pb-2">
                    {ZONE_TRANSLATIONS[zoneId] || zoneId}
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {maps.map(map => (
                      <button
                        key={map.id}
                        onClick={() => setSelectedLocation(map)}
                        className={`group relative aspect-square rounded-2xl overflow-hidden border-2 transition-all ${
                          selectedLocation?.id === map.id 
                          ? 'border-amber-500 ring-4 ring-amber-500/20' 
                          : 'border-white/5 hover:border-white/20'
                        }`}
                      >
                        <img 
                          src={`/TreasureHunt/treasures/${map.level}_${map.zoneId}_${map.index.toString().padStart(2, '0')}.webp`}
                          alt={`Treasure ${map.index}`}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                          <p className="text-[10px] font-bold text-white truncate">#{map.index}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {Object.keys(groupedMaps).length === 0 && (
              <div className="py-20 text-center">
                <MapIcon size={48} className="mx-auto text-white/5 mb-4" />
                <p className="text-[#9e9e9e]">找不到符合條件的地圖位置</p>
              </div>
            )}
          </div>

          {/* Map Detail Modal */}
          <AnimatePresence>
            {selectedLocation && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-[#1a1a1a] border border-amber-500/20 rounded-3xl overflow-hidden w-full max-w-2xl max-h-[90vh] flex flex-col"
                >
                  <div className="p-6 border-b border-white/5 flex items-center justify-between bg-amber-500/5">
                    <div className="flex items-center gap-4">
                      <div>
                        <h4 className="font-bold text-white">{ZONE_TRANSLATIONS[selectedLocation.zoneId] || selectedLocation.zoneId}</h4>
                        <p className="text-xs text-amber-500 font-mono">X: {selectedLocation.coords.x}, Y: {selectedLocation.coords.y}
                              <button 
                                onClick={copyCoords}
                                className="ml-3 px-2 py-0.5 bg-amber-500/20 border border-amber-500/50 rounded text-[10px] text-amber-500 hover:bg-amber-500/30 transition-colors"
                              >
                                {copied ? '已複製!' : '複製座標'}
                              </button>
                            </p>
                      </div>
                    </div>
                    <button 
                      onClick={() => setSelectedLocation(null)}
                      className="p-2 hover:bg-white/10 rounded-full transition-colors text-[#9e9e9e] hover:text-white"
                    >
                      <X size={20} />
                    </button>
                  </div>
                  <div className="p-6 overflow-y-auto">
                    <div className="relative w-full">
                      <img 
                        src={`/TreasureHunt/maps/map-${selectedLocation.zoneId}.webp`} 
                        alt={ZONE_TRANSLATIONS[selectedLocation.zoneId] || selectedLocation.zoneId}
                        className="w-full h-auto rounded-xl"
                        referrerPolicy="no-referrer"
                      />
                      {/* Treasure Marker */}
                      <img 
                        src="/TreasureHunt/treasuresmark.png"
                        alt="Treasure Location"
                        className="absolute w-8 h-8 -translate-x-1/2 -translate-y-1/2"
                        style={{ 
                          left: `${CoordinateUtils.gameToImageCoords(selectedLocation.coords.x, selectedLocation.coords.y).x}%`, 
                          top: `${CoordinateUtils.gameToImageCoords(selectedLocation.coords.x, selectedLocation.coords.y).y}%` 
                        }}
                        referrerPolicy="no-referrer"
                      />
                      {/* All Aetherytes Markers */}
                      {(() => {
                        const subzoneKey = ZONE_MAPPING[selectedLocation.zoneId] || selectedLocation.zoneId;
                        const aetherytes = AETHERYTE_DATA[subzoneKey] || [];
                        
                        return aetherytes.map(aetheryte => (
                          <div key={aetheryte.id} className="absolute" style={{ 
                            left: `${CoordinateUtils.gameToImageCoords(aetheryte.coords.x, aetheryte.coords.y).x}%`, 
                            top: `${CoordinateUtils.gameToImageCoords(aetheryte.coords.x, aetheryte.coords.y).y}%` 
                          }}>
                            <img 
                              src="/TreasureHunt/aetheryte.png"
                              alt={aetheryte.name.zh}
                              className="w-8 h-8 -translate-x-1/2 -translate-y-1/2"
                              referrerPolicy="no-referrer"
                            />
                            <span className="absolute top-full left-1/2 -translate-x-1/2 mt-1 text-[10px] font-bold text-white bg-black/60 px-1 rounded whitespace-nowrap">
                              {aetheryte.name.zh}
                            </span>
                          </div>
                        ));
                      })()}
                    </div>
                  </div>
                  <div className="p-6 bg-black/20 flex items-center gap-4">
                    <Info size={16} className="text-amber-500 shrink-0" />
                    <p className="text-xs text-[#9e9e9e] leading-relaxed">
                      提示：寶藏圖的位置通常在該區域的特定座標點。如果對照圖仍難以辨認，可以嘗試觀察背景的地形特徵，如山脈、河流或建築物。
                    </p>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
