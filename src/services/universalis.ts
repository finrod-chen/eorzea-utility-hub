/**
 * Batch price lookup for the market watchlist.
 * Universalis accepts up to 100 comma-separated item IDs per request.
 */

export interface PriceSummary {
  itemId: number;
  minPrice: number;
  minPriceWorld?: string;
  minPriceHq: boolean;
  averagePrice: number;
  saleVelocity: number;
  lastUploadTime: number;
}

interface UniversalisItem {
  itemID: number;
  lastUploadTime?: number;
  minPrice?: number;
  currentAveragePrice?: number;
  regularSaleVelocity?: number;
  listings?: { pricePerUnit: number; worldName?: string; hq: boolean }[];
}

const BATCH = 100;

export function parseBatchResponse(data: unknown, ids: number[]): PriceSummary[] {
  if (!data || typeof data !== 'object') return [];
  // A single-ID request returns the item itself; multi-ID requests wrap them in `items`.
  const raw = data as { items?: Record<string, UniversalisItem> } & UniversalisItem;
  const items: UniversalisItem[] = raw.items ? Object.values(raw.items) : ids.length === 1 ? [raw] : [];

  return items
    .filter(it => typeof it?.itemID === 'number')
    .map(it => {
      const cheapest = it.listings?.[0];
      return {
        itemId: it.itemID,
        minPrice: cheapest?.pricePerUnit ?? it.minPrice ?? 0,
        minPriceWorld: cheapest?.worldName,
        minPriceHq: cheapest?.hq ?? false,
        averagePrice: Math.round(it.currentAveragePrice ?? 0),
        saleVelocity: it.regularSaleVelocity ?? 0,
        lastUploadTime: it.lastUploadTime ?? 0,
      };
    });
}

export async function fetchPriceSummaries(
  location: string,
  ids: number[],
  signal?: AbortSignal,
): Promise<Map<number, PriceSummary>> {
  const result = new Map<number, PriceSummary>();
  const unique = [...new Set(ids)].filter(Boolean);

  for (let i = 0; i < unique.length; i += BATCH) {
    const chunk = unique.slice(i, i + BATCH);
    const url =
      `https://universalis.app/api/v2/${encodeURIComponent(location)}/${chunk.join(',')}` +
      `?listings=1&entries=0`;
    const res = await fetch(url, { signal });
    if (!res.ok) throw new Error(`Universalis ${res.status}`);
    for (const s of parseBatchResponse(await res.json(), chunk)) result.set(s.itemId, s);
  }
  return result;
}
