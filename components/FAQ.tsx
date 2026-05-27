'use client';
import { useState } from 'react';
import { useI18n } from '@/lib/I18nContext';

export default function FAQ() {
  const { t } = useI18n();
  const [open, setOpen] = useState<number>(0);
  const items = [1, 2, 3, 4, 5, 6].map((n) => ({
    n,
    q: t(`faq.${n}.q`),
    a: t(`faq.${n}.a`),
  }));
  return (
    <section
      className="section"
      id="faq"
      style={{ background: 'var(--bg-soft)' }}
    >
      <div className="container" style={{ maxWidth: 880 }}>
        <div className="section-head center">
          <span className="eyebrow">
            <span className="dot"></span>
            {t('faq.eyebrow')}
          </span>
          <h2 className="h-1">{t('faq.title')}</h2>
        </div>
        <div className="faq__list">
          {items.map((it, i) => (
            <div
              key={it.n}
              className={'faq__item' + (open === i ? ' open' : '')}
            >
              <button
                className="faq__q"
                onClick={() => setOpen(open === i ? -1 : i)}
              >
                <span>{it.q}</span>
                <span className="faq__icon"></span>
              </button>
              <div className="faq__a">{it.a}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
