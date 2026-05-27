'use client';
import { useState } from 'react';
import { useI18n } from '@/lib/I18nContext';

export default function Process() {
  const { t, tArr } = useI18n();
  const [active, setActive] = useState(0);
  const steps = [1, 2, 3, 4, 5, 6].map((n) => ({
    n,
    title: t(`process.${n}.title`),
    desc: t(`process.${n}.desc`),
    tags: tArr(`process.${n}.tags`),
    out: tArr(`process.${n}.out`),
  }));

  return (
    <section className="section process" id="process">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">
            <span className="dot"></span>
            {t('process.eyebrow')}
          </span>
          <h2 className="h-1">{t('process.title')}</h2>
          <p className="lead">{t('process.subtitle')}</p>
        </div>

        <div className="process__list">
          {steps.map((s, i) => (
            <div
              key={s.n}
              className={'step' + (active === i ? ' active' : '')}
              onMouseEnter={() => setActive(i)}
            >
              <div className="step__num">
                <span className="big">{String(s.n).padStart(2, '0')}</span>
              </div>
              <div className="step__body">
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
                <div className="step__tags">
                  {s.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
              <div className="step__out">
                <div className="h">{t('process.outputs')}</div>
                <ul>
                  {s.out.map((o) => (
                    <li key={o}>{o}</li>
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
