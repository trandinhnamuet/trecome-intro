'use client';
import { useI18n } from '@/lib/I18nContext';

export default function Testimonials() {
  const { t } = useI18n();
  const items = [1, 2, 3, 4, 5, 6].map((n) => ({
    n,
    quote: t(`testi.${n}.quote`),
    name: t(`testi.${n}.name`),
    role: t(`testi.${n}.role`),
  }));
  return (
    <section className="section testimonials">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">
            <span className="dot"></span>
            {t('testi.eyebrow')}
          </span>
          <h2 className="h-1">{t('testi.title')}</h2>
        </div>
        <div className="t-grid">
          {items.map((it) => {
            const lastName = it.name.split(' ').pop() || '';
            return (
              <div key={it.n} className="testi">
                <div className="testi__stars">{'★★★★★'}</div>
                <div className="testi__quote">&ldquo;{it.quote}&rdquo;</div>
                <div className="testi__author">
                  <div className="testi__avt">{lastName[0]}</div>
                  <div>
                    <div className="testi__name">{it.name}</div>
                    <div className="testi__role">{it.role}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
