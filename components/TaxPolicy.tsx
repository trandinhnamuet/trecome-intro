'use client';
import { useState, useEffect, useRef, RefObject } from 'react';
import { useI18n } from '@/lib/I18nContext';
import {
  POLICY_HEAD,
  POLICY_STATS,
  FILING_PERIODS,
  POLICY_HIGHLIGHTS,
  POLICY_SOURCE,
  type Lang,
} from '@/lib/tax-policy';

function useInView<T extends Element>(ref: RefObject<T | null>) {
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
      { threshold: 0.2 }
    );
    o.observe(ref.current);
    return () => o.disconnect();
  }, []);
  return v;
}

function CountUp({
  to,
  decimals = 0,
  lang,
}: {
  to: number;
  decimals?: number;
  lang: Lang;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [val, setVal] = useState(0);
  const inView = useInView(ref);
  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const duration = 1600;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(to * eased);
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, to]);
  const locale = lang === 'vi' ? 'vi-VN' : 'en-US';
  return (
    <span ref={ref}>
      {val.toLocaleString(locale, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
    </span>
  );
}

export default function TaxPolicy() {
  const { lang } = useI18n();
  const L = (o: Record<Lang, string>) => o[lang];

  return (
    <section className="stats market" id="market">
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
              {L(POLICY_HEAD.eyebrow)}
            </span>
            <h2 style={{ marginTop: 16 }}>{L(POLICY_HEAD.title)}</h2>
          </div>
          <p className="lead">{L(POLICY_HEAD.subtitle)}</p>
        </div>

        <div className="stats__grid">
          {POLICY_STATS.map((s, i) => (
            <div className="stat" key={i}>
              <div className="v">
                {s.prefix}
                <CountUp to={s.value} decimals={s.decimals} lang={lang} />
                {s.unit && <span className="unit">{L(s.unit)}</span>}
              </div>
              <div className="l">{L(s.label)}</div>
              <div className="d">{L(s.desc)}</div>
            </div>
          ))}
        </div>

        <div className="market__reports">
          <div className="market__card market__card--rank">
            <h3>{L(FILING_PERIODS.title)}</h3>
            <ol className="market__rank">
              {FILING_PERIODS.items.map((it, i) => (
                <li key={i}>
                  <span className="market__rank-num">{i + 1}</span>
                  <span className="market__rank-name">{L(it.label)}</span>
                  <span className="market__rank-val">{L(it.value)}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="market__highlights">
            {POLICY_HIGHLIGHTS.map((h, i) => (
              <div className="market__card market__hl" key={i}>
                <div className="market__hl-stat">{L(h.stat)}</div>
                <p className="market__hl-label">{L(h.label)}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="market__source">{L(POLICY_SOURCE)}</p>
      </div>
    </section>
  );
}
