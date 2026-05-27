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
