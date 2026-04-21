// 座標處理工具模組
export class CoordinateUtils {
    // 座標系統常數
    static CONSTANTS = {
        GAME_COORD_MIN: 1,
        GAME_COORD_MAX: 42,
        GAME_COORD_RANGE: 41,
        DEFAULT_Z: 0,
        MAX_COORD_VALUE: 50,
        MIN_COORD_VALUE: 0
    };

    /**
     * 計算 Teamcraft 風格的地圖偏移量 (像素)
     * 讓目標藏寶點精確落於容器中央
     * @param coords - 遊戲座標 { x, y }
     * @param sizeFactor - 地圖的縮放因子 (通常為 100 或 200)
     * @param containerWidth - UI 顯示容器的寬度 (px)
     * @param containerHeight - UI 顯示容器的高度 (px)
     */
    static calcTeamcraftOffset(coords: { x: number; y: number }, sizeFactor: number = 100, containerWidth: number, containerHeight: number) {
        // 將遊戲座標轉換為 2048x2048 XIVAPI 地圖上的實際像素位置
        // 修正公式：使用 sizeFactor / 4 以符合 2048x2048 底圖
        const pixelX = (coords.x - 1) * sizeFactor / 4;
        const pixelY = (coords.y - 1) * sizeFactor / 4;

        // 取得容器的中心點
        const centerX = containerWidth / 2;
        const centerY = containerHeight / 2;

        // 計算圖片需要偏移多少才能讓 pixel 落在容器中心
        return { 
            x: centerX - pixelX, 
            y: centerY - pixelY 
        };
    }

    /**
     * 將遊戲座標轉換為圖片座標 (百分比)
     * @param {number} gameX - 遊戲 X 座標 (1-42)
     * @param {number} gameY - 遊戲 Y 座標 (1-42)
     * @returns {{x: number, y: number}} 圖片座標 (百分比 0-100)
     */
    static gameToImageCoords(gameX: number, gameY: number) {
        // 遊戲座標系統：左上角(1,1) 右下角(42,42)
        // 轉換為 0-100 的百分比
        const normalizedX = ((gameX - this.CONSTANTS.GAME_COORD_MIN) / this.CONSTANTS.GAME_COORD_RANGE) * 100;
        const normalizedY = ((gameY - this.CONSTANTS.GAME_COORD_MIN) / this.CONSTANTS.GAME_COORD_RANGE) * 100;
        
        return { x: normalizedX, y: normalizedY };
    }
}
