import React from 'react';
import { useTranslation } from 'react-i18next';
import { ExternalLink, Globe, Video, Book, Palette, Home, Database, Wrench, Image, Trophy, MessageSquare } from 'lucide-react';

interface LinkItem {
  title: string;
  url: string;
  desc?: string;
}

interface LinkCategory {
  title: string;
  icon: any;
  links: LinkItem[];
  color: string;
}

export default function UsefulLinks() {
  const { t } = useTranslation();

  const categories = [
    {
      title: t('usefulLinks.officialTW'),
      icon: Globe,
      color: 'text-amber-500',
      links: [
        { title: 'FINAL FANTASY XIV 繁中版官方', url: 'https://www.ffxiv.com.tw/pr/index.html' },
        { title: 'FINAL FANTASY XIV 繁中版Facebook', url: 'https://www.facebook.com/FinalFantasyXIVTC' },
        { title: 'FINAL FANTASY XIV 繁中版YouTube', url: 'https://www.youtube.com/@ffxivtc' },
      ]
    },
    {
      title: t('usefulLinks.categories.glamourVideo'),
      icon: Video,
      color: 'text-rose-500',
      links: [
        { title: '我叫M醬 - 外觀、坐騎、動作', url: 'https://space.bilibili.com/143567' },
        { title: '真的好欺負人啊 - 主題穿搭', url: 'https://space.bilibili.com/4836932' },
        { title: '魚泉沙 - 主題穿搭', url: 'https://space.bilibili.com/1891878316' },
        { title: '重裝五對負重輪 - 全職業盔甲幻化', url: 'https://space.bilibili.com/170070545/lists/717628?type=season' },
        { title: '醫行威 - 全職業幻化', url: 'https://space.bilibili.com/107978760/lists/1966460?type=season' },
        { title: '粒子黑洞吖粒黑 - 拉拉肥穿搭幻化', url: 'https://space.bilibili.com/8702049' },
        { title: '贒酒贒酒 - 龍娘穿搭幻化', url: 'https://space.bilibili.com/17393918/lists/319738?type=season' },
        { title: '早坂燈裡 - 貓娘穿搭幻化', url: 'https://space.bilibili.com/672553' },
        { title: '賀牌熱牛奶 - 男精穿搭幻化', url: 'https://space.bilibili.com/173908061' },
        { title: '榆野森森 – 低版本坐騎、表情', url: 'https://space.bilibili.com/482834395' },
        { title: '第四期重建特供愛德格 - 房屋裝修參考', url: 'https://space.bilibili.com/15516142' },
      ]
    },
    {
      title: t('usefulLinks.categories.hardContent'),
      icon: Book,
      color: 'text-indigo-500',
      links: [
        { title: '子言姐姐 – bilibili高難攻略', url: 'https://space.bilibili.com/293917?spm_id_from=333.337.0.0' },
        { title: '菓子君_Okashi – bilibili高難攻略', url: 'https://space.bilibili.com/932340?spm_id_from=333.337.0.0' },
        { title: '素です – bilibili高難攻略', url: 'https://space.bilibili.com/899736' },
        { title: '萌神神 攻略庫 - 6.0前 高難攻略', url: 'https://moeshen.cn/ffxiv/home/' },
        { title: '中文攻略 - 簡短易懂', url: 'https://ff14.org/duty/' },
        { title: '中文攻略網站 - 灰機維基', url: 'https://ff14.huijiwiki.com/wiki/%E8%BF%B7%E5%AE%AB%E6%8C%91%E6%88%98#%E5%89%AF%E6%9C%AC%E5%AF%BC%E8%88%AA' },
      ]
    },
    {
      title: t('usefulLinks.categories.hardContentJP'),
      icon: Globe,
      color: 'text-emerald-500',
      links: [
        { title: 'ぬけまるG – youtube高難攻略', url: 'https://www.youtube.com/@nukemarugames' },
        { title: 'ハムカツトンカツ – youtube高難攻略', url: 'https://www.youtube.com/@hamukatsu' },
        { title: 'GAME8 - 圖文配影片高難攻略', url: 'https://game8.jp/ff14' },
        { title: 'GAME8 - 4人副本攻略', url: 'https://game8.jp/ff14/275813#hl_6' },
        { title: 'GAME8 - 8人副本攻略', url: 'https://game8.jp/ff14/283755#hm_9' },
      ]
    },
    {
      title: t('usefulLinks.categories.collection'),
      icon: Trophy,
      color: 'text-yellow-500',
      links: [
        { title: 'FFXIV Collect – 坐騎、髮型、動作收集', url: 'https://ffxivcollect.com/' },
      ]
    },
    {
      title: t('usefulLinks.categories.lore'),
      icon: MessageSquare,
      color: 'text-purple-500',
      links: [
        { title: '顧跑跑 - 1.0 劇情', url: 'https://space.bilibili.com/1783244/lists/270296?type=series' },
        { title: '顧跑跑 - 2.0 劇情', url: 'https://space.bilibili.com/1783244/lists/270295?type=series' },
        { title: '顧跑跑 - 3.0 劇情', url: 'https://space.bilibili.com/1783244/lists/270292?type=series' },
        { title: '顧跑跑 - 4.0 劇情', url: 'https://space.bilibili.com/1783244/lists/2148791?type=series' },
        { title: '宸詡想要勤更新 - 1.0~7.1 劇情', url: 'https://www.bilibili.com/video/BV1Pg4y177yw/' },
      ]
    },
    {
      title: t('usefulLinks.categories.glamourText'),
      icon: Palette,
      color: 'text-pink-500',
      links: [
        { title: 'Eorzea Collection – 幻化網站 (英文)', url: 'https://ffxiv.eorzeacollection.com/' },
        { title: 'ミラプリライフ - 裝備預覽 (日文)', url: 'https://ff14-fc.com/' },
      ]
    },
    {
      title: t('usefulLinks.categories.housing'),
      icon: Home,
      color: 'text-sky-500',
      links: [
        { title: 'FFXIV Housing – 家具百科', url: 'https://cn.ff14housing.com/' },
        { title: 'HousingEden – 家具百科', url: 'https://ff14eden.work/?v=1.3.4#/components/furnishings/' },
        { title: 'HOUSING SNAP – 完整裝潢參考', url: 'https://housingsnap.com/' },
        { title: 'Studio-XIV – 攝影棚景裝潢參考', url: 'https://studio-xiv.com/' },
      ]
    },
    {
      title: t('usefulLinks.categories.database'),
      icon: Database,
      color: 'text-slate-400',
      links: [
        { title: '灰機 - FF14 維基資料庫', url: 'https://ff14.huijiwiki.com/wiki/%E9%A6%96%E9%A1%B5' },
        { title: '素素攻略站 – 資料庫', url: 'https://www.ffxiv.cn/v2/' },
        { title: 'The Lodestone - 官方資料站 (英文)', url: 'https://na.finalfantasyxiv.com/lodestone/' },
      ]
    },
    {
      title: t('usefulLinks.categories.crafting'),
      icon: Wrench,
      color: 'text-orange-500',
      links: [
        { title: 'FFXIV Teamcraft - 團隊製作與計畫', url: 'https://ffxivteamcraft.com/search' },
        { title: '製造物品計算機', url: 'https://nightcoreisla.github.io/ffxiv-best-craft-zhtw/#/welcome' },
        { title: '釣魚時鐘 (魚糕)', url: 'https://fish.ffmomola.com/#/' },
      ]
    },
    {
      title: t('usefulLinks.categories.images'),
      icon: Image,
      color: 'text-cyan-500',
      links: [
        { title: 'FF14 相關 GIF 圖', url: 'https://tenor.com/zh-TW/search/lalafell-ffxiv-gifs' },
      ]
    }
  ];

  return (
    <div className="space-y-10">
      <header className="space-y-4">
        <div className="flex items-center gap-3">
          <img src="/tools/UsefulLinks.png" alt="" className="w-6 h-6 object-contain" referrerPolicy="no-referrer" />
          <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-[#D39E47]">Useful Links</h2>
        </div>
        <h1 className="text-4xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
          {t('usefulLinks.title')} <span className="text-[#D39E47]">{t('usefulLinks.subtitle').split(' ')[0]}</span>
        </h1>
        <p className="text-[#9e9e9e] max-w-2xl leading-relaxed">
          {t('usefulLinks.subtitle')}
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {categories.map((category, idx) => (
          <div 
            key={idx}
            className="bg-[#1a1a1a] border border-white/5 rounded-3xl p-6 hover:border-white/10 transition-all flex flex-col"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className={`p-2.5 rounded-xl bg-white/5 ${category.color}`}>
                <category.icon size={20} />
              </div>
              <h3 className="font-bold text-white tracking-wide">{category.title}</h3>
            </div>
            
            <div className="space-y-2 flex-1">
              {category.links.map((link, lIdx) => (
                <a
                  key={lIdx}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors group"
                >
                  <span className="text-sm text-[#9e9e9e] group-hover:text-white transition-colors line-clamp-1">
                    {link.title}
                  </span>
                  <ExternalLink size={14} className="text-white/20 group-hover:text-[#D39E47] transition-colors shrink-0" />
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>

      <footer className="pt-10 pb-6 border-t border-white/5">
        <p className="text-[11px] text-[#9e9e9e] leading-relaxed">
          {t('usefulLinks.footer')}
        </p>
      </footer>
    </div>
  );
}
