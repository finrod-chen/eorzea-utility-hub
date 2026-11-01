export interface Aetheryte {
  id: string;
  name: { zh: string; ja: string; en: string };
  coords: { x: number; y: number; z: number };
}

export const AETHERYTE_DATA: Record<string, Aetheryte[]> = {
  // 拉諾西亞 (la_noscea)
  "middle_la_noscea": [
    { "id": "summerford_farms", "name": { "zh": "桑瑪弗德農場", "ja": "サマーフォード莊", "en": "Summerford Farms" }, "coords": { "x": 26.1, "y": 16.4, "z": 0 } }
  ],
  "lower_la_noscea": [
    { "id": "moraby_drydocks", "name": { "zh": "莫拉比造船廠", "ja": "モラビー造船廠", "en": "Moraby Drydocks" }, "coords": { "x": 24.6, "y": 35.0, "z": 0 } }
  ],
  "eastern_la_noscea": [
    { "id": "costa_del_sol", "name": { "zh": "太陽海岸", "ja": "コスタ・デル・ソル", "en": "Costa del Sol" }, "coords": { "x": 31.3, "y": 30.8, "z": 0 } },
    { "id": "wineport", "name": { "zh": "葡萄酒港", "ja": "ワインポート", "en": "Wineport" }, "coords": { "x": 21.1, "y": 21.6, "z": 0 } }
  ],
  "western_la_noscea": [
    { "id": "swiftperch", "name": { "zh": "雨燕塔殖民地", "ja": "スウィフトパーチ入植地", "en": "Swiftperch" }, "coords": { "x": 34.6, "y": 31.8, "z": 0 } },
    { "id": "aleport", "name": { "zh": "麥酒港", "ja": "エールポート", "en": "Aleport" }, "coords": { "x": 26.7, "y": 25.9, "z": 0 } }
  ],
  "upper_la_noscea": [
    { "id": "camp_bronze_lake", "name": { "zh": "青銅湖營地", "ja": "キャンプ・ブロンズレイク", "en": "Camp Bronze Lake" }, "coords": { "x": 30.3, "y": 23.4, "z": 0 } }
  ],

  // 黑衣森林 (the_black_shroud)
  "central_shroud": [
    { "id": "bentbranch_meadows", "name": { "zh": "彎枝牧場", "ja": "ベントブランチ牧場", "en": "Bentbranch Meadows" }, "coords": { "x": 21.8, "y": 22.2, "z": 0 } }
  ],
  "east_shroud": [
    { "id": "the_hawthorne_hut", "name": { "zh": "霍桑山莊", "ja": "ホウソーン家の山塞", "en": "The Hawthorne Hut" }, "coords": { "x": 17.8, "y": 27.5, "z": 0 } }
  ],
  "south_shroud": [
    { "id": "quarrymill", "name": { "zh": "石場水車", "ja": "クォーリーミル", "en": "Quarrymill" }, "coords": { "x": 25.1, "y": 20.1, "z": 0 } },
    { "id": "camp_tranquil", "name": { "zh": "寧靜路營地", "ja": "キャンプ・トランキル", "en": "Camp Tranquil" }, "coords": { "x": 16.9, "y": 28.6, "z": 0 } }
  ],
  "north_shroud": [
    { "id": "fallgourd_float", "name": { "zh": "秋瓜湖棧橋", "ja": "フォールゴウド", "en": "Fallgourd Float" }, "coords": { "x": 20.6, "y": 26.1, "z": 0 } }
  ],

  // 薩納蘭 (thanalan)
  "western_thanalan": [
    { "id": "horizon", "name": { "zh": "地平關", "ja": "ホライゾン", "en": "Horizon" }, "coords": { "x": 22.9, "y": 16.9, "z": 0 } }
  ],
  "central_thanalan": [
    { "id": "black_brush_station", "name": { "zh": "黑塵驛站", "ja": "ブラックブラッシュ停留所", "en": "Black Brush Station" }, "coords": { "x": 21.1, "y": 18.2, "z": 0 } }
  ],
  "eastern_thanalan": [
    { "id": "camp_drybone", "name": { "zh": "枯骨營地", "ja": "キャンプ・ドライボーン", "en": "Camp Drybone" }, "coords": { "x": 13.8, "y": 24.3, "z": 0 } }
  ],
  "southern_thanalan": [
    { "id": "little_ala_mhigo", "name": { "zh": "小阿拉米格", "ja": "リトルアラミゴ", "en": "Little Ala Mhigo" }, "coords": { "x": 18.3, "y": 13.2, "z": 0 } },
    { "id": "forgotten_springs", "name": { "zh": "遺忘綠洲", "ja": "忘れられたオアシス", "en": "Forgotten Springs" }, "coords": { "x": 15.0, "y": 29.6, "z": 0 } }
  ],
  "northern_thanalan": [
    { "id": "camp_bluefog", "name": { "zh": "藍霧營地", "ja": "キャンプ・ブルーフォグ", "en": "Camp Bluefog" }, "coords": { "x": 21.9, "y": 30.6, "z": 0 } },
    { "id": "ceruleum_processing_plant", "name": { "zh": "青燐精煉所", "ja": "青燐精製所", "en": "Ceruleum Processing Plant" }, "coords": { "x": 21.0, "y": 20.9, "z": 0 } }
  ],

  // 庫爾札斯 (coerthas)
  "coerthas_central_highlands": [
    { "id": "camp_dragonhead", "name": { "zh": "巨龍首營地", "ja": "キャンプ・ドラゴンヘッド", "en": "Camp Dragonhead" }, "coords": { "x": 26.0, "y": 16.8, "z": 0 } }
  ],
  "coerthas_western_highlands": [
    { "id": "falcons_nest", "name": { "zh": "隼巢", "ja": "ファルコンネスト", "en": "Falcon's Nest" }, "coords": { "x": 32.1, "y": 36.8, "z": 0 } }
  ],

  // 摩杜納 (mor_dhona)
  "mor_dhona": [
    { "id": "revenants_toll", "name": { "zh": "喪靈鐘", "ja": "レヴナンツトール", "en": "Revenant's Toll" }, "coords": { "x": 22.3, "y": 8.1, "z": 0 } }
  ],

  // 阿巴拉提亞 (abalathia)
  "the_sea_of_clouds": [
    { "id": "camp_cloudtop", "name": { "zh": "雲頂營地", "ja": "キャンプ・クラウドトップ", "en": "Camp Cloudtop" }, "coords": { "x": 10.3, "y": 33.6, "z": 0 } },
    { "id": "ok_zundu", "name": { "zh": "奧克·茲恩德", "ja": "オク・ズンド", "en": "Ok' Zundu" }, "coords": { "x": 10.5, "y": 14.2, "z": 0 } }
  ],
  "azys_lla": [
    { "id": "helix", "name": { "zh": "螺旋港", "ja": "ポート・ヘリックス", "en": "Helix" }, "coords": { "x": 32.7, "y": 35.3, "z": 0 } }
  ],

  // 龍堡 (dravania)
  "the_dravanian_forelands": [
    { "id": "tailfeather", "name": { "zh": "尾羽集落", "ja": "テイルフェザー", "en": "Tailfeather" }, "coords": { "x": 33.2, "y": 23.2, "z": 0 } },
    { "id": "anyx_trine", "name": { "zh": "不潔三塔", "ja": "不浄の三塔", "en": "Anyx Trine" }, "coords": { "x": 16.5, "y": 23.3, "z": 0 } }
  ],
  "the_churning_mists": [
    { "id": "moghome", "name": { "zh": "莫古力之家", "ja": "モグモグホーム", "en": "Moghome" }, "coords": { "x": 27.9, "y": 34.3, "z": 0 } },
    { "id": "zenith", "name": { "zh": "天極白堊宮", "ja": "白亜の宮殿", "en": "Zenith" }, "coords": { "x": 10.8, "y": 28.9, "z": 0 } }
  ],
  "the_dravanian_hinterlands": [
    { "id": "idyllshire", "name": { "zh": "田園郡", "ja": "イディルシャイア", "en": "Idyllshire" }, "coords": { "x": 7.6, "y": 5.7, "z": 0 } }
  ],

  // 基拉巴尼亞 (gyr_abania)
  "the_fringes": [
    { "id": "castrum_oriens", "name": { "zh": "基拉巴尼亞邊區", "ja": "カストルム・オリエンス", "en": "Castrum Oriens" }, "coords": { "x": 8.9, "y": 11.3, "z": 0 } },
    { "id": "peering_stones", "name": { "zh": "對等石", "ja": "ピーリングストーンズ", "en": "Peering Stones" }, "coords": { "x": 29.9, "y": 26.3, "z": 0 } }
  ],
  "the_peaks": [
    { "id": "ala_gannha", "name": { "zh": "阿拉加納", "ja": "アラガンニャ", "en": "Ala Gannha" }, "coords": { "x": 23.7, "y": 6.5, "z": 0 } },
    { "id": "ala_ghiri", "name": { "zh": "阿拉基利", "ja": "アラギリ", "en": "Ala Ghiri" }, "coords": { "x": 16.1, "y": 36.4, "z": 0 } }
  ],
  "the_lochs": [
    { "id": "porta_praetoria", "name": { "zh": "天營門", "ja": "ポルタ・プレトリア", "en": "Porta Praetoria" }, "coords": { "x": 8.5, "y": 21.1, "z": 0 } },
    { "id": "ala_mhigan_quarter", "name": { "zh": "阿拉米格人居住區", "ja": "アラミガン・クォーター", "en": "Ala Mhigan Quarter" }, "coords": { "x": 33.6, "y": 34.0, "z": 0 } }
  ],

  // 東方地區 (othard)
  "the_ruby_sea": [
    { "id": "tamamizu", "name": { "zh": "碧玉水", "ja": "碧のタマミズ", "en": "Tamamizu" }, "coords": { "x": 28.7, "y": 16.3, "z": 0 } },
    { "id": "onokoro", "name": { "zh": "痙攣寨", "ja": "オノコロ島", "en": "Onokoro" }, "coords": { "x": 23.3, "y": 9.8, "z": 0 } }
  ],
  "yanxia": [
    { "id": "house_of_the_fierce", "name": { "zh": "烈士庵", "ja": "烈士庵", "en": "House of the Fierce" }, "coords": { "x": 26.5, "y": 13.5, "z": 0 } },
    { "id": "namai", "name": { "zh": "茨菰村", "ja": "ナマイ村", "en": "Namai" }, "coords": { "x": 30.2, "y": 19.7, "z": 0 } }
  ],
  "the_azim_steppe": [
    { "id": "reunion", "name": { "zh": "重逢集市", "ja": "再會の市", "en": "Reunion" }, "coords": { "x": 32.6, "y": 28.3, "z": 0 } },
    { "id": "dawn_throne", "name": { "zh": "晨曦王座", "ja": "明けの玉座", "en": "Dawn Throne" }, "coords": { "x": 23.0, "y": 22.2, "z": 0 } },
    { "id": "dhoro_iloh", "name": { "zh": "多洛衣樓", "ja": "ドォーロ・イロー", "en": "Dhoro Iloh" }, "coords": { "x": 6.4, "y": 23.8, "z": 0 } }
  ],

  // 諾弗蘭特 (norvrandt)
  "lakeland": [
    { "id": "fort_jobb", "name": { "zh": "喬布要塞", "ja": "ジョブ砦", "en": "Fort Jobb" }, "coords": { "x": 36.6, "y": 20.9, "z": 0 } },
    { "id": "the_ostall_imperative", "name": { "zh": "奧斯塔爾嚴命城", "ja": "オスタル厳命城", "en": "The Ostall Imperative" }, "coords": { "x": 6.8, "y": 16.9, "z": 0 } }
  ],
  "kholusia": [
    { "id": "stilltide", "name": { "zh": "滯潮村", "ja": "スティルタイド", "en": "Stilltide" }, "coords": { "x": 34.9, "y": 27.3, "z": 0 } },
    { "id": "wright", "name": { "zh": "萊特村", "ja": "ライト", "en": "Wright" }, "coords": { "x": 16.6, "y": 29.2, "z": 0 } },
    { "id": "tomra", "name": { "zh": "圖姆拉村", "ja": "トメラの村", "en": "Tomra" }, "coords": { "x": 13.0, "y": 9.0, "z": 0 } }
  ],
  "amh_araeng": [
    { "id": "mord_souq", "name": { "zh": "鼴靈集市", "ja": "モルド・スーク", "en": "Mord Souq" }, "coords": { "x": 26.4, "y": 17.0, "z": 0 } },
    { "id": "inn_at_journeys_head", "name": { "zh": "上路客店", "ja": "旅立ちの宿", "en": "Inn at Journey's Head" }, "coords": { "x": 29.6, "y": 27.5, "z": 0 } },
    { "id": "twine", "name": { "zh": "絡尾聚落", "ja": "トゥワイン", "en": "Twine" }, "coords": { "x": 11.3, "y": 17.2, "z": 0 } }
  ],
  "il_mheg": [
    { "id": "lydha_lran", "name": { "zh": "群花館", "ja": "リディ・ララン", "en": "Lydha Lran" }, "coords": { "x": 14.6, "y": 31.7, "z": 0 } },
    { "id": "pla_enni", "name": { "zh": "普拉恩尼茸洞", "ja": "プラ・エンニ茸窟", "en": "Pla Enni" }, "coords": { "x": 20.1, "y": 4.3, "z": 0 } },
    { "id": "wolekdorf", "name": { "zh": "雲村", "ja": "ヴォレクドルフ", "en": "Wolekdorf" }, "coords": { "x": 29.1, "y": 7.7, "z": 0 } }
  ],
  "the_rak_tika_greatwood": [
    { "id": "slitherbough", "name": { "zh": "蛇行枝", "ja": "スリザーバウ", "en": "Slitherbough" }, "coords": { "x": 19.4, "y": 27.4, "z": 0 } },
    { "id": "fanow", "name": { "zh": "法諾村", "ja": "ファノヴの裡", "en": "Fanow" }, "coords": { "x": 29.1, "y": 17.6, "z": 0 } }
  ],
  "the_tempest": [
    { "id": "the_ondo_cups", "name": { "zh": "鰭人潮池", "ja": "オンドの潮溜まり", "en": "The Ondo Cups" }, "coords": { "x": 32.7, "y": 17.5, "z": 0 } },
    { "id": "the_macarenses_angle", "name": { "zh": "馬克連薩斯廣場", "ja": "マカレンサス広場", "en": "The Macarenses Angle" }, "coords": { "x": 18.7, "y": 25.9, "z": 0 } }
  ],

  // 伊爾薩巴德 (ilsabard)
  "labyrinthos": [
    { "id": "the_archeion", "name": { "zh": "公堂保管院", "ja": "アルケイオン保管院", "en": "The Archeion" }, "coords": { "x": 30.4, "y": 11.9, "z": 0 } },
    { "id": "sharlayan_hamlet", "name": { "zh": "小薩雷安", "ja": "シャーレアン大集落", "en": "Sharlayan Hamlet" }, "coords": { "x": 21.7, "y": 20.5, "z": 0 } },
    { "id": "aporia", "name": { "zh": "無路總部", "ja": "アポリア本部", "en": "Aporia" }, "coords": { "x": 6.9, "y": 27.5, "z": 0 } }
  ],
  "thavnair": [
    { "id": "yedlihmad", "name": { "zh": "新港", "ja": "イェドリマド", "en": "Yedlihmad" }, "coords": { "x": 25.4, "y": 34.1, "z": 0 } },
    { "id": "great_work", "name": { "zh": "代米爾遺烈鄉", "ja": "デミールの遺烈郷", "en": "Great Work" }, "coords": { "x": 10.9, "y": 22.2, "z": 0 } },
    { "id": "palaka_stand", "name": { "zh": "帕拉卡清修地", "ja": "パーラカの裡", "en": "Palaka's Stand" }, "coords": { "x": 29.6, "y": 16.6, "z": 0 } }
  ],
  "garlemald": [
    { "id": "camp_broken_glass", "name": { "zh": "碎璃營地", "ja": "キャンプ・ブロークングラス", "en": "Camp Broken Glass" }, "coords": { "x": 13.3, "y": 31.1, "z": 0 } },
    { "id": "tertium", "name": { "zh": "第三站", "ja": "テルティウム駅", "en": "Tertium" }, "coords": { "x": 31.9, "y": 17.9, "z": 0 } }
  ],
  "mare_lamentorum": [
    { "id": "sinus_lacrimarum", "name": { "zh": "淚灣", "ja": "シヌス・ラクリマラム", "en": "Sinus Lacrimarum" }, "coords": { "x": 10.1, "y": 34.5, "z": 0 } },
    { "id": "bestways_burrow", "name": { "zh": "最佳威兔洞", "ja": "ベストウェイ・バロー", "en": "Bestways Burrow" }, "coords": { "x": 21.5, "y": 11.2, "z": 0 } }
  ],
  "elpis": [
    { "id": "anagnorisis", "name": { "zh": "醒悟天測園", "ja": "アナグノリシス天測園", "en": "Anagnorisis" }, "coords": { "x": 24.7, "y": 24.0, "z": 0 } },
    { "id": "poieten_otopsia", "name": { "zh": "創作者之家", "ja": "ポイエーテン・オトプシア", "en": "Poieten Otopsia" }, "coords": { "x": 10.8, "y": 17.0, "z": 0 } },
    { "id": "the_twelve_wonders", "name": { "zh": "十二奇園", "ja": "十二節の園", "en": "The Twelve Wonders" }, "coords": { "x": 8.8, "y": 32.4, "z": 0 } }
  ],
  "ultima_thule": [
    { "id": "reahs_tahra", "name": { "zh": "半途終旅", "ja": "リア・ターラ", "en": "Reah Tahra" }, "coords": { "x": 10.6, "y": 26.8, "z": 0 } },
    { "id": "base_omicron", "name": { "zh": "奧密克戎基地", "ja": "オミクロン・ベース", "en": "Base Omicron" }, "coords": { "x": 31.3, "y": 28.1, "z": 0 } },
    { "id": "ostrakon_deka_hexi", "name": { "zh": "異亞村落", "ja": "アビオド・オブ・ジ・エア", "en": "Abode of the Ea" }, "coords": { "x": 22.7, "y": 8.3, "z": 0 } }
  ],

  // 圖拉利亞 (tural)
  "urqopacha": [
    { "id": "wachunpelo", "name": { "zh": "瓦丘恩佩洛", "ja": "ワチュン・ペロ", "en": "Wachunpelo" }, "coords": { "x": 28.1, "y": 13.2, "z": 0 } },
    { "id": "worlars_echo", "name": { "zh": "沃拉的迴響", "ja": "ウォーラーズ・エコー", "en": "Worlar's Echo" }, "coords": { "x": 30.8, "y": 34.2, "z": 0 } }
  ],
  "kozamauka": [
    { "id": "ok_hanu", "name": { "zh": "哈努聚落", "ja": "オック・ハヌ", "en": "Ok' Hanu" }, "coords": { "x": 18.0, "y": 20.0, "z": 0 } },
    { "id": "earthenshire", "name": { "zh": "土陶郡", "ja": "アースンシャイア", "en": "Earthenshire" }, "coords": { "x": 11.9, "y": 27.7, "z": 0 } },
    { "id": "many_fires", "name": { "zh": "朋友的燈火", "ja": "メニーファイア集落", "en": "Many Fires" }, "coords": { "x": 32.3, "y": 25.6, "z": 0 } },
    { "id": "dock_poga", "name": { "zh": "水果碼頭", "ja": "ポガ港", "en": "Dock Poga" }, "coords": { "x": 37.3, "y": 16.8, "z": 0 } }
  ],
  "yaktel": [
    { "id": "iq_br_aak", "name": { "zh": "紅豹村", "ja": "イク・ブラージャ", "en": "Iq Br'aak" }, "coords": { "x": 13.5, "y": 12.9, "z": 0 } },
    { "id": "mamook", "name": { "zh": "瑪穆克", "ja": "マムーク", "en": "Mamook" }, "coords": { "x": 35.9, "y": 32.0, "z": 0 } }
  ],
  "shaaloani": [
    { "id": "meyhane", "name": { "zh": "美花黑澤恩", "ja": "メ瓦ヘイゾーン", "en": "Meyhane" }, "coords": { "x": 27.7, "y": 10.1, "z": 0 } },
    { "id": "sheshenewezi_springs", "name": { "zh": "謝申內青燐泉", "ja": "シェシェネ青燐泉", "en": "Sheshenewezi Springs" }, "coords": { "x": 15.7, "y": 19.2, "z": 0 } },
    { "id": "hhusatahwi", "name": { "zh": "胡薩塔伊驛鎮", "ja": "フーサタイ宿場町", "en": "Hhusatahwi" }, "coords": { "x": 29.1, "y": 30.8, "z": 0 } }
  ],
  "heritage_found": [
    { "id": "the_outskirts", "name": { "zh": "邊郊鎮", "ja": "アウトスカーツ", "en": "The Outskirts" }, "coords": { "x": 17.1, "y": 9.8, "z": 0 } },
    { "id": "electrope_strike", "name": { "zh": "雷轉質礦場", "ja": "エレクトロープ採石場", "en": "Electrope Strike" }, "coords": { "x": 17.1, "y": 23.9, "z": 0 } },
    { "id": "yyasulani_station", "name": { "zh": "亞斯拉尼站", "ja": "ヤースラニ駅", "en": "Yyasulani Station" }, "coords": { "x": 31.8, "y": 25.6, "z": 0 } }
  ],
  "living_memory": [
    { "id": "leynode_mnemes", "name": { "zh": "地場節點．憶", "ja": "レイノード・ムネモ", "en": "Leynode Mnemes" }, "coords": { "x": 21.5, "y": 37.3, "z": 0 } },
    { "id": "leynode_aero", "name": { "zh": "地場節點．風", "ja": "レイノード・エアロ", "en": "Leynode Aero" }, "coords": { "x": 16.4, "y": 13.6, "z": 0 } },
    { "id": "leynode_pyro", "name": { "zh": "地場節點．火", "ja": "レイノード・パイロ", "en": "Leynode Pyro" }, "coords": { "x": 34.7, "y": 15.8, "z": 0 } }
  ]
};
