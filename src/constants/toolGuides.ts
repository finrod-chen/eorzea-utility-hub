/**
 * Per-tool help text: intro, how-to steps and FAQ.
 * Rendered at the bottom of each tool page (ToolGuide) and in the prerendered HTML,
 * so search engines get real, page-specific content.
 *
 * Pure data — no React imports — so scripts/prerender.ts can use it too.
 * Keep every statement true to what the tool actually does.
 */
import type { View } from '../types';

export interface GuideText {
  intro: string;
  steps: string[];
  faq: { q: string; a: string }[];
}

export type ToolGuide = { zh: GuideText; en: GuideText };

export const TOOL_GUIDES: Partial<Record<View, ToolGuide>> = {
  home: {
    zh: {
      intro: '艾歐澤亞助手是為 FF14 繁中服玩家整理的免費工具箱。首頁會顯示目前的艾歐澤亞時間、下一次天氣變換、每日與每週重置倒數、接下來的官方活動，以及繁中服目前的版本內容。',
      steps: [
        '從左側選單或下方的工具卡片進入各項工具，每個工具都有自己的網址，可以直接加入書籤。',
        '首頁的重置倒數會同步任務進度頁的勾選狀態，一眼就能看出今天還剩哪些沒做。',
        '介面可以在側邊欄底部切換繁體中文與英文。',
      ],
      faq: [
        { q: '這個網站要登入嗎？資料存在哪裡？', a: '不用登入。任務進度、鬧鐘、行事曆、市場收藏等資料都只存在你自己的瀏覽器裡。換電腦或換瀏覽器時，可以用側邊欄的「匯出資料」下載備份，再到新的瀏覽器「匯入資料」。' },
        { q: '時間都是以哪個時區為準？', a: '重置時間以繁中服使用的台灣時間（GMT+8）為準；畫面上的「本地時間」則跟著你裝置的時區顯示。' },
      ],
    },
    en: {
      intro: 'Eorzea Utility Hub is a free toolbox for FFXIV Traditional Chinese server players. The overview shows Eorzea time, the next weather change, daily and weekly reset countdowns, upcoming official events and the current patch on the TC server.',
      steps: [
        'Open any tool from the sidebar or the cards below; every tool has its own URL you can bookmark.',
        'The reset countdowns use the ticks from the Task Progress page, so you can see what is left today.',
        'Switch between Traditional Chinese and English at the bottom of the sidebar.',
      ],
      faq: [
        { q: 'Do I need an account? Where is my data stored?', a: 'No account is needed. Task progress, alarms, calendar entries and market favourites live only in your browser. Use “Export data” in the sidebar to download a backup and “Import data” to restore it elsewhere.' },
        { q: 'Which time zone is used?', a: 'Reset times follow the TC server (Taiwan time, GMT+8). “Local time” follows your device.' },
      ],
    },
  },

  checklist: {
    zh: {
      intro: '任務進度幫你追蹤 FF14 的每日與每週例行任務：每日隨機任務、蠻族任務、軍團籌備、冒險者小隊、雇員探險、仙人微彩、挖寶，以及庫洛天書、老主顧交易、時尚配件、仙人彩、挑戰筆記、零式掉落限制等每週項目。',
      steps: [
        '完成一項就點一下打勾，系統會記下完成時間。',
        '過了重置時間後，打勾會自動清除，不用每天手動重來。',
        '想提前重來，可以按每個區塊右上角的重置按鈕。',
      ],
      faq: [
        { q: '繁中服的重置時間是幾點？', a: '每日任務在每天 23:00（GMT+8）重置；軍票籌備、蠻族任務與冒險者小隊在每天 04:00 重置；每週任務在每週二 16:00 重置。' },
        { q: '為什麼我打勾的項目不見了？', a: '那是重置時間到了，系統自動清除。例如晚上 22:50 勾選的每日任務，到 23:00 之後就會變回未完成。' },
      ],
    },
    en: {
      intro: 'Task Progress tracks FFXIV daily and weekly chores: Duty Roulettes, beast tribe quests, GC turn-ins, squadron training, retainer ventures, Mini Cactpot and treasure maps, plus weekly Wondrous Tails, Custom Deliveries, Fashion Report, Jumbo Cactpot, Challenge Log and raid lockouts.',
      steps: [
        'Tick a task when it is done; the time you finished it is recorded.',
        'Ticks clear automatically once the matching server reset passes.',
        'Use the reset button on each section to start over early.',
      ],
      faq: [
        { q: 'When do resets happen on the TC server?', a: 'Daily duties reset at 23:00 (GMT+8); GC supply, beast tribes and squadron training at 04:00; weekly tasks on Tuesday at 16:00.' },
        { q: 'Why did my ticks disappear?', a: 'The reset time passed and they were cleared automatically — for example, a daily task ticked at 22:50 becomes unticked after 23:00.' },
      ],
    },
  },

  alarm: {
    zh: {
      intro: '自訂鬧鐘用瀏覽器通知與音效提醒你遊戲裡的時間點。除了自己設定時間，也內建每日與每週重置、理符限額補充、出海垂釣出航、雇員探險（籌集、探索、自由委託）與冒險者小隊訓練等常用提醒。',
      steps: [
        '第一次使用請先按「啟用通知」，並在瀏覽器跳出的視窗允許通知。',
        '選擇內建的提醒項目，或自訂時間與名稱建立鬧鐘。',
        '時間一到會跳出通知並播放提示音，同時在網頁右上角顯示訊息。',
      ],
      faq: [
        { q: '關掉網頁之後還會提醒嗎？', a: '不會。鬧鐘在你的瀏覽器裡計時，需要讓這個網頁保持開著（可以放在背景分頁）。' },
        { q: '沒有跳出通知怎麼辦？', a: '請確認瀏覽器的網站通知權限是「允許」，也可以按「測試通知」檢查。若曾經拒絕過，需要到瀏覽器的網站設定手動開啟。' },
      ],
    },
    en: {
      intro: 'Custom Alarms remind you of in-game moments with browser notifications and a sound. Besides your own times, presets cover daily and weekly resets, levequest allowances, Ocean Fishing departures, retainer ventures and squadron training.',
      steps: [
        'Press “Enable notifications” first and allow them in the browser prompt.',
        'Pick a preset or create an alarm with your own time and label.',
        'When it fires you get a notification, a sound and an on-page message.',
      ],
      faq: [
        { q: 'Does it still ring after I close the page?', a: 'No. Alarms run in your browser, so keep the page open (a background tab is fine).' },
        { q: 'No notification appeared — why?', a: 'Make sure notifications are allowed for this site and try “Test notification”. If you blocked them before, re-enable them in your browser’s site settings.' },
      ],
    },
  },

  'event-calendar': {
    zh: {
      intro: '活動行事曆會自動整理 FF14 繁中服官網「活動公告」裡的官方活動，並讓你加入 FC、固定團的團練或聚會，把所有行程放在同一個月曆上。',
      steps: [
        '官方活動會自動出現在月曆上，點擊可以打開官網公告。',
        '按「新增活動」輸入名稱、日期時間、類型與說明，就能加入自己的行程。',
        '首頁的「接下來的活動」會同時列出最近的官方活動與個人行程。',
      ],
      faq: [
        { q: '官方活動多久更新一次？', a: '網站每天自動檢查兩次官網的活動公告，有新的活動就會更新。' },
        { q: '我加的活動別人看得到嗎？', a: '看不到。個人行程只存在你的瀏覽器，可以用「匯出資料」備份或搬到其他裝置。' },
      ],
    },
    en: {
      intro: 'The Event Calendar collects official events from the TC server’s event announcements and lets you add your FC or static’s raids and gatherings to the same calendar.',
      steps: [
        'Official events appear automatically; click one to open the announcement.',
        'Use “Add event” to enter a name, date and time, type and notes.',
        '“Upcoming events” on the overview lists both official and personal entries.',
      ],
      faq: [
        { q: 'How often are official events updated?', a: 'The site checks the official announcements twice a day.' },
        { q: 'Can other people see my events?', a: 'No. Personal events stay in your browser; use “Export data” to back them up or move them.' },
      ],
    },
  },

  tails: {
    zh: {
      intro: '庫洛天書（Wondrous Tails）每週可以領一本，完成指定副本就能貼上印花，連成越多條線獎勵越好。這個工具依照你目前的印花位置，計算最後連成 1、2、3 條線的機率。',
      steps: [
        '在 4×4 的格子上點選你已經貼上印花的位置。',
        '右側會顯示達成 1、2、3 條線的機率，機率由剩餘印花隨機落點模擬計算。',
        '印花數在 3–7 枚時可以花 2 點奇想點洗牌，按「洗牌」可以試看重新排列後的結果。',
      ],
      faq: [
        { q: '什麼時候洗牌比較划算？', a: '工具建議在貼滿 7 枚印花時再考慮洗牌，因為這時能最準確判斷目前佈局好不好。' },
        { q: '機率是怎麼算的？', a: '把還沒貼的印花隨機放到空格上，重複模擬很多次，統計最後連成幾條線的比例。' },
      ],
    },
    en: {
      intro: 'Wondrous Tails is a weekly journal: clear the listed duties to earn stickers, and more completed lines mean better rewards. This tool estimates the chance of finishing with 1, 2 or 3 lines from your current board.',
      steps: [
        'Click the cells on the 4×4 board where you already have stickers.',
        'The odds for 1, 2 and 3 lines are simulated from random placements of the remaining stickers.',
        'With 3–7 stickers you can spend 2 Second Chance points to shuffle; use “Shuffle” to preview a new layout.',
      ],
      faq: [
        { q: 'When is shuffling worth it?', a: 'The tool suggests waiting until you have 7 stickers, when the board quality is clearest.' },
        { q: 'How are the odds calculated?', a: 'The remaining stickers are placed at random many times and the completed lines are counted.' },
      ],
    },
  },

  market: {
    zh: {
      intro: '市場查詢使用 Universalis 的資料，查 FF14 繁中服（陸行鳥資料中心）各伺服器的道具最低價、平均價、目前上架與最近成交紀錄，幫你決定在哪個伺服器買或賣。',
      steps: [
        '在搜尋框輸入道具名稱（中文或英文都可以）或道具 ID。',
        '選擇要查詢的伺服器，或選「全區」比較陸行鳥資料中心的所有伺服器。',
        '按星號把常用道具加入常用清單，之後打開市場查詢就能一次看到它們的最低價、所在伺服器與每日成交量。',
      ],
      faq: [
        { q: '價格多久更新？為什麼和遊戲裡不一樣？', a: 'Universalis 的資料來自玩家上傳，熱門道具更新得比較快，冷門道具可能是好幾小時前的資料；成交紀錄會標示是多久之前的交易。' },
        { q: '「日均成交」是什麼意思？', a: 'Universalis 統計的平均每日成交筆數，數字越高代表越好賣。' },
      ],
    },
    en: {
      intro: 'Market Board uses Universalis data to show lowest prices, averages, current listings and recent sales for every world on the TC server’s Chocobo data centre, so you know where to buy or sell.',
      steps: [
        'Search by item name (Chinese or English) or item ID.',
        'Pick a world, or “All DC” to compare every world in the data centre.',
        'Star items to add them to your watchlist and see their lowest price, world and sales per day at a glance.',
      ],
      faq: [
        { q: 'How fresh are the prices?', a: 'Universalis data is uploaded by players, so popular items update quickly while niche ones may be hours old; recent sales show how long ago they happened.' },
        { q: 'What does “Sales/day” mean?', a: 'The average number of sales per day reported by Universalis — higher means it sells faster.' },
      ],
    },
  },

  treasure: {
    zh: {
      intro: '藏寶搜尋收錄 FF14 G8 到 G18 的藏寶圖挖寶地點，包含巨龍革、瞪羚革、纏尾蛟革、金毗羅鱷革、蛇牛革、銀狼革、獰豹革與巨獸革地圖。所有座標都已對照遊戲資料核對。',
      steps: [
        '先選擇藏寶圖的等級（例如 G17 獰豹革地圖）。',
        '對照手上藏寶圖的圖案，點擊相符的碎片圖，或用區域名稱篩選。',
        '會顯示完整地圖上的位置、精確座標與附近的以太之光，可以一鍵複製座標。',
      ],
      faq: [
        { q: '座標準確嗎？', a: '所有挖寶點都對照遊戲資料逐一核對，座標精確到小數點後一位，地圖上的標記位置也依各地圖的比例計算。' },
        { q: '同一區有好幾個很像的點，怎麼分辨？', a: '可以比對藏寶圖背景的地形，例如山脈、河流、建築物的形狀與位置，再對照完整地圖上的標記。' },
      ],
    },
    en: {
      intro: 'Treasure Hunt lists every dig spot for FFXIV G8 to G18 maps — Dragonskin, Gazelleskin, Zonureskin, Kumbhiraskin, Ophiotauroskin, Loboskin, Br’aaxskin and Gargantuaskin. All coordinates are checked against game data.',
      steps: [
        'Choose the map grade, e.g. G17 Br’aaxskin.',
        'Match your map’s artwork to a thumbnail, or filter by zone name.',
        'See the spot on the full zone map with exact coordinates and nearby aetherytes, and copy the coordinates in one click.',
      ],
      faq: [
        { q: 'How accurate are the coordinates?', a: 'Every spot was checked against game data to one decimal place, and markers use each map’s own scale.' },
        { q: 'Several spots look alike — how do I tell them apart?', a: 'Compare terrain on the map artwork — mountains, rivers and buildings — with the marker on the full map.' },
      ],
    },
  },

  cactpot: {
    zh: {
      intro: '仙人微彩（Mini Cactpot）是金碟遊樂場每天可以玩 3 次的刮刮樂：3×3 的格子裡有 1 到 9 九個數字，刮開 4 格後選一條線，依該線三個數字的總和得到 MGP。這個工具幫你算出每條線的期望值。',
      steps: [
        '在格子裡填入已經刮開的數字。',
        '工具會計算 8 條線（3 橫、3 直、2 斜）各自的期望 MGP 與最高可能回報。',
        '依照「建議路線」選擇期望值最高的那一條。',
      ],
      faq: [
        { q: '最高可以拿到多少 MGP？', a: '選中的線總和為 6（1+2+3）時獎勵最高，是 10,000 MGP；總和 24（7+8+9）是 3,600 MGP。' },
        { q: '為什麼有時候算不出期望值？', a: '已知數字太少時組合太多，請再多填幾個已刮開的數字。' },
      ],
    },
    en: {
      intro: 'Mini Cactpot is the Gold Saucer scratch card you can play 3 times a day: the 3×3 grid holds the numbers 1–9, you reveal 4 cells, then pick a line and win MGP based on its sum. This tool works out each line’s expected value.',
      steps: [
        'Enter the numbers you have revealed.',
        'Expected MGP and the best possible payout are shown for all 8 lines (3 rows, 3 columns, 2 diagonals).',
        'Pick the suggested line with the highest expected value.',
      ],
      faq: [
        { q: 'What is the top prize?', a: 'A line summing to 6 (1+2+3) pays 10,000 MGP; a sum of 24 (7+8+9) pays 3,600 MGP.' },
        { q: 'Why is no expected value shown?', a: 'With too few known numbers there are too many combinations — reveal a few more cells first.' },
      ],
    },
  },

  chocobo: {
    zh: {
      intro: '陸行鳥染色計算器幫你算出把搭檔陸行鳥從目前的羽色染成目標顏色，需要哪些果實、各幾顆，以及建議的餵食順序。',
      steps: [
        '選擇陸行鳥目前的顏色，再選擇想要的目標顏色。',
        '按「開始計算」，會列出需要的果實種類與數量。',
        '照建議順序逐一餵食，可以在清單上記錄進度，下次打開還會保留。',
      ],
      faq: [
        { q: '為什麼建議交替餵不同的果實？', a: '每種果實會同時影響紅、綠、藍三個色值，交替餵食比較不容易讓某個色值先碰到上限或下限，顏色變化會比較穩定。' },
        { q: '餵完顏色沒有馬上變？', a: '餵食後羽色要過一段時間才會改變，請以遊戲內的實際顏色為準，再繼續餵下一顆。' },
      ],
    },
    en: {
      intro: 'The Chocobo Dyer Calculator tells you which fruits, how many of each and in what order to feed your companion chocobo to get from its current plumage to a target colour.',
      steps: [
        'Choose your chocobo’s current colour and the colour you want.',
        'Press “Calculate” to see the fruits and quantities needed.',
        'Feed them in the suggested order and track your progress — it is saved for next time.',
      ],
      faq: [
        { q: 'Why alternate fruits?', a: 'Each fruit shifts red, green and blue at once; alternating keeps any one channel from hitting its limit early, so the colour changes more predictably.' },
        { q: 'The colour did not change right away?', a: 'Plumage takes a while to change after feeding — check the in-game colour before feeding the next fruit.' },
      ],
    },
  },

  weather: {
    zh: {
      intro: '天氣預報依照 FF14 的天氣規則，算出每張地圖接下來的天氣與對應的本地時間，並列出各地區每種天氣出現的機率。可以用來等稀有天氣、探索筆記、天氣限定的採集點或釣魚。',
      steps: [
        '依資料片版本或地圖名稱找到要查的地區。',
        '右側會列出接下來 8 個時段的天氣，每個時段都顯示本地時間的開始與結束，以及倒數。',
        '在「天氣篩選」選擇特定天氣，只顯示近期會出現該天氣的地圖。',
      ],
      faq: [
        { q: '天氣多久變一次？', a: '每 8 個艾歐澤亞小時變一次，也就是現實的 23 分 20 秒，分別在艾歐澤亞時間 0:00、8:00、16:00 切換。' },
        { q: '預報準確嗎？', a: '天氣是由遊戲裡固定的公式決定的，同一時間在所有伺服器都一樣，所以可以準確預測。' },
      ],
    },
    en: {
      intro: 'Weather Forecast applies FFXIV’s weather rules to show upcoming weather for every zone with matching local times, plus each zone’s weather odds — useful for rare weather, sightseeing, timed gathering and fishing.',
      steps: [
        'Find a zone by expansion or name.',
        'The next 8 windows are listed with local start and end times and a countdown.',
        'Use the weather filter to show only zones where that weather is coming up.',
      ],
      faq: [
        { q: 'How often does weather change?', a: 'Every 8 Eorzea hours — 23 minutes 20 seconds of real time — at ET 0:00, 8:00 and 16:00.' },
        { q: 'Is the forecast reliable?', a: 'Weather comes from a fixed formula and is the same on every world, so it can be predicted exactly.' },
      ],
    },
  },

  'interactive-maps': {
    zh: {
      intro: '互動地圖整合肥肥咖啡（FFCafe）的艾歐澤亞地圖工具，可以在網頁上直接縮放、拖曳各區域地圖，查看標記與地點資訊。',
      steps: [
        '選擇要查看的地區。',
        '用滑鼠滾輪縮放、按住拖曳移動地圖。',
        '點擊地圖上的標記查看詳細內容。',
      ],
      faq: [
        { q: '地圖資料是誰提供的？', a: '互動地圖工具由肥肥咖啡（FFCafe）開發，詳細資料可以到他們的網站查看。' },
      ],
    },
    en: {
      intro: 'Interactive Maps embeds the FFCafe Eorzea map tool so you can zoom and pan each zone and inspect its markers in the browser.',
      steps: [
        'Choose a zone.',
        'Scroll to zoom and drag to move the map.',
        'Click a marker for details.',
      ],
      faq: [
        { q: 'Who provides the map data?', a: 'The interactive map is built by FFCafe; see their site for more.' },
      ],
    },
  },

  sightseeing: {
    zh: {
      intro: '探索筆記（Sightseeing Log）的每個景點都要在指定的艾歐澤亞時間、指定的天氣下，到現場做出特定情感動作才能完成。這個工具會依照目前的時間與天氣，標出哪些景點現在就能完成。',
      steps: [
        '依資料片版本篩選景點，或勾選「只顯示目前可完成」。',
        '每個景點都列出所在地圖、需要的時間、天氣與情感動作。',
        '完成後點一下打勾，進度會保存在你的瀏覽器裡。',
      ],
      faq: [
        { q: '為什麼現在不能完成？', a: '時間和天氣兩個條件都要符合。可以到天氣預報頁查該地圖下一次出現所需天氣的時間。' },
        { q: '艾歐澤亞時間怎麼換算？', a: '艾歐澤亞的一天等於現實的 70 分鐘，一個艾歐澤亞小時大約是現實的 2 分 55 秒。' },
      ],
    },
    en: {
      intro: 'Each Sightseeing Log vista must be visited at a set Eorzea time, in set weather, while performing a specific emote. This tool marks which vistas you can complete right now.',
      steps: [
        'Filter by expansion, or show only vistas that are available now.',
        'Each entry lists the zone, time window, weather and emote.',
        'Tick vistas as you complete them; progress is saved in your browser.',
      ],
      faq: [
        { q: 'Why can’t I complete it now?', a: 'Both the time and the weather must match. Check the Weather Forecast page for when that weather comes next.' },
        { q: 'How does Eorzea time work?', a: 'One Eorzea day is 70 real minutes, so one Eorzea hour is about 2 minutes 55 seconds.' },
      ],
    },
  },
};
