import { describe, it, expect } from 'vitest';
import { parseBatchResponse } from '../services/universalis';

describe('parseBatchResponse', () => {
  it('reads multi-item responses', () => {
    const res = parseBatchResponse({
      items: {
        '5': { itemID: 5, minPrice: 120, currentAveragePrice: 150.4, regularSaleVelocity: 3.5, lastUploadTime: 1,
               listings: [{ pricePerUnit: 100, worldName: '伊弗利特', hq: true }] },
        '6': { itemID: 6, minPrice: 9, listings: [] },
      },
    }, [5, 6]);
    expect(res).toEqual([
      { itemId: 5, minPrice: 100, minPriceWorld: '伊弗利特', minPriceHq: true, averagePrice: 150, saleVelocity: 3.5, lastUploadTime: 1 },
      { itemId: 6, minPrice: 9, minPriceWorld: undefined, minPriceHq: false, averagePrice: 0, saleVelocity: 0, lastUploadTime: 0 },
    ]);
  });

  it('reads single-item responses', () => {
    const res = parseBatchResponse({ itemID: 7, minPrice: 42 }, [7]);
    expect(res[0]).toMatchObject({ itemId: 7, minPrice: 42 });
  });

  it('ignores garbage', () => {
    expect(parseBatchResponse(null, [1])).toEqual([]);
    expect(parseBatchResponse({ foo: 1 }, [1, 2])).toEqual([]);
  });
});
