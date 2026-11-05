/**
 * Per-page help content: intro, sections (text / lists / tables), how-to steps, FAQ and related tools.
 * Rendered below each tool (ToolGuide) AND written into the prerendered HTML (scripts/prerender.ts),
 * so search engines read exactly what visitors read.
 *
 * Pure data — no React imports — so the build-time prerender script can use it too.
 *
 * Rules for editing:
 *  - Every number here must be backed by game data or by what the tool actually does.
 *    src/__tests__/guideFacts.test.ts re-computes the tables from the site's own data.
 *  - Official names come first, with the English name (and the name the tool UI shows, if it
 *    differs) in brackets on first mention, so people searching either name find the page.
 *  - Only the Chinese text has long-form sections; the English text stays short.
 */
import type { View } from "../types";

export interface GuideTable {
  caption?: string;
  head: string[];
  rows: string[][];
}

export interface GuideSection {
  heading: string;
  paragraphs?: string[];
  list?: string[];
  table?: GuideTable;
  /** Shown under the table / list as a smaller note. */
  note?: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface GuideText {
  intro: string;
  /** Long-form sections (Chinese only). */
  sections?: GuideSection[];
  steps: string[];
  faq: FaqItem[];
}

export interface RelatedTool {
  view: View;
  /** Why the other tool is relevant — shown after the tool name. */
  note: string;
}

export interface ToolGuide {
  zh: GuideText;
  en: GuideText;
  related?: RelatedTool[];
}

const CACTPOT_ROWS: [string, string, string][] = [
  ["6", "10,000", "1"], ["7", "36", "1"], ["8", "720", "2"], ["9", "360", "3"], ["10", "80", "4"],
  ["11", "252", "5"], ["12", "108", "7"], ["13", "72", "7"], ["14", "54", "8"], ["15", "180", "8"],
  ["16", "72", "8"], ["17", "180", "7"], ["18", "119", "7"], ["19", "36", "5"], ["20", "306", "4"],
  ["21", "1,080", "3"], ["22", "144", "2"], ["23", "1,800", "1"], ["24", "3,600", "1"],
];

export const TOOL_GUIDES: Partial<Record<View, ToolGuide>> = {
  /* ───────────────────────── 首頁 ───────────────────────── */
  home: {
    zh: {
      intro:
        "艾歐澤亞助手是為 FF14（FINAL FANTASY XIV）繁中服玩家整理的免費工具箱。首頁會顯示目前的艾歐澤亞時間（Eorzea Time，ET）、下一次天氣變換、每日與每週重置倒數、接下來的官方活動，以及繁中服目前的版本內容。",
      sections: [
        {
          heading: "本站有哪些工具",
          list: [
            "任務進度：勾選每日與每週例行任務，過了繁中服的重置時間自動清除。",
            "自訂鬧鐘：9 項內建提醒，涵蓋每日／每週重置、理符受理限額、出海垂釣出航、雇員探險與冒險者分隊。",
            "活動行事曆：自動整理官網活動公告，並可加入自己的團練與聚會。",
            "天書奇談（庫洛天書）：依目前的印花盤面精算連成 1、2、3 條故事線的機率。",
            "市場查詢：用 Universalis 查陸行鳥資料中心的道具價格，附常用清單。",
            "藏寶搜尋：G8 至 G18 藏寶圖的挖掘座標與以太之光。",
            "仙人微彩：計算每條線的期望值，附完整獎金表。",
            "陸行鳥染色：計算果實種類、數量與餵食順序。",
            "天氣預報、互動地圖、探索筆記：查詢各地圖的天氣、地形與探索筆記可完成的景點。",
          ],
        },
        {
          heading: "適合每天這樣使用",
          paragraphs: [
            "開啟首頁先看重置倒數與「任務進度」的完成數，把今天還沒做的勾完；需要等特定天氣或探索筆記的景點時，再到「天氣預報」查接下來的天氣。每週二重置後，記得回來處理天書奇談、挑戰筆記與老主顧交易等每週項目。",
          ],
        },
      ],
      steps: [
        "從左側選單或下方的工具卡片進入各項工具，每個工具都有自己的網址，可以直接加入書籤。",
        "首頁的重置倒數會同步任務進度頁的勾選狀態，一眼就能看出今天還剩哪些沒做。",
        "介面可以在側邊欄底部切換繁體中文與英文。",
      ],
      faq: [
        { q: "這個網站要登入嗎？資料存在哪裡？", a: "不用登入。任務進度、鬧鐘、行事曆、市場收藏等資料都只存在你自己的瀏覽器裡。換電腦或換瀏覽器時，可以用側邊欄的「匯出資料」下載備份，再到新的瀏覽器「匯入資料」。" },
        { q: "時間都是以哪個時區為準？", a: "重置時間以繁中服使用的台灣時間（GMT+8）為準；畫面上的「本地時間」則跟著你裝置的時區顯示。" },
        { q: "手機也可以使用嗎？", a: "可以。網站是一般網頁，介面有針對手機版面調整，用手機瀏覽器開啟即可，不需要安裝。" },
        { q: "這是官方網站嗎？", a: "不是。艾歐澤亞助手是玩家自行製作的非官方工具，遊戲相關的圖像與商標屬於 SQUARE ENIX。繁中服由宇峻奧汀與智寶國際聯合代理。" },
      ],
    },
    en: {
      intro: "Eorzea Utility Hub is a free toolbox for FFXIV Traditional Chinese server players. The overview shows Eorzea time, the next weather change, daily and weekly reset countdowns, upcoming official events and the current patch on the TC server.",
      steps: [
        "Open any tool from the sidebar or the cards below; every tool has its own URL you can bookmark.",
        "The reset countdowns use the ticks from the Task Progress page, so you can see what is left today.",
        "Switch between Traditional Chinese and English at the bottom of the sidebar.",
      ],
      faq: [
        { q: "Do I need an account? Where is my data stored?", a: "No account is needed. Task progress, alarms, calendar entries and market favourites live only in your browser. Use “Export data” in the sidebar to download a backup and “Import data” to restore it elsewhere." },
        { q: "Which time zone is used?", a: "Reset times follow the TC server (Taiwan time, GMT+8). “Local time” follows your device." },
      ],
    },
  },

  /* ───────────────────────── 任務進度 ───────────────────────── */
  checklist: {
    zh: {
      intro:
        "任務進度（Duty Checklist）是 FF14 每日與每週例行任務的勾選清單：每日的隨機任務、蠻族任務、軍團籌備任務、冒險者分隊訓練、雇員探險、仙人微彩與藏寶圖，以及每週的天書奇談、老主顧交易、時尚品鑑、多瑪飛地重建、仙人仙彩、挑戰筆記與零式／大型任務限制。完成一項就勾一下，過了繁中服的重置時間，勾選會自動清除。",
      sections: [
        {
          heading: "繁中服的重置時間（GMT+8）",
          table: {
            caption: "本站任務進度會依下列時間自動清除勾選",
            head: ["項目", "週期", "重置時間"],
            rows: [
              ["隨機任務（Duty Roulette，清單稱「每日隨機任務」）", "每日", "每天 23:00"],
              ["蠻族任務（Beast Tribe Quests）", "每日", "每天 04:00"],
              ["軍團籌備任務（遊戲內稱籌備軍需品、籌備補給品）", "每日", "每天 04:00"],
              ["天書奇談（Wondrous Tails，俗稱庫洛天書）", "每週", "週二 16:00"],
              ["老主顧交易（Custom Deliveries）", "每週", "週二 16:00"],
              ["挑戰筆記（Challenge Log）", "每週", "週二 16:00"],
              ["多瑪飛地重建（Doman Enclave Reconstruction Effort，清單稱「多瑪復興」）", "每週", "週二 16:00"],
              ["零式／大型任務的掉落限制（Raid lockouts）", "每週", "週二 16:00"],
            ],
          },
          note: "清單另外收錄冒險者分隊訓練、雇員探險、仙人微彩、藏寶圖（每日），以及時尚品鑑（Fashion Report，清單稱「時尚配件」）、仙人仙彩（Jumbo Cactpot，清單稱「仙人彩」）（每週）。這幾項的刷新時間各不相同，請以遊戲內為準。",
        },
        {
          heading: "自動清除是怎麼運作的",
          paragraphs: [
            "勾選任務時，網站會記下完成的時間。每次打開頁面，以及頁面開著的時候每 30 秒，網站會把每個項目的完成時間和「最近一次重置時間」比較：完成時間比重置時間早的，就視為新的一輪還沒做，勾選自動消失。重置時間是用繁中服的台灣時間（GMT+8）計算的，和你裝置的時區無關。",
            "所有進度都只存在你自己的瀏覽器裡，沒有上傳到任何伺服器，所以清除瀏覽器資料會一併清掉進度。需要換裝置時，可以用側邊欄的「匯出資料」備份。",
          ],
        },
      ],
      steps: [
        "完成一項就點一下打勾，系統會記下完成時間。",
        "過了重置時間後，打勾會自動清除，不用每天手動重來。",
        "想提前重來，可以按每個區塊右上角的重置按鈕。",
      ],
      faq: [
        { q: "繁中服的重置時間是幾點？", a: "隨機任務在每天 23:00（GMT+8）重置；蠻族任務與軍團籌備任務在每天 04:00 重置；天書奇談、老主顧交易、挑戰筆記等每週項目在每週二 16:00 重置。完整對照見上方表格。" },
        { q: "為什麼我打勾的項目不見了？", a: "那是重置時間到了，網站自動清除。例如晚上 22:50 勾選的每日隨機任務，到 23:00 之後就會變回未完成。" },
        { q: "換電腦或換瀏覽器，進度會保留嗎？", a: "不會自動保留，因為進度只存在原本的瀏覽器。請在舊的瀏覽器按側邊欄的「匯出資料」下載備份檔，再到新的瀏覽器按「匯入資料」。" },
        { q: "我可以自己新增任務項目嗎？", a: "目前清單是固定的項目，不能自行新增。如果需要自己的提醒，可以使用自訂鬧鐘的內建提醒；個人的團練與聚會則可以記在活動行事曆。" },
        { q: "重置時間會受我的時區影響嗎？", a: "不會。清單依繁中服的台灣時間（GMT+8）計算重置，不管你的裝置設在哪個時區，重置的瞬間都一樣。" },
      ],
    },
    en: {
      intro: "Task Progress tracks FFXIV daily and weekly chores: Duty Roulettes, beast tribe quests, GC turn-ins, squadron training, retainer ventures, Mini Cactpot and treasure maps, plus weekly Wondrous Tails, Custom Deliveries, Fashion Report, Jumbo Cactpot, Challenge Log and raid lockouts.",
      steps: [
        "Tick a task when it is done; the time you finished it is recorded.",
        "Ticks clear automatically once the matching server reset passes.",
        "Use the reset button on each section to start over early.",
      ],
      faq: [
        { q: "When do resets happen on the TC server?", a: "Daily duties reset at 23:00 (GMT+8); GC supply, beast tribes and squadron training at 04:00; weekly tasks on Tuesday at 16:00." },
        { q: "Why did my ticks disappear?", a: "The reset time passed and they were cleared automatically — for example, a daily task ticked at 22:50 becomes unticked after 23:00." },
      ],
    },
    related: [
      { view: "alarm", note: "把每日、每週重置做成倒數提醒" },
      { view: "cactpot", note: "每天 3 次仙人微彩，算出每條線的期望值" },
      { view: "tails", note: "每週天書奇談的連線機率" },
    ],
  },

  /* ───────────────────────── 鬧鐘 ───────────────────────── */
  alarm: {
    zh: {
      intro:
        "自訂鬧鐘（Alarm Clock）用瀏覽器通知與提示音，提醒你遊戲裡固定的時間點：每日與每週重置、理符受理限額更新、出海垂釣出航，以及雇員探險與冒險者分隊的完成時間。本站提供 9 項內建提醒，每一項都是一個開關，打開就開始倒數。",
      sections: [
        {
          heading: "9 項內建提醒與計時方式",
          table: {
            head: ["提醒", "什麼時候響"],
            rows: [
              ["每日任務重設提醒", "下一次每日重置（每天 23:00，GMT+8）"],
              ["每週任務重設提醒", "下一個週二 16:00（GMT+8）"],
              ["理符受理限額補充提醒", "下一次 08:00 或 20:00（GMT+8）"],
              ["出海垂釣準備", "下一班出海垂釣出航時（每 2 小時一班）"],
              ["雇員籌集委託", "打開開關後 1 小時"],
              ["雇員探索委託", "打開開關後 18 小時"],
              ["雇員自由委託", "打開開關後 1 小時"],
              ["冒險者分隊訓練", "打開開關後 1 小時"],
              ["冒險者分隊任務", "打開開關後 18 小時"],
            ],
          },
          note: "後五項是從你打開開關的那一刻起算的固定時數，是本站設定的預設值；實際的探險或任務時間請以遊戲內顯示為準。",
        },
        {
          heading: "通知怎麼運作",
          paragraphs: [
            "第一次使用請按「啟用通知」並在瀏覽器跳出的視窗允許；也可以按「測試通知」確認能正常收到。時間到時，網站會跳出瀏覽器通知、播放提示音，並在頁面右上角顯示訊息。",
            "鬧鐘是在你的瀏覽器裡計時的，所以需要讓網頁保持開著（放在背景分頁也可以）。提醒響過一次之後，該項目會自動關閉，要再次提醒需要重新打開開關。如果在網頁關閉期間已經過了提醒時間，下次打開網頁時會立刻跳出提醒。",
          ],
        },
      ],
      steps: [
        "第一次使用請先按「啟用通知」，並在瀏覽器跳出的視窗允許通知。",
        "在清單中打開想要的提醒開關，右側會顯示倒數時間。",
        "時間一到會跳出通知並播放提示音，同時在網頁右上角顯示訊息。",
      ],
      faq: [
        { q: "可以自己設定任意時間的鬧鐘嗎？", a: "目前不行。鬧鐘只提供上方 9 項內建提醒，沒有自訂任意時間或艾歐澤亞時間（ET）的功能。" },
        { q: "關掉網頁之後還會提醒嗎？", a: "不會。鬧鐘在你的瀏覽器裡計時，需要讓這個網頁保持開著（可以放在背景分頁）。" },
        { q: "沒有跳出通知怎麼辦？", a: "請確認瀏覽器的網站通知權限是「允許」，也可以按「測試通知」檢查。若曾經拒絕過，需要到瀏覽器的網站設定手動開啟。" },
        { q: "提醒響完之後會自動重新倒數嗎？", a: "不會。每個提醒響過一次就會自動關閉，需要再次提醒時，請重新打開那一項的開關。" },
        { q: "倒數的時間是依哪個時區計算的？", a: "每日、每週重置、理符限額與出海垂釣都以繁中服的台灣時間（GMT+8）計算；倒數畫面顯示的是距離目標還剩多久，不受裝置時區影響。" },
      ],
    },
    en: {
      intro: "Custom Alarms remind you of in-game moments with browser notifications and a sound. There are 9 built-in reminders — daily and weekly resets, levequest allowances, Ocean Fishing departures, retainer ventures and squadron training or missions — each one a simple on/off switch.",
      steps: [
        "Press “Enable notifications” first and allow them in the browser prompt.",
        "Turn on the reminders you want; a countdown appears next to each one.",
        "When it fires you get a notification, a sound and an on-page message.",
      ],
      faq: [
        { q: "Can I set an alarm for any time I like?", a: "Not at the moment. Only the 9 built-in reminders are available — there is no free-form time or Eorzea-time alarm." },
        { q: "Does it still ring after I close the page?", a: "No. Alarms run in your browser, so keep the page open (a background tab is fine)." },
        { q: "No notification appeared — why?", a: "Make sure notifications are allowed for this site and try “Test notification”. If you blocked them before, re-enable them in your browser’s site settings." },
      ],
    },
    related: [
      { view: "checklist", note: "勾選每日與每週任務，並依重置時間自動清除" },
      { view: "event-calendar", note: "記下團練、聚會與官方活動的日期" },
      { view: "weather", note: "查詢接下來的天氣與換天氣的時間" },
    ],
  },
  /* ───────────────────────── 活動行事曆 ───────────────────────── */
  "event-calendar": {
    zh: {
      intro:
        "活動行事曆把 FF14 繁中服官網「活動公告」裡的官方活動，和你自己的行程放在同一份清單：官方活動由網站自動更新，個人行程可以新增團練、聚會或其他活動，首頁的「接下來的活動」也會預覽最近的行程。",
      sections: [
        {
          heading: "官方活動怎麼來",
          paragraphs: [
            "網站每天會自動檢查兩次繁中服官網的活動公告（台灣時間 03:17 與 15:17），有新的活動就更新清單。活動日期取自公告標題裡的「月／日」，例如標題寫「10/23 守護天節」，就會排在 10 月 23 日；標題沒有日期的公告不會出現在清單中。活動日期顯示的時間統一為當天 14:00，只是用來排序，實際開始與結束時間請以官方公告為準。",
            "標題日期已經過了 14 天以上的活動會從清單中移除；點擊清單裡的官方活動，可以開啟官網的原始公告。",
          ],
        },
        {
          heading: "新增個人行程",
          list: [
            "活動名稱與活動說明：例如固定團的練習內容、FC 活動的集合地點。",
            "日期與時間：用日期選擇器選取。",
            "類型：團練、聚會或其他，方便辨識與篩選。",
          ],
          note: "個人行程只存在你的瀏覽器裡，不會上傳，也不會被其他人看到。",
        },
      ],
      steps: [
        "官方活動會自動出現在清單上，點擊可以打開官網公告。",
        "按「新增活動」輸入名稱、日期時間、類型與說明，就能加入自己的行程。",
        "首頁的「接下來的活動」會同時列出最近的官方活動與個人行程。",
      ],
      faq: [
        { q: "官方活動多久更新一次？", a: "網站每天自動檢查兩次官網的活動公告，台灣時間 03:17 與 15:17，有新的活動就會更新。" },
        { q: "為什麼某個官方活動沒有出現？", a: "清單只收錄標題裡有「月／日」日期的活動公告，沒有日期的公告（例如徵稿、長期活動說明）不會出現；標題日期已過 14 天以上的活動也會被移除。" },
        { q: "我加的活動別人看得到嗎？", a: "看不到。個人行程只存在你的瀏覽器，可以用側邊欄的「匯出資料」備份或搬到其他裝置。" },
        { q: "活動時間以什麼為準？", a: "官方活動只用公告標題的日期排序，請以官網公告內文寫的開始與結束時間為準。" },
      ],
    },
    en: {
      intro: "The Event Calendar collects official events from the TC server’s event announcements and lets you add your FC or static’s raids and gatherings to the same calendar.",
      steps: [
        "Official events appear automatically; click one to open the announcement.",
        "Use “Add event” to enter a name, date and time, type and notes.",
        "“Upcoming events” on the overview lists both official and personal entries.",
      ],
      faq: [
        { q: "How often are official events updated?", a: "The site checks the official announcements twice a day." },
        { q: "Can other people see my events?", a: "No. Personal events stay in your browser; use “Export data” to back them up or move them." },
      ],
    },
    related: [
      { view: "alarm", note: "設定每日、每週重置與出航的提醒" },
      { view: "checklist", note: "勾選每日與每週例行任務" },
    ],
  },

  /* ───────────────────────── 天書奇談 ───────────────────────── */
  tails: {
    zh: {
      intro:
        "天書奇談（Wondrous Tails，俗稱庫洛天書、庫洛的奇談書）是 NPC 庫洛·阿里亞珀每週發放的任務書：完成書上列出的任務可以貼印花，最多貼 9 枚；印花連成越多條「故事線」，領到的獎勵越好。印花是隨機貼在空白格上的，本站依你目前的盤面，精算最後連成 1、2、3 條線的機率。",
      sections: [
        {
          heading: "盤面與連線規則",
          paragraphs: [
            "奇談書的盤面是 4×4 共 16 格。同一橫列、同一直行，或兩條對角線上的 4 格都貼滿印花，就算連成一條故事線，因此盤面上最多有 10 條可能的線（4 橫、4 直、2 斜）。",
            "每本書最多貼 9 枚印花。獎勵依達成條件分成：貼出 1 條故事線、2 條故事線、3 條故事線，以及貼滿 9 枚印花；已經達成條件但還有空格時，可以先去領獎，也可以繼續貼以換取更多獎勵。",
            "選擇一個已經完成的任務後，印花會隨機貼在奇談書的空白處，你沒辦法自己選擇貼在哪一格，所以才需要用機率來判斷盤面的好壞。",
          ],
        },
        {
          heading: "印花隨機落點的連線機率",
          paragraphs: [
            "下表是把 n 枚印花完全隨機放在空的 16 格盤面上，連成至少 1、2、3 條線的機率，由全部組合逐一枚舉算出。已經有印花的盤面請用上方的計算器，它會依你實際的盤面重新計算。",
          ],
          table: {
            head: ["印花數", "至少 1 條線", "至少 2 條線", "至少 3 條線"],
            rows: [
              ["4", "0.5%", "0.0%", "0.0%"],
              ["5", "2.7%", "0.0%", "0.0%"],
              ["6", "8.2%", "0.0%", "0.0%"],
              ["7", "19.0%", "0.3%", "0.0%"],
              ["8", "36.1%", "2.3%", "0.0%"],
              ["9", "58.5%", "10.6%", "0.2%"],
            ],
          },
          note: "9 枚印花隨機落點時，至少連成 1 條線的機率約 58.5%，2 條約 10.6%，3 條只有約 0.2%。",
        },
        {
          heading: "胡思亂想（Second Chance）與奇想點",
          list: [
            "奇想點（Second Chance points）最多累積 9 點，沒用完的可以保留到下一週的奇談書。",
            "取得方式：帶領第一次執行該任務的隊員完成任務，或完成標有奇想點加成的任務。",
            "胡思亂想的「重新貼」會取下已經貼好的印花並隨機重貼，只有在已貼 3 到 7 枚印花時才能使用。",
          ],
          paragraphs: [
            "判斷要不要重新貼，可以用上表的最後一列當基準：重新貼之後再貼滿 9 枚，整個盤面等於完全隨機，連線機率就是 58.5%（1 條）、10.6%（2 條）、0.2%（3 條）。如果計算器算出你目前盤面的機率比這些數字低，重新貼對你的目標比較有利；比這些數字高，就不需要花奇想點。",
          ],
        },
      ],
      steps: [
        "在 4×4 的格子上點選你已經貼上印花的位置。",
        "計算器會列出把剩下的印花隨機貼滿 9 枚後，達成 1、2、3 條線的機率，由所有可能的貼法逐一枚舉而來。",
        "已貼 3 到 7 枚印花時，可以按「洗牌」預覽重新貼之後的盤面。",
      ],
      faq: [
        { q: "印花最多可以貼幾枚？", a: "每本奇談書最多貼 9 枚。貼滿 9 枚之後，就可以把書交給庫洛領取獎勵。" },
        { q: "什麼時候洗牌（重新貼）比較划算？", a: "重新貼只有在已貼 3 到 7 枚時可以使用。重新貼後再貼滿 9 枚，整個盤面等於完全隨機，連線機率固定是 58.5%、10.6%、0.2%；當計算器顯示目前盤面的機率低於這些數字，重新貼才有幫助。" },
        { q: "機率是怎麼算的？", a: "把還沒貼的印花放進所有可能的空格組合，逐一數出每種組合連成幾條線，再算出達成至少 1、2、3 條線的比例。這是精確的組合計算，不是抽樣模擬。" },
        { q: "天書奇談什麼時候重置？", a: "每週二 16:00（GMT+8）換新的一本。奇想點可以保留到下一本。" },
        { q: "奇想點要怎麼取得？", a: "帶領第一次執行該任務的隊員完成任務，或完成標有奇想點加成的任務，都可以獲得奇想點，最多累積 9 點。" },
      ],
    },
    en: {
      intro: "Wondrous Tails is a weekly journal: clear the listed duties to earn stickers, and more completed lines mean better rewards. This tool computes the exact chance of finishing with 1, 2 or 3 lines from your current board.",
      steps: [
        "Click the cells on the 4×4 board where you already have stickers.",
        "The odds for 1, 2 and 3 lines are computed from every possible placement of the remaining stickers (up to 9 in total).",
        "With 3–7 stickers you can use “Shuffle” to preview a re-stuck layout.",
      ],
      faq: [
        { q: "When is shuffling worth it?", a: "After a shuffle and filling the book to 9 stickers the board is fully random: 58.5% / 10.6% / 0.2% for 1 / 2 / 3 lines. Shuffle only if your current odds are lower." },
        { q: "How are the odds calculated?", a: "Every possible placement of the remaining stickers is enumerated and the completed lines are counted." },
      ],
    },
    related: [
      { view: "checklist", note: "每週二重置的例行任務清單" },
      { view: "cactpot", note: "另一個用機率挑選最佳選擇的金碟遊樂場小遊戲" },
      { view: "alarm", note: "把每週重置設成倒數提醒" },
    ],
  },

  /* ───────────────────────── 市場查詢 ───────────────────────── */
  market: {
    zh: {
      intro:
        "市場查詢（Market Board）使用 Universalis 的玩家上傳資料，查詢 FF14 繁中服陸行鳥資料中心 8 個伺服器（伊弗利特、迦樓羅、利維坦、鳳凰、奧汀、巴哈姆特、拉姆、泰坦）的道具最低售價、平均售價、目前上架與最近成交紀錄，幫你決定要在哪個伺服器買或賣。",
      sections: [
        {
          heading: "查詢結果怎麼看",
          list: [
            "最低售價與平均售價：該範圍內目前上架的最低單價與平均單價。",
            "目前上架：列出價格、數量、總價與所在伺服器，並標示是否為 HQ（高品質）。",
            "最近交易：最近的成交紀錄（最多顯示 10 筆），包含價格、數量與距今多久。",
            "「在 Universalis 查看完整數據」：開啟 Universalis 網站查看更完整的圖表與歷史資料。",
          ],
          paragraphs: [
            "查詢範圍可以選擇單一伺服器，或「全區 (DC)」一次比較陸行鳥資料中心的所有伺服器。如果選定的範圍查不到資料，網站會依序改查整個資料中心，再改查繁中服整區。",
          ],
        },
        {
          heading: "常用清單：一次比較收藏的道具",
          paragraphs: [
            "在搜尋結果或道具頁按星號，就能把道具加入常用清單。沒有選取道具時，右側會顯示常用清單的價格總覽：每個道具的最低單價與所在伺服器、平均價、日均成交（Universalis 統計的平均每日成交筆數，數字越高越好賣），並加總最低價。點選任一列可以查看該道具的完整掛單；按「重新整理」會重新抓取最新價格。常用清單存在你的瀏覽器，不會上傳。",
          ],
        },
        {
          heading: "價格資料的限制",
          paragraphs: [
            "Universalis 的資料由玩家使用外掛上傳，熱門道具更新得很快，冷門道具可能是幾小時前的資料，所以和遊戲裡的即時價格可能有出入。無法在市場板上架的道具（例如不可交易的道具）沒有價格資料；剛上市或很少人交易的道具，也可能因為還沒有人上傳而查不到。",
          ],
        },
      ],
      steps: [
        "在搜尋框輸入道具名稱（中文或英文都可以）或道具 ID。",
        "選擇要查詢的伺服器，或「全區 (DC)」比較陸行鳥資料中心的所有伺服器。",
        "按星號把常用道具加入常用清單，之後就能一次看到它們的最低價、所在伺服器與每日成交量。",
      ],
      faq: [
        { q: "價格多久更新？為什麼和遊戲裡不一樣？", a: "Universalis 的資料來自玩家上傳，熱門道具更新得比較快，冷門道具可能是好幾小時前的資料；成交紀錄會標示是多久之前的交易。" },
        { q: "為什麼查不到某個道具的價格？", a: "可能是這個道具無法在市場板交易，或是還沒有玩家上傳過它的資料。網站會依序嘗試單一伺服器、整個資料中心與繁中服整區；都沒有資料時會顯示說明。" },
        { q: "「日均成交」是什麼意思？", a: "Universalis 統計的平均每日成交筆數，數字越高代表越好賣。" },
        { q: "可以用英文或道具 ID 搜尋嗎？", a: "可以。搜尋支援中文、英文道具名稱，也可以直接輸入道具 ID。" },
        { q: "常用清單會不會跟著我換裝置？", a: "不會。常用清單存在目前使用的瀏覽器，換裝置時請用側邊欄的「匯出資料」與「匯入資料」搬移。" },
      ],
    },
    en: {
      intro: "Market Board uses Universalis data to show lowest prices, averages, current listings and recent sales for every world on the TC server’s Chocobo data centre, so you know where to buy or sell.",
      steps: [
        "Search by item name (Chinese or English) or item ID.",
        "Pick a world, or “All DC” to compare every world in the data centre.",
        "Star items to add them to your watchlist and see their lowest price, world and sales per day at a glance.",
      ],
      faq: [
        { q: "How fresh are the prices?", a: "Universalis data is uploaded by players, so popular items update quickly while niche ones may be hours old; recent sales show how long ago they happened." },
        { q: "What does “Sales/day” mean?", a: "The average number of sales per day reported by Universalis — higher means it sells faster." },
      ],
    },
    related: [
      { view: "treasure", note: "藏寶圖各等級的挖掘地點" },
      { view: "checklist", note: "每日、每週例行任務清單" },
    ],
  },
  /* ───────────────────────── 藏寶搜尋 ───────────────────────── */
  treasure: {
    zh: {
      intro:
        "藏寶搜尋收錄 FF14 G8 至 G18 藏寶圖（陳舊的○○革地圖，Timeworn Map）的挖掘地點，共 267 個點、分布在蒼穹之禁城（3.0）到黃金遺產（7.x）的 28 個地區，座標都已對照遊戲資料逐一核對。選擇藏寶圖的等級、對照手上藏寶圖的縮圖，就能在地圖上看到挖掘位置、精確座標與該地區的以太之光。",
      sections: [
        {
          heading: "G8 至 G18 各等級藏寶圖",
          table: {
            caption: "G 後面的數字是玩家對藏寶圖等級的稱呼，數字越大等級越高",
            head: ["等級", "藏寶圖（英文）", "資料片", "採集等級", "本站收錄"],
            rows: [
              ["G8", "巨龍革地圖（Dragonskin）", "蒼穹之禁城 3.0", "60", "35 點／4 區"],
              ["G10", "瞪羚革地圖（Gazelleskin）", "紅蓮之狂潮 4.0", "70", "48 點／6 區"],
              ["G12", "纏尾蛟革地圖（Zonureskin）", "暗影之逆焰 5.0", "80", "48 點／6 區"],
              ["G14", "金毗羅鱷革地圖（Kumbhiraskin）", "曉月之終途 6.0", "90", "40 點／5 區"],
              ["G15", "蛇牛革地圖（Ophiotauroskin）", "曉月之終途 6.0", "90", "8 點／1 區"],
              ["G16", "銀狼革地圖（Loboskin）", "黃金遺產 7.x", "100", "40 點／5 區"],
              ["G17", "獰豹革地圖（Br'aaxskin）", "黃金遺產 7.x", "100", "40 點／5 區"],
              ["G18", "卡岡圖亞革地圖（Gargantuaskin，本站舊稱「巨獸革」）", "黃金遺產 7.x", "100", "8 點／1 區"],
            ],
          },
          note: "藏寶圖的名稱與採集等級取自遊戲資料表：這些藏寶圖都是採集道具，採集等級剛好是各資料片的等級上限。G16 與 G17 共用同樣的 5 個地區，但挖掘點不同；G15 與 G18 各只有 1 個地區 8 個點。",
        },
        {
          heading: "各等級包含的地區",
          list: [
            "G8：庫爾札斯西部高地、龍堡參天高地、德拉瓦尼亞雲海、阿巴拉提亞雲海",
            "G10：基拉巴尼亞邊區、基拉巴尼亞山區、基拉巴尼亞湖區、紅玉海、延夏、太陽神草原",
            "G12：雷克蘭德、珂露西亞島、安穆·艾蘭、伊爾美格、拉凱提卡大森林、黑風海",
            "G14：迷津、薩維奈島、加雷馬、嘆息海、天外天垓",
            "G15：厄爾庇斯",
            "G16、G17：奧闊帕恰山、克扎瑪烏卡濕地、亞克特爾樹海、夏勞尼荒野、遺產之地",
            "G18：活著的記憶",
          ],
        },
        {
          heading: "怎麼對照藏寶圖與座標",
          paragraphs: [
            "先選擇手上藏寶圖的等級，再用地區名稱篩選；清單裡每一格縮圖就是一個挖掘點的藏寶圖樣子。對照時可以觀察圖上的地形特徵，例如山脈、河流或建築物的形狀與位置。點選相符的縮圖後，會顯示該地區的完整地圖、紅色標記的挖掘位置、座標（X, Y），以及該地區的以太之光，可以一鍵複製座標。",
            "地圖座標以左上角為 (1, 1)，多數地區的範圍是 1.0 到 42.0；蒼穹之禁城的四張地圖（庫爾札斯西部高地、龍堡參天高地、德拉瓦尼亞雲海、阿巴拉提亞雲海）比例不同，座標範圍約到 44.2。本站已依各地圖的實際比例換算標記位置。",
          ],
        },
      ],
      steps: [
        "先選擇藏寶圖的等級（例如 G17 獰豹革地圖）。",
        "對照手上藏寶圖的圖案，點擊相符的縮圖，或用區域名稱篩選。",
        "會顯示完整地圖上的位置、精確座標與該地區的以太之光，可以一鍵複製座標。",
      ],
      faq: [
        { q: "G8、G10、G12 這些代號是什麼意思？", a: "這是玩家對藏寶圖等級的簡稱，G 後面的數字越大，藏寶圖的等級越高、屬於越新的資料片。本站收錄 G8（巨龍革地圖）到 G18（卡岡圖亞革地圖）。" },
        { q: "藏寶圖要怎麼取得？", a: "遊戲資料顯示這些藏寶圖是採集取得的道具，各等級需要的採集等級見上方表格（60 到 100）。" },
        { q: "座標準確嗎？", a: "所有挖掘點都對照遊戲資料表逐一核對，座標精確到小數點後一位，地圖上的標記位置也依各地圖自己的比例換算，不會因為地圖大小不同而偏移。" },
        { q: "為什麼 G15 和 G18 只有 8 個點？", a: "這兩種藏寶圖各只對應一個地區：G15 是厄爾庇斯，G18 是活著的記憶，每個地區有 8 個挖掘點。" },
        { q: "同一個地區有好幾個很像的點，怎麼分辨？", a: "可以比對藏寶圖縮圖的地形，例如山脈、河流、建築物的形狀與位置，再對照完整地圖上的紅色標記。" },
      ],
    },
    en: {
      intro: "Treasure Hunt lists every dig spot for FFXIV G8 to G18 maps — Dragonskin, Gazelleskin, Zonureskin, Kumbhiraskin, Ophiotauroskin, Loboskin, Br’aaxskin and Gargantuaskin. All coordinates are checked against game data.",
      steps: [
        "Choose the map grade, e.g. G17 Br’aaxskin.",
        "Match your map’s artwork to a thumbnail, or filter by zone name.",
        "See the spot on the full zone map with exact coordinates and the zone’s aetherytes, and copy the coordinates in one click.",
      ],
      faq: [
        { q: "How accurate are the coordinates?", a: "Every spot was checked against game data to one decimal place, and markers use each map’s own scale." },
        { q: "Several spots look alike — how do I tell them apart?", a: "Compare terrain on the map artwork — mountains, rivers and buildings — with the marker on the full map." },
      ],
    },
    related: [
      { view: "interactive-maps", note: "在互動地圖上查看地區地形" },
      { view: "market", note: "查詢道具價格" },
      { view: "weather", note: "查詢各地圖接下來的天氣" },
    ],
  },

  /* ───────────────────────── 仙人微彩 ───────────────────────── */
  cactpot: {
    zh: {
      intro:
        "仙人微彩（Mini Cactpot）是金碟遊樂場（Gold Saucer）每天最多可以玩 3 次的刮刮樂：3×3 的格子裡藏著 1 到 9 九個不重複的數字，一開始會翻開 1 格，你再翻開 3 格，然後從 8 條線（3 橫、3 直、2 斜）中選 1 條，依這條線三個數字的總和領取金碟幣（MGP）。本站計算器依你已知的數字，算出每條線的期望值。",
      sections: [
        {
          heading: "完整獎金表",
          table: {
            caption: "一條線三個數字的總和與對應的金碟幣；組合數是從 1 到 9 挑 3 個數字的 84 種組合中，總和等於該值的數量",
            head: ["三個數字的總和", "金碟幣（MGP）", "組合數（共 84 種）"],
            rows: CACTPOT_ROWS.map((r) => [...r]),
          },
          note: "獎金表與本站計算器使用的數值相同。總和 6（1+2+3）與 24（7+8+9）都只有 1 種組合，所以拿到最高獎金的機會很小。",
        },
        {
          heading: "怎麼選線：看期望值，不是看最高獎金",
          paragraphs: [
            "最後一步要選的是「期望值最高」的線，而不是「可能拿到最高獎金」的線。一條完全不知道數字的線，84 種組合平均下來只有約 360 MGP；一條已經翻開兩格的線，只剩下一個未知的數字，期望值就可能高於或低於這個平均，所以需要逐條計算。本站計算器會列出每條線目前的期望值、最高可能獎金，並依期望值由高到低排序。",
            "我們把完整規則（先隨機翻開 1 格、再自由選擇翻開 3 格、最後選一條線）逐一枚舉，算出在每一步都做最佳選擇時，一輪的平均獎金約為 1,485 MGP。第一個被翻開的數字影響很大：當它是 1、2、3 時，平均約 1,570 至 1,580 MGP；是 7、8、9 時約 1,465 至 1,520 MGP；是 4、5、6 時只有約 1,380 MGP。第一格的位置也有差別：在角落或正中央平均約 1,510 MGP，在邊的格子約 1,453 MGP。",
          ],
          note: "以上平均值假設你每一步都選擇期望值最高的翻法，是理論上的最佳結果，實際每一輪的獎金差距很大。",
        },
      ],
      steps: [
        "在 3×3 的格子裡填入已經翻開的數字（1 到 9，不重複）。",
        "計算器會算出 8 條線（3 橫、3 直、2 斜）各自的期望 MGP 與最高可能獎金。",
        "依「建議路線」選擇期望值最高的那一條；每多翻開一格，結果就會重新計算。",
      ],
      faq: [
        { q: "仙人微彩一天可以玩幾次？", a: "每天最多 3 次，每次都可以獨立使用計算器。" },
        { q: "最高可以拿到多少金碟幣？", a: "選中的線總和為 6（1+2+3）時獎勵最高，是 10,000 MGP；總和 24（7+8+9）是 3,600 MGP，總和 23 是 1,800 MGP。" },
        { q: "期望值是怎麼算的？", a: "對每一條線，把尚未翻開的數字所有可能的組合都列出來，算出每一種組合對應的獎金，再取平均。已經翻開的數字會直接代入計算。" },
        { q: "為什麼有時候算不出期望值？", a: "已知的數字太少時，可用的組合不足以計算，請再多填幾個已翻開的數字。" },
        { q: "仙人微彩和仙人仙彩有什麼不同？", a: "仙人微彩是每天最多玩 3 次的刮刮樂，翻開數字後選線領獎；仙人仙彩（Jumbo Cactpot，本站任務清單稱「仙人彩」）則是每週開獎、用金碟幣購買四位數號碼的彩券。本站只提供仙人微彩的計算。" },
      ],
    },
    en: {
      intro: "Mini Cactpot is the Gold Saucer scratch card you can play 3 times a day: the 3×3 grid holds the numbers 1–9, you reveal 4 cells, then pick a line and win MGP based on its sum. This tool works out each line’s expected value.",
      steps: [
        "Enter the numbers you have revealed.",
        "Expected MGP and the best possible payout are shown for all 8 lines (3 rows, 3 columns, 2 diagonals).",
        "Pick the suggested line with the highest expected value.",
      ],
      faq: [
        { q: "What is the top prize?", a: "A line summing to 6 (1+2+3) pays 10,000 MGP; a sum of 24 (7+8+9) pays 3,600 MGP." },
        { q: "What is the average payout with perfect play?", a: "About 1,485 MGP per game, from enumerating the full rules." },
      ],
    },
    related: [
      { view: "checklist", note: "每日勾選仙人微彩與其他例行任務" },
      { view: "tails", note: "另一個用機率判斷的每週任務書" },
    ],
  },

  /* ───────────────────────── 陸行鳥染色 ───────────────────────── */
  chocobo: {
    zh: {
      intro:
        "陸行鳥染色計算器幫你算出，把搭檔陸行鳥的羽色餵食果實染成目標顏色，需要哪些果實、各幾顆，以及建議的餵食順序。選擇目前顏色與目標顏色（本站收錄 85 種顏色，可用名稱搜尋，常見的有沙漠黃、素雪白、煤煙黑、衛月紅、皇室藍、獵人綠），按「開始計算」就會列出結果。",
      sections: [
        {
          heading: "六種染色果實與色值變化",
          table: {
            caption: "本站計算使用的果實效果：每顆果實讓羽色的其中一個色值增加或減少 5",
            head: ["果實", "效果"],
            rows: [
              ["塞爾法特爾沙果（Xelphatol Apple）", "紅色 +5"],
              ["多瑪青梅（Doman Plum）", "紅色 −5"],
              ["輝鱗油梨（Mamook Pear）", "綠色 +5"],
              ["瓦爾醋栗（Valfruit）", "綠色 −5"],
              ["奧·哥摩羅漿果（O'Ghomoro Berries，本站顯示「歐·葛莫羅漿果」）", "藍色 +5"],
              ["謝爾達萊鳳梨（Cieldalaes Pineapple）", "藍色 −5"],
            ],
          },
        },
        {
          heading: "果實數量與餵食順序怎麼算",
          paragraphs: [
            "每一種顏色都用紅、綠、藍三個色值表示。計算器會把「目標顏色」和「目前顏色」的三個色值相減：差是正的，就用該色對應的增加型果實；差是負的，就用減少型果實；差等於 0 的色值不需要餵食。每個色值需要的果實顆數，等於差的絕對值除以 5 後無條件進位。",
            "建議的餵食順序採輪流餵食：把需要的果實依序輪流排列，例如需要紅色 3 顆、藍色 2 顆，順序就是紅、藍、紅、藍、紅。本站的建議是交替餵食，讓顏色變化比較穩定。你可以一邊餵食一邊記錄進度，進度會存在瀏覽器裡，下次打開仍然會保留，需要重來可以按「重置進度」。",
          ],
        },
      ],
      steps: [
        "選擇陸行鳥目前的顏色，再選擇想要的目標顏色。",
        "按「開始計算」，會列出需要的果實種類與數量。",
        "照建議順序逐一餵食，可以在清單上記錄進度，下次打開還會保留。",
      ],
      faq: [
        { q: "怎麼找到想要的顏色？", a: "在選擇顏色的選單裡可以用顏色名稱或代號搜尋；沒有輸入時會先列出熱門顏色，方便快速選取。" },
        { q: "為什麼建議交替餵食不同的果實？", a: "每種果實只改變紅、綠、藍其中一個色值，交替餵食讓三個色值同步接近目標，顏色變化比較穩定，比較容易在途中確認方向是否正確。" },
        { q: "果實數量是怎麼算出來的？", a: "目標顏色與目前顏色的色值相差多少，除以每顆果實改變的 5，再無條件進位，就是該色需要的果實顆數。" },
        { q: "進度會保存嗎？", a: "會。選擇的顏色、計算結果與餵食進度都存在瀏覽器裡。換裝置時請用側邊欄的「匯出資料」與「匯入資料」搬移。" },
        { q: "目前顏色與目標顏色一樣會怎樣？", a: "會顯示「目前顏色與目標顏色相同，無需餵食水果」。" },
      ],
    },
    en: {
      intro: "The Chocobo Dyer Calculator tells you which fruits, how many of each and in what order to feed your companion chocobo to get from its current plumage to a target colour.",
      steps: [
        "Choose your chocobo’s current colour and the colour you want.",
        "Press “Calculate” to see the fruits and quantities needed.",
        "Feed them in the suggested order and track your progress — it is saved for next time.",
      ],
      faq: [
        { q: "Why alternate fruits?", a: "Each fruit shifts one colour channel; alternating keeps all three moving toward the target so the colour changes more predictably." },
        { q: "How is the quantity worked out?", a: "The difference in each of red, green and blue is divided by 5 (the change per fruit) and rounded up." },
      ],
    },
    related: [
      { view: "market", note: "查詢道具價格" },
      { view: "checklist", note: "勾選每日與每週例行任務" },
    ],
  },
  /* ───────────────────────── 天氣預報 ───────────────────────── */
  weather: {
    zh: {
      intro:
        "天氣預報（Skywatcher）依照 FF14 固定的天氣公式，算出各地圖接下來的天氣，並換算成你裝置的本地時間與倒數。本站收錄 2.0 到 7.0 共 68 張地圖，可以用來等稀有天氣、探索筆記（Sightseeing Log）的景點，以及需要特定天氣的採集、釣魚與怪物。",
      sections: [
        {
          heading: "FF14 的天氣是怎麼決定的",
          paragraphs: [
            "FF14 的天氣不是隨機事件，而是由遊戲時間（艾歐澤亞時間，ET）經過固定公式算出來的，所以同一個時間點，所有伺服器看到的天氣都完全相同，也因此可以事先精準預測。",
            "每 8 個 ET 小時（現實時間 23 分 20 秒）會重新決定一次天氣，換天氣的時間點固定在 ET 0:00、8:00、16:00。艾歐澤亞的一天等於現實的 70 分鐘，所以一天剛好有 3 個天氣時段。ET 小時可以用現實時間換算：ET 小時 = ⌊現實 Unix 秒數 ÷ 175⌋ 除以 24 的餘數，也就是 1 個 ET 小時等於現實的 175 秒。",
            "每張地圖都有自己的天氣機率表，決定每次換天氣時各種天氣出現的機率。例如本站資料中的東拉諾西亞：碧空 45%、晴朗 30%、陰雲 10%，薄霧、小雨、暴雨各 5%。",
          ],
        },
        {
          heading: "本站收錄的 19 種天氣",
          list: [
            "碧空（Clear Skies）、晴朗（Fair Skies）、陰雲（Clouds）、薄霧（Fog）",
            "小雨（Rain）、暴雨（Showers）、打雷（Thunder）、雷雨（Thunderstorms）",
            "揚沙（Dust Storms）、熱浪（Heat Waves）、妖霧（Gloom）、小雪（Snow）、暴雪（Blizzards）",
            "微風（Wind）、強風（Gales）",
            "靈電（Umbral Static，本站顯示「靈極電」）、靈風（Umbral Wind，本站顯示「靈極風」）",
            "月塵（Moon Dust）、磁暴（Astromagnetic Storm，本站顯示「宇宙磁暴」）",
          ],
        },
        {
          heading: "怎麼找稀有天氣",
          paragraphs: [
            "在「天氣篩選」選擇想要的天氣，左側的地圖清單會只留下接下來 8 個天氣時段（約 3 小時）內會出現該天氣的地圖。本站資料裡機率最低的天氣大多只有 5%，例如東拉諾西亞的薄霧、小雨與暴雨，所以不事先查很難剛好遇到。",
            "選定地圖後，右側會列出接下來的 8 個時段：每個時段顯示 ET 的起始時間、換算後的本地時間起訖，以及距離開始或結束還剩多久；最下面是該地圖各種天氣的出現機率。",
          ],
        },
      ],
      steps: [
        "依資料片版本（2.0 到 7.0）或地圖名稱找到要查的地區。",
        "右側會列出接下來 8 個時段的天氣，每個時段都顯示本地時間的開始與結束，以及倒數。",
        "在「天氣篩選」選擇特定天氣，只顯示近期會出現該天氣的地圖。",
      ],
      faq: [
        { q: "天氣多久變一次？", a: "每 8 個艾歐澤亞小時變一次，也就是現實的 23 分 20 秒，分別在艾歐澤亞時間 0:00、8:00、16:00 切換。" },
        { q: "預報準確嗎？", a: "天氣由遊戲內固定的公式決定，同一時間在所有伺服器都一樣，所以可以準確預測；本站的計算與遊戲的公式一致。" },
        { q: "艾歐澤亞時間和現實時間怎麼換算？", a: "1 個艾歐澤亞小時等於現實的 175 秒，1 個艾歐澤亞日等於現實的 70 分鐘。頁面上的本地時間已經幫你換算好了。" },
        { q: "畫面上的時間是哪個時區？", a: "天氣時段的起訖時間顯示的是你裝置的本地時間，倒數則是距離該時間點還剩多久。" },
        { q: "稀有天氣一定要等嗎？", a: "天氣可以預測，所以不需要碰運氣：先用天氣篩選找到近期會出現該天氣的地圖，再前往即可。" },
      ],
    },
    en: {
      intro: "Weather Forecast applies FFXIV’s weather rules to show upcoming weather for every zone with matching local times, plus each zone’s weather odds — useful for rare weather, sightseeing, timed gathering and fishing.",
      steps: [
        "Find a zone by expansion or name.",
        "The next 8 windows are listed with local start and end times and a countdown.",
        "Use the weather filter to show only zones where that weather is coming up.",
      ],
      faq: [
        { q: "How often does weather change?", a: "Every 8 Eorzea hours — 23 minutes 20 seconds of real time — at ET 0:00, 8:00 and 16:00." },
        { q: "Is the forecast reliable?", a: "Weather comes from a fixed formula and is the same on every world, so it can be predicted exactly." },
      ],
    },
    related: [
      { view: "sightseeing", note: "探索筆記有哪些景點需要特定天氣" },
      { view: "alarm", note: "設定重置與出航提醒" },
      { view: "interactive-maps", note: "查看地區地形與座標" },
    ],
  },

  /* ───────────────────────── 互動地圖 ───────────────────────── */
  "interactive-maps": {
    zh: {
      intro:
        "互動地圖整合肥肥咖啡（FFCafe）的艾歐澤亞地圖工具，可以在網頁上縮放、拖曳地圖，並點擊標記查看地點資訊。本站目前提供 17 張地圖：拉諾西亞 6 區、黑衣森林 4 區、薩納蘭 5 區，以及摩杜納與庫爾札斯中央高地。",
      sections: [
        {
          heading: "本站提供的地圖",
          list: [
            "拉諾西亞：中拉諾西亞、拉諾西亞低地、東拉諾西亞、西拉諾西亞、拉諾西亞高地、拉諾西亞外地",
            "黑衣森林：中央林區、東部林區、南部林區、北部林區",
            "薩納蘭：西薩納蘭、中薩納蘭、東薩納蘭、南薩納蘭、北薩納蘭",
            "其他：摩杜納、庫爾札斯中央高地",
          ],
        },
        {
          heading: "怎麼讀 FF14 的地圖座標",
          paragraphs: [
            "FF14 的座標以 (X, Y) 表示：X 往東（右）增加，Y 往南（下）增加，左上角是 (1, 1)。多數地區的座標範圍是 1.0 到 42.0；蒼穹之禁城的庫爾札斯西部高地、龍堡參天高地、德拉瓦尼亞雲海與阿巴拉提亞雲海這四張地圖比例不同，座標範圍約到 44.2。聊天視窗裡貼出的座標，或藏寶圖的挖掘座標，都可以直接對照地圖上的位置。",
          ],
        },
      ],
      steps: [
        "從地區清單選擇要查看的地圖。",
        "用滑鼠滾輪縮放、按住拖曳移動地圖。",
        "點擊地圖上的標記查看詳細內容。",
      ],
      faq: [
        { q: "地圖資料是誰提供的？", a: "互動地圖工具由肥肥咖啡（FFCafe）開發，本站只是把它整合進來，詳細資料可以到他們的網站查看。" },
        { q: "可以查其他資料片的地圖嗎？", a: "目前提供 17 張地圖，包含拉諾西亞、黑衣森林、薩納蘭、摩杜納與庫爾札斯中央高地。藏寶圖各地區的完整地圖，可以在藏寶搜尋頁查看。" },
        { q: "座標要怎麼對照到地圖？", a: "座標的 X 往右增加、Y 往下增加，左上角是 (1, 1)；把座標依比例對應到地圖的寬與高，就是遊戲裡標記的位置。" },
      ],
    },
    en: {
      intro: "Interactive Maps embeds the FFCafe Eorzea map tool so you can zoom and pan each zone and inspect its markers in the browser.",
      steps: [
        "Choose a zone.",
        "Scroll to zoom and drag to move the map.",
        "Click a marker for details.",
      ],
      faq: [
        { q: "Who provides the map data?", a: "The interactive map is built by FFCafe; see their site for more." },
      ],
    },
    related: [
      { view: "treasure", note: "藏寶圖各等級的挖掘座標與完整地圖" },
      { view: "weather", note: "查詢各地圖接下來的天氣" },
      { view: "sightseeing", note: "探索筆記的景點與所需條件" },
    ],
  },

  /* ───────────────────────── 探索筆記 ───────────────────────── */
  sightseeing: {
    zh: {
      intro:
        "探索筆記（Sightseeing Log）是 FF14 的收集紀錄：每個景點（遊戲內稱「風景」）都要在指定的艾歐澤亞時間、指定的天氣下，到現場做出特定的情感動作才能記錄下來。本站探索筆記助手收錄 340 個景點，依目前的艾歐澤亞時間與天氣，標出「現在就能完成」的目標。",
      sections: [
        {
          heading: "本站收錄的景點數量",
          table: {
            head: ["資料片版本", "景點數"],
            rows: [
              ["2.0", "80"],
              ["3.0", "62"],
              ["4.0", "62"],
              ["5.0", "45"],
              ["6.0", "46"],
              ["7.0", "45"],
              ["合計", "340"],
            ],
          },
        },
        {
          heading: "完成一個景點需要的條件",
          list: [
            "地點：景點所在的地圖，以及文字提示或座標（例如 X: 16, Y: 22）。",
            "艾歐澤亞時間：部分景點限定在特定的時間區間，例如 08:00–12:00，也有跨午夜的區間，例如 18:00–05:00 表示從 18:00 到隔天 05:00。",
            "天氣：部分景點需要特定的天氣，符合條件的天氣可能不只一種。",
            "情感動作：到現場做出指定的動作，本站資料中出現過張望、祈禱、坐下、安撫、打盹、鼓勵、展示等。",
          ],
        },
        {
          heading: "怎麼使用探索筆記助手",
          paragraphs: [
            "頁面可以依資料片版本篩選景點，也可以只顯示「目前可完成」的目標；排序可以選預設編號、版本或地圖名稱。每個景點卡片會列出所在地圖、所需時間與天氣、情感動作與提示，以及目前這張地圖的天氣；完成之後點一下打勾，頂端會顯示完成進度，進度存在你的瀏覽器裡。",
          ],
        },
      ],
      steps: [
        "依資料片版本篩選景點，或勾選「僅顯示目前可完成」。",
        "每個景點都列出所在地圖、時間區間、所需天氣與情感動作。",
        "完成後點一下打勾，進度會保存在你的瀏覽器裡。",
      ],
      faq: [
        { q: "探索筆記一共有多少個景點？", a: "本站收錄 340 個：2.0 版 80 個、3.0 版 62 個、4.0 版 62 個、5.0 版 45 個、6.0 版 46 個、7.0 版 45 個。" },
        { q: "為什麼現在不能完成？", a: "時間和天氣兩個條件都要符合。可以到天氣預報頁查那張地圖下一次出現所需天氣的時間，再回來完成。" },
        { q: "「18:00–05:00」這種時間是什麼意思？", a: "這是跨午夜的艾歐澤亞時間區間，從 18:00 開始，一直到隔天 05:00 為止。" },
        { q: "艾歐澤亞時間怎麼換算？", a: "艾歐澤亞的一天等於現實的 70 分鐘，一個艾歐澤亞小時大約是現實的 2 分 55 秒（175 秒）。" },
        { q: "進度會保存嗎？", a: "會。完成的景點存在瀏覽器裡，換裝置時請用側邊欄的「匯出資料」與「匯入資料」搬移。" },
      ],
    },
    en: {
      intro: "Each Sightseeing Log vista must be visited at a set Eorzea time, in set weather, while performing a specific emote. This tool marks which vistas you can complete right now.",
      steps: [
        "Filter by expansion, or show only vistas that are available now.",
        "Each entry lists the zone, time window, weather and emote.",
        "Tick vistas as you complete them; progress is saved in your browser.",
      ],
      faq: [
        { q: "Why can’t I complete it now?", a: "Both the time and the weather must match. Check the Weather Forecast page for when that weather comes next." },
        { q: "How does Eorzea time work?", a: "One Eorzea day is 70 real minutes, so one Eorzea hour is about 2 minutes 55 seconds." },
      ],
    },
    related: [
      { view: "weather", note: "查詢景點所需天氣下一次出現的時間" },
      { view: "interactive-maps", note: "在互動地圖上查看地區" },
      { view: "alarm", note: "設定重置與出航提醒" },
    ],
  },
  /* ───────────────────────── 導覽說明 ───────────────────────── */
  guide: {
    zh: {
      intro:
        "導覽說明列出艾歐澤亞助手的 11 項工具與使用技巧，點選工具名稱可以直接前往。艾歐澤亞助手是為 FF14 繁中服玩家製作的免費、非官方工具箱，不需要登入，也不需要安裝。",
      sections: [
        {
          heading: "使用小技巧",
          list: [
            "每個工具都有自己的網址，可以直接加入瀏覽器書籤。",
            "任務進度、鬧鐘、行事曆、收藏與各工具的進度都存在瀏覽器裡；換電腦或換瀏覽器時，用側邊欄的「匯出資料」下載備份，再到新的瀏覽器「匯入資料」。",
            "第一次使用自訂鬧鐘，請先按「啟用通知」並在瀏覽器允許通知。",
            "介面語言可以在側邊欄底部切換繁體中文與英文。",
            "重置時間都以繁中服的台灣時間（GMT+8）計算，首頁的重置倒數可以一眼看出離下次重置還有多久。",
          ],
        },
      ],
      steps: [],
      faq: [
        { q: "要怎麼備份我的資料？", a: "按側邊欄的「匯出資料」，會下載一個備份檔，裡面包含任務進度、鬧鐘、行事曆、市場常用清單與各工具的進度。在新的瀏覽器按「匯入資料」選擇該檔案即可還原。" },
        { q: "本站的資料從哪裡來？", a: "遊戲內的規則與數值（天氣、藏寶圖座標、獎金表等）來自遊戲資料並經過核對；市場價格來自 Universalis；互動地圖來自肥肥咖啡（FFCafe）；官方活動來自繁中服官網的活動公告。" },
        { q: "發現資料有誤或想提出建議，可以怎麼聯絡？", a: "可以使用隱私權政策頁面最下方列出的聯絡信箱來信。" },
      ],
    },
    en: {
      intro: "The guide lists every tool on Eorzea Utility Hub with usage tips. The site is a free, unofficial toolbox for FFXIV Traditional Chinese server players; no sign-in or installation is needed.",
      steps: [],
      faq: [
        { q: "How do I back up my data?", a: "Use “Export data” in the sidebar to download a backup file and “Import data” in another browser to restore it." },
      ],
    },
    related: [
      { view: "checklist", note: "勾選每日與每週任務，並依重置時間自動清除" },
      { view: "alarm", note: "9 項內建提醒：重置、理符限額、出海垂釣、雇員探險、冒險者分隊" },
      { view: "event-calendar", note: "官方活動與團練、聚會行程" },
      { view: "tails", note: "天書奇談（庫洛天書）的連線機率" },
      { view: "market", note: "Universalis 道具價格與常用清單" },
      { view: "treasure", note: "G8 至 G18 藏寶圖的挖掘座標" },
      { view: "cactpot", note: "仙人微彩每條線的期望值與獎金表" },
      { view: "chocobo", note: "陸行鳥染色的果實種類、數量與順序" },
      { view: "weather", note: "各地圖接下來的天氣與稀有天氣篩選" },
      { view: "interactive-maps", note: "17 張可縮放的艾歐澤亞地圖" },
      { view: "sightseeing", note: "探索筆記現在能完成的景點" },
    ],
  },

  /* ───────────────────────── 好用連結 ───────────────────────── */
  links: {
    zh: {
      intro:
        "好用連結整理 FF14 玩家常用的網站，分成繁中服官方、幻化影片、高難度副本攻略（中文與日文）、收集、劇情、幻化圖文、房屋裝潢、資料庫、製作與釣魚工具、圖片等類別，下方依類別列出所有連結。",
      steps: [],
      faq: [
        { q: "這些網站是官方的嗎？和本站有關係嗎？", a: "除了「繁中服官方」類別之外，其他網站都是玩家或社群經營的第三方網站，與本站無關，內容請以各網站自己的說明為準。連結會在新的分頁開啟。" },
        { q: "為什麼有些網站是簡體中文、日文或英文？", a: "不少品質很好的攻略、資料庫與幻化資源來自中國大陸、日本與歐美的社群，連結標題都已經標註語言或用途，方便你挑選。" },
      ],
    },
    en: {
      intro: "Useful Links collects the sites FFXIV players use most — official TC pages, glamour videos, savage guides, housing references, databases and crafting tools — grouped by category.",
      steps: [],
      faq: [],
    },
    related: [
      { view: "guide", note: "11 項工具的使用說明" },
      { view: "market", note: "查詢道具價格" },
    ],
  },

  /* ───────────────────────── 更新日誌 ───────────────────────── */
  changelog: {
    zh: {
      intro:
        "更新日誌依版本由新到舊，記錄艾歐澤亞助手新增的工具、功能調整、資料修正與介面改善，每個版本都標示更新日期。目前使用的版本號顯示在側邊欄左上角的網站名稱下方。",
      steps: [],
      faq: [
        { q: "怎麼知道網站已經更新到新版？", a: "側邊欄左上角網站名稱下方顯示目前的版本號。如果畫面看起來還是舊版，重新整理頁面（Ctrl＋Shift＋R）即可載入最新內容。" },
      ],
    },
    en: {
      intro: "The changelog lists new tools, feature changes, data fixes and interface improvements for every version of Eorzea Utility Hub, newest first.",
      steps: [],
      faq: [],
    },
    related: [
      { view: "guide", note: "各項工具的使用說明" },
    ],
  },
};
