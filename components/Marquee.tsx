'use client';
import { useI18n } from '@/lib/I18nContext';

export default function Marquee() {
  const { t, lang } = useI18n();
  const items =
    lang === 'vi'
      ? [
          'Thương mại',
          'Sản xuất',
          'Dịch vụ',
          'Xây dựng',
          'Thương mại điện tử',
          'Y tế',
          'Giáo dục',
        ]
      : [
          'Trade',
          'Manufacturing',
          'Services',
          'Construction',
          'E-commerce',
          'Healthcare',
          'Education',
        ];
  return (
    <div className="marquee-wrap">
      <div className="container">
        <div className="marquee-label">{t('marquee.label')}</div>
      </div>
      <div className="marquee">
        {[...items, ...items, ...items].map((it, i) => (
          <span key={i} className="item">
            <span className="b">{it.charAt(0)}</span>
            {it}
          </span>
        ))}
      </div>
    </div>
  );
}
