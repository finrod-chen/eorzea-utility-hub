import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, MapPin, TrendingUp, History, ExternalLink, Loader2, AlertCircle, ShoppingCart, Globe, Star, Trash2 } from 'lucide-react';
import itemsIndex from '../data/items-index.json';

interface MarketItem {
  itemID: number;
  worldID?: number;
  lastUploadTime: number;
  listings: Listing[];
  recentHistory: HistoryItem[];
  dcName?: string;
  currentAveragePrice: number;
  currentAveragePriceNQ: number;
  currentAveragePriceHQ: number;
  regularSaleVelocity: number;
  nqSaleVelocity: number;
  hqSaleVelocity: number;
  averagePrice: number;
  averagePriceNQ: number;
  averagePriceHQ: number;
  minPrice: number;
  minPriceNQ: number;
  minPriceHQ: number;
  maxPrice: number;
  maxPriceNQ: number;
  maxPriceHQ: number;
}

interface Listing {
  lastReviewTime: number;
  pricePerUnit: number;
  quantity: number;
  total: number;
  retainerName: number;
  retainerCity: number;
  creatorName: string;
  hq: boolean;
  worldName?: string;
}

interface HistoryItem {
  hq: boolean;
  pricePerUnit: number;
  quantity: number;
  total: number;
  timestamp: number;
  worldName?: string;
}

interface SearchResult {
  ID: number;
  Name: string;
  Icon: string;
  ItemKind: { Name: string };
  ItemSearchCategory?: any;
}

interface ServerInfo {
  name: string;
  api: string;
}

interface DataCenterInfo {
  name: string;
  api: string;
  servers: ServerInfo[];
}

const DATA_CENTERS: DataCenterInfo[] = [
  {
    name: '繁中服 (陸行鳥)',
    api: '陸行鳥',
    servers: [
      { name: '伊弗利特', api: '伊弗利特' },
      { name: '迦樓羅', api: '迦樓羅' },
      { name: '利維坦', api: '利維坦' },
      { name: '鳳凰', api: '鳳凰' },
      { name: '奧汀', api: '奧汀' },
      { name: '巴哈姆特', api: '巴哈姆特' },
      { name: '拉姆', api: '拉姆' },
      { name: '泰坦', api: '泰坦' },
    ]
  }
];

const COMMON_ITEMS = [
  { id: 43996, name: '黑鐵礦' },
  { id: 44000, name: '金雲母' },
  { id: 44004, name: '深銀礦' },
  { id: 36256, name: '曉月靈砂' },
  { id: 36257, name: '黃金靈砂' },
  { id: 36258, name: '自負靈砂' },
];

declare global {
  interface Window {
    xivkit: any;
  }
}

export default function MarketBoard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDC, setSelectedDC] = useState('繁中服 (陸行鳥)');
  const [selectedWorld, setSelectedWorld] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [favorites, setFavorites] = useState<SearchResult[]>(() => {
    const saved = localStorage.getItem('ff14-market-favorites');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('ff14-market-favorites', JSON.stringify(favorites));
  }, [favorites]);

  const [isSearching, setIsSearching] = useState(false);
  const [selectedItem, setSelectedItem] = useState<SearchResult | null>(null);
  const [marketData, setMarketData] = useState<MarketItem | null>(null);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Refresh tooltips when items change
  useEffect(() => {
    if (window.xivkit?.tooltip) {
      // Try to set language to Traditional Chinese
      try {
        window.xivkit.tooltip.config({ lang: 'zh-tw' });
      } catch (e) {}
      
      // Refresh tooltips for newly rendered elements
      const timer = setTimeout(() => {
        window.xivkit.tooltip.refresh();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [searchResults, favorites, selectedItem]);

  const toggleFavorite = (item: SearchResult) => {
    setFavorites(prev => {
      const exists = prev.find(f => getItemId(f) === getItemId(item));
      if (exists) {
        return prev.filter(f => getItemId(f) !== getItemId(item));
      }
      return [...prev, item];
    });
  };

  const isFavorite = (id: number) => favorites.some(f => getItemId(f) === id);

  const isChinese = (text: string) => /[\u4e00-\u9fa5]/.test(text);

  const formatIconPath = (iconId: number) => {
    const folder = Math.floor(iconId / 1000) * 1000;
    const folderStr = folder.toString().padStart(6, '0');
    const iconStr = iconId.toString().padStart(6, '0');
    return `/i/${folderStr}/${iconStr}.png`;
  };

  const getItemId = (item: any) => item?.ID || item?.id;
  const getItemName = (item: any) => item?.Name || item?.name || '未知道具';
  const getItemIcon = (item: any) => item?.Icon || item?.icon || '';
  const getItemKind = (item: any) => item?.ItemKind?.Name || item?.item_kind?.name || '道具';

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const term = searchTerm.trim().toLowerCase();
    if (!term) return;

    setIsSearching(true);
    setError(null);
    setSelectedItem(null);
    setMarketData(null);

    try {
      // 1. Search in local index first
      const localResults = (itemsIndex.items as any[])
        .filter(item => {
          if (!item || item[0] === null || item[0] === undefined) return false;
          const id = item[0].toString();
          const name = (item[1] || '').toLowerCase();
          const en = (item[15] || '').toLowerCase();
          const ja = (item[16] || '').toLowerCase();
          const cn = (item[17] || '').toLowerCase();
          
          return id === term || name.includes(term) || en.includes(term) || ja.includes(term) || cn.includes(term);
        })
        .slice(0, 50)
        .map(item => ({
          ID: item[0],
          Name: item[1],
          Icon: formatIconPath(item[2]),
          ItemKind: { Name: item[7] },
          ItemSearchCategory: item[10] === 0 ? {} : null
        }));

      if (localResults.length > 0) {
        setSearchResults(localResults);
        setIsSearching(false);
        return;
      }

      // 2. Fallback to APIs if no local results
      const isIdSearch = /^\d+$/.test(term);
      const useChineseAPI = isChinese(term);

      // Helper for fetch with timeout
      const fetchWithTimeout = async (url: string, timeout = 5000) => {
        const controller = new AbortController();
        const id = setTimeout(() => controller.abort(), timeout);
        try {
          const response = await fetch(url, { signal: controller.signal });
          clearTimeout(id);
          return response;
        } catch (err) {
          clearTimeout(id);
          throw err;
        }
      };

      let results: any[] = [];

      if (isIdSearch) {
        // Direct ID search: Fetch item details first
        const itemId = parseInt(term);
        try {
          const response = await fetchWithTimeout(`https://xivapi.com/item/${itemId}`);
          if (response.ok) {
            const itemData = await response.json();
            const item = { 
              ID: itemData.ID, 
              Name: itemData.Name || `道具 ${itemId}`, 
              Icon: itemData.Icon, 
              ItemKind: itemData.ItemKind,
              ItemSearchCategory: itemData.ItemSearchCategory
            };
            setSearchResults([item]);
            fetchMarketData(item);
            setIsSearching(false);
            return;
          }
        } catch (err) {
          console.error('XIVAPI ID fetch failed', err);
        }
        // Fallback for ID if XIVAPI fails
        const mockItem: SearchResult = { ID: itemId, Name: `道具 ID: ${term}`, Icon: '/i/000000/000001.png', ItemKind: { Name: '未知' } };
        setSearchResults([mockItem]);
        fetchMarketData(mockItem);
        setIsSearching(false);
        return;
      }

      // Text search fallback
      if (useChineseAPI) {
        try {
          const response = await fetchWithTimeout(`https://cafemaker.wakingsands.com/search?indexes=Item&string=${encodeURIComponent(term)}&limit=20&columns=ID,Name,Icon,ItemKind,ItemSearchCategory`);
          if (response.ok) {
            const data = await response.json();
            const cafeResults = data.Results || data.results || [];
            if (Array.isArray(cafeResults) && cafeResults.length > 0) {
              results = [...results, ...cafeResults];
            }
          }
        } catch (err) {
          console.error('Cafemaker search failed', err);
        }
      }

      try {
        const response = await fetchWithTimeout(`https://xivapi.com/search?indexes=Item&string=${encodeURIComponent(term)}&limit=20&columns=ID,Name,Icon,ItemKind,ItemSearchCategory`);
        if (response.ok) {
          const data = await response.json();
          const xivResults = data.Results || data.results || [];
          if (Array.isArray(xivResults)) {
            const existingIds = new Set(results.map(r => r.ID || r.id));
            xivResults.forEach((r: any) => {
              const id = r.ID || r.id;
              if (!existingIds.has(id)) {
                results.push(r);
              }
            });
          }
        }
      } catch (err) {
        console.error('XIVAPI search failed', err);
      }

      setSearchResults(results);
      
      if (results.length === 0) {
        setError('找不到相符的物品，請嘗試輸入更精確的關鍵字（支援中/英文或道具 ID）。');
      }
    } catch (err) {
      setError(`搜尋物品時發生錯誤: ${err instanceof Error ? err.message : '未知錯誤'}`);
    } finally {
      setIsSearching(false);
    }
  };

  const fetchMarketData = async (item: any) => {
    const itemId = getItemId(item);
    if (!itemId) return;
    
    setSelectedItem(item);
    setIsLoadingData(true);
    setError(null);
    setMarketData(null);

    const dcInfo = DATA_CENTERS.find(dc => dc.name === selectedDC);
    const serverInfo = dcInfo?.servers.find(s => s.name === selectedWorld);
    
    // Fallback chain: Specific Server -> Data Center -> Region
    const locationsToTry = [];
    if (serverInfo) locationsToTry.push(serverInfo.api);
    if (dcInfo) locationsToTry.push(dcInfo.api);
    
    // Add '繁中服' as a region fallback if not already tried
    if (!locationsToTry.includes('繁中服')) {
      locationsToTry.push('繁中服');
    }

    let lastError = '';
    let successData = null;

    for (const location of locationsToTry) {
      try {
        const url = `https://universalis.app/api/v2/${encodeURIComponent(location)}/${itemId}?listings=20&entries=20`;
        console.log(`Attempting to fetch market data for ${location} from: ${url}`);
        
        const response = await fetch(url);
        if (!response.ok) {
          if (response.status === 404) {
            lastError = '找不到數據';
            continue;
          }
          throw new Error(`API 回應異常 (${response.status})`);
        }
        
        const data = await response.json();
        
        // Check if we actually got useful data
        const hasListings = data.listings && data.listings.length > 0;
        const hasHistory = data.recentHistory && data.recentHistory.length > 0;
        
        if (hasListings || hasHistory || data.minPrice > 0) {
          successData = data;
          console.log(`Successfully fetched data from ${location}`);
          break;
        } else {
          lastError = '尚無交易紀錄';
        }
      } catch (err) {
        console.warn(`Failed to fetch from ${location}:`, err);
        lastError = err instanceof Error ? err.message : '未知錯誤';
      }
    }

    try {
      if (!successData) {
        const isMarketable = item.ItemSearchCategory !== null && item.ItemSearchCategory !== undefined;
        if (!isMarketable) {
          throw new Error('此物品不可交易（無法在市場板上架）。');
        }
        throw new Error(`該物品目前在市場上找不到數據。這通常是因為該物品較冷門，或在您選擇的區域尚未有玩家上傳行情。 (最後嘗試錯誤: ${lastError})`);
      }

      // Ensure basic price fields exist for the UI
      const marketInfo = successData;
      marketInfo.minPrice = marketInfo.minPrice || (marketInfo.listings?.[0]?.pricePerUnit) || 0;
      marketInfo.currentAveragePrice = marketInfo.currentAveragePrice || marketInfo.currentAveragePriceNQ || 0;
      
      setMarketData(marketInfo);
    } catch (err) {
      console.error('Final market fetch error:', err);
      setError(err instanceof Error ? err.message : '獲取市場數據失敗');
    } finally {
      setIsLoadingData(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat().format(price);
  };

  const getTimeAgo = (timestamp: number) => {
    const diff = Date.now() - timestamp * 1000;
    const hours = Math.floor(Math.max(0, diff / (1000 * 60 * 60)));
    return `${hours} 小時前`;
  };

  return (
    <div className="space-y-8">
      <header className="space-y-4">
        <div className="flex items-center gap-3">
          <img src="/tools/MarketBoard.png" alt="" className="w-6 h-6 object-contain" referrerPolicy="no-referrer" />
          <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-[#D39E47]">Market Board</h2>
        </div>
        <h1 className="text-4xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
          市場價格 <span className="text-[#D39E47]">快速查詢</span>
        </h1>
        <p className="text-[#9e9e9e] max-w-2xl">
          整合 Universalis API，即時查詢各伺服器道具售價與交易紀錄。支援跨伺服器價格對比，助您找到最划算的交易。
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Search & Selection Panel */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-[#1a1a1a] border border-white/5 rounded-3xl p-6 space-y-6">
            <div className="space-y-4">
              <label className="text-xs font-bold text-[#9e9e9e] uppercase tracking-widest flex items-center gap-2">
                <Globe size={14} className="text-[#D39E47]" /> 選擇區域 / 伺服器
              </label>
              <div className="grid grid-cols-2 gap-2">
                <select 
                  value={selectedDC}
                  onChange={(e) => {
                    setSelectedDC(e.target.value);
                    setSelectedWorld('');
                  }}
                  className="bg-black/40 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:border-[#D39E47] outline-none transition-colors"
                >
                  {DATA_CENTERS.map(dc => (
                    <option key={dc.name} value={dc.name}>{dc.name}</option>
                  ))}
                </select>
                  <select 
                    value={selectedWorld}
                    onChange={(e) => setSelectedWorld(e.target.value)}
                    className="bg-black/40 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:border-[#D39E47] outline-none transition-colors"
                  >
                    <option value="">全區 (DC)</option>
                    {DATA_CENTERS.find(dc => dc.name === selectedDC)?.servers.map(server => (
                      <option key={server.name} value={server.name}>{server.name}</option>
                    ))}
                  </select>
              </div>
            </div>

            {favorites.length > 0 && (
              <div className="space-y-3 pb-6 border-b border-white/5">
                <p className="text-[10px] text-[#9e9e9e] uppercase font-bold tracking-widest flex items-center gap-2">
                  <Star size={10} className="text-amber-500 fill-amber-500" /> 最愛清單
                </p>
                <div className="grid grid-cols-1 gap-2 max-h-[200px] overflow-y-auto pr-2 custom-scrollbar">
                  {favorites.map((item) => (
                    <div 
                      key={`fav-${getItemId(item)}`} 
                      className="flex items-center gap-2 group"
                      data-xivkit-type="item"
                      data-xivkit-id={getItemId(item)}
                    >
                      <button
                        onClick={() => fetchMarketData(item)}
                        className={`flex-1 flex items-center gap-3 p-2 rounded-xl border transition-all text-left ${getItemId(selectedItem) === getItemId(item) ? 'bg-[#D39E47]/10 border-[#D39E47]' : 'bg-black/20 border-white/5 hover:border-white/20'}`}
                      >
                        <img src={`https://xivapi.com${getItemIcon(item)}`} alt="" className="w-8 h-8 rounded-lg" referrerPolicy="no-referrer" />
                        <p className="text-xs font-bold text-white truncate">{getItemName(item)}</p>
                      </button>
                      <button
                        onClick={() => toggleFavorite(item)}
                        className="p-2 text-[#9e9e9e] hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all opacity-0 group-hover:opacity-100"
                        title="移除"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <form onSubmit={handleSearch} className="space-y-4">
              <label className="text-xs font-bold text-[#9e9e9e] uppercase tracking-widest flex items-center gap-2">
                <Search size={14} className="text-[#D39E47]" /> 搜尋道具 (支援中/英文)
              </label>
              <div className="relative">
                <input 
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="例如: 鐵礦, Iron Ore..."
                  className="w-full bg-black/40 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:border-[#D39E47] outline-none transition-colors"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9e9e9e]" size={18} />
              </div>
              <button 
                type="submit"
                disabled={isSearching}
                className="w-full py-3 bg-[#D39E47] hover:bg-[#B88A3E] disabled:bg-[#D39E47]/50 text-black font-bold rounded-xl transition-all flex items-center justify-center gap-2"
              >
                {isSearching ? <Loader2 className="animate-spin" size={18} /> : '開始搜尋'}
              </button>
            </form>

            <div className="space-y-3">
              <p className="text-[10px] text-[#9e9e9e] uppercase font-bold tracking-widest">搜尋結果</p>
              <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {searchResults.map((item) => (
                  <div
                    key={getItemId(item)}
                    data-xivkit-type="item"
                    data-xivkit-id={getItemId(item)}
                    className={`w-full flex items-center gap-3 p-3 rounded-2xl border transition-all group ${getItemId(selectedItem) === getItemId(item) ? 'bg-[#D39E47]/10 border-[#D39E47]' : 'bg-black/20 border-white/5 hover:border-white/20'}`}
                  >
                    <button
                      onClick={() => fetchMarketData(item)}
                      className="flex-1 flex items-center gap-3 text-left min-w-0"
                    >
                      <img src={`https://xivapi.com${getItemIcon(item)}`} alt="" className="w-10 h-10 rounded-lg" referrerPolicy="no-referrer" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-white truncate">{getItemName(item)}</p>
                        <div className="flex items-center gap-2">
                          <p className="text-[10px] text-[#9e9e9e] truncate">{getItemKind(item)}</p>
                          {item.ItemSearchCategory === null && (
                            <span className="text-[9px] px-1 bg-red-500/10 text-red-500 rounded border border-red-500/20">不可交易</span>
                          )}
                        </div>
                      </div>
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(item);
                      }}
                      className={`p-2 rounded-lg transition-colors shrink-0 ${isFavorite(getItemId(item)) ? 'text-amber-500 bg-amber-500/10' : 'text-[#9e9e9e] hover:text-white hover:bg-white/5'}`}
                    >
                      <Star size={16} fill={isFavorite(getItemId(item)) ? 'currentColor' : 'none'} />
                    </button>
                  </div>
                ))}
                {searchResults.length === 0 && !isSearching && (
                  <div className="text-center py-10 text-[#9e9e9e]">
                    <Search size={32} className="mx-auto mb-2 opacity-20" />
                    <p className="text-xs">輸入道具名稱開始查詢</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Results Panel */}
        <div className="lg:col-span-2 space-y-6">
          <AnimatePresence mode="wait">
            {isLoadingData ? (
              <motion.div 
                key="loading"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="bg-[#1a1a1a] border border-white/5 rounded-3xl p-20 flex flex-col items-center justify-center text-center"
              >
                <Loader2 className="animate-spin text-[#D39E47] mb-4" size={48} />
                <p className="text-[#9e9e9e]">正在從 Universalis 獲取即時數據...</p>
              </motion.div>
            ) : error ? (
              <motion.div 
                key="error"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="bg-[#1a1a1a] border border-red-500/20 rounded-3xl p-20 flex flex-col items-center justify-center text-center"
              >
                <AlertCircle className="text-red-500 mb-4" size={48} />
                <p className="text-white font-bold mb-2">發生錯誤</p>
                <p className="text-[#9e9e9e] text-sm">{error}</p>
              </motion.div>
            ) : marketData && selectedItem ? (
              <motion.div 
                key="data"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {/* Item Summary Card */}
                <div 
                  className="bg-[#1a1a1a] border border-white/5 rounded-3xl p-6 flex flex-col md:flex-row gap-6 items-center"
                  data-xivkit-type="item"
                  data-xivkit-id={getItemId(selectedItem)}
                >
                  <img src={`https://xivapi.com${getItemIcon(selectedItem)}`} alt="" className="w-24 h-24 rounded-2xl shadow-2xl" referrerPolicy="no-referrer" />
                  <div className="flex-1 text-center md:text-left">
                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-2">
                      <h2 className="text-2xl font-bold text-white">{getItemName(selectedItem)}</h2>
                      <span className="px-2 py-0.5 bg-white/5 rounded text-[10px] text-[#9e9e9e] font-mono">ID: {getItemId(selectedItem)}</span>
                      <button
                        onClick={() => toggleFavorite(selectedItem)}
                        className={`p-2 rounded-lg transition-all ${isFavorite(getItemId(selectedItem)) ? 'text-amber-500 bg-amber-500/10' : 'text-[#9e9e9e] hover:text-white hover:bg-white/5'}`}
                        title={isFavorite(getItemId(selectedItem)) ? '從最愛移除' : '加入最愛'}
                      >
                        <Star size={20} fill={isFavorite(getItemId(selectedItem)) ? 'currentColor' : 'none'} />
                      </button>
                    </div>
                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm text-[#9e9e9e]">
                      <div className="flex items-center gap-1">
                        <MapPin size={14} className="text-[#D39E47]" />
                        {selectedWorld || selectedDC}
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 w-full md:w-auto">
                    <div className="bg-black/20 rounded-2xl p-4 text-center">
                      <p className="text-[10px] text-[#9e9e9e] uppercase font-bold mb-1">最低售價</p>
                      <p className="text-xl font-mono font-bold text-[#D39E47]">{formatPrice(marketData.minPrice)}</p>
                    </div>
                    <div className="bg-black/20 rounded-2xl p-4 text-center">
                      <p className="text-[10px] text-[#9e9e9e] uppercase font-bold mb-1">平均售價</p>
                      <p className="text-xl font-mono font-bold text-white">{formatPrice(Math.round(marketData.currentAveragePrice))}</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Current Listings */}
                  <div className="bg-[#1a1a1a] border border-white/5 rounded-3xl overflow-hidden">
                    <div className="p-4 border-b border-white/5 bg-white/5 flex items-center justify-between">
                      <h3 className="text-sm font-bold text-white flex items-center gap-2">
                        <ShoppingCart size={16} className="text-[#D39E47]" /> 目前上架
                      </h3>
                      <span className="text-[10px] text-[#9e9e9e]">前 10 筆</span>
                    </div>
                    <div className="overflow-x-auto">
                      {marketData.listings && marketData.listings.length > 0 ? (
                        <table className="w-full text-left text-xs">
                          <thead>
                            <tr className="text-[#9e9e9e] border-b border-white/5">
                              <th className="px-4 py-3 font-medium">價格</th>
                              <th className="px-4 py-3 font-medium">數量</th>
                              <th className="px-4 py-3 font-medium">總計</th>
                              <th className="px-4 py-3 font-medium">伺服器</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-white/5">
                            {marketData.listings.slice(0, 10).map((listing, i) => (
                              <tr key={i} className="hover:bg-white/5 transition-colors">
                                <td className="px-4 py-3 font-mono text-[#D39E47] font-bold">
                                  {formatPrice(listing.pricePerUnit)}
                                  {listing.hq && <span className="ml-1 text-[#00B0FF]">HQ</span>}
                                </td>
                                <td className="px-4 py-3 text-white">x{listing.quantity}</td>
                                <td className="px-4 py-3 text-[#9e9e9e]">{formatPrice(listing.total)}</td>
                                <td className="px-4 py-3 text-white">{listing.worldName || selectedWorld || selectedDC}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      ) : (
                        <div className="p-12 text-center">
                          <p className="text-[#9e9e9e] text-xs italic">目前無詳細掛售資料，僅提供上方區域彙整摘要。</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Recent History */}
                  <div className="bg-[#1a1a1a] border border-white/5 rounded-3xl overflow-hidden">
                    <div className="p-4 border-b border-white/5 bg-white/5 flex items-center justify-between">
                      <h3 className="text-sm font-bold text-white flex items-center gap-2">
                        <TrendingUp size={16} className="text-[#00B0FF]" /> 最近交易
                      </h3>
                      <span className="text-[10px] text-[#9e9e9e]">前 10 筆</span>
                    </div>
                    <div className="overflow-x-auto">
                      {marketData.recentHistory && marketData.recentHistory.length > 0 ? (
                        <table className="w-full text-left text-xs">
                          <thead>
                            <tr className="text-[#9e9e9e] border-b border-white/5">
                              <th className="px-4 py-3 font-medium">價格</th>
                              <th className="px-4 py-3 font-medium">數量</th>
                              <th className="px-4 py-3 font-medium">日期</th>
                              <th className="px-4 py-3 font-medium">伺服器</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-white/5">
                            {marketData.recentHistory.slice(0, 10).map((item, i) => (
                              <tr key={i} className="hover:bg-white/5 transition-colors">
                                <td className="px-4 py-3 font-mono text-white">
                                  {formatPrice(item.pricePerUnit)}
                                  {item.hq && <span className="ml-1 text-[#00B0FF]">HQ</span>}
                                </td>
                                <td className="px-4 py-3 text-white">x{item.quantity}</td>
                                <td className="px-4 py-3 text-[#9e9e9e]">{getTimeAgo(item.timestamp)}</td>
                                <td className="px-4 py-3 text-white">{item.worldName || selectedWorld || selectedDC}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      ) : (
                        <div className="p-12 text-center">
                          <p className="text-[#9e9e9e] text-xs italic">目前無詳細歷史成交紀錄。</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex justify-center">
                  <a 
                    href={`https://universalis.app/market/${getItemId(selectedItem)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-xs text-[#D39E47] hover:underline"
                  >
                    在 Universalis 查看完整數據 <ExternalLink size={12} />
                  </a>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="empty"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="bg-[#1a1a1a] border border-white/5 rounded-3xl p-20 flex flex-col items-center justify-center text-center"
              >
                <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6">
                  <ShoppingCart className="text-[#9e9e9e] opacity-20" size={40} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">準備好開始查詢了嗎？</h3>
                <p className="text-[#9e9e9e] text-sm max-w-xs">
                  在左側搜尋框輸入道具名稱，並選擇您所在的伺服器或大區。
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <footer className="p-6 bg-amber-500/5 border border-amber-500/10 rounded-3xl">
        <p className="text-[11px] text-[#9e9e9e] leading-relaxed">
          <span className="text-[#D39E47] font-bold">數據說明：</span> 市場數據由 <a href="https://universalis.app/" target="_blank" rel="noopener noreferrer" className="underline">Universalis</a> 提供，數據更新頻率取決於玩家的上傳情況。搜尋功能由 <a href="https://xivapi.com/" target="_blank" rel="noopener noreferrer" className="underline">XIVAPI</a> 與 <a href="https://cafemaker.wakingsands.com/" target="_blank" rel="noopener noreferrer" className="underline">Cafemaker</a> 支援。支援<span className="text-white font-bold">中/英文道具名稱</span>搜尋。
        </p>
      </footer>
    </div>
  );
}
