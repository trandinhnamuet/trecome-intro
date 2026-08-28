'use client';
import { useI18n } from '@/lib/I18nContext';

/**
 * "Tại sao chọn chúng tôi" — sáu lý do, dùng lại đúng thẻ .service của khu
 * Dịch vụ để không phát sinh style mới.
 */
export default function Why() {
  const { t } = useI18n();
  const items = [1, 2, 3, 4, 5, 6].map((n) => ({
    n,
    title: t(`why.${n}.title`),
    desc: t(`why.${n}.desc`),
  }));
  return (
    <section className="section services" id="why">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">
            <span className="dot"></span>
            {t('why.eyebrow')}
          </span>
          <h2 className="h-1">{t('why.title')}</h2>
          <p className="lead">{t('why.subtitle')}</p>
        </div>
        <div className="services__grid">
          {items.map((it) => (
            <div key={it.n} className="service">
              <div className="service__head">
                <span className="service__num">
                  {String(it.n).padStart(2, '0')} / 06
                </span>
                <span className="service__arr">✓</span>
              </div>
              <h3>{it.title}</h3>
              <p>{it.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
