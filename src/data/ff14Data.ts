export interface WeatherRate {
  rate: number;
  name: string;
}

export interface MapData {
  id: string;
  name: string;
  rates: WeatherRate[];
  version: string;
  region?: string;
}

export const MAPS: MapData[] = [
  {
    id: "limsa-lominsa",
    name: "利姆薩·羅敏薩",
    version: "2.0",
    region: "la-noscea",
    rates: [
      { rate: 20, name: "Clouds" },
      { rate: 50, name: "Clear Skies" },
      { rate: 80, name: "Fair Skies" },
      { rate: 90, name: "Fog" },
      { rate: 100, name: "Rain" }
    ]
  },
  {
    id: "middle-la-noscea",
    name: "中拉諾西亞",
    version: "2.0",
    region: "la-noscea",
    rates: [
      { rate: 20, name: "Clouds" },
      { rate: 50, name: "Clear Skies" },
      { rate: 70, name: "Fair Skies" },
      { rate: 80, name: "Wind" },
      { rate: 90, name: "Fog" },
      { rate: 100, name: "Rain" }
    ]
  },
  {
    id: "lower-la-noscea",
    name: "拉諾西亞低地",
    version: "2.0",
    region: "la-noscea",
    rates: [
      { rate: 20, name: "Clouds" },
      { rate: 50, name: "Clear Skies" },
      { rate: 70, name: "Fair Skies" },
      { rate: 80, name: "Wind" },
      { rate: 90, name: "Fog" },
      { rate: 100, name: "Rain" }
    ]
  },
  {
    id: "eastern-la-noscea",
    name: "東拉諾西亞",
    version: "2.0",
    region: "la-noscea",
    rates: [
      { rate: 5, name: "Fog" },
      { rate: 50, name: "Clear Skies" },
      { rate: 80, name: "Fair Skies" },
      { rate: 90, name: "Clouds" },
      { rate: 95, name: "Rain" },
      { rate: 100, name: "Showers" }
    ]
  },
  {
    id: "western-la-noscea",
    name: "西拉諾西亞",
    version: "2.0",
    region: "la-noscea",
    rates: [
      { rate: 10, name: "Fog" },
      { rate: 40, name: "Clear Skies" },
      { rate: 60, name: "Fair Skies" },
      { rate: 80, name: "Clouds" },
      { rate: 90, name: "Wind" },
      { rate: 100, name: "Rain" }
    ]
  },
  {
    id: "upper-la-noscea",
    name: "拉諾西亞高地",
    version: "2.0",
    region: "la-noscea",
    rates: [
      { rate: 30, name: "Clear Skies" },
      { rate: 50, name: "Fair Skies" },
      { rate: 70, name: "Clouds" },
      { rate: 80, name: "Fog" },
      { rate: 90, name: "Thunder" },
      { rate: 100, name: "Thunderstorms" }
    ]
  },
  {
    id: "outer-la-noscea",
    name: "拉諾西亞外地",
    version: "2.0",
    region: "la-noscea",
    rates: [
      { rate: 30, name: "Clear Skies" },
      { rate: 50, name: "Fair Skies" },
      { rate: 70, name: "Clouds" },
      { rate: 85, name: "Fog" },
      { rate: 100, name: "Rain" }
    ]
  },
  {
    id: "gridania",
    name: "格里達尼亞",
    version: "2.0",
    region: "shroud",
    rates: [
      { rate: 5, name: "Rain" },
      { rate: 20, name: "Fog" },
      { rate: 30, name: "Clouds" },
      { rate: 40, name: "Fair Skies" },
      { rate: 55, name: "Clear Skies" },
      { rate: 85, name: "Fair Skies" },
      { rate: 100, name: "Clear Skies" }
    ]
  },
  {
    id: "central-shroud",
    name: "黑衣森林中央林區",
    version: "2.0",
    region: "shroud",
    rates: [
      { rate: 5, name: "Thunder" },
      { rate: 20, name: "Rain" },
      { rate: 30, name: "Fog" },
      { rate: 40, name: "Clouds" },
      { rate: 55, name: "Fair Skies" },
      { rate: 85, name: "Clear Skies" },
      { rate: 100, name: "Fair Skies" }
    ]
  },
  {
    id: "east-shroud",
    name: "黑衣森林東部林區",
    version: "2.0",
    region: "shroud",
    rates: [
      { rate: 5, name: "Thunder" },
      { rate: 20, name: "Rain" },
      { rate: 30, name: "Fog" },
      { rate: 40, name: "Clouds" },
      { rate: 55, name: "Fair Skies" },
      { rate: 85, name: "Clear Skies" },
      { rate: 100, name: "Fair Skies" }
    ]
  },
  {
    id: "south-shroud",
    name: "黑衣森林南部林區",
    version: "2.0",
    region: "shroud",
    rates: [
      { rate: 5, name: "Fog" },
      { rate: 10, name: "Thunderstorms" },
      { rate: 15, name: "Thunder" },
      { rate: 30, name: "Fog" },
      { rate: 40, name: "Clouds" },
      { rate: 55, name: "Fair Skies" },
      { rate: 85, name: "Clear Skies" },
      { rate: 100, name: "Fair Skies" }
    ]
  },
  {
    id: "north-shroud",
    name: "黑衣森林北部林區",
    version: "2.0",
    region: "shroud",
    rates: [
      { rate: 5, name: "Fog" },
      { rate: 10, name: "Rain" },
      { rate: 30, name: "Fog" },
      { rate: 40, name: "Clouds" },
      { rate: 55, name: "Fair Skies" },
      { rate: 85, name: "Clear Skies" },
      { rate: 100, name: "Fair Skies" }
    ]
  },
  {
    id: "uldah",
    name: "烏爾達哈",
    version: "2.0",
    region: "thanalan",
    rates: [
      { rate: 40, name: "Clear Skies" },
      { rate: 60, name: "Fair Skies" },
      { rate: 85, name: "Clouds" },
      { rate: 95, name: "Fog" },
      { rate: 100, name: "Dust Storms" }
    ]
  },
  {
    id: "central-thanalan",
    name: "中薩納蘭",
    version: "2.0",
    region: "thanalan",
    rates: [
      { rate: 15, name: "Dust Storms" },
      { rate: 55, name: "Clear Skies" },
      { rate: 75, name: "Fair Skies" },
      { rate: 85, name: "Clouds" },
      { rate: 100, name: "Fog" }
    ]
  },
  {
    id: "western-thanalan",
    name: "西薩納蘭",
    version: "2.0",
    region: "thanalan",
    rates: [
      { rate: 10, name: "Fog" },
      { rate: 40, name: "Clear Skies" },
      { rate: 60, name: "Fair Skies" },
      { rate: 80, name: "Clouds" },
      { rate: 100, name: "Dust Storms" }
    ]
  },
  {
    id: "eastern-thanalan",
    name: "東薩納蘭",
    version: "2.0",
    region: "thanalan",
    rates: [
      { rate: 5, name: "Fog" },
      { rate: 40, name: "Clear Skies" },
      { rate: 60, name: "Fair Skies" },
      { rate: 70, name: "Clouds" },
      { rate: 80, name: "Rain" },
      { rate: 100, name: "Showers" }
    ]
  },
  {
    id: "southern-thanalan",
    name: "南薩納蘭",
    version: "2.0",
    region: "thanalan",
    rates: [
      { rate: 20, name: "Heat Waves" },
      { rate: 60, name: "Clear Skies" },
      { rate: 80, name: "Fair Skies" },
      { rate: 90, name: "Clouds" },
      { rate: 100, name: "Fog" }
    ]
  },
  {
    id: "northern-thanalan",
    name: "北薩納蘭",
    version: "2.0",
    region: "thanalan",
    rates: [
      { rate: 5, name: "Clear Skies" },
      { rate: 20, name: "Fair Skies" },
      { rate: 50, name: "Clouds" },
      { rate: 100, name: "Fog" }
    ]
  },
  {
    id: "mor-dhona",
    name: "摩杜納",
    version: "2.0",
    region: "mor-dhona",
    rates: [
      { rate: 15, name: "Clouds" },
      { rate: 30, name: "Fog" },
      { rate: 60, name: "Gloom" },
      { rate: 75, name: "Clear Skies" },
      { rate: 100, name: "Fair Skies" }
    ]
  },
  {
    id: "coerthas-central",
    name: "庫爾札斯中央高地",
    version: "2.0",
    region: "coerthas",
    rates: [
      { rate: 20, name: "Clear Skies" },
      { rate: 60, name: "Fair Skies" },
      { rate: 70, name: "Clouds" },
      { rate: 80, name: "Fog" },
      { rate: 90, name: "Snow" },
      { rate: 100, name: "Blizzards" }
    ]
  },
  {
    id: "ishgard",
    name: "伊修加德",
    version: "3.0",
    region: "coerthas",
    rates: [
      { rate: 60, name: "Snow" },
      { rate: 70, name: "Fair Skies" },
      { rate: 75, name: "Clear Skies" },
      { rate: 90, name: "Clouds" },
      { rate: 100, name: "Fog" }
    ]
  },
  {
    id: "western_highlands",
    name: "庫爾札斯西部高地",
    version: "3.0",
    region: "coerthas",
    rates: [
      { rate: 20, name: "Snow" },
      { rate: 60, name: "Blizzards" },
      { rate: 70, name: "Clear Skies" },
      { rate: 80, name: "Fair Skies" },
      { rate: 90, name: "Clouds" },
      { rate: 100, name: "Fog" }
    ]
  },
  {
    id: "dravanian_forelands",
    name: "龍堡參天高地",
    version: "3.0",
    region: "dravania",
    rates: [
      { rate: 10, name: "Clouds" },
      { rate: 20, name: "Fog" },
      { rate: 30, name: "Thunder" },
      { rate: 40, name: "Dust Storms" },
      { rate: 70, name: "Clear Skies" },
      { rate: 100, name: "Fair Skies" }
    ]
  },
  {
    id: "churning_mists",
    name: "翻雲霧海",
    version: "3.0",
    region: "dravania",
    rates: [
      { rate: 10, name: "Clouds" },
      { rate: 20, name: "Gales" },
      { rate: 40, name: "Umbral Static" },
      { rate: 70, name: "Clear Skies" },
      { rate: 100, name: "Fair Skies" }
    ]
  },
  {
    id: "sea_of_clouds",
    name: "阿巴拉提亞雲海",
    version: "3.0",
    region: "abalathia",
    rates: [
      { rate: 30, name: "Clear Skies" },
      { rate: 60, name: "Fair Skies" },
      { rate: 70, name: "Clouds" },
      { rate: 80, name: "Fog" },
      { rate: 90, name: "Wind" },
      { rate: 100, name: "Gales" }
    ]
  },
  {
    id: "dravanian_hinterlands",
    name: "龍堡內陸低地",
    version: "3.0",
    region: "dravania",
    rates: [
      { rate: 10, name: "Clouds" },
      { rate: 20, name: "Fog" },
      { rate: 30, name: "Rain" },
      { rate: 40, name: "Showers" },
      { rate: 70, name: "Clear Skies" },
      { rate: 100, name: "Fair Skies" }
    ]
  },
  {
    id: "azys_lla",
    name: "魔大陸阿濟茲拉",
    version: "3.0",
    region: "abalathia",
    rates: [
      { rate: 35, name: "Fair Skies" },
      { rate: 70, name: "Clouds" },
      { rate: 100, name: "Thunder" }
    ]
  },
  // 4.0 Gyr Abania
  {
    id: "rhalgrs-reach",
    name: "神拳痕",
    version: "4.0",
    region: "gyr-abania",
    rates: [
      { rate: 15, name: "Clear Skies" },
      { rate: 60, name: "Fair Skies" },
      { rate: 80, name: "Clouds" },
      { rate: 90, name: "Fog" },
      { rate: 100, name: "Thunder" }
    ]
  },
  {
    id: "fringes",
    name: "基拉巴尼亞邊區",
    version: "4.0",
    region: "gyr-abania",
    rates: [
      { rate: 15, name: "Clear Skies" },
      { rate: 60, name: "Fair Skies" },
      { rate: 80, name: "Clouds" },
      { rate: 90, name: "Fog" },
      { rate: 100, name: "Thunder" }
    ]
  },
  {
    id: "peaks",
    name: "基拉巴尼亞山區",
    version: "4.0",
    region: "gyr-abania",
    rates: [
      { rate: 10, name: "Clear Skies" },
      { rate: 60, name: "Fair Skies" },
      { rate: 75, name: "Clouds" },
      { rate: 85, name: "Fog" },
      { rate: 95, name: "Wind" },
      { rate: 100, name: "Dust Storms" }
    ]
  },
  {
    id: "lochs",
    name: "基拉巴尼亞湖區",
    version: "4.0",
    region: "gyr-abania",
    rates: [
      { rate: 20, name: "Clear Skies" },
      { rate: 60, name: "Fair Skies" },
      { rate: 80, name: "Clouds" },
      { rate: 90, name: "Fog" },
      { rate: 100, name: "Thunderstorms" }
    ]
  },
  // 4.0 Othard
  {
    id: "kugane",
    name: "神拳流國際港都",
    version: "4.0",
    region: "othard",
    rates: [
      { rate: 10, name: "Rain" },
      { rate: 20, name: "Fog" },
      { rate: 40, name: "Clouds" },
      { rate: 80, name: "Fair Skies" },
      { rate: 100, name: "Clear Skies" }
    ]
  },
  {
    id: "ruby-sea",
    name: "紅玉海",
    version: "4.0",
    region: "othard",
    rates: [
      { rate: 10, name: "Thunder" },
      { rate: 20, name: "Wind" },
      { rate: 35, name: "Clouds" },
      { rate: 75, name: "Fair Skies" },
      { rate: 100, name: "Clear Skies" }
    ]
  },
  {
    id: "yanxia",
    name: "延夏",
    version: "4.0",
    region: "othard",
    rates: [
      { rate: 5, name: "Showers" },
      { rate: 15, name: "Rain" },
      { rate: 25, name: "Fog" },
      { rate: 40, name: "Clouds" },
      { rate: 80, name: "Fair Skies" },
      { rate: 100, name: "Clear Skies" }
    ]
  },
  {
    id: "azim-steppe",
    name: "太陽神草原",
    version: "4.0",
    region: "othard",
    rates: [
      { rate: 5, name: "Gales" },
      { rate: 10, name: "Wind" },
      { rate: 17, name: "Rain" },
      { rate: 25, name: "Fog" },
      { rate: 35, name: "Clouds" },
      { rate: 75, name: "Fair Skies" },
      { rate: 100, name: "Clear Skies" }
    ]
  },
  {
    id: "shirogane",
    name: "白銀鄉",
    version: "4.0",
    region: "othard",
    rates: [
      { rate: 10, name: "Rain" },
      { rate: 20, name: "Fog" },
      { rate: 40, name: "Clouds" },
      { rate: 80, name: "Fair Skies" },
      { rate: 100, name: "Clear Skies" }
    ]
  },
  // 5.0 Norvrandt
  {
    id: "crystarium",
    name: "水晶都",
    version: "5.0",
    region: "norvrandt",
    rates: [
      { rate: 20, name: "Clear Skies" },
      { rate: 60, name: "Fair Skies" },
      { rate: 75, name: "Clouds" },
      { rate: 85, name: "Fog" },
      { rate: 95, name: "Rain" },
      { rate: 100, name: "Thunderstorms" }
    ]
  },
  {
    id: "lakeland",
    name: "雷克蘭德",
    version: "5.0",
    region: "norvrandt",
    rates: [
      { rate: 20, name: "Clear Skies" },
      { rate: 60, name: "Fair Skies" },
      { rate: 75, name: "Clouds" },
      { rate: 85, name: "Fog" },
      { rate: 95, name: "Rain" },
      { rate: 100, name: "Thunderstorms" }
    ]
  },
  {
    id: "kholusia",
    name: "珂露西亞島",
    version: "5.0",
    region: "norvrandt",
    rates: [
      { rate: 15, name: "Clear Skies" },
      { rate: 55, name: "Fair Skies" },
      { rate: 70, name: "Clouds" },
      { rate: 80, name: "Fog" },
      { rate: 90, name: "Rain" },
      { rate: 100, name: "Thunderstorms" }
    ]
  },
  {
    id: "amh-araeng",
    name: "安穆·艾蘭",
    version: "5.0",
    region: "norvrandt",
    rates: [
      { rate: 45, name: "Fair Skies" },
      { rate: 60, name: "Clouds" },
      { rate: 70, name: "Dust Storms" },
      { rate: 80, name: "Heat Waves" },
      { rate: 100, name: "Clear Skies" }
    ]
  },
  {
    id: "il-mheg",
    name: "伊爾美格",
    version: "5.0",
    region: "norvrandt",
    rates: [
      { rate: 10, name: "Clear Skies" },
      { rate: 45, name: "Fair Skies" },
      { rate: 60, name: "Clouds" },
      { rate: 75, name: "Fog" },
      { rate: 90, name: "Rain" },
      { rate: 100, name: "Thunderstorms" }
    ]
  },
  {
    id: "rak-tika",
    name: "拉凱提卡大森林",
    version: "5.0",
    region: "norvrandt",
    rates: [
      { rate: 10, name: "Fog" },
      { rate: 20, name: "Rain" },
      { rate: 30, name: "Umbral Wind" },
      { rate: 45, name: "Clear Skies" },
      { rate: 85, name: "Fair Skies" },
      { rate: 100, name: "Clouds" }
    ]
  },
  {
    id: "tempest",
    name: "黑風海",
    version: "5.0",
    region: "norvrandt",
    rates: [
      { rate: 20, name: "Clear Skies" },
      { rate: 80, name: "Fair Skies" },
      { rate: 100, name: "Clouds" }
    ]
  },
  {
    id: "eulmore",
    name: "遊末邦",
    version: "5.0",
    region: "norvrandt",
    rates: [
      { rate: 10, name: "Gales" },
      { rate: 20, name: "Rain" },
      { rate: 30, name: "Fog" },
      { rate: 45, name: "Clouds" },
      { rate: 85, name: "Fair Skies" },
      { rate: 100, name: "Clear Skies" }
    ]
  },
  // 6.0 Ilsabard
  {
    id: "radz-at-han",
    name: "拉札罕",
    version: "6.0",
    region: "ilsabard",
    rates: [
      { rate: 15, name: "Fog" },
      { rate: 25, name: "Rain" },
      { rate: 55, name: "Clear Skies" },
      { rate: 85, name: "Fair Skies" },
      { rate: 100, name: "Clouds" }
    ]
  },
  {
    id: "thavnair",
    name: "薩維奈島",
    version: "6.0",
    region: "ilsabard",
    rates: [
      { rate: 10, name: "Fog" },
      { rate: 17, name: "Rain" },
      { rate: 25, name: "Showers" },
      { rate: 55, name: "Clear Skies" },
      { rate: 85, name: "Fair Skies" },
      { rate: 100, name: "Clouds" }
    ]
  },
  {
    id: "garlemald",
    name: "加雷馬",
    version: "6.0",
    region: "ilsabard",
    rates: [
      { rate: 45, name: "Snow" },
      { rate: 50, name: "Thunder" },
      { rate: 55, name: "Rain" },
      { rate: 60, name: "Fog" },
      { rate: 70, name: "Clouds" },
      { rate: 80, name: "Fair Skies" },
      { rate: 100, name: "Clear Skies" }
    ]
  },
  // 6.0 The Sea of Stars
  {
    id: "old-sharlayan",
    name: "舊薩雷安",
    version: "6.0",
    region: "the-sea-of-stars",
    rates: [
      { rate: 10, name: "Clear Skies" },
      { rate: 50, name: "Fair Skies" },
      { rate: 70, name: "Clouds" },
      { rate: 85, name: "Fog" },
      { rate: 100, name: "Rain" }
    ]
  },
  {
    id: "labyrinthos",
    name: "迷津",
    version: "6.0",
    region: "the-sea-of-stars",
    rates: [
      { rate: 15, name: "Clear Skies" },
      { rate: 60, name: "Fair Skies" },
      { rate: 100, name: "Clouds" }
    ]
  },
  {
    id: "mare-lamentorum",
    name: "嘆息海",
    version: "6.0",
    region: "the-sea-of-stars",
    rates: [
      { rate: 50, name: "Moon Dust" },
      { rate: 90, name: "Fair Skies" },
      { rate: 100, name: "Umbral Wind" }
    ]
  },
  {
    id: "ultima-thule",
    name: "天外天垓",
    version: "6.0",
    region: "the-sea-of-stars",
    rates: [
      { rate: 20, name: "Astromagnetic Storm" },
      { rate: 55, name: "Fair Skies" },
      { rate: 100, name: "Umbral Wind" }
    ]
  },
  // 6.0 The World Unsundered
  {
    id: "elpis",
    name: "艾爾庇斯",
    version: "6.0",
    region: "the-world-unsundered",
    rates: [
      { rate: 25, name: "Clear Skies" },
      { rate: 70, name: "Fair Skies" },
      { rate: 80, name: "Clouds" },
      { rate: 90, name: "Fog" },
      { rate: 100, name: "Umbral Wind" }
    ]
  },
  // 7.0 Tural
  {
    id: "tuliyollal",
    name: "圖莉尤拉爾",
    version: "7.0",
    region: "tural",
    rates: [
      { rate: 5, name: "Clouds" },
      { rate: 15, name: "Rain" },
      { rate: 25, name: "Fog" },
      { rate: 60, name: "Fair Skies" },
      { rate: 100, name: "Clear Skies" }
    ]
  },
  {
    id: "solution-nine",
    name: "九號解決方案",
    version: "7.0",
    region: "tural",
    rates: [
      { rate: 50, name: "Fair Skies" },
      { rate: 80, name: "Clouds" },
      { rate: 100, name: "Rain" }
    ]
  },
  {
    id: "urqopacha",
    name: "奧爾卡帕查",
    version: "7.0",
    region: "tural",
    rates: [
      { rate: 20, name: "Clear Skies" },
      { rate: 60, name: "Fair Skies" },
      { rate: 80, name: "Clouds" },
      { rate: 90, name: "Fog" },
      { rate: 100, name: "Rain" }
    ]
  },
  {
    id: "kozamauka",
    name: "科薩馬爾卡",
    version: "7.0",
    region: "tural",
    rates: [
      { rate: 15, name: "Rain" },
      { rate: 25, name: "Showers" },
      { rate: 35, name: "Fog" },
      { rate: 50, name: "Clouds" },
      { rate: 80, name: "Fair Skies" },
      { rate: 100, name: "Clear Skies" }
    ]
  },
  {
    id: "yak-tel",
    name: "雅克·特爾",
    version: "7.0",
    region: "tural",
    rates: [
      { rate: 20, name: "Rain" },
      { rate: 35, name: "Fog" },
      { rate: 50, name: "Clouds" },
      { rate: 80, name: "Fair Skies" },
      { rate: 100, name: "Clear Skies" }
    ]
  },
  {
    id: "shaaloani",
    name: "夏勞尼",
    version: "7.0",
    region: "tural",
    rates: [
      { rate: 10, name: "Dust Storms" },
      { rate: 50, name: "Clear Skies" },
      { rate: 80, name: "Fair Skies" },
      { rate: 100, name: "Clouds" }
    ]
  },
  {
    id: "heritage-found",
    name: "發現遺產",
    version: "7.0",
    region: "tural",
    rates: [
      { rate: 5, name: "Thunderstorms" },
      { rate: 15, name: "Rain" },
      { rate: 25, name: "Fog" },
      { rate: 45, name: "Clouds" },
      { rate: 80, name: "Fair Skies" },
      { rate: 100, name: "Clear Skies" }
    ]
  },
  {
    id: "living-memory",
    name: "活著的記憶",
    version: "7.0",
    region: "tural",
    rates: [
      { rate: 10, name: "Rain" },
      { rate: 20, name: "Fog" },
      { rate: 60, name: "Fair Skies" },
      { rate: 100, name: "Clear Skies" }
    ]
  },
  // Special / Miscellaneous
  {
    id: "wolves-den-pier",
    name: "狼獄演習場",
    version: "2.0",
    region: "la-noscea",
    rates: [
      { rate: 20, name: "Clear Skies" },
      { rate: 50, name: "Fair Skies" },
      { rate: 70, name: "Clouds" },
      { rate: 80, name: "Fog" },
      { rate: 90, name: "Wind" },
      { rate: 100, name: "Rain" }
    ]
  },
  {
    id: "eureka-anemos",
    name: "常風之地",
    version: "4.0",
    region: "othard",
    rates: [
      { rate: 30, name: "Fair Skies" },
      { rate: 60, name: "Gales" },
      { rate: 90, name: "Showers" },
      { rate: 100, name: "Snow" }
    ]
  },
  {
    id: "eureka-pagos",
    name: "恆冰之地",
    version: "4.0",
    region: "othard",
    rates: [
      { rate: 10, name: "Clear Skies" },
      { rate: 28, name: "Fog" },
      { rate: 46, name: "Heat Waves" },
      { rate: 64, name: "Snow" },
      { rate: 82, name: "Thunder" },
      { rate: 100, name: "Blizzards" }
    ]
  },
  {
    id: "eureka-pyros",
    name: "涌火之地",
    version: "4.0",
    region: "othard",
    rates: [
      { rate: 10, name: "Fair Skies" },
      { rate: 28, name: "Heat Waves" },
      { rate: 46, name: "Thunder" },
      { rate: 64, name: "Blizzards" },
      { rate: 82, name: "Umbral Wind" },
      { rate: 100, name: "Snow" }
    ]
  },
  {
    id: "eureka-hydatos",
    name: "湧水之地",
    version: "4.0",
    region: "othard",
    rates: [
      { rate: 12, name: "Fair Skies" },
      { rate: 34, name: "Showers" },
      { rate: 56, name: "Gloom" },
      { rate: 78, name: "Thunderstorms" },
      { rate: 100, name: "Snow" }
    ]
  },
  {
    id: "bozjan-southern-front",
    name: "博茲雅戰線南方戰區",
    version: "5.0",
    region: "ilsabard",
    rates: [
      { rate: 20, name: "Fair Skies" },
      { rate: 40, name: "Rain" },
      { rate: 60, name: "Wind" },
      { rate: 80, name: "Thunder" },
      { rate: 100, name: "Dust Storms" }
    ]
  },
  {
    id: "zadnor",
    name: "扎杜諾爾高原",
    version: "5.0",
    region: "ilsabard",
    rates: [
      { rate: 15, name: "Fair Skies" },
      { rate: 30, name: "Rain" },
      { rate: 50, name: "Wind" },
      { rate: 70, name: "Thunder" },
      { rate: 85, name: "Snow" },
      { rate: 100, name: "Gales" }
    ]
  },
  {
    id: "diadem",
    name: "雲冠群島",
    version: "3.0",
    region: "abalathia",
    rates: [
      { rate: 20, name: "Clear Skies" },
      { rate: 50, name: "Fair Skies" },
      { rate: 70, name: "Clouds" },
      { rate: 80, name: "Fog" },
      { rate: 90, name: "Wind" },
      { rate: 100, name: "Umbral Wind" }
    ]
  }
];

export interface SightseeingGoal {
  id: string;
  name: string;
  map: string;
  time: string; // e.g. "08:00-12:00"
  weather: string[];
  emote: string;
  hint: string;
  version?: string;
}

export const SIGHTSEEING_LOGS: SightseeingGoal[] = [
  // 2.0
  { id: "2.0-001", name: "利姆薩·羅敏薩 001", map: "利姆薩·羅敏薩", time: "08:00-12:00", weather: ["Clear Skies", "Fair Skies"], emote: "/lookout", hint: "在利姆薩·羅敏薩上層甲板的某處...", version: "2.0" },
  { id: "2.0-002", name: "利姆薩·羅敏薩 002", map: "利姆薩·羅敏薩", time: "18:00-05:00", weather: ["Clear Skies", "Fair Skies"], emote: "/lookout", hint: "在利姆薩·羅敏薩下層甲板...", version: "2.0" },
  { id: "2.0-003", name: "中拉諾西亞 003", map: "中拉諾西亞", time: "05:00-08:00", weather: ["Rain"], emote: "/pray", hint: "中拉諾西亞 (X: 20, Y: 19)", version: "2.0" },
  { id: "2.0-004", name: "中拉諾西亞 004", map: "中拉諾西亞", time: "12:00-17:00", weather: ["Fair Skies", "Clear Skies"], emote: "/lookout", hint: "中拉諾西亞 (X: 16, Y: 17)", version: "2.0" },
  { id: "2.0-005", name: "拉諾西亞低地 005", map: "拉諾西亞低地", time: "08:00-12:00", weather: ["Clouds"], emote: "/lookout", hint: "拉諾西亞低地 (X: 25, Y: 27)", version: "2.0" },
  { id: "2.0-006", name: "拉諾西亞低地 006", map: "拉諾西亞低地", time: "18:00-05:00", weather: ["Fair Skies", "Clear Skies"], emote: "/lookout", hint: "拉諾西亞低地 (X: 23, Y: 40)", version: "2.0" },
  { id: "2.0-007", name: "拉諾西亞低地 007", map: "拉諾西亞低地", time: "05:00-08:00", weather: ["Fog"], emote: "/lookout", hint: "拉諾西亞低地 (X: 33, Y: 19)", version: "2.0" },
  { id: "2.0-008", name: "西拉諾西亞 008", map: "西拉諾西亞", time: "05:00-08:00", weather: ["Fair Skies", "Clear Skies"], emote: "/lookout", hint: "西拉諾西亞 (X: 29, Y: 30)", version: "2.0" },
  { id: "2.0-009", name: "西拉諾西亞 009", map: "西拉諾西亞", time: "12:00-17:00", weather: ["Clouds"], emote: "/lookout", hint: "西拉諾西亞 (X: 19, Y: 23)", version: "2.0" },
  { id: "2.0-010", name: "西拉諾西亞 010", map: "西拉諾西亞", time: "18:00-05:00", weather: ["Clear Skies"], emote: "/lookout", hint: "西拉諾西亞 (X: 13, Y: 13)", version: "2.0" },
  { id: "2.0-011", name: "格里達尼亞 011", map: "格里達尼亞", time: "12:00-17:00", weather: ["Fair Skies", "Clear Skies"], emote: "/sit", hint: "格里達尼亞 (X: 14, Y: 14)", version: "2.0" },
  { id: "2.0-012", name: "格里達尼亞 012", map: "格里達尼亞", time: "08:00-12:00", weather: ["Fair Skies", "Clear Skies"], emote: "/pray", hint: "格里達尼亞 (X: 11, Y: 14)", version: "2.0" },
  { id: "2.0-013", name: "黑衣森林中央林區 013", map: "黑衣森林中央林區", time: "18:00-05:00", weather: ["Clear Skies"], emote: "/lookout", hint: "黑衣森林中央林區 (X: 22, Y: 26)", version: "2.0" },
  { id: "2.0-014", name: "黑衣森林中央林區 014", map: "黑衣森林中央林區", time: "05:00-08:00", weather: ["Fair Skies", "Clear Skies"], emote: "/lookout", hint: "黑衣森林中央林區 (X: 23, Y: 30)", version: "2.0" },
  { id: "2.0-015", name: "黑衣森林東部林區 015", map: "黑衣森林東部林區", time: "12:00-17:00", weather: ["Clouds"], emote: "/lookout", hint: "黑衣森林東部林區 (X: 18, Y: 21)", version: "2.0" },
  { id: "2.0-016", name: "黑衣森林東部林區 016", map: "黑衣森林東部林區", time: "18:00-05:00", weather: ["Fair Skies", "Clear Skies"], emote: "/lookout", hint: "黑衣森林東部林區 (X: 22, Y: 26)", version: "2.0" },
  { id: "2.0-017", name: "黑衣森林中央林區 017", map: "黑衣森林中央林區", time: "08:00-12:00", weather: ["Fog"], emote: "/lookout", hint: "黑衣森林中央林區 (X: 18, Y: 18)", version: "2.0" },
  { id: "2.0-018", name: "黑衣森林東部林區 018", map: "黑衣森林東部林區", time: "05:00-08:00", weather: ["Rain"], emote: "/comfort", hint: "黑衣森林東部林區 (X: 19, Y: 24)", version: "2.0" },
  { id: "2.0-019", name: "黑衣森林東部林區 019", map: "黑衣森林東部林區", time: "08:00-12:00", weather: ["Clouds"], emote: "/lookout", hint: "黑衣森林東部林區 (X: 14, Y: 14)", version: "2.0" },
  { id: "2.0-020", name: "黑衣森林東部林區 020", map: "黑衣森林東部林區", time: "05:00-08:00", weather: ["Fair Skies", "Clear Skies"], emote: "/pray", hint: "黑衣森林東部林區 (X: 21, Y: 25)", version: "2.0" },
  { id: "2.0-021", name: "中拉諾西亞 021", map: "中拉諾西亞", time: "12:00-17:00", weather: ["Fair Skies", "Clear Skies"], emote: "/lookout", hint: "中拉諾西亞 (X: 20, Y: 13)", version: "2.0" },
  { id: "2.0-022", name: "中拉諾西亞 022", map: "中拉諾西亞", time: "05:00-08:00", weather: ["Clear Skies"], emote: "/lookout", hint: "中拉諾西亞 (X: 25, Y: 17)", version: "2.0" },
  { id: "2.0-023", name: "拉諾西亞低地 023", map: "拉諾西亞低地", time: "12:00-17:00", weather: ["Rain"], emote: "/lookout", hint: "拉諾西亞低地 (X: 31, Y: 12)", version: "2.0" },
  { id: "2.0-024", name: "拉諾西亞低地 024", map: "拉諾西亞低地", time: "08:00-12:00", weather: ["Fair Skies", "Clear Skies"], emote: "/sit", hint: "拉諾西亞低地 (X: 32, Y: 22)", version: "2.0" },
  { id: "2.0-025", name: "拉諾西亞低地 025", map: "拉諾西亞低地", time: "18:00-05:00", weather: ["Rain"], emote: "/lookout", hint: "拉諾西亞低地 (X: 29, Y: 33)", version: "2.0" },
  { id: "2.0-026", name: "西拉諾西亞 026", map: "西拉諾西亞", time: "17:00-18:00", weather: ["Fair Skies", "Clear Skies"], emote: "/lookout", hint: "西拉諾西亞 (X: 26, Y: 26)", version: "2.0" },
  { id: "2.0-027", name: "西拉諾西亞 027", map: "西拉諾西亞", time: "18:00-05:00", weather: ["Fair Skies", "Clear Skies"], emote: "/lookout", hint: "西拉諾西亞 (X: 17, Y: 36)", version: "2.0" },
  { id: "2.0-028", name: "西拉諾西亞 028", map: "西拉諾西亞", time: "08:00-12:00", weather: ["Fair Skies", "Clear Skies"], emote: "/lookout", hint: "西拉諾西亞 (X: 22, Y: 22)", version: "2.0" },
  { id: "2.0-029", name: "西拉諾西亞 029", map: "西拉諾西亞", time: "12:00-17:00", weather: ["Fair Skies", "Clear Skies"], emote: "/lookout", hint: "西拉諾西亞 (X: 19, Y: 23)", version: "2.0" },
  { id: "2.0-030", name: "西拉諾西亞 030", map: "西拉諾西亞", time: "17:00-18:00", weather: ["Fair Skies", "Clear Skies"], emote: "/lookout", hint: "西拉諾西亞 (X: 30, Y: 30)", version: "2.0" },
  { id: "2.0-031", name: "拉諾西亞高地 031", map: "拉諾西亞高地", time: "12:00-17:00", weather: ["Clear Skies"], emote: "/lookout", hint: "拉諾西亞高地 (X: 12, Y: 22)", version: "2.0" },
  { id: "2.0-032", name: "拉諾西亞高地 032", map: "拉諾西亞高地", time: "18:00-05:00", weather: ["Thunder"], emote: "/lookout", hint: "拉諾西亞高地 (X: 29, Y: 25)", version: "2.0" },
  { id: "2.0-033", name: "拉諾西亞外地 033", map: "拉諾西亞外地", time: "18:00-05:00", weather: ["Fair Skies", "Clear Skies"], emote: "/lookout", hint: "拉諾西亞外地 (X: 12, Y: 15)", version: "2.0" },
  { id: "2.0-034", name: "拉諾西亞外地 034", map: "拉諾西亞外地", time: "05:00-08:00", weather: ["Clouds"], emote: "/lookout", hint: "拉諾西亞外地 (X: 17, Y: 16)", version: "2.0" },
  { id: "2.0-035", name: "拉諾西亞外地 035", map: "拉諾西亞外地", time: "12:00-17:00", weather: ["Fair Skies", "Clear Skies"], emote: "/lookout", hint: "拉諾西亞外地 (X: 23, Y: 11)", version: "2.0" },
  { id: "2.0-036", name: "拉諾西亞外地 036", map: "拉諾西亞外地", time: "18:00-05:00", weather: ["Rain"], emote: "/lookout", hint: "拉諾西亞外地 (X: 15, Y: 10)", version: "2.0" },
  { id: "2.0-037", name: "黑衣森林中央林區 037", map: "黑衣森林中央林區", time: "08:00-12:00", weather: ["Fair Skies", "Clear Skies"], emote: "/lookout", hint: "黑衣森林中央林區 (X: 14, Y: 14)", version: "2.0" },
  { id: "2.0-038", name: "黑衣森林中央林區 038", map: "黑衣森林中央林區", time: "05:00-08:00", weather: ["Fair Skies", "Clear Skies"], emote: "/lookout", hint: "黑衣森林中央林區 (X: 14, Y: 24)", version: "2.0" },
  { id: "2.0-039", name: "黑衣森林中央林區 039", map: "黑衣森林中央林區", time: "05:00-08:00", weather: ["Rain"], emote: "/lookout", hint: "黑衣森林中央林區 (X: 23, Y: 30)", version: "2.0" },
  { id: "2.0-040", name: "黑衣森林中央林區 040", map: "黑衣森林中央林區", time: "18:00-05:00", weather: ["Clear Skies"], emote: "/lookout", hint: "黑衣森林中央林區 (X: 13, Y: 23)", version: "2.0" },
  { id: "2.0-041", name: "黑衣森林中央林區 041", map: "黑衣森林中央林區", time: "12:00-17:00", weather: ["Fair Skies", "Clear Skies"], emote: "/lookout", hint: "黑衣森林中央林區 (X: 16, Y: 22)", version: "2.0" },
  { id: "2.0-042", name: "黑衣森林中央林區 042", map: "黑衣森林中央林區", time: "11:00-12:00", weather: ["Fair Skies", "Clear Skies"], emote: "/lookout", hint: "黑衣森林中央林區 (X: 26, Y: 18)", version: "2.0" },
  { id: "2.0-043", name: "黑衣森林東部林區 043", map: "黑衣森林東部林區", time: "18:00-05:00", weather: ["Thunder"], emote: "/lookout", hint: "黑衣森林東部林區 (X: 20, Y: 10)", version: "2.0" },
  { id: "2.0-044", name: "黑衣森林南部林區 044", map: "黑衣森林南部林區", time: "08:00-12:00", weather: ["Thunderstorms"], emote: "/lookout", hint: "黑衣森林南部林區 (X: 17, Y: 20)", version: "2.0" },
  { id: "2.0-045", name: "黑衣森林南部林區 045", map: "黑衣森林南部林區", time: "08:00-12:00", weather: ["Fair Skies", "Clear Skies"], emote: "/lookout", hint: "黑衣森林南部林區 (X: 14, Y: 33)", version: "2.0" },
  { id: "2.0-046", name: "黑衣森林南部林區 046", map: "黑衣森林南部林區", time: "12:00-17:00", weather: ["Fog"], emote: "/lookout", hint: "黑衣森林南部林區 (X: 33, Y: 23)", version: "2.0" },
  { id: "2.0-047", name: "黑衣森林南部林區 047", map: "黑衣森林南部林區", time: "05:00-08:00", weather: ["Fair Skies", "Clear Skies"], emote: "/lookout", hint: "黑衣森林南部林區 (X: 25, Y: 21)", version: "2.0" },
  { id: "2.0-048", name: "黑衣森林北部林區 048", map: "黑衣森林北部林區", time: "12:00-17:00", weather: ["Fair Skies", "Clear Skies"], emote: "/lookout", hint: "黑衣森林北部林區 (X: 18, Y: 19)", version: "2.0" },
  { id: "2.0-049", name: "黑衣森林北部林區 049", map: "黑衣森林北部林區", time: "18:00-05:00", weather: ["Fair Skies", "Clear Skies"], emote: "/lookout", hint: "黑衣森林北部林區 (X: 15, Y: 32)", version: "2.0" },
  { id: "2.0-050", name: "黑衣森林北部林區 050", map: "黑衣森林北部林區", time: "08:00-12:00", weather: ["Clouds"], emote: "/lookout", hint: "黑衣森林北部林區 (X: 15, Y: 27)", version: "2.0" },
  { id: "2.0-051", name: "西薩納蘭 051", map: "西薩納蘭", time: "17:00-18:00", weather: ["Fair Skies", "Clear Skies"], emote: "/lookout", hint: "西薩納蘭 (X: 17, Y: 22)", version: "2.0" },
  { id: "2.0-052", name: "西薩納蘭 052", map: "西薩納蘭", time: "12:00-17:00", weather: ["Fair Skies", "Clear Skies"], emote: "/lookout", hint: "西薩納蘭 (X: 12, Y: 14)", version: "2.0" },
  { id: "2.0-053", name: "中薩納蘭 053", map: "中薩納蘭", time: "18:00-05:00", weather: ["Dust Storms"], emote: "/lookout", hint: "中薩納蘭 (X: 21, Y: 17)", version: "2.0" },
  { id: "2.0-054", name: "中薩納蘭 054", map: "中薩納蘭", time: "12:00-17:00", weather: ["Fair Skies", "Clear Skies"], emote: "/sit", hint: "中薩納蘭 (X: 18, Y: 26)", version: "2.0" },
  { id: "2.0-055", name: "東薩納蘭 055", map: "東薩納蘭", time: "12:00-17:00", weather: ["Fair Skies", "Clear Skies"], emote: "/lookout", hint: "東薩納蘭 (X: 30, Y: 26)", version: "2.0" },
  { id: "2.0-056", name: "東薩納蘭 056", map: "東薩納蘭", time: "08:00-12:00", weather: ["Fair Skies", "Clear Skies"], emote: "/lookout", hint: "東薩納蘭 (X: 10, Y: 16)", version: "2.0" },
  { id: "2.0-057", name: "東薩納蘭 057", map: "東薩納蘭", time: "18:00-05:00", weather: ["Fair Skies", "Clear Skies"], emote: "/pray", hint: "東薩納蘭 (X: 25, Y: 14)", version: "2.0" },
  { id: "2.0-058", name: "南薩納蘭 058", map: "南薩納蘭", time: "05:00-08:00", weather: ["Fog"], emote: "/lookout", hint: "南薩納蘭 (X: 12, Y: 22)", version: "2.0" },
  { id: "2.0-059", name: "南薩納蘭 059", map: "南薩納蘭", time: "05:00-08:00", weather: ["Fair Skies", "Clear Skies"], emote: "/lookout", hint: "南薩納蘭 (X: 19, Y: 20)", version: "2.0" },
  { id: "2.0-060", name: "南薩納蘭 060", map: "南薩納蘭", time: "12:00-17:00", weather: ["Heat Waves"], emote: "/lookout", hint: "南薩納蘭 (X: 35, Y: 24)", version: "2.0" },
  { id: "2.0-061", name: "南薩納蘭 061", map: "南薩納蘭", time: "18:00-05:00", weather: ["Fair Skies", "Clear Skies"], emote: "/lookout", hint: "南薩納蘭 (X: 14, Y: 29)", version: "2.0" },
  { id: "2.0-062", name: "南薩納蘭 062", map: "南薩納蘭", time: "05:00-08:00", weather: ["Heat Waves"], emote: "/lookout", hint: "南薩納蘭 (X: 14, Y: 35)", version: "2.0" },
  { id: "2.0-063", name: "北薩納蘭 063", map: "北薩納蘭", time: "05:00-08:00", weather: ["Fair Skies", "Clear Skies"], emote: "/lookout", hint: "北薩納蘭 (X: 22, Y: 24)", version: "2.0" },
  { id: "2.0-064", name: "北薩納蘭 064", map: "北薩納蘭", time: "18:00-05:00", weather: ["Fair Skies", "Clear Skies"], emote: "/lookout", hint: "北薩納蘭 (X: 20, Y: 29)", version: "2.0" },
  { id: "2.0-065", name: "北薩納蘭 065", map: "北薩納蘭", time: "12:00-17:00", weather: ["Fair Skies", "Clear Skies"], emote: "/lookout", hint: "北薩納蘭 (X: 20, Y: 17)", version: "2.0" },
  { id: "2.0-066", name: "北薩納蘭 066", map: "北薩納蘭", time: "08:00-12:00", weather: ["Clouds"], emote: "/lookout", hint: "北薩納蘭 (X: 20, Y: 17)", version: "2.0" },
  { id: "2.0-067", name: "北薩納蘭 067", map: "北薩納蘭", time: "18:00-05:00", weather: ["Fog"], emote: "/lookout", hint: "北薩納蘭 (X: 26, Y: 22)", version: "2.0" },
  { id: "2.0-068", name: "庫爾札斯中央高地 068", map: "庫爾札斯中央高地", time: "17:00-18:00", weather: ["Fair Skies", "Clear Skies"], emote: "/lookout", hint: "庫爾札斯中央高地 (X: 25, Y: 29)", version: "2.0" },
  { id: "2.0-069", name: "庫爾札斯中央高地 069", map: "庫爾札斯中央高地", time: "18:00-05:00", weather: ["Fog"], emote: "/lookout", hint: "庫爾札斯中央高地 (X: 25, Y: 17)", version: "2.0" },
  { id: "2.0-070", name: "庫爾札斯中央高地 070", map: "庫爾札斯中央高地", time: "08:00-12:00", weather: ["Blizzards"], emote: "/lookout", hint: "庫爾札斯中央高地 (X: 11, Y: 15)", version: "2.0" },
  { id: "2.0-071", name: "庫爾札斯中央高地 071", map: "庫爾札斯中央高地", time: "05:00-08:00", weather: ["Fair Skies", "Clear Skies"], emote: "/lookout", hint: "庫爾札斯中央高地 (X: 12, Y: 17)", version: "2.0" },
  { id: "2.0-072", name: "庫爾札斯中央高地 072", map: "庫爾札斯中央高地", time: "05:00-08:00", weather: ["Fair Skies", "Clear Skies"], emote: "/lookout", hint: "庫爾札斯中央高地 (X: 7, Y: 28)", version: "2.0" },
  { id: "2.0-073", name: "庫爾札斯中央高地 073", map: "庫爾札斯中央高地", time: "18:00-05:00", weather: ["Snow"], emote: "/lookout", hint: "庫爾札斯中央高地 (X: 7, Y: 31)", version: "2.0" },
  { id: "2.0-074", name: "摩杜納 074", map: "摩杜納", time: "08:00-12:00", weather: ["Fair Skies", "Clear Skies"], emote: "/lookout", hint: "摩杜納 (X: 14, Y: 13)", version: "2.0" },
  { id: "2.0-075", name: "摩杜納 075", map: "摩杜納", time: "12:00-17:00", weather: ["Fair Skies", "Clear Skies"], emote: "/lookout", hint: "摩杜納 (X: 26, Y: 13)", version: "2.0" },
  { id: "2.0-076", name: "摩杜納 076", map: "摩杜納", time: "05:00-08:00", weather: ["Fair Skies", "Clear Skies"], emote: "/lookout", hint: "摩杜納 (X: 27, Y: 13)", version: "2.0" },
  { id: "2.0-077", name: "摩杜納 077", map: "摩杜納", time: "12:00-17:00", weather: ["Gloom"], emote: "/lookout", hint: "摩杜納 (X: 9, Y: 13)", version: "2.0" },
  { id: "2.0-078", name: "摩杜納 078", map: "摩杜納", time: "18:00-05:00", weather: ["Fair Skies", "Clear Skies"], emote: "/lookout", hint: "摩杜納 (X: 27, Y: 8)", version: "2.0" },
  { id: "2.0-079", name: "摩杜納 079", map: "摩杜納", time: "12:00-17:00", weather: ["Fair Skies", "Clear Skies"], emote: "/lookout", hint: "摩杜納 (X: 18, Y: 17)", version: "2.0" },
  { id: "2.0-080", name: "摩杜納 080", map: "摩杜納", time: "17:00-18:00", weather: ["Fair Skies", "Clear Skies"], emote: "/sit", hint: "摩杜納 (X: 26, Y: 11)", version: "2.0" },

  // 3.0
  { id: "3.0-001", name: "蒼穹之章 001", map: "庫爾札斯西部高地", time: "Any", weather: ["Any"], emote: "張望", hint: "庫爾札斯西部高地 (X: 32, Y: 36.2, Z: 2.4)", version: "3.0" },
  { id: "3.0-002", name: "蒼穹之章 002", map: "庫爾札斯西部高地", time: "Any", weather: ["Any"], emote: "張望", hint: "庫爾札斯西部高地 (X: 20.7, Y: 23.1, Z: 1.7)", version: "3.0" },
  { id: "3.0-003", name: "蒼穹之章 003", map: "庫爾札斯西部高地", time: "Any", weather: ["Any"], emote: "張望", hint: "庫爾札斯西部高地 (X: 10.3, Y: 18, Z: 1.7)", version: "3.0" },
  { id: "3.0-004", name: "蒼穹之章 004", map: "庫爾札斯西部高地", time: "Any", weather: ["Any"], emote: "張望", hint: "庫爾札斯西部高地 (X: 20.1, Y: 6.6, Z: 0.9)", version: "3.0" },
  { id: "3.0-005", name: "蒼穹之章 005", map: "庫爾札斯西部高地", time: "Any", weather: ["Any"], emote: "張望", hint: "庫爾札斯西部高地 (X: 31.6, Y: 4.8, Z: 1.3)", version: "3.0" },
  { id: "3.0-006", name: "蒼穹之章 006", map: "庫爾札斯西部高地", time: "Any", weather: ["Any"], emote: "張望", hint: "庫爾札斯西部高地 (X: 36.2, Y: 19.2, Z: 1.6)", version: "3.0" },
  { id: "3.0-007", name: "蒼穹之章 007", map: "庫爾札斯西部高地", time: "Any", weather: ["Any"], emote: "張望", hint: "庫爾札斯西部高地 (X: 20.5, Y: 36.4, Z: 1.8)", version: "3.0" },
  { id: "3.0-008", name: "蒼穹之章 008", map: "龍堡參天高地", time: "Any", weather: ["Any"], emote: "張望", hint: "龍堡參天高地 (X: 27.4, Y: 36.3, Z: 1.7)", version: "3.0" },
  { id: "3.0-009", name: "蒼穹之章 009", map: "龍堡參天高地", time: "Any", weather: ["Any"], emote: "張望", hint: "龍堡參天高地 (X: 12, Y: 39.4, Z: 1)", version: "3.0" },
  { id: "3.0-010", name: "蒼穹之章 010", map: "龍堡參天高地", time: "Any", weather: ["Any"], emote: "張望", hint: "龍堡參天高地 (X: 16.6, Y: 23.3, Z: 5.6)", version: "3.0" },
  { id: "3.0-011", name: "蒼穹之章 011", map: "龍堡參天高地", time: "Any", weather: ["Any"], emote: "張望", hint: "龍堡參天高地 (X: 29.6, Y: 6.1, Z: 2.4)", version: "3.0" },
  { id: "3.0-012", name: "蒼穹之章 012", map: "龍堡參天高地", time: "Any", weather: ["Any"], emote: "祈禱", hint: "龍堡參天高地 (X: 8.2, Y: 6.1, Z: 1.6)", version: "3.0" },
  { id: "3.0-013", name: "蒼穹之章 013", map: "龍堡參天高地", time: "Any", weather: ["Any"], emote: "張望", hint: "龍堡參天高地 (X: 33.9, Y: 23.5, Z: 1.4)", version: "3.0" },
  { id: "3.0-014", name: "蒼穹之章 014", map: "龍堡參天高地", time: "Any", weather: ["Any"], emote: "張望", hint: "龍堡參天高地 (X: 11.4, Y: 13.4, Z: 6.6)", version: "3.0" },
  { id: "3.0-015", name: "蒼穹之章 015", map: "翻雲霧海", time: "Any", weather: ["Any"], emote: "張望", hint: "翻雲霧海 (X: 29.4, Y: 35.1, Z: 0.2)", version: "3.0" },
  { id: "3.0-016", name: "蒼穹之章 016", map: "翻雲霧海", time: "Any", weather: ["Any"], emote: "張望", hint: "翻雲霧海 (X: 29.2, Y: 13, Z: 3)", version: "3.0" },
  { id: "3.0-017", name: "蒼穹之章 017", map: "翻雲霧海", time: "Any", weather: ["Any"], emote: "張望", hint: "翻雲霧海 (X: 18.6, Y: 6.4, Z: 3.6)", version: "3.0" },
  { id: "3.0-018", name: "蒼穹之章 018", map: "翻雲霧海", time: "Any", weather: ["Any"], emote: "張望", hint: "翻雲霧海 (X: 7.8, Y: 27, Z: 5.4)", version: "3.0" },
  { id: "3.0-019", name: "蒼穹之章 019", map: "翻雲霧海", time: "Any", weather: ["Any"], emote: "祈禱", hint: "翻雲霧海 (X: 17.6, Y: 37.2, Z: 0.5)", version: "3.0" },
  { id: "3.0-020", name: "蒼穹之章 020", map: "翻雲霧海", time: "Any", weather: ["Any"], emote: "張望", hint: "翻雲霧海 (X: 35.1, Y: 20.4, Z: 1.3)", version: "3.0" },
  { id: "3.0-021", name: "蒼穹之章 021", map: "翻雲霧海", time: "Any", weather: ["Any"], emote: "張望", hint: "翻雲霧海 (X: 23.2, Y: 18.6, Z: 1.5)", version: "3.0" },
  { id: "3.0-022", name: "蒼穹之章 022", map: "阿巴拉提亞雲海", time: "Any", weather: ["Any"], emote: "張望", hint: "阿巴拉提亞雲海 (X: 15.2, Y: 37.7, Z: 1)", version: "3.0" },
  { id: "3.0-023", name: "蒼穹之章 023", map: "阿巴拉提亞雲海", time: "Any", weather: ["Any"], emote: "打盹", hint: "阿巴拉提亞雲海 (X: 37.2, Y: 40.1, Z: 1.6)", version: "3.0" },
  { id: "3.0-024", name: "蒼穹之章 024", map: "阿巴拉提亞雲海", time: "Any", weather: ["Any"], emote: "張望", hint: "阿巴拉提亞雲海 (X: 39.9, Y: 21.9, Z: 2.8)", version: "3.0" },
  { id: "3.0-025", name: "蒼穹之章 025", map: "阿巴拉提亞雲海", time: "Any", weather: ["Any"], emote: "張望", hint: "阿巴拉提亞雲海 (X: 13, Y: 9, Z: 2.1)", version: "3.0" },
  { id: "3.0-026", name: "蒼穹之章 026", map: "阿巴拉提亞雲海", time: "Any", weather: ["Any"], emote: "張望", hint: "阿巴拉提亞雲海 (X: 18.4, Y: 27, Z: 5.5)", version: "3.0" },
  { id: "3.0-027", name: "蒼穹之章 027", map: "阿巴拉提亞雲海", time: "Any", weather: ["Any"], emote: "張望", hint: "阿巴拉提亞雲海 (X: 25, Y: 23.9, Z: 0.7)", version: "3.0" },
  { id: "3.0-028", name: "蒼穹之章 028", map: "阿巴拉提亞雲海", time: "Any", weather: ["Any"], emote: "張望", hint: "阿巴拉提亞雲海 (X: 38.1, Y: 11.7, Z: 2)", version: "3.0" },
  { id: "3.0-029", name: "蒼穹之章 029", map: "龍堡內陸低地", time: "Any", weather: ["Any"], emote: "張望", hint: "龍堡內陸低地 (X: 40.1, Y: 21.8, Z: 1.9)", version: "3.0" },
  { id: "3.0-030", name: "蒼穹之章 030", map: "龍堡內陸低地", time: "Any", weather: ["Any"], emote: "張望", hint: "龍堡內陸低地 (X: 17.9, Y: 23.2, Z: 0.4)", version: "3.0" },
  { id: "3.0-031", name: "蒼穹之章 031", map: "龍堡內陸低地", time: "Any", weather: ["Any"], emote: "張望", hint: "龍堡內陸低地 (X: 22.1, Y: 27.6, Z: 1.7)", version: "3.0" },
  { id: "3.0-032", name: "蒼穹之章 032", map: "龍堡內陸低地", time: "Any", weather: ["Any"], emote: "張望", hint: "龍堡內陸低地 (X: 10.1, Y: 35.9, Z: 1.1)", version: "3.0" },
  { id: "3.0-033", name: "蒼穹之章 033", map: "龍堡內陸低地", time: "Any", weather: ["Any"], emote: "張望", hint: "龍堡內陸低地 (X: 28.8, Y: 37.8, Z: 3.6)", version: "3.0" },
  { id: "3.0-034", name: "蒼穹之章 034", map: "龍堡內陸低地", time: "Any", weather: ["Any"], emote: "張望", hint: "龍堡內陸低地 (X: 32.7, Y: 11.9, Z: 0.9)", version: "3.0" },
  { id: "3.0-035", name: "蒼穹之章 035", map: "龍堡內陸低地", time: "Any", weather: ["Any"], emote: "張望", hint: "龍堡內陸低地 (X: 13, Y: 21.6, Z: 1.5)", version: "3.0" },
  { id: "3.0-036", name: "蒼穹之章 036", map: "魔大陸阿濟茲拉", time: "Any", weather: ["Any"], emote: "張望", hint: "魔大陸阿濟茲拉 (X: 39.2, Y: 17, Z: 6.8)", version: "3.0" },
  { id: "3.0-037", name: "蒼穹之章 037", map: "魔大陸阿濟茲拉", time: "Any", weather: ["Any"], emote: "張望", hint: "魔大陸阿濟茲拉 (X: 33.4, Y: 35.6, Z: 8.2)", version: "3.0" },
  { id: "3.0-038", name: "蒼穹之章 038", map: "魔大陸阿濟茲拉", time: "Any", weather: ["Any"], emote: "張望", hint: "魔大陸阿濟茲拉 (X: 6, Y: 30.6, Z: 6)", version: "3.0" },
  { id: "3.0-039", name: "蒼穹之章 039", map: "魔大陸阿濟茲拉", time: "Any", weather: ["Any"], emote: "張望", hint: "魔大陸阿濟茲拉 (X: 10.9, Y: 35.6, Z: 5.8)", version: "3.0" },
  { id: "3.0-040", name: "蒼穹之章 040", map: "魔大陸阿濟茲拉", time: "Any", weather: ["Any"], emote: "張望", hint: "魔大陸阿濟茲拉 (X: 6.2, Y: 9.9, Z: 7)", version: "3.0" },
  { id: "3.0-041", name: "蒼穹之章 041", map: "魔大陸阿濟茲拉", time: "Any", weather: ["Any"], emote: "張望", hint: "魔大陸阿濟茲拉 (X: 9.4, Y: 21.5, Z: 7.1)", version: "3.0" },
  { id: "3.0-042", name: "蒼穹之章 042", map: "魔大陸阿濟茲拉", time: "Any", weather: ["Any"], emote: "張望", hint: "魔大陸阿濟茲拉 (X: 30.4, Y: 11.4, Z: 6.9)", version: "3.0" },
  { id: "3.0-043", name: "蒼穹之章 043", map: "庫爾札斯西部高地", time: "Any", weather: ["Any"], emote: "鼓勵", hint: "庫爾札斯西部高地 (X: 32.6, Y: 28.2, Z: 1.4)", version: "3.0" },
  { id: "3.0-044", name: "蒼穹之章 044", map: "庫爾札斯西部高地", time: "Any", weather: ["Any"], emote: "張望", hint: "庫爾札斯西部高地 (X: 29.9, Y: 23.7, Z: 1.5)", version: "3.0" },
  { id: "3.0-045", name: "蒼穹之章 045", map: "庫爾札斯西部高地", time: "Any", weather: ["Any"], emote: "坐下", hint: "庫爾札斯西部高地 (X: 9, Y: 10.4, Z: 0.4)", version: "3.0" },
  { id: "3.0-046", name: "蒼穹之章 046", map: "庫爾札斯西部高地", time: "Any", weather: ["Any"], emote: "展示", hint: "庫爾札斯西部高地 (X: 12.7, Y: 8.2, Z: 0.9)", version: "3.0" },
  { id: "3.0-047", name: "蒼穹之章 047", map: "龍堡參天高地", time: "Any", weather: ["Any"], emote: "張望", hint: "龍堡參天高地 (X: 23.4, Y: 39.4, Z: 0.2)", version: "3.0" },
  { id: "3.0-048", name: "蒼穹之章 048", map: "龍堡參天高地", time: "Any", weather: ["Any"], emote: "張望", hint: "龍堡參天高地 (X: 24.2, Y: 18.8, Z: 1.2)", version: "3.0" },
  { id: "3.0-049", name: "蒼穹之章 049", map: "龍堡參天高地", time: "Any", weather: ["Any"], emote: "張望", hint: "龍堡參天高地 (X: 34.3, Y: 15.8, Z: 1.3)", version: "3.0" },
  { id: "3.0-050", name: "蒼穹之章 050", map: "龍堡參天高地", time: "Any", weather: ["Any"], emote: "張望", hint: "龍堡參天高地 (X: 18.6, Y: 32.6, Z: 0.7)", version: "3.0" },
  { id: "3.0-051", name: "蒼穹之章 051", map: "翻雲霧海", time: "Any", weather: ["Any"], emote: "祈禱", hint: "翻雲霧海 (X: 33.8, Y: 32.4, Z: 2.6)", version: "3.0" },
  { id: "3.0-052", name: "蒼穹之章 052", map: "翻雲霧海", time: "Any", weather: ["Any"], emote: "張望", hint: "翻雲霧海 (X: 37.3, Y: 14.4, Z: 2.8)", version: "3.0" },
  { id: "3.0-053", name: "蒼穹之章 053", map: "翻雲霧海", time: "Any", weather: ["Any"], emote: "張望", hint: "翻雲霧海 (X: 14.7, Y: 25, Z: 1.9)", version: "3.0" },
  { id: "3.0-054", name: "蒼穹之章 054", map: "阿巴拉提亞雲海", time: "Any", weather: ["Any"], emote: "張望", hint: "阿巴拉提亞雲海 (X: 6.4, Y: 6, Z: 1.5)", version: "3.0" },
  { id: "3.0-055", name: "蒼穹之章 055", map: "阿巴拉提亞雲海", time: "Any", weather: ["Any"], emote: "張望", hint: "阿巴拉提亞雲海 (X: 26.7, Y: 6.9, Z: 2.2)", version: "3.0" },
  { id: "3.0-056", name: "蒼穹之章 056", map: "阿巴拉提亞雲海", time: "Any", weather: ["Any"], emote: "張望", hint: "阿巴拉提亞雲海 (X: 9.9, Y: 28.7, Z: 0.7)", version: "3.0" },
  { id: "3.0-057", name: "蒼穹之章 057", map: "龍堡內陸低地", time: "Any", weather: ["Any"], emote: "張望", hint: "龍堡內陸低地 (X: 12.2, Y: 13, Z: 1.1)", version: "3.0" },
  { id: "3.0-058", name: "蒼穹之章 058", map: "龍堡內陸低地", time: "Any", weather: ["Any"], emote: "張望", hint: "龍堡內陸低地 (X: 19.7, Y: 38.1, Z: 1.4)", version: "3.0" },
  { id: "3.0-059", name: "蒼穹之章 059", map: "龍堡內陸低地", time: "Any", weather: ["Any"], emote: "張望", hint: "龍堡內陸低地 (X: 30.4, Y: 31.3, Z: 1.6)", version: "3.0" },
  { id: "3.0-060", name: "蒼穹之章 060", map: "魔大陸阿濟茲拉", time: "Any", weather: ["Any"], emote: "張望", hint: "魔大陸阿濟茲拉 (X: 10, Y: 14.8, Z: 4.3)", version: "3.0" },
  { id: "3.0-061", name: "蒼穹之章 061", map: "魔大陸阿濟茲拉", time: "Any", weather: ["Any"], emote: "張望", hint: "魔大陸阿濟茲拉 (X: 35.5, Y: 6.4, Z: 5.5)", version: "3.0" },
  { id: "3.0-062", name: "蒼穹之章 062", map: "魔大陸阿濟茲拉", time: "Any", weather: ["Any"], emote: "張望", hint: "魔大陸阿濟茲拉 (X: 25.9, Y: 28.6, Z: 6)", version: "3.0" },

  // 4.0
  { id: "4.0-001", name: "紅蓮之章 001", map: "基拉巴尼亞邊區", time: "Any", weather: ["Any"], emote: "張望", hint: "基拉巴尼亞邊區 (X: 21.9, Y: 26.9, Z: 0.8)", version: "4.0" },
  { id: "4.0-002", name: "紅蓮之章 002", map: "基拉巴尼亞邊區", time: "Any", weather: ["Any"], emote: "張望", hint: "基拉巴尼亞邊區 (X: 24.2, Y: 16.3, Z: 0.7)", version: "4.0" },
  { id: "4.0-003", name: "紅蓮之章 003", map: "基拉巴尼亞邊區", time: "Any", weather: ["Any"], emote: "張望", hint: "基拉巴尼亞邊區 (X: 23.2, Y: 7.2, Z: 0.6)", version: "4.0" },
  { id: "4.0-004", name: "紅蓮之章 004", map: "基拉巴尼亞邊區", time: "Any", weather: ["Any"], emote: "張望", hint: "基拉巴尼亞邊區 (X: 9.3, Y: 10.8, Z: 1.7)", version: "4.0" },
  { id: "4.0-005", name: "紅蓮之章 005", map: "基拉巴尼亞邊區", time: "Any", weather: ["Any"], emote: "張望", hint: "基拉巴尼亞邊區 (X: 8.6, Y: 26.4, Z: 0.9)", version: "4.0" },
  { id: "4.0-006", name: "紅蓮之章 006", map: "基拉巴尼亞邊區", time: "Any", weather: ["Any"], emote: "張望", hint: "基拉巴尼亞邊區 (X: 36.5, Y: 16.4, Z: 2.1)", version: "4.0" },
  { id: "4.0-007", name: "紅蓮之章 007", map: "基拉巴尼亞邊區", time: "Any", weather: ["Any"], emote: "張望", hint: "基拉巴尼亞邊區 (X: 30, Y: 25.2, Z: 2.4)", version: "4.0" },
  { id: "4.0-008", name: "紅蓮之章 008", map: "基拉巴尼亞山區", time: "Any", weather: ["Any"], emote: "張望", hint: "基拉巴尼亞山區 (X: 33.2, Y: 10.2, Z: 2.2)", version: "4.0" },
  { id: "4.0-009", name: "紅蓮之章 009", map: "基拉巴尼亞山區", time: "Any", weather: ["Any"], emote: "張望", hint: "基拉巴尼亞山區 (X: 27, Y: 36.8, Z: 2.9)", version: "4.0" },
  { id: "4.0-010", name: "紅蓮之章 010", map: "基拉巴尼亞山區", time: "Any", weather: ["Any"], emote: "張望", hint: "基拉巴尼亞山區 (X: 22, Y: 32.8, Z: 3.5)", version: "4.0" },
  { id: "4.0-011", name: "紅蓮之章 011", map: "基拉巴尼亞山區", time: "Any", weather: ["Any"], emote: "張望", hint: "基拉巴尼亞山區 (X: 25.1, Y: 5.8, Z: 1.1)", version: "4.0" },
  { id: "4.0-012", name: "紅蓮之章 012", map: "基拉巴尼亞山區", time: "Any", weather: ["Any"], emote: "張望", hint: "基拉巴尼亞山區 (X: 19.9, Y: 23.4, Z: 3.2)", version: "4.0" },
  { id: "4.0-013", name: "紅蓮之章 013", map: "基拉巴尼亞山區", time: "Any", weather: ["Any"], emote: "張望", hint: "基拉巴尼亞山區 (X: 8.1, Y: 37.5, Z: 2.6)", version: "4.0" },
  { id: "4.0-014", name: "紅蓮之章 014", map: "基拉巴尼亞山區", time: "Any", weather: ["Any"], emote: "張望", hint: "基拉巴尼亞山區 (X: 18.3, Y: 14.3, Z: 0.9)", version: "4.0" },
  { id: "4.0-015", name: "紅蓮之章 015", map: "基拉巴尼亞山區", time: "Any", weather: ["Any"], emote: "張望", hint: "基拉巴尼亞山區 (X: 7.5, Y: 7.6, Z: 0.1)", version: "4.0" },
  { id: "4.0-016", name: "紅蓮之章 016", map: "基拉巴尼亞湖區", time: "Any", weather: ["Any"], emote: "張望", hint: "基拉巴尼亞湖區 (X: 23.5, Y: 33.7, Z: 1.7)", version: "4.0" },
  { id: "4.0-017", name: "紅蓮之章 017", map: "基拉巴尼亞湖區", time: "Any", weather: ["Any"], emote: "張望", hint: "基拉巴尼亞湖區 (X: 35.2, Y: 33.2, Z: 1.5)", version: "4.0" },
  { id: "4.0-018", name: "紅蓮之章 018", map: "基拉巴尼亞湖區", time: "Any", weather: ["Any"], emote: "張望", hint: "基拉巴尼亞湖區 (X: 13.8, Y: 35.5, Z: 2.8)", version: "4.0" },
  { id: "4.0-019", name: "紅蓮之章 019", map: "基拉巴尼亞湖區", time: "Any", weather: ["Any"], emote: "祈禱", hint: "基拉巴尼亞湖區 (X: 20.6, Y: 16.5, Z: 0.8)", version: "4.0" },
  { id: "4.0-020", name: "紅蓮之章 020", map: "基拉巴尼亞湖區", time: "Any", weather: ["Any"], emote: "張望", hint: "基拉巴尼亞湖區 (X: 33.9, Y: 30.2, Z: 0.5)", version: "4.0" },
  { id: "4.0-021", name: "紅蓮之章 021", map: "基拉巴尼亞湖區", time: "Any", weather: ["Any"], emote: "張望", hint: "基拉巴尼亞湖區 (X: 5.9, Y: 22, Z: 2.4)", version: "4.0" },
  { id: "4.0-022", name: "紅蓮之章 022", map: "黃金港", time: "Any", weather: ["Any"], emote: "張望", hint: "黃金港 (X: 14.3, Y: 9.6)", version: "4.0" },
  { id: "4.0-023", name: "紅蓮之章 023", map: "黃金港", time: "Any", weather: ["Any"], emote: "坐下", hint: "黃金港 (X: 9.4, Y: 7.3)", version: "4.0" },
  { id: "4.0-024", name: "紅蓮之章 024", map: "黃金港", time: "Any", weather: ["Any"], emote: "張望", hint: "黃金港 (X: 13.2, Y: 12.8)", version: "4.0" },
  { id: "4.0-025", name: "紅蓮之章 025", map: "黃金港", time: "Any", weather: ["Any"], emote: "張望", hint: "黃金港 (X: 11.9, Y: 11.7)", version: "4.0" },
  { id: "4.0-026", name: "紅蓮之章 026", map: "黃金港", time: "Any", weather: ["Any"], emote: "張望", hint: "黃金港 (X: 10.2, Y: 10)", version: "4.0" },
  { id: "4.0-027", name: "紅蓮之章 027", map: "紅玉海", time: "Any", weather: ["Any"], emote: "張望", hint: "紅玉海 (X: 25.9, Y: 13, Z: -1)", version: "4.0" },
  { id: "4.0-028", name: "紅蓮之章 028", map: "紅玉海", time: "Any", weather: ["Any"], emote: "張望", hint: "紅玉海 (X: 32.9, Y: 8.6, Z: 1)", version: "4.0" },
  { id: "4.0-029", name: "紅蓮之章 029", map: "紅玉海", time: "Any", weather: ["Any"], emote: "張望", hint: "紅玉海 (X: 24, Y: 5.6, Z: 0.4)", version: "4.0" },
  { id: "4.0-030", name: "紅蓮之章 030", map: "紅玉海", time: "Any", weather: ["Any"], emote: "張望", hint: "紅玉海 (X: 31.5, Y: 37.2, Z: 0.6)", version: "4.0" },
  { id: "4.0-031", name: "紅蓮之章 031", map: "紅玉海", time: "Any", weather: ["Any"], emote: "張望", hint: "紅玉海 (X: 10.1, Y: 26.7, Z: 0.1)", version: "4.0" },
  { id: "4.0-032", name: "紅蓮之章 032", map: "紅玉海", time: "Any", weather: ["Any"], emote: "張望", hint: "紅玉海 (X: 6.4, Y: 10.8, Z: 0.1)", version: "4.0" },
  { id: "4.0-033", name: "紅蓮之章 033", map: "延夏", time: "Any", weather: ["Any"], emote: "張望", hint: "延夏 (X: 12.4, Y: 26.7, Z: 1.1)", version: "4.0" },
  { id: "4.0-034", name: "紅蓮之章 034", map: "延夏", time: "Any", weather: ["Any"], emote: "張望", hint: "延夏 (X: 30.3, Y: 32.9, Z: 0.8)", version: "4.0" },
  { id: "4.0-035", name: "紅蓮之章 035", map: "延夏", time: "Any", weather: ["Any"], emote: "張望", hint: "延夏 (X: 34.3, Y: 18.3, Z: 1.1)", version: "4.0" },
  { id: "4.0-036", name: "紅蓮之章 036", map: "延夏", time: "Any", weather: ["Any"], emote: "張望", hint: "延夏 (X: 30.4, Y: 6.2, Z: 0.4)", version: "4.0" },
  { id: "4.0-037", name: "紅蓮之章 037", map: "延夏", time: "Any", weather: ["Any"], emote: "張望", hint: "延夏 (X: 14.9, Y: 6.3, Z: 0.9)", version: "4.0" },
  { id: "4.0-038", name: "紅蓮之章 038", map: "延夏", time: "Any", weather: ["Any"], emote: "張望", hint: "延夏 (X: 19.5, Y: 20.5, Z: 1.5)", version: "4.0" },
  { id: "4.0-039", name: "紅蓮之章 039", map: "延夏", time: "Any", weather: ["Any"], emote: "張望", hint: "延夏 (X: 15.2, Y: 31.6, Z: 0.6)", version: "4.0" },
  { id: "4.0-040", name: "紅蓮之章 040", map: "太陽神草原", time: "Any", weather: ["Any"], emote: "張望", hint: "太陽神草原 (X: 14.2, Y: 9.8, Z: 1.1)", version: "4.0" },
  { id: "4.0-041", name: "紅蓮之章 041", map: "太陽神草原", time: "Any", weather: ["Any"], emote: "張望", hint: "太陽神草原 (X: 12.2, Y: 32, Z: 0.3)", version: "4.0" },
  { id: "4.0-042", name: "紅蓮之章 042", map: "太陽神草原", time: "Any", weather: ["Any"], emote: "張望", hint: "太陽神草原 (X: 19.8, Y: 33.7, Z: 0.7)", version: "4.0" },
  { id: "4.0-043", name: "紅蓮之章 043", map: "太陽神草原", time: "Any", weather: ["Any"], emote: "張望", hint: "太陽神草原 (X: 34.4, Y: 31.9, Z: 0.2)", version: "4.0" },
  { id: "4.0-044", name: "紅蓮之章 044", map: "太陽神草原", time: "Any", weather: ["Any"], emote: "祈禱", hint: "太陽神草原 (X: 20, Y: 12.6, Z: 1)", version: "4.0" },
  { id: "4.0-045", name: "紅蓮之章 045", map: "太陽神草原", time: "Any", weather: ["Any"], emote: "張望", hint: "太陽神草原 (X: 22.7, Y: 21.2, Z: 1.7)", version: "4.0" },
  { id: "4.0-046", name: "紅蓮之章 046", map: "神拳痕", time: "Any", weather: ["Any"], emote: "張望", hint: "神拳痕 (X: 11.4, Y: 13.9)", version: "4.0" },
  { id: "4.0-047", name: "紅蓮之章 047", map: "神拳痕", time: "Any", weather: ["Any"], emote: "張望", hint: "神拳痕 (X: 10.5, Y: 9.7)", version: "4.0" },
  { id: "4.0-048", name: "紅蓮之章 048", map: "基拉巴尼亞邊區", time: "18:00-05:00", weather: ["Any"], emote: "張望", hint: "基拉巴尼亞邊區 (X: 27.5, Y: 35.1, Z: 1.4)", version: "4.0" },
  { id: "4.0-049", name: "紅蓮之章 049", map: "基拉巴尼亞山區", time: "Any", weather: ["Any"], emote: "張望", hint: "基拉巴尼亞山區 (X: 14.3, Y: 36.6, Z: 2.6)", version: "4.0" },
  { id: "4.0-050", name: "紅蓮之章 050", map: "基拉巴尼亞山區", time: "Any", weather: ["Any"], emote: "張望", hint: "基拉巴尼亞山區 (X: 20.3, Y: 22.9, Z: 2.6)", version: "4.0" },
  { id: "4.0-051", name: "紅蓮之章 051", map: "基拉巴尼亞湖區", time: "Any", weather: ["Any"], emote: "張望", hint: "基拉巴尼亞湖區 (X: 17.1, Y: 19.2, Z: -2.9)", version: "4.0" },
  { id: "4.0-052", name: "紅蓮之章 052", map: "基拉巴尼亞湖區", time: "Any", weather: ["Any"], emote: "張望", hint: "基拉巴尼亞湖區 (X: 36, Y: 33.5, Z: 0.8)", version: "4.0" },
  { id: "4.0-053", name: "紅蓮之章 053", map: "黃金港", time: "Any", weather: ["Any"], emote: "張望", hint: "黃金港 (X: 11.1, Y: 9.9)", version: "4.0" },
  { id: "4.0-054", name: "紅蓮之章 054", map: "黃金港", time: "Any", weather: ["Any"], emote: "張望", hint: "黃金港 (X: 9.8, Y: 8.3)", version: "4.0" },
  { id: "4.0-055", name: "紅蓮之章 055", map: "黃金港", time: "Any", weather: ["Any"], emote: "張望", hint: "黃金港 (X: 12.5, Y: 10.6)", version: "4.0" },
  { id: "4.0-056", name: "紅蓮之章 056", map: "黃金港", time: "Any", weather: ["Any"], emote: "張望", hint: "黃金港 (X: 9.9, Y: 12.3)", version: "4.0" },
  { id: "4.0-057", name: "紅蓮之章 057", map: "紅玉海", time: "Any", weather: ["Any"], emote: "張望", hint: "紅玉海 (X: 5, Y: 36.4, Z: -8.6)", version: "4.0" },
  { id: "4.0-058", name: "紅蓮之章 058", map: "紅玉海", time: "05:00-08:00", weather: ["Any"], emote: "張望", hint: "紅玉海 (X: 9.5, Y: 19, Z: 0.1)", version: "4.0" },
  { id: "4.0-059", name: "紅蓮之章 059", map: "紅玉海", time: "Any", weather: ["Any"], emote: "張望", hint: "紅玉海 (X: 21.5, Y: 11.9, Z: 0.3)", version: "4.0" },
  { id: "4.0-060", name: "紅蓮之章 060", map: "延夏", time: "Any", weather: ["Any"], emote: "張望", hint: "延夏 (X: 35.6, Y: 38.8, Z: -1.2)", version: "4.0" },
  { id: "4.0-061", name: "紅蓮之章 061", map: "太陽神草原", time: "Any", weather: ["Any"], emote: "張望", hint: "太陽神草原 (X: 31.3, Y: 11.5, Z: 0.6)", version: "4.0" },
  { id: "4.0-062", name: "紅蓮之章 062", map: "太陽神草原", time: "Any", weather: ["Any"], emote: "張望", hint: "太陽神草原 (X: 21.8, Y: 20.3, Z: -0.5)", version: "4.0" },

  // 5.0
  { id: "5.0-001", name: "暗影之章 001", map: "水晶都", time: "Any", weather: ["Any"], emote: "張望", hint: "水晶都 (X: 8.6, Y: 11.2)", version: "5.0" },
  { id: "5.0-002", name: "暗影之章 002", map: "水晶都", time: "Any", weather: ["Any"], emote: "張望", hint: "水晶都 (X: 10.4, Y: 13.1)", version: "5.0" },
  { id: "5.0-003", name: "暗影之章 003", map: "水晶都", time: "Any", weather: ["Any"], emote: "張望", hint: "水晶都 (X: 9.9, Y: 5.8)", version: "5.0" },
  { id: "5.0-004", name: "暗影之章 004", map: "水晶都", time: "Any", weather: ["Any"], emote: "張望", hint: "水晶都 (X: 11, Y: 4.7)", version: "5.0" },
  { id: "5.0-005", name: "暗影之章 005", map: "水晶都", time: "Any", weather: ["Any"], emote: "張望", hint: "水晶都 (X: 7.3, Y: 9.7)", version: "5.0" },
  { id: "5.0-006", name: "暗影之章 006", map: "游末邦[樹根層]", time: "Any", weather: ["Any"], emote: "張望", hint: "游末邦[樹根層] (X: 11.7, Y: 8.4)", version: "5.0" },
  { id: "5.0-007", name: "暗影之章 007", map: "游末邦[樹根層]", time: "Any", weather: ["Any"], emote: "張望", hint: "游末邦[樹根層] (X: 12.5, Y: 14)", version: "5.0" },
  { id: "5.0-008", name: "暗影之章 008", map: "游末邦[樹幹層]", time: "Any", weather: ["Any"], emote: "張望", hint: "游末邦[樹幹層] (X: 11.1, Y: 11.4)", version: "5.0" },
  { id: "5.0-009", name: "暗影之章 009", map: "游末邦[樹梢層]", time: "Any", weather: ["Any"], emote: "張望", hint: "游末邦[樹梢層] (X: 12.3, Y: 10.4)", version: "5.0" },
  { id: "5.0-010", name: "暗影之章 010", map: "雷克蘭德", time: "Any", weather: ["Any"], emote: "張望", hint: "雷克蘭德 (X: 37.4, Y: 20.9, Z: 0.7)", version: "5.0" },
  { id: "5.0-011", name: "暗影之章 011", map: "雷克蘭德", time: "Any", weather: ["Any"], emote: "張望", hint: "雷克蘭德 (X: 18.4, Y: 18.7, Z: 0.5)", version: "5.0" },
  { id: "5.0-012", name: "暗影之章 012", map: "雷克蘭德", time: "Any", weather: ["Any"], emote: "張望", hint: "雷克蘭德 (X: 22.1, Y: 15.1, Z: 2.2)", version: "5.0" },
  { id: "5.0-013", name: "暗影之章 013", map: "雷克蘭德", time: "Any", weather: ["Any"], emote: "張望", hint: "雷克蘭德 (X: 6.3, Y: 15.2, Z: 2)", version: "5.0" },
  { id: "5.0-014", name: "暗影之章 014", map: "雷克蘭德", time: "Any", weather: ["Any"], emote: "張望", hint: "雷克蘭德 (X: 8.7, Y: 22.9, Z: 0.6)", version: "5.0" },
  { id: "5.0-015", name: "暗影之章 015", map: "雷克蘭德", time: "Any", weather: ["Any"], emote: "張望", hint: "雷克蘭德 (X: 21.5, Y: 36.2, Z: 0.3)", version: "5.0" },
  { id: "5.0-016", name: "暗影之章 016", map: "珂露西亞島", time: "Any", weather: ["Any"], emote: "張望", hint: "珂露西亞島 (X: 33.2, Y: 28.9, Z: 0.3)", version: "5.0" },
  { id: "5.0-017", name: "暗影之章 017", map: "珂露西亞島", time: "Any", weather: ["Any"], emote: "張望", hint: "珂露西亞島 (X: 28.8, Y: 22.1, Z: 0.3)", version: "5.0" },
  { id: "5.0-018", name: "暗影之章 018", map: "珂露西亞島", time: "Any", weather: ["Any"], emote: "張望", hint: "珂露西亞島 (X: 23.6, Y: 38.1, Z: 0.5)", version: "5.0" },
  { id: "5.0-019", name: "暗影之章 019", map: "珂露西亞島", time: "Any", weather: ["Any"], emote: "張望", hint: "珂露西亞島 (X: 18.2, Y: 29.3, Z: 0.4)", version: "5.0" },
  { id: "5.0-020", name: "暗影之章 020", map: "珂露西亞島", time: "Any", weather: ["Any"], emote: "張望", hint: "珂露西亞島 (X: 12.2, Y: 22.1, Z: 3.6)", version: "5.0" },
  { id: "5.0-021", name: "暗影之章 021", map: "珂露西亞島", time: "Any", weather: ["Any"], emote: "張望", hint: "珂露西亞島 (X: 13.6, Y: 9.8, Z: 4.6)", version: "5.0" },
  { id: "5.0-022", name: "暗影之章 022", map: "珂露西亞島", time: "Any", weather: ["Any"], emote: "張望", hint: "珂露西亞島 (X: 37.1, Y: 11.5, Z: 2.8)", version: "5.0" },
  { id: "5.0-023", name: "暗影之章 023", map: "安穆·艾蘭", time: "Any", weather: ["Any"], emote: "張望", hint: "安穆·艾蘭 (X: 33.2, Y: 13.7, Z: 0.7)", version: "5.0" },
  { id: "5.0-024", name: "暗影之章 024", map: "安穆·艾蘭", time: "Any", weather: ["Any"], emote: "張望", hint: "安穆·艾蘭 (X: 25.3, Y: 16.6, Z: 2.4)", version: "5.0" },
  { id: "5.0-025", name: "暗影之章 025", map: "安穆·艾蘭", time: "Any", weather: ["Any"], emote: "張望", hint: "安穆·艾蘭 (X: 28.5, Y: 31.9, Z: 0.7)", version: "5.0" },
  { id: "5.0-026", name: "暗影之章 026", map: "安穆·艾蘭", time: "Any", weather: ["Any"], emote: "張望", hint: "安穆·艾蘭 (X: 22.1, Y: 9.4, Z: 1.6)", version: "5.0" },
  { id: "5.0-027", name: "暗影之章 027", map: "安穆·艾蘭", time: "Any", weather: ["Any"], emote: "張望", hint: "安穆·艾蘭 (X: 11.1, Y: 16.9, Z: 1.7)", version: "5.0" },
  { id: "5.0-028", name: "暗影之章 028", map: "安穆·艾蘭", time: "Any", weather: ["Any"], emote: "張望", hint: "安穆·艾蘭 (X: 20.4, Y: 21.3, Z: 1.1)", version: "5.0" },
  { id: "5.0-029", name: "暗影之章 029", map: "伊爾美格", time: "Any", weather: ["Any"], emote: "張望", hint: "伊爾美格 (X: 14.8, Y: 31.9, Z: 0.9)", version: "5.0" },
  { id: "5.0-030", name: "暗影之章 030", map: "伊爾美格", time: "Any", weather: ["Any"], emote: "張望", hint: "伊爾美格 (X: 8.7, Y: 16.8, Z: 0.6)", version: "5.0" },
  { id: "5.0-031", name: "暗影之章 031", map: "伊爾美格", time: "Any", weather: ["Any"], emote: "張望", hint: "伊爾美格 (X: 20.2, Y: 4.6, Z: 1.2)", version: "5.0" },
  { id: "5.0-032", name: "暗影之章 032", map: "伊爾美格", time: "Any", weather: ["Any"], emote: "張望", hint: "伊爾美格 (X: 21.4, Y: 20.9, Z: -0.7)", version: "5.0" },
  { id: "5.0-033", name: "暗影之章 033", map: "伊爾美格", time: "Any", weather: ["Any"], emote: "張望", hint: "伊爾美格 (X: 20.8, Y: 16.2, Z: 1.7)", version: "5.0" },
  { id: "5.0-034", name: "暗影之章 034", map: "伊爾美格", time: "Any", weather: ["Any"], emote: "張望", hint: "伊爾美格 (X: 35.7, Y: 24.8, Z: 1.9)", version: "5.0" },
  { id: "5.0-035", name: "暗影之章 035", map: "拉凱提卡大森林", time: "Any", weather: ["Any"], emote: "張望", hint: "拉凱提卡大森林 (X: 13.6, Y: 32.4, Z: 0.3)", version: "5.0" },
  { id: "5.0-036", name: "暗影之章 036", map: "拉凱提卡大森林", time: "Any", weather: ["Any"], emote: "張望", hint: "拉凱提卡大森林 (X: 8.9, Y: 25.1, Z: 0.1)", version: "5.0" },
  { id: "5.0-037", name: "暗影之章 037", map: "拉凱提卡大森林", time: "Any", weather: ["Any"], emote: "張望", hint: "拉凱提卡大森林 (X: 4.4, Y: 27.2, Z: -0.9)", version: "5.0" },
  { id: "5.0-038", name: "暗影之章 038", map: "拉凱提卡大森林", time: "Any", weather: ["Any"], emote: "張望", hint: "拉凱提卡大森林 (X: 14.4, Y: 18.3, Z: 0.1)", version: "5.0" },
  { id: "5.0-039", name: "暗影之章 039", map: "拉凱提卡大森林", time: "Any", weather: ["Any"], emote: "張望", hint: "拉凱提卡大森林 (X: 29.1, Y: 19, Z: 0.3)", version: "5.0" },
  { id: "5.0-040", name: "暗影之章 040", map: "拉凱提卡大森林", time: "Any", weather: ["Any"], emote: "張望", hint: "拉凱提卡大森林 (X: 26.4, Y: 9.9, Z: 0.2)", version: "5.0" },
  { id: "5.0-041", name: "暗影之章 041", map: "黑風海", time: "Any", weather: ["Any"], emote: "張望", hint: "黑風海 (X: 33, Y: 16.2, Z: -1.5)", version: "5.0" },
  { id: "5.0-042", name: "暗影之章 042", map: "黑風海", time: "Any", weather: ["Any"], emote: "張望", hint: "黑風海 (X: 34.5, Y: 25.4, Z: -1.5)", version: "5.0" },
  { id: "5.0-043", name: "暗影之章 043", map: "黑風海", time: "Any", weather: ["Any"], emote: "張望", hint: "黑風海 (X: 37.1, Y: 6.6, Z: -1)", version: "5.0" },
  { id: "5.0-044", name: "暗影之章 044", map: "黑風海", time: "Any", weather: ["Any"], emote: "張望", hint: "黑風海 (X: 34.3, Y: 30.6, Z: -7.9)", version: "5.0" },
  { id: "5.0-045", name: "暗影之章 045", map: "黑風海", time: "Any", weather: ["Any"], emote: "張望", hint: "黑風海 (X: 13.7, Y: 36.8, Z: -4.1)", version: "5.0" },

  // 6.0
  { id: "6.0-001", name: "曉月之章 001", map: "舊薩雷安", time: "Any", weather: ["Any"], emote: "張望", hint: "舊薩雷安 (X: 15.6, Y: 8)", version: "6.0" },
  { id: "6.0-002", name: "曉月之章 002", map: "舊薩雷安", time: "Any", weather: ["Any"], emote: "張望", hint: "舊薩雷安 (X: 11.8, Y: 15.8)", version: "6.0" },
  { id: "6.0-003", name: "曉月之章 003", map: "舊薩雷安", time: "Any", weather: ["Any"], emote: "張望", hint: "舊薩雷安 (X: 13.2, Y: 15.1)", version: "6.0" },
  { id: "6.0-004", name: "曉月之章 004", map: "舊薩雷安", time: "Any", weather: ["Any"], emote: "張望", hint: "舊薩雷安 (X: 11.9, Y: 11.4)", version: "6.0" },
  { id: "6.0-005", name: "曉月之章 005", map: "舊薩雷安", time: "Any", weather: ["Any"], emote: "張望", hint: "舊薩雷安 (X: 4.3, Y: 13.3)", version: "6.0" },
  { id: "6.0-006", name: "曉月之章 006", map: "舊薩雷安", time: "Any", weather: ["Any"], emote: "張望", hint: "舊薩雷安 (X: 15.1, Y: 15.9)", version: "6.0" },
  { id: "6.0-007", name: "曉月之章 007", map: "舊薩雷安", time: "Any", weather: ["Any"], emote: "張望", hint: "舊薩雷安 (X: 12.4, Y: 10.3)", version: "6.0" },
  { id: "6.0-008", name: "曉月之章 008", map: "拉札罕", time: "Any", weather: ["Any"], emote: "張望", hint: "拉札罕 (X: 7.9, Y: 13.3)", version: "6.0" },
  { id: "6.0-009", name: "曉月之章 009", map: "拉札罕", time: "Any", weather: ["Any"], emote: "張望", hint: "拉札罕 (X: 10.6, Y: 15.3)", version: "6.0" },
  { id: "6.0-010", name: "曉月之章 010", map: "拉札罕", time: "Any", weather: ["Any"], emote: "張望", hint: "拉札罕 (X: 7.7, Y: 14.1)", version: "6.0" },
  { id: "6.0-011", name: "曉月之章 011", map: "拉札罕", time: "Any", weather: ["Any"], emote: "張望", hint: "拉札罕 (X: 11.3, Y: 7.2)", version: "6.0" },
  { id: "6.0-012", name: "曉月之章 012", map: "拉札罕", time: "Any", weather: ["Any"], emote: "張望", hint: "拉札罕 (X: 5.1, Y: 13.2)", version: "6.0" },
  { id: "6.0-013", name: "曉月之章 013", map: "拉札罕", time: "Any", weather: ["Any"], emote: "張望", hint: "拉札罕 (X: 10.8, Y: 12.1)", version: "6.0" },
  { id: "6.0-014", name: "曉月之章 014", map: "拉札罕", time: "Any", weather: ["Any"], emote: "張望", hint: "拉札罕 (X: 8.6, Y: 13.1)", version: "6.0" },
  { id: "6.0-015", name: "曉月之章 015", map: "迷津", time: "Any", weather: ["Any"], emote: "張望", hint: "迷津 (X: 20.4, Y: 7.5, Z: 3.9)", version: "6.0" },
  { id: "6.0-016", name: "曉月之章 016", map: "迷津", time: "Any", weather: ["Any"], emote: "張望", hint: "迷津 (X: 15.1, Y: 25.3, Z: 2.5)", version: "6.0" },
  { id: "6.0-017", name: "曉月之章 017", map: "迷津", time: "Any", weather: ["Any"], emote: "張望", hint: "迷津 (X: 31.4, Y: 16.1, Z: 2.9)", version: "6.0" },
  { id: "6.0-018", name: "曉月之章 018", map: "迷津", time: "Any", weather: ["Any"], emote: "張望", hint: "迷津 (X: 38.4, Y: 13.7, Z: 4)", version: "6.0" },
  { id: "6.0-019", name: "曉月之章 019", map: "迷津", time: "Any", weather: ["Any"], emote: "張望", hint: "迷津 (X: 22.4, Y: 22.9, Z: 2.6)", version: "6.0" },
  { id: "6.0-020", name: "曉月之章 020", map: "薩維奈島", time: "Any", weather: ["Any"], emote: "張望", hint: "薩維奈島 (X: 26.2, Y: 33.6, Z: 0.2)", version: "6.0" },
  { id: "6.0-021", name: "曉月之章 021", map: "薩維奈島", time: "Any", weather: ["Any"], emote: "張望", hint: "薩維奈島 (X: 13.4, Y: 25.6, Z: 0.1)", version: "6.0" },
  { id: "6.0-022", name: "曉月之章 022", map: "薩維奈島", time: "Any", weather: ["Any"], emote: "張望", hint: "薩維奈島 (X: 20.3, Y: 7.3, Z: 1.2)", version: "6.0" },
  { id: "6.0-023", name: "曉月之章 023", map: "薩維奈島", time: "Any", weather: ["Any"], emote: "張望", hint: "薩維奈島 (X: 33.1, Y: 24.2, Z: 0.5)", version: "6.0" },
  { id: "6.0-024", name: "曉月之章 024", map: "薩維奈島", time: "Any", weather: ["Any"], emote: "張望", hint: "薩維奈島 (X: 27.5, Y: 14.6, Z: 0.1)", version: "6.0" },
  { id: "6.0-025", name: "曉月之章 025", map: "薩維奈島", time: "Any", weather: ["Any"], emote: "張望", hint: "薩維奈島 (X: 10, Y: 14.8, Z: 0.2)", version: "6.0" },
  { id: "6.0-026", name: "曉月之章 026", map: "加雷馬", time: "Any", weather: ["Any"], emote: "張望", hint: "加雷馬 (X: 32.3, Y: 18.5, Z: -0.2)", version: "6.0" },
  { id: "6.0-027", name: "曉月之章 027", map: "加雷馬", time: "Any", weather: ["Any"], emote: "張望", hint: "加雷馬 (X: 29.1, Y: 36.7, Z: 0.4)", version: "6.0" },
  { id: "6.0-028", name: "曉月之章 028", map: "加雷馬", time: "Any", weather: ["Any"], emote: "張望", hint: "加雷馬 (X: 12.9, Y: 21.5, Z: 0.6)", version: "6.0" },
  { id: "6.0-029", name: "曉月之章 029", map: "加雷馬", time: "Any", weather: ["Any"], emote: "張望", hint: "加雷馬 (X: 9.4, Y: 14.9, Z: 0.5)", version: "6.0" },
  { id: "6.0-030", name: "曉月之章 030", map: "加雷馬", time: "Any", weather: ["Any"], emote: "張望", hint: "加雷馬 (X: 19.3, Y: 16.8, Z: 0.6)", version: "6.0" },
  { id: "6.0-031", name: "曉月之章 031", map: "加雷馬", time: "Any", weather: ["Any"], emote: "張望", hint: "加雷馬 (X: 29.1, Y: 8.7, Z: 0.3)", version: "6.0" },
  { id: "6.0-032", name: "曉月之章 032", map: "厄爾庇斯", time: "Any", weather: ["Any"], emote: "張望", hint: "厄爾庇斯 (X: 33, Y: 29.3, Z: 2)", version: "6.0" },
  { id: "6.0-033", name: "曉月之章 033", map: "厄爾庇斯", time: "Any", weather: ["Any"], emote: "張望", hint: "厄爾庇斯 (X: 10.1, Y: 26.2, Z: 3.1)", version: "6.0" },
  { id: "6.0-034", name: "曉月之章 034", map: "厄爾庇斯", time: "Any", weather: ["Any"], emote: "張望", hint: "厄爾庇斯 (X: 31.7, Y: 15.7, Z: 3.3)", version: "6.0" },
  { id: "6.0-035", name: "曉月之章 035", map: "厄爾庇斯", time: "Any", weather: ["Any"], emote: "張望", hint: "厄爾庇斯 (X: 15.1, Y: 13.5, Z: 5.1)", version: "6.0" },
  { id: "6.0-036", name: "曉月之章 036", map: "厄爾庇斯", time: "Any", weather: ["Any"], emote: "張望", hint: "厄爾庇斯 (X: 6.2, Y: 19.2, Z: 3.2)", version: "6.0" },
  { id: "6.0-037", name: "曉月之章 037", map: "嘆息海", time: "Any", weather: ["Any"], emote: "張望", hint: "嘆息海 (X: 11.3, Y: 22, Z: 1.5)", version: "6.0" },
  { id: "6.0-038", name: "曉月之章 038", map: "嘆息海", time: "Any", weather: ["Any"], emote: "張望", hint: "嘆息海 (X: 33.1, Y: 27.2, Z: -1.2)", version: "6.0" },
  { id: "6.0-039", name: "曉月之章 039", map: "嘆息海", time: "Any", weather: ["Any"], emote: "張望", hint: "嘆息海 (X: 21.9, Y: 13.7, Z: -1.4)", version: "6.0" },
  { id: "6.0-040", name: "曉月之章 040", map: "嘆息海", time: "Any", weather: ["Any"], emote: "張望", hint: "嘆息海 (X: 34.3, Y: 13.3, Z: -1.8)", version: "6.0" },
  { id: "6.0-041", name: "曉月之章 041", map: "嘆息海", time: "Any", weather: ["Any"], emote: "張望", hint: "嘆息海 (X: 7.4, Y: 15.5, Z: -1.2)", version: "6.0" },
  { id: "6.0-042", name: "曉月之章 042", map: "天外天垓", time: "Any", weather: ["Any"], emote: "張望", hint: "天外天垓 (X: 32.6, Y: 29.9, Z: 3.9)", version: "6.0" },
  { id: "6.0-043", name: "曉月之章 043", map: "天外天垓", time: "Any", weather: ["Any"], emote: "張望", hint: "天外天垓 (X: 27.5, Y: 13.1, Z: 2.7)", version: "6.0" },
  { id: "6.0-044", name: "曉月之章 044", map: "天外天垓", time: "Any", weather: ["Any"], emote: "張望", hint: "天外天垓 (X: 14.8, Y: 27.6, Z: 4.5)", version: "6.0" },
  { id: "6.0-045", name: "曉月之章 045", map: "天外天垓", time: "Any", weather: ["Any"], emote: "張望", hint: "天外天垓 (X: 8.4, Y: 18.2, Z: 0.4)", version: "6.0" },
  { id: "6.0-046", name: "曉月之章 046", map: "天外天垓", time: "Any", weather: ["Any"], emote: "張望", hint: "天外天垓 (X: 34.2, Y: 27.2, Z: 2.9)", version: "6.0" },

  // 7.0
  { id: "7.0-001", name: "金曦之章 001", map: "圖萊尤拉", time: "Any", weather: ["Any"], emote: "張望", hint: "圖萊尤拉 (X: 12.1, Y: 14)", version: "7.0" },
  { id: "7.0-002", name: "金曦之章 002", map: "圖萊尤拉", time: "Any", weather: ["Any"], emote: "張望", hint: "圖萊尤拉 (X: 7.9, Y: 10.7)", version: "7.0" },
  { id: "7.0-003", name: "金曦之章 003", map: "圖萊尤拉", time: "Any", weather: ["Any"], emote: "張望", hint: "圖萊尤拉 (X: 14.5, Y: 12.8)", version: "7.0" },
  { id: "7.0-004", name: "金曦之章 004", map: "圖萊尤拉", time: "Any", weather: ["Any"], emote: "張望", hint: "圖萊尤拉 (X: 17.2, Y: 11.1)", version: "7.0" },
  { id: "7.0-005", name: "金曦之章 005", map: "圖萊尤拉", time: "Any", weather: ["Any"], emote: "張望", hint: "圖萊尤拉 (X: 10.4, Y: 15.2)", version: "7.0" },
  { id: "7.0-006", name: "金曦之章 006", map: "奧闊帕恰山", time: "Any", weather: ["Any"], emote: "張望", hint: "奧闊帕恰山 (X: 29, Y: 12.6)", version: "7.0" },
  { id: "7.0-007", name: "金曦之章 007", map: "奧闊帕恰山", time: "Any", weather: ["Any"], emote: "張望", hint: "奧闊帕恰山 (X: 20.4, Y: 18.5)", version: "7.0" },
  { id: "7.0-008", name: "金曦之章 008", map: "奧闊帕恰山", time: "Any", weather: ["Any"], emote: "張望", hint: "奧闊帕恰山 (X: 33.1, Y: 24.2)", version: "7.0" },
  { id: "7.0-009", name: "金曦之章 009", map: "奧闊帕恰山", time: "Any", weather: ["Any"], emote: "張望", hint: "奧闊帕恰山 (X: 15.1, Y: 13.5)", version: "7.0" },
  { id: "7.0-010", name: "金曦之章 010", map: "奧闊帕恰山", time: "Any", weather: ["Any"], emote: "張望", hint: "奧闊帕恰山 (X: 10.1, Y: 26.2)", version: "7.0" },
  { id: "7.0-011", name: "金曦之章 011", map: "奧闊帕恰山", time: "Any", weather: ["Any"], emote: "張望", hint: "奧闊帕恰山 (X: 6.2, Y: 19.2)", version: "7.0" },
  { id: "7.0-012", name: "金曦之章 012", map: "克扎瑪烏卡濕地", time: "Any", weather: ["Any"], emote: "張望", hint: "克扎瑪烏卡濕地 (X: 9.1, Y: 11.9)", version: "7.0" },
  { id: "7.0-013", name: "金曦之章 013", map: "克扎瑪烏卡濕地", time: "Any", weather: ["Any"], emote: "張望", hint: "克扎瑪烏卡濕地 (X: 15.1, Y: 25.3)", version: "7.0" },
  { id: "7.0-014", name: "金曦之章 014", map: "克扎瑪烏卡濕地", time: "Any", weather: ["Any"], emote: "張望", hint: "克扎瑪烏卡濕地 (X: 31.4, Y: 16.1)", version: "7.0" },
  { id: "7.0-015", name: "金曦之章 015", map: "克扎瑪烏卡濕地", time: "Any", weather: ["Any"], emote: "張望", hint: "克扎瑪烏卡濕地 (X: 38.4, Y: 13.7)", version: "7.0" },
  { id: "7.0-016", name: "金曦之章 016", map: "克扎瑪烏卡濕地", time: "Any", weather: ["Any"], emote: "張望", hint: "克扎瑪烏卡濕地 (X: 22.4, Y: 22.9)", version: "7.0" },
  { id: "7.0-017", name: "金曦之章 017", map: "克扎瑪烏卡濕地", time: "Any", weather: ["Any"], emote: "張望", hint: "克扎瑪烏卡濕地 (X: 13.4, Y: 25.6)", version: "7.0" },
  { id: "7.0-018", name: "金曦之章 018", map: "亞克特爾樹海", time: "Any", weather: ["Any"], emote: "張望", hint: "亞克特爾樹海 (X: 11.5, Y: 14.1)", version: "7.0" },
  { id: "7.0-019", name: "金曦之章 019", map: "亞克特爾樹海", time: "Any", weather: ["Any"], emote: "張望", hint: "亞克特爾樹海 (X: 20.3, Y: 7.3)", version: "7.0" },
  { id: "7.0-020", name: "金曦之章 020", map: "亞克特爾樹海", time: "Any", weather: ["Any"], emote: "張望", hint: "亞克特爾樹海 (X: 33.1, Y: 24.2)", version: "7.0" },
  { id: "7.0-021", name: "金曦之章 021", map: "亞克特爾樹海", time: "Any", weather: ["Any"], emote: "張望", hint: "亞克特爾樹海 (X: 27.5, Y: 14.6)", version: "7.0" },
  { id: "7.0-022", name: "金曦之章 022", map: "亞克特爾樹海", time: "Any", weather: ["Any"], emote: "張望", hint: "亞克特爾樹海 (X: 10, Y: 14.8)", version: "7.0" },
  { id: "7.0-023", name: "金曦之章 023", map: "亞克特爾樹海", time: "Any", weather: ["Any"], emote: "張望", hint: "亞克特爾樹海 (X: 32.3, Y: 18.5)", version: "7.0" },
  { id: "7.0-024", name: "金曦之章 024", map: "夏勞尼荒野", time: "Any", weather: ["Any"], emote: "張望", hint: "夏勞尼荒野 (X: 28.5, Y: 29.9)", version: "7.0" },
  { id: "7.0-025", name: "金曦之章 025", map: "夏勞尼荒野", time: "Any", weather: ["Any"], emote: "張望", hint: "夏勞尼荒野 (X: 29.1, Y: 36.7)", version: "7.0" },
  { id: "7.0-026", name: "金曦之章 026", map: "夏勞尼荒野", time: "Any", weather: ["Any"], emote: "張望", hint: "夏勞尼荒野 (X: 12.9, Y: 21.5)", version: "7.0" },
  { id: "7.0-027", name: "金曦之章 027", map: "夏勞尼荒野", time: "Any", weather: ["Any"], emote: "張望", hint: "夏勞尼荒野 (X: 9.4, Y: 14.9)", version: "7.0" },
  { id: "7.0-028", name: "金曦之章 028", map: "夏勞尼荒野", time: "Any", weather: ["Any"], emote: "張望", hint: "夏勞尼荒野 (X: 19.3, Y: 16.8)", version: "7.0" },
  { id: "7.0-029", name: "金曦之章 029", map: "九號解決方案", time: "Any", weather: ["Any"], emote: "張望", hint: "九號解決方案 (X: 10.8, Y: 5.5)", version: "7.0" },
  { id: "7.0-030", name: "金曦之章 030", map: "九號解決方案", time: "Any", weather: ["Any"], emote: "張望", hint: "九號解決方案 (X: 29.1, Y: 8.7)", version: "7.0" },
  { id: "7.0-031", name: "金曦之章 031", map: "九號解決方案", time: "Any", weather: ["Any"], emote: "張望", hint: "九號解決方案 (X: 33, Y: 29.3)", version: "7.0" },
  { id: "7.0-032", name: "金曦之章 032", map: "九號解決方案", time: "Any", weather: ["Any"], emote: "張望", hint: "九號解決方案 (X: 10.1, Y: 26.2)", version: "7.0" },
  { id: "7.0-033", name: "金曦之章 033", map: "九號解決方案", time: "Any", weather: ["Any"], emote: "張望", hint: "九號解決方案 (X: 31.7, Y: 15.7)", version: "7.0" },
  { id: "7.0-034", name: "金曦之章 034", map: "遺產之地", time: "Any", weather: ["Any"], emote: "張望", hint: "遺產之地 (X: 33.4, Y: 13.5)", version: "7.0" },
  { id: "7.0-035", name: "金曦之章 035", map: "遺產之地", time: "Any", weather: ["Any"], emote: "張望", hint: "遺產之地 (X: 15.1, Y: 13.5)", version: "7.0" },
  { id: "7.0-036", name: "金曦之章 036", map: "遺產之地", time: "Any", weather: ["Any"], emote: "張望", hint: "遺產之地 (X: 6.2, Y: 19.2)", version: "7.0" },
  { id: "7.0-037", name: "金曦之章 037", map: "遺產之地", time: "Any", weather: ["Any"], emote: "張望", hint: "遺產之地 (X: 11.3, Y: 22)", version: "7.0" },
  { id: "7.0-038", name: "金曦之章 038", map: "遺產之地", time: "Any", weather: ["Any"], emote: "張望", hint: "遺產之地 (X: 33.1, Y: 27.2)", version: "7.0" },
  { id: "7.0-039", name: "金曦之章 039", map: "遺產之地", time: "Any", weather: ["Any"], emote: "張望", hint: "遺產之地 (X: 21.9, Y: 13.7)", version: "7.0" },
  { id: "7.0-040", name: "金曦之章 040", map: "活著的記憶", time: "Any", weather: ["Any"], emote: "張望", hint: "活著的記憶 (X: 21.9, Y: 36.2)", version: "7.0" },
  { id: "7.0-041", name: "金曦之章 041", map: "活著的記憶", time: "Any", weather: ["Any"], emote: "張望", hint: "活著的記憶 (X: 34.3, Y: 13.3)", version: "7.0" },
  { id: "7.0-042", name: "金曦之章 042", map: "活著的記憶", time: "Any", weather: ["Any"], emote: "張望", hint: "活著的記憶 (X: 7.4, Y: 15.5)", version: "7.0" },
  { id: "7.0-043", name: "金曦之章 043", map: "活著的記憶", time: "Any", weather: ["Any"], emote: "張望", hint: "活著的記憶 (X: 32.6, Y: 29.9)", version: "7.0" },
  { id: "7.0-044", name: "金曦之章 044", map: "活著的記憶", time: "Any", weather: ["Any"], emote: "張望", hint: "活著的記憶 (X: 27.5, Y: 13.1)", version: "7.0" },
  { id: "7.0-045", name: "金曦之章 045", map: "活著的記憶", time: "Any", weather: ["Any"], emote: "張望", hint: "活著的記憶 (X: 14.8, Y: 27.6)", version: "7.0" }
];
