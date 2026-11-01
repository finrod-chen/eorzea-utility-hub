import React, { useCallback, useEffect, useState } from 'react';
import { Loader2, RefreshCw, Star, AlertCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { fetchPriceSummaries, PriceSummary } from '../services/universalis';

export interface WatchlistItem {
  id: number;
  name: string;
  icon: string;
}

interface Props {
  items: WatchlistItem[];
  /** World or data-centre name understood by Universalis (e.g. 陸行鳥 or 伊弗利特). */
  location: string;
  onSelect: (id: number) => void;
}

const fmt = (n: number) => new Intl.NumberFormat().format(n);

export default function MarketWatchlist({ items, location, onSelect }: Props) {
  const { t } = useTranslation();
  const [prices, setPrices] = useState<Map<number, PriceSummary>>(new Map());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [updatedAt, setUpdatedAt] = useState<Date | null>(null);
  const idsKey = items.map(i => i.id).join(',');

  const load = useCallback(async (signal?: AbortSignal) => {
    if (!idsKey) return;
    setLoading(true);
    setError(null);
    try {
      const map = await fetchPriceSummaries(location, idsKey.split(',').map(Number), signal);
      setPrices(map);
      setUpdatedAt(new Date());
    } catch (e) {
      if ((e as Error).name !== 'AbortError') setError((e as Error).message);
    } finally {
      if (!signal?.aborted) setLoading(false);
    }
  }, [idsKey, location]);

  useEffect(() => {
    const controller = new AbortController();
    load(controller.signal);
    return () => controller.abort();
  }, [load]);

  const total = items.reduce((sum, it) => sum + (prices.get(it.id)?.minPrice ?? 0), 0);

  return (
    <div className="bg-[#1a1a1a] border border-white/5 rounded-3xl p-6 space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Star size={16} className="text-amber-500 fill-amber-500" /> {t('marketBoard.watchlist.title')}
          </h3>
          <p className="text-xs text-[#9e9e9e]">
            {t('marketBoard.watchlist.subtitle', { location })}
            {updatedAt && ` · ${t('marketBoard.watchlist.updatedAt', { time: updatedAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) })}`}
          </p>
        </div>
        <button
          onClick={() => load()}
          disabled={loading}
          className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-sm text-white disabled:opacity-50 transition-colors"
        >
          {loading ? <Loader2 size={14} className="animate-spin" /> : <RefreshCw size={14} />}
          {t('marketBoard.watchlist.refresh')}
        </button>
      </div>

      {error && (
        <p className="flex items-center gap-2 text-sm text-red-400">
          <AlertCircle size={14} /> {t('marketBoard.watchlist.error')} ({error})
        </p>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-[10px] uppercase tracking-widest text-[#9e9e9e] border-b border-white/5">
              <th className="px-3 py-2">{t('marketBoard.watchlist.item')}</th>
              <th className="px-3 py-2 text-right">{t('marketBoard.watchlist.lowest')}</th>
              <th className="px-3 py-2">{t('marketBoard.watchlist.world')}</th>
              <th className="px-3 py-2 text-right">{t('marketBoard.watchlist.average')}</th>
              <th className="px-3 py-2 text-right">{t('marketBoard.watchlist.velocity')}</th>
            </tr>
          </thead>
          <tbody>
            {items.map(item => {
              const p = prices.get(item.id);
              return (
                <tr
                  key={item.id}
                  onClick={() => onSelect(item.id)}
                  className="border-b border-white/5 hover:bg-white/5 cursor-pointer transition-colors"
                >
                  <td className="px-3 py-2">
                    <div className="flex items-center gap-2">
                      {item.icon && (
                        <img src={`https://xivapi.com${item.icon}`} alt="" className="w-6 h-6 rounded" referrerPolicy="no-referrer" />
                      )}
                      <span className="text-white font-medium">{item.name}</span>
                    </div>
                  </td>
                  <td className="px-3 py-2 text-right font-mono text-[#D39E47]">
                    {p && p.minPrice > 0 ? <>{fmt(p.minPrice)}{p.minPriceHq && <span className="ml-1 text-[10px] text-amber-300">HQ</span>}</> : loading ? '…' : '—'}
                  </td>
                  <td className="px-3 py-2 text-[#9e9e9e]">{p?.minPriceWorld ?? '—'}</td>
                  <td className="px-3 py-2 text-right font-mono text-white">{p && p.averagePrice > 0 ? fmt(p.averagePrice) : '—'}</td>
                  <td className="px-3 py-2 text-right font-mono text-[#9e9e9e]">{p ? p.saleVelocity.toFixed(1) : '—'}</td>
                </tr>
              );
            })}
          </tbody>
          {total > 0 && (
            <tfoot>
              <tr className="text-xs text-[#9e9e9e]">
                <td className="px-3 py-2">{t('marketBoard.watchlist.total')}</td>
                <td className="px-3 py-2 text-right font-mono text-white">{fmt(total)}</td>
                <td colSpan={3} />
              </tr>
            </tfoot>
          )}
        </table>
      </div>
      <p className="text-[10px] text-[#666]">{t('marketBoard.watchlist.velocityHint')}</p>
    </div>
  );
}
