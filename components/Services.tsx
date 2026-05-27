'use client';
import { useI18n } from '@/lib/I18nContext';

export default function Services() {
  const { t } = useI18n();
  const items = [1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => ({
    n,
    title: t(`service.${n}.title`),
    desc: t(`service.${n}.desc`),
  }));
  return (
    <section className="section services" id="services">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">
            <span className="dot"></span>
            {t('services.eyebrow')}
          </span>
          <h2 className="h-1">{t('services.title')}</h2>
          <p className="lead">{t('services.subtitle')}</p>
        </div>
        <div className="services__grid">
          {items.map((s) => (
            <div key={s.n} className="service">
              <div className="service__head">
                <span className="service__num">
                  {String(s.n).padStart(2, '0')} / 09
                </span>
                <span className="service__arr">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M2 12L12 2 M5 2H12V9"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
