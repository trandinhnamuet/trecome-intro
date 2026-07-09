// ---------------------------------------------------------------------------
// Vietnam e-commerce market data shown in the "Thị trường TMĐT" homepage section.
//
// Figures are from Metric's published Vietnam e-commerce reports (which aggregate
// the 5 platforms Shopee, Lazada, TikTok Shop, Tiki, Sendo — Shopee being the
// market leader). They are cross-checked across Metric, VnEconomy, CafeF, VTV,
// LaoDong and Forbes VN. Internal consistency check: 2024 = 318.900 tỷ đ,
// 2025 = 429.700 tỷ đ -> +34,75%, matching the reported growth.
//
// There is NO public API for platform-wide Shopee data, so this is NOT a live
// feed — update it here when a new report is published (roughly quarterly).
// Sources:
//   - https://ecommercereport.metric.vn/bc2024/  (full year 2024)
//   - https://metric.vn/insights/cong-bo-bao-cao-thuong-mai-dien-tu-viet-nam-2025/ (2025)
//   - https://forbes.vn (Shopee ~64% market share, 2024)
// ---------------------------------------------------------------------------

export type Lang = 'vi' | 'en';
export type L = Record<Lang, string>;

export const MARKET_HEAD = {
  eyebrow: { vi: 'THỊ TRƯỜNG TMĐT VIỆT NAM', en: 'VIETNAM E-COMMERCE MARKET' },
  title: {
    vi: 'Thị trường đang bùng nổ — đây là lúc lên sàn.',
    en: 'A booming market — now is the time to sell online.',
  },
  subtitle: {
    vi: 'Số liệu thị trường mới nhất từ các sàn TMĐT lớn, dẫn đầu là Shopee. Cơ hội cho thương hiệu của bạn đang rất rộng mở.',
    en: 'The latest figures from the major platforms, led by Shopee. The opportunity for your brand is wide open.',
  },
};

export interface MarketStat {
  value: number;
  decimals?: number;
  prefix?: string;
  unit?: L; // rendered small, after the number
  label: L;
  desc: L;
}

// Big count-up numbers (the "market is huge & growing" headline)
export const MARKET_STATS: MarketStat[] = [
  {
    value: 429700,
    unit: { vi: 'tỷ đ', en: 'B₫' },
    label: { vi: 'Doanh thu TMĐT Việt Nam', en: 'Vietnam e-commerce revenue' },
    desc: { vi: 'Tổng 5 sàn trong năm 2025', en: 'Across the 5 platforms in 2025' },
  },
  {
    value: 34.75,
    decimals: 2,
    prefix: '+',
    unit: { vi: '%', en: '%' },
    label: { vi: 'Tăng trưởng doanh thu', en: 'Revenue growth' },
    desc: { vi: 'Năm 2025 so với 2024', en: '2025 versus 2024' },
  },
  {
    value: 3.94,
    decimals: 2,
    unit: { vi: 'tỷ', en: 'B' },
    label: { vi: 'Sản phẩm bán ra', en: 'Products sold' },
    desc: { vi: 'Giao thành công trong năm 2025', en: 'Delivered in 2025' },
  },
  {
    value: 64,
    prefix: '~',
    unit: { vi: '%', en: '%' },
    label: { vi: 'Thị phần Shopee', en: 'Shopee market share' },
    desc: { vi: 'Dẫn đầu thị trường TMĐT', en: 'The clear market leader' },
  },
];

// "Report" blocks
export interface RankItem {
  label: L;
  value: L; // pre-formatted (locale-specific decimal separators)
}

export const TOP_CATEGORIES = {
  title: {
    vi: 'Top ngành hàng tăng trưởng mạnh nhất 2025',
    en: 'Fastest-growing categories in 2025',
  },
  items: [
    { label: { vi: 'Thời trang trẻ em', en: 'Kids fashion' }, value: { vi: '+80,46%', en: '+80.46%' } },
    { label: { vi: 'Sức khỏe', en: 'Health & wellness' }, value: { vi: '+46,89%', en: '+46.89%' } },
    { label: { vi: 'Nhà cửa & Đời sống', en: 'Home & Living' }, value: { vi: '+39,47%', en: '+39.47%' } },
  ] as RankItem[],
};

export interface Highlight {
  stat: L;
  label: L;
}

export const MARKET_HIGHLIGHTS: Highlight[] = [
  {
    stat: { vi: '601.780', en: '601,780' },
    label: {
      vi: 'nhà bán phát sinh đơn trên toàn thị trường trong năm 2025',
      en: 'sellers with active orders across the market in 2025',
    },
  },
  {
    stat: { vi: '32,6%', en: '32.6%' },
    label: {
      vi: 'doanh thu Shopee & TikTok Shop đến từ Shop Mall (hàng chính hãng) — dù chỉ chiếm 2,12% số shop',
      en: 'of Shopee & TikTok Shop revenue comes from official Mall shops — despite being only 2.12% of shops',
    },
  },
];

export const MARKET_SOURCE: L = {
  vi: 'Nguồn: Metric — Báo cáo Thương mại điện tử Việt Nam 2024 & 2025 (5 sàn: Shopee, Lazada, TikTok Shop, Tiki, Sendo). Cập nhật theo kỳ báo cáo.',
  en: 'Source: Metric — Vietnam E-commerce Reports 2024 & 2025 (5 platforms: Shopee, Lazada, TikTok Shop, Tiki, Sendo). Updated each reporting period.',
};
