'use client';
import { useI18n } from '@/lib/I18nContext';

/**
 * Bộ báo cáo quản trị làm theo yêu cầu. Thẻ dùng .service, danh sách bên trong
 * dùng .step__out của khu Quy trình (đã có dấu ✓ sẵn).
 */
export default function Reports() {
  const { t, tArr } = useI18n();
  const cards = [1, 2, 3, 4, 5].map((n) => ({
    n,
    title: t(`report.${n}.title`),
    items: tArr(`report.${n}.items`),
  }));
  return (
    <section
      className="section services"
      id="reports"
      style={{ background: 'var(--bg-soft)' }}
    >
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">
            <span className="dot"></span>
            {t('reports.eyebrow')}
          </span>
          <h2 className="h-1">{t('reports.title')}</h2>
          <p className="lead">{t('reports.subtitle')}</p>
        </div>
        <div className="services__grid">
          {cards.map((c) => (
            <div key={c.n} className="service">
              <div className="service__head">
                <span className="service__num">
                  {String(c.n).padStart(2, '0')} / 05
                </span>
              </div>
              <h3>{c.title}</h3>
              <div className="step__out" style={{ background: '#fff' }}>
                <div className="h">{t('reports.items')}</div>
                <ul>
                  {c.items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
