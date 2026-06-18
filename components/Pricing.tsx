'use client';
import { useState, Fragment, ReactNode } from 'react';
import { useI18n } from '@/lib/I18nContext';
import { useModal } from '@/lib/ModalContext';

function fmtVND(n: number) {
  return n.toLocaleString('vi-VN');
}

type FeatVal = boolean | string;

interface Feat {
  k: string;
  on: FeatVal;
}

interface Plan {
  id: string;
  price: number | null;
  pricePerQ?: number;
  featured: boolean;
  feats: Feat[];
}

const PLANS: Plan[] = [
  {
    id: 'buildup',
    price: 4000000,
    pricePerQ: 4000000 * 3 * 0.9,
    featured: false,
    feats: [
      { k: 'research', on: true },
      { k: 'shop', on: true },
      { k: 'sku', on: '20 SKU' },
      { k: 'pricetable', on: true },
      { k: 'ops', on: true },
      { k: 'mallinfo', on: '4M₫ add-on' },
      { k: 'listing', on: false },
      { k: 'campaign', on: false },
      { k: 'content', on: false },
    ],
  },
  {
    id: 'starter',
    price: 8000000,
    pricePerQ: 8000000 * 3 * 0.9,
    featured: false,
    feats: [
      { k: 'research', on: true },
      { k: 'shop', on: true },
      { k: 'sku', on: '30 SKU' },
      { k: 'listing', on: true },
      { k: 'campaign', on: true },
      { k: 'content', on: '2 video/tuần' },
      { k: 'dataanaly', on: true },
      { k: 'ads', on: true },
      { k: 'kam', on: true },
    ],
  },
  {
    id: 'growup',
    price: 10000000,
    pricePerQ: 10000000 * 3 * 0.9,
    featured: true,
    feats: [
      { k: 'research', on: true },
      { k: 'shop', on: true },
      { k: 'sku', on: '40 SKU' },
      { k: 'mallapply', on: true },
      { k: 'listing', on: true },
      { k: 'campaign', on: true },
      { k: 'content', on: '5 video/tuần' },
      { k: 'ads', on: true },
      { k: 'onboard', on: true },
    ],
  },
  {
    id: 'scale',
    price: null,
    featured: false,
    feats: [
      { k: 'research', on: true },
      { k: 'shop', on: true },
      { k: 'sku', on: 'Deal' },
      { k: 'mallapply', on: true },
      { k: 'advanced', on: true },
      { k: 'growth', on: true },
      { k: 'kol', on: true },
      { k: 'optimize', on: true },
      { k: 'onboard', on: true },
    ],
  },
];

interface CmpRow {
  k: string;
  vals: FeatVal[];
  rowSpan?: number[];  // per-column rowspan
  skipCol?: boolean[]; // per-column: skip cell (covered by rowspan above)
}
interface CmpGroup {
  label: string;
  rows: CmpRow[];
}

const CMP_GROUPS: CmpGroup[] = [
  {
    label: 'compare.group.1',
    rows: [
      { k: 'research', vals: [true, true, true, true] },
      { k: 'product', vals: [true, true, true, true] },
      { k: 'pricing', vals: [true, true, true, true] },
      { k: 'plan', vals: [true, true, true, true] },
    ],
  },
  {
    label: 'compare.group.2',
    rows: [
      { k: 'shop', vals: [true, true, true, true] },
      { k: 'sku', vals: ['20 SKU', '30 SKU', '40 SKU', 'Deal'] },
      { k: 'pricetable', vals: [true, true, true, true] },
      { k: 'ops', vals: [true, true, true, true] },
    ],
  },
  {
    label: 'compare.group.3',
    rows: [
      { k: 'mallinfo', vals: ['4M₫', '4M₫', true, true], rowSpan: [2, 2, 1, 1] },
      { k: 'mallapply', vals: [false, false, true, true], skipCol: [true, true, false, false] },
    ],
  },
  {
    label: 'compare.group.4',
    rows: [
      { k: 'listing', vals: [false, true, true, true] },
      { k: 'campaign', vals: [false, true, true, true] },
      { k: 'content', vals: ['—', '2 video/tuần', '5 video/tuần', 'Deal'] },
      { k: 'dataanaly', vals: [false, true, true, true] },
      { k: 'ads', vals: [false, true, true, true] },
      { k: 'kam', vals: [false, true, true, true] },
      { k: 'chat', vals: [false, true, true, true] },
      { k: 'star', vals: [false, true, true, true] },
      { k: 'locked', vals: [false, true, true, true] },
      { k: 'shoplock', vals: [false, true, true, true] },
    ],
  },
  {
    label: 'compare.group.5',
    rows: [
      { k: 'checklist', vals: [false, true, true, true] },
      { k: 'sop', vals: [false, true, true, true] },
      { k: 'template', vals: [false, true, true, true] },
      { k: 'docs', vals: [false, true, true, true] },
      { k: 'report', vals: [false, true, true, true] },
      { k: 'onboard', vals: [false, false, true, true] },
    ],
  },
  {
    label: 'compare.group.6',
    rows: [
      { k: 'advanced', vals: [false, false, false, true] },
      { k: 'growth', vals: [false, false, false, true] },
      { k: 'kol', vals: [false, false, false, true] },
      { k: 'optimize', vals: [false, false, false, true] },
    ],
  },
];

function renderVal(v: FeatVal): ReactNode {
  if (v === true) return <span className="yes">✓</span>;
  if (v === false) return <span className="no">—</span>;
  return <span className="val">{v}</span>;
}

export default function Pricing() {
  const { t } = useI18n();
  const { openModal } = useModal();
  const [billing, setBilling] = useState<'month' | 'quarter'>('month');

  return (
    <section className="section pricing" id="pricing">
      <div className="container">
        <div className="section-head center">
          <span className="eyebrow">
            <span className="dot"></span>
            {t('pricing.eyebrow')}
          </span>
          <h2 className="h-1">{t('pricing.title')}</h2>
          <p className="lead">{t('pricing.subtitle')}</p>
        </div>

        <div className="pricing__toggle">
          <button
            className={billing === 'month' ? 'on' : ''}
            onClick={() => setBilling('month')}
          >
            {t('pricing.month')}
          </button>
          <button
            className={billing === 'quarter' ? 'on' : ''}
            onClick={() => setBilling('quarter')}
          >
            {t('pricing.quarter')}
          </button>
        </div>

        <div className="plans">
          {PLANS.map((p) => {
            const displayPrice =
              p.price == null
                ? null
                : billing === 'quarter' && p.pricePerQ
                ? p.pricePerQ / 3
                : p.price;
            return (
              <div
                key={p.id}
                className={'plan' + (p.featured ? ' plan--featured' : '')}
              >
                {p.featured && (
                  <span className="plan__badge">{t('pricing.featured')}</span>
                )}
                <div>
                  <div className="plan__name">{t(`plan.${p.id}.name`)}</div>
                  <div className="plan__tag">{t(`plan.${p.id}.tag`)}</div>
                </div>
                <div className="plan__price">
                  {displayPrice == null ? (
                    <div className="v">{t('pricing.contact')}</div>
                  ) : (
                    <>
                      <div className="v">
                        {fmtVND(Math.round(displayPrice))}
                        <span style={{ fontSize: 16, marginLeft: 4 }}>₫</span>
                      </div>
                      <div className="c">/ {t('pricing.month').toLowerCase()}</div>
                    </>
                  )}
                </div>
                <ul className="feats">
                  {p.feats.map((f) => (
                    <li key={f.k} className={f.on === false ? 'x' : ''}>
                      {typeof f.on === 'string' ? (
                        <span>
                          {t(`feat.${f.k}`)} ·{' '}
                          <strong style={{ fontWeight: 600 }}>{f.on}</strong>
                        </span>
                      ) : (
                        t(`feat.${f.k}`)
                      )}
                    </li>
                  ))}
                </ul>
                <a
                  href="#contact"
                  className={'btn ' + (p.featured ? 'btn--primary' : 'btn--ghost')}
                  onClick={(e) => {
                    e.preventDefault();
                    openModal(p.id);
                  }}
                >
                  {p.price == null ? t('pricing.cta.contact') : t('pricing.cta')}{' '}
                  <span className="arr">→</span>
                </a>
              </div>
            );
          })}
        </div>

        {/* Comparison table */}
        <div style={{ marginTop: 80 }}>
          <h3
            className="h-2"
            style={{ marginBottom: 32, textAlign: 'center' }}
          >
            {t('pricing.compare.title')}
          </h3>
          <div className="compare__wrap">
            <table className="compare">
              <colgroup>
                <col className="compare__col-feat" />
                <col /><col /><col /><col />
              </colgroup>
              <thead>
                <tr className="compare__header">
                  <th>{t('compare.feature')}</th>
                  {PLANS.map((p) => (
                    <th key={p.id} className={p.featured ? 'feat' : ''}>
                      {t(`plan.${p.id}.name`)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {CMP_GROUPS.map((g, gi) => (
                  <Fragment key={gi}>
                    <tr className="compare__group">
                      <td colSpan={5}>{t(g.label)}</td>
                    </tr>
                    {g.rows.map((row, ri) => (
                      <tr key={ri} className="compare__row">
                        <td>{t(`feat.${row.k}`)}</td>
                        {row.vals.map((v, vi) => {
                          if (row.skipCol?.[vi]) return null;
                          return (
                            <td
                              key={vi}
                              rowSpan={row.rowSpan?.[vi] ?? 1}
                              className={PLANS[vi].featured ? 'feat' : ''}
                            >
                              {renderVal(v)}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
