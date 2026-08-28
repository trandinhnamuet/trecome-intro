// ---------------------------------------------------------------------------
// Số liệu hiển thị ở section "Chính sách thuế" trên trang chủ tax.trecome.vn.
//
// Đây KHÔNG phải dữ liệu live — toàn bộ lấy từ bảng phân nhóm doanh thu trong
// tài liệu gói dịch vụ kế toán của Trecom (thư mục "Tài liệu kế toán"), tổng hợp
// theo quy định hiện hành về quản lý thuế với hộ kinh doanh, cá nhân kinh doanh.
//
// Chính sách thuế thay đổi thường xuyên: khi có văn bản mới, sửa ngay tại file
// này và tại các key "group.*" trong lib/i18n.ts (bảng chi tiết) — hai chỗ phải
// khớp nhau, vì cùng mô tả một bộ quy định.
// ---------------------------------------------------------------------------

export type Lang = 'vi' | 'en';
export type L = Record<Lang, string>;

export const POLICY_HEAD = {
  eyebrow: { vi: 'CHÍNH SÁCH THUẾ ÁP DỤNG', en: 'THE RULES THAT APPLY TO YOU' },
  title: {
    vi: 'Bốn nhóm doanh thu — bốn mức nghĩa vụ khác nhau.',
    en: 'Four revenue tiers — four different sets of obligations.',
  },
  subtitle: {
    vi: 'Doanh thu năm quyết định bạn kê khai theo tháng, quý hay năm, có bắt buộc hoá đơn điện tử hay không. Biết mình thuộc nhóm nào là bước đầu tiên để không bị phạt.',
    en: 'Annual revenue decides whether you file monthly, quarterly or yearly, and whether e-invoices are mandatory. Knowing your tier is the first step to staying penalty-free.',
  },
};

export interface PolicyStat {
  value: number;
  decimals?: number;
  prefix?: string;
  unit?: L; // rendered small, after the number
  label: L;
  desc: L;
}

// Big count-up numbers
export const POLICY_STATS: PolicyStat[] = [
  {
    value: 10,
    unit: { vi: 'năm+', en: 'yrs+' },
    label: { vi: 'Kinh nghiệm kế toán – thuế', en: 'In accounting and tax' },
    desc: {
      vi: 'Trực tiếp phụ trách doanh nghiệp và hộ kinh doanh nhiều ngành nghề',
      en: 'Hands-on across companies and household businesses in many industries',
    },
  },
  {
    value: 4,
    unit: { vi: 'nhóm', en: 'tiers' },
    label: { vi: 'Nhóm doanh thu theo quy định', en: 'Revenue tiers in the rules' },
    desc: {
      vi: 'Từ dưới 1 tỷ đến trên 50 tỷ đồng mỗi năm',
      en: 'From under VND 1bn to above VND 50bn a year',
    },
  },
  {
    value: 1,
    unit: { vi: 'tỷ đ', en: 'bn ₫' },
    label: { vi: 'Ngưỡng doanh thu nhóm 1', en: 'The Tier 1 threshold' },
    desc: {
      vi: 'Dưới ngưỡng có thể được miễn thuế GTGT và TNCN',
      en: 'Below it, VAT and personal income tax may not be due',
    },
  },
  {
    value: 500000,
    unit: { vi: 'đ/tháng', en: '₫/mo' },
    label: { vi: 'Phí dịch vụ khởi điểm', en: 'Where our fee starts' },
    desc: {
      vi: 'Kê khai, tư vấn và báo cáo thuế cho nhóm 1',
      en: 'Filing, advice and tax reporting for Tier 1',
    },
  },
];

// "Report" blocks
export interface RankItem {
  label: L;
  value: L; // pre-formatted (locale-specific decimal separators)
}

export const FILING_PERIODS = {
  title: {
    vi: 'Kỳ kê khai theo từng nhóm',
    en: 'Filing period by tier',
  },
  items: [
    {
      label: { vi: 'Nhóm 1 · đến 1 tỷ đ/năm', en: 'Tier 1 · up to VND 1bn/yr' },
      value: { vi: 'Theo năm', en: 'Annual' },
    },
    {
      label: { vi: 'Nhóm 2 · trên 1 – 3 tỷ đ/năm', en: 'Tier 2 · VND 1–3bn/yr' },
      value: { vi: 'Theo quý', en: 'Quarterly' },
    },
    {
      label: { vi: 'Nhóm 3 · trên 3 – 50 tỷ đ/năm', en: 'Tier 3 · VND 3–50bn/yr' },
      value: { vi: 'Theo quý', en: 'Quarterly' },
    },
    {
      label: { vi: 'Nhóm 4 · trên 50 tỷ đ/năm', en: 'Tier 4 · above VND 50bn/yr' },
      value: { vi: 'Theo tháng', en: 'Monthly' },
    },
  ] as RankItem[],
};

export interface Highlight {
  stat: L;
  label: L;
}

export const POLICY_HIGHLIGHTS: Highlight[] = [
  {
    stat: { vi: 'Từ nhóm 2', en: 'Tier 2 up' },
    label: {
      vi: 'bắt buộc sử dụng hoá đơn điện tử và thực hiện chế độ kế toán, sổ sách, báo cáo theo quy định',
      en: 'must use e-invoices and maintain the full accounting, bookkeeping and reporting regime',
    },
  },
  {
    stat: { vi: '31/07 & 31/01', en: '31 Jul & 31 Jan' },
    label: {
      vi: 'hai mốc nộp hồ sơ khai thuế theo năm của nhóm 1 — nộp trễ là phát sinh rủi ro bị xử phạt',
      en: 'the two annual filing deadlines for Tier 1 — filing late means risking a penalty',
    },
  },
];

export const POLICY_SOURCE: L = {
  vi: 'Nội dung tổng hợp theo quy định hiện hành về quản lý thuế đối với hộ kinh doanh và cá nhân kinh doanh. Chính sách có thể thay đổi — liên hệ để được tư vấn đúng trường hợp của bạn.',
  en: 'Summarised from the current rules on tax administration for household and individual businesses. Policy can change — talk to us about your specific case.',
};
