'use client';
import { useState, useEffect, useRef, RefObject } from 'react';
import { useI18n } from '@/lib/I18nContext';

function useInView<T extends Element>(ref: RefObject<T | null>, opts: IntersectionObserverInit = { threshold: 0.2 }) {
  const [v, setV] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const o = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setV(true);
          o.disconnect();
        }
      },
      opts
    );
    o.observe(ref.current);
    return () => o.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return v;
}

function CountUp({
  to,
  suffix = '',
  duration = 1600,
  decimals = 0,
}: {
  to: number;
  suffix?: string;
  duration?: number;
  decimals?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [val, setVal] = useState(0);
  const inView = useInView(ref);
  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(to * eased);
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, to, duration]);
  return (
    <span ref={ref}>
      {decimals ? val.toFixed(decimals) : Math.floor(val).toLocaleString()}
      {suffix}
    </span>
  );
}

export default function Stats() {
  const { t } = useI18n();
  return (
    <section className="stats" id="stats">
      <div className="container">
        <div className="stats__head">
          <div>
            <span
              className="eyebrow"
              style={{
                background: 'rgba(10,102,255,.15)',
                borderColor: 'rgba(10,102,255,.3)',
                color: '#5BA3FF',
              }}
            >
              <span
                className="dot"
                style={{
                  background: '#5BA3FF',
                  boxShadow: '0 0 0 4px rgba(91,163,255,.15)',
                }}
              ></span>
              {t('stats.eyebrow')}
            </span>
            <h2 style={{ marginTop: 16 }}>{t('stats.title')}</h2>
          </div>
          <p className="lead">{t('stats.subtitle')}</p>
        </div>
        <div className="stats__grid">
          <div className="stat">
            <div className="v">
              <CountUp to={120} />
              <span className="unit">+</span>
            </div>
            <div className="l">{t('stats.1.label')}</div>
            <div className="d">{t('stats.1.desc')}</div>
          </div>
          <div className="stat">
            <div className="v">
              <CountUp to={1.4} decimals={1} />
              <span className="unit">B₫</span>
            </div>
            <div className="l">{t('stats.2.label')}</div>
            <div className="d">{t('stats.2.desc')}</div>
          </div>
          <div className="stat">
            <div className="v">
              <CountUp to={187} />
              <span className="unit">%</span>
            </div>
            <div className="l">{t('stats.3.label')}</div>
            <div className="d">{t('stats.3.desc')}</div>
          </div>
          <div className="stat">
            <div className="v">
              <CountUp to={92} />
              <span className="unit">%</span>
            </div>
            <div className="l">{t('stats.4.label')}</div>
            <div className="d">{t('stats.4.desc')}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
