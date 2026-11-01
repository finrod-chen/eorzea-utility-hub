// 座標處理工具模組
//
// FFXIV map coordinates depend on the map's SizeFactor (Map sheet):
//   coord = 41 / c * pixel / 2048 + 1, where c = SizeFactor / 100
// Most field maps use 100 (coordinates 1.0–42.0). Heavensward field maps use 95
// (coordinates 1.0–~44.2), so treating them as 1–42 shifts every marker.

/** Zones whose map SizeFactor is not 100 (zoneId as used by treasureData). */
export const MAP_SIZE_FACTOR: Record<string, number> = {
  coerthaswesternhighlands: 95,
  theseaofclouds: 95,
  azyslla: 95,
  thedravanianforelands: 95,
  thedravanianhinterlands: 95,
  thechurningmists: 95,
};

export class CoordinateUtils {
    /**
     * 將遊戲座標轉換為地圖圖片上的位置 (百分比 0-100)
     * @param gameX 遊戲 X 座標
     * @param gameY 遊戲 Y 座標
     * @param sizeFactor 地圖 SizeFactor（預設 100）
     */
    static gameToImageCoords(gameX: number, gameY: number, sizeFactor = 100) {
        const c = sizeFactor / 100;
        return {
            x: ((gameX - 1) * c / 41) * 100,
            y: ((gameY - 1) * c / 41) * 100,
        };
    }

    static sizeFactorFor(zoneId: string): number {
        return MAP_SIZE_FACTOR[zoneId] ?? 100;
    }
}
