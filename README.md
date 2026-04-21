<div align="center">
  <img src="./public/logo.png" width="120" height="120" alt="AetherFlow Logo" style="border-radius: 20px; box-shadow: 0 10px 20px rgba(211, 158, 71, 0.2);" />
  <h1 align="center">艾歐澤亞助手</h1>
  <p align="center">
    <strong>專為《Final Fantasy XIV》光之戰士設計的一站式實用工具聚合站</strong>
  </p>
  <p align="center">
    <img src="https://img.shields.io/badge/Version-1.9.0-D39E47?style=flat-square" alt="Version" />
    <img src="https://img.shields.io/badge/React-19.0-61DAFB?style=flat-square&logo=react" alt="React" />
    <img src="https://img.shields.io/badge/Vite-6.4-646CFF?style=flat-square&logo=vite" alt="Vite" />
    <img src="https://img.shields.io/badge/Tailwind-4.1-38B2AC?style=flat-square&logo=tailwind-css" alt="Tailwind" />
  </p>
</div>

---

## 🌟 專案簡介
**Eorzea Utility Hub** 是一個針對《Final Fantasy XIV》繁體中文服玩家開發的工具聚合站。本專案旨在解決玩家在遊戲過程中需要頻繁切換網頁查詢資訊的痛點，將日常任務追蹤、天氣預報、市場查詢等功能整合於一個流暢、具現代感且符合遊戲美學的介面中。

## 🛠️ 核心功能
本站目前提供四大類別、超過 10 種實用工具：

- **📅 日常與計畫**：
  - **任務進度**：追蹤每日、每週任務完成狀況。
  - **自訂鬧鐘**：設定 ET/LT 鬧鐘，提醒採集、限時活動。
  - **活動行事曆**：管理 FC 或固定團的行程排程。
- **🔍 實用工具**：
  - **市場查詢**：整合 Universalis API 查詢道具即時售價與紀錄。
  - **藏寶搜尋**：快速定位藏寶圖碎片對應的位置。
  - **仙人微彩**：提供期望值計算，優化金碟幣收益。
  - **庫洛天書**：視覺化預測天書連線機率。
  - **陸行鳥染色**：精確計算所需果實數量與餵食順序。
- **🌍 地圖與天氣**：
  - **天氣預報**：全地圖天氣查詢，包含稀有天氣倒數。
  - **探索筆記**：自動提示當前時間與天氣可完成的目標。
  - **互動地圖**：查看各區域資源、標記與地理資訊。
- **📚 資源連結**：
  - **好用連結**：整理各大攻略影片與文字站點資源。

## 🚀 技術棧
- **Frontend**: React 19 (Hooks, TypeScript)
- **Styling**: Tailwind CSS 4.1, Lucide React (Icons)
- **Animation**: Framer Motion (Motion/React)
- **Build Tool**: Vite 6.4
- **Notifications**: Sonner (Toaster)
- **API Integration**: Universalis API, Google Generative AI (Gemini)

## 💻 本地開發步驟

### 前置作業
- 確保已安裝 [Node.js](https://nodejs.org/) (建議 v18 以上)

### 安裝與啟動
1. **複製儲存庫**：
   ```bash
   git clone [https://github.com/your-username/eorzea-utility-hub.git](https://github.com/your-username/eorzea-utility-hub.git)
   cd eorzea-utility-hub
   ```

2.  **安裝依賴**：

    ```bash
    npm install
    ```

3.  **啟動開發伺服器**：

    ```bash
    npm run dev
    ```

    造訪 `http://localhost:3000` 即可預覽。

## 📜 版權聲明

  - **遊戲資產**：`Final Fantasy XIV` 及其相關圖像、商標版權均屬 **SQUARE ENIX CO., LTD.** 所有。
  - **代理權**：繁體中文版由宇峻奧汀與智寶國際聯合代理。
  - **非官方作品**：本專案為玩家自發開發的非官方工具站，僅供學習與交流使用，無任何商業營利行為。

-----

<p align="center"\>May you ever walk in the light of the Crystal. ✨</p>

