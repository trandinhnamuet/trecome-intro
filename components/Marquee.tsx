'use client';
import { useI18n } from '@/lib/I18nContext';

export default function Marquee() {
  const { t } = useI18n();
  const items = [
    'Shopee',
    'TikTok Shop',
    'Lazada',
    'Tiki',
    'Amazon',
    'Shopify',
    'Sendo',
  ];
  const initials: Record<string, string> = {
    Shopee: 'S',
    'TikTok Shop': 'T',
    Lazada: 'L',
    Tiki: 'K',
    Amazon: 'A',
    Shopify: 'P',
    Sendo: 'D',
  };
  return (
    <div className="marquee-wrap">
      <div className="container">
        <div className="marquee-label">{t('marquee.label')}</div>
      </div>
      <div className="marquee">
        {[...items, ...items, ...items].map((it, i) => (
          <span key={i} className="item">
            <span className="b">{initials[it]}</span>
            {it}
          </span>
        ))}
      </div>
    </div>
  );
}
