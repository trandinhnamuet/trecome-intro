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
  featured: boolean;
  feats: Feat[];
}

/** Hộ kinh doanh & cá nhân kinh doanh — phí đi theo nhóm doanh thu năm. */
const PLANS_HKD: Plan[] = [
  {
    id: 'hkd1',
    price: 500000,
    featured: false,
    feats: [
      { k: 'declare', on: true },
      { k: 'taxadvice', on: true },
      { k: 'deadline', on: true },
      { k: 'einvoice', on: true },
      { k: 'freq', on: 'Theo năm' },
      { k: 'billing', on: 'Thu theo quý' },
      { k: 'bookkeeping', on: false },
      { k: 'revreport', on: false },
    ],
  },
  {
    id: 'hkd2',
    price: 1000000,
    featured: true,
    feats: [
      { k: 'declare', on: true },
      { k: 'taxadvice', on: true },
      { k: 'bookkeeping', on: true },
      { k: 'ledger', on: true },
      { k: 'invoicereport', on: true },
      { k: 'freq', on: 'Theo tháng' },
      { k: 'billing', on: 'Thu theo tháng' },
      { k: 'revreport', on: true },
    ],
  },
  {
    id: 'hkd3',
    price: null,
    featured: false,
    feats: [
      { k: 'declare', on: true },
      { k: 'bookkeeping', on: true },
      { k: 'ledger', on: true },
      { k: 'fs', on: true },
      { k: 'revreport', on: true },
      { k: 'freq', on: 'Theo tháng' },
      { k: 'billing', on: 'Thu theo tháng' },
      { k: 'risk', on: true },
    ],
  },
  {
    id: 'hkd4',
    price: null,
    featured: false,
    feats: [
      { k: 'declare', on: true },
      { k: 'bookkeeping', on: true },
      { k: 'fs', on: true },
      { k: 'settle', on: true },
      { k: 'authority', on: true },
      { k: 'freq', on: 'Theo tháng' },
      { k: 'billing', on: 'Thu theo tháng' },
      { k: 'finanaly', on: true },
    ],
  },
];

/** Doanh nghiệp — phí đi theo doanh thu tháng. */
const PLANS_DN: Plan[] = [
  {
    id: 'starter',
    price: 1000000,
    featured: false,
    feats: [
      { k: 'declare', on: true },
      { k: 'bookkeeping', on: true },
      { k: 'fs', on: true },
      { k: 'ledger', on: true },
      { k: 'invoicereport', on: true },
      { k: 'settle', on: true },
      { k: 'revreport', on: false },
      { k: 'finanaly', on: false },
    ],
  },
  {
    id: 'standard',
    price: 1500000,
    featured: true,
    feats: [
      { k: 'declare', on: true },
      { k: 'bookkeeping', on: true },
      { k: 'fs', on: true },
      { k: 'settle', on: true },
      { k: 'revreport', on: true },
      { k: 'pl', on: true },
      { k: 'debt', on: true },
      { k: 'stock', on: true },
    ],
  },
  {
    id: 'professional',
    price: 2000000,
    featured: false,
    feats: [
      { k: 'declare', on: true },
      { k: 'bookkeeping', on: true },
      { k: 'fs', on: true },
      { k: 'revreport', on: true },
      { k: 'cashflow', on: true },
      { k: 'finanaly', on: true },
      { k: 'taxadvice', on: true },
      { k: 'forecast', on: true },
    ],
  },
  {
    id: 'enterprise',
    price: null,
    featured: false,
    feats: [
      { k: 'declare', on: true },
      { k: 'bookkeeping', on: true },
      { k: 'finanaly', on: true },
      { k: 'cfo', on: true },
      { k: 'kpi', on: true },
      { k: 'budget', on: true },
      { k: 'internal', on: true },
      { k: 'strategy', on: true },
    ],
  },
];

/** Bốn cấp độ dịch vụ dùng làm cột của bảng so sánh phạm vi công việc. */
const TIERS = ['basic', 'standard', 'business', 'premium'];

interface CmpRow {
  k: string;
  vals: FeatVal[];
}
interface CmpGroup {
  label: string;
  rows: CmpRow[];
}

const CMP_GROUPS: CmpGroup[] = [
  {
    label: 'compare.group.1',
    rows: [
      { k: 'declare', vals: [true, true, true, true] },
      { k: 'invoicereport', vals: [true, true, true, true] },
      { k: 'deadline', vals: [true, true, true, true] },
      { k: 'settle', vals: [true, true, true, true] },
      { k: 'einvoice', vals: [true, true, true, true] },
      { k: 'authority', vals: [false, true, true, true] },
    ],
  },
  {
    label: 'compare.group.2',
    rows: [
      { k: 'bookkeeping', vals: [false, true, true, true] },
      { k: 'fs', vals: [true, true, true, true] },
      { k: 'ledger', vals: [false, true, true, true] },
      { k: 'invalid', vals: [true, true, true, true] },
      { k: 'recon', vals: [false, true, true, true] },
    ],
  },
  {
    label: 'compare.group.3',
    rows: [
      { k: 'revreport', vals: [false, true, true, true] },
      { k: 'pl', vals: [false, true, true, true] },
      { k: 'debt', vals: [false, true, true, true] },
      { k: 'stock', vals: [false, true, true, true] },
      { k: 'cashflow', vals: [false, false, true, true] },
    ],
  },
  {
    label: 'compare.group.4',
    rows: [
      { k: 'risk', vals: [false, true, true, true] },
      { k: 'finanaly', vals: [false, false, true, true] },
      { k: 'taxadvice', vals: [false, false, true, true] },
      { k: 'costadvice', vals: [false, false, true, true] },
      { k: 'forecast', vals: [false, false, true, true] },
    ],
  },
  {
    label: 'compare.group.5',
    rows: [
      { k: 'ecomdata', vals: [false, true, true, true] },
      { k: 'platformfee', vals: [false, true, true, true] },
      { k: 'platformpl', vals: [false, false, true, true] },
    ],
  },
  {
    label: 'compare.group.6',
    rows: [
      { k: 'cfo', vals: [false, false, false, true] },
      { k: 'kpi', vals: [false, false, false, true] },
      { k: 'budget', vals: [false, false, false, true] },
      { k: 'internal', vals: [false, false, false, true] },
      { k: 'strategy', vals: [false, false, false, true] },
    ],
  },
];

const ADDONS = [1, 2, 3, 4];

function renderVal(v: FeatVal): ReactNode {
  if (v === true) return <span className="yes">✓</span>;
  if (v === false) return <span className="no">—</span>;
  return <span className="val">{v}</span>;
}

export default function Pricing() {
  const { t } = useI18n();
  const { openModal } = useModal();
  const [segment, setSegment] = useState<'hkd' | 'dn'>('hkd');
  const plans = segment === 'hkd' ? PLANS_HKD : PLANS_DN;

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
            className={segment === 'hkd' ? 'on' : ''}
            onClick={() => setSegment('hkd')}
          >
            {t('pricing.seg.hkd')}
          </button>
          <button
            className={segment === 'dn' ? 'on' : ''}
            onClick={() => setSegment('dn')}
          >
            {t('pricing.seg.dn')}
          </button>
        </div>

        <div className="plans">
          {plans.map((p) => (
            <div
              key={p.id}
              className={'plan' + (p.featured ? ' plan--featured' : '')}
            >
              {p.featured && (
                <span className="plan__badge">{t('pricing.featured')}</span>
              )}
              <div>
                <div className="plan__name">{t('plan.' + p.id + '.name')}</div>
                <div className="plan__tag">{t('plan.' + p.id + '.tag')}</div>
              </div>
              <div className="plan__price" style={{ flexWrap: 'wrap' }}>
                {p.price == null ? (
                  <div className="v">{t('pricing.contact')}</div>
                ) : (
                  <>
                    {/* width 100% để "Chỉ từ" chiếm trọn một dòng của flex row */}
                    <div className="c" style={{ width: '100%' }}>
                      {t('pricing.from')}
                    </div>
                    <div className="v">
                      {fmtVND(p.price)}
                      <span style={{ fontSize: 16, marginLeft: 4 }}>₫</span>
                    </div>
                    <div className="c">/ {t('pricing.per')}</div>
                  </>
                )}
              </div>
              <ul className="feats">
                {p.feats.map((f) => (
                  <li key={f.k} className={f.on === false ? 'x' : ''}>
                    {typeof f.on === 'string' ? (
                      <span>
                        {t('feat.' + f.k)} ·{' '}
                        <strong style={{ fontWeight: 600 }}>{f.on}</strong>
                      </span>
                    ) : (
                      t('feat.' + f.k)
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
          ))}
        </div>

        {/* Add-on: phần mềm tính riêng, không gộp vào phí dịch vụ */}
        <div style={{ marginTop: 24 }}>
          <h3 className="h-2" style={{ textAlign: 'center' }}>
            {t('pricing.addon.title')}
          </h3>
          <p
            className="lead"
            style={{
              textAlign: 'center',
              margin: '12px auto 32px',
              maxWidth: 640,
            }}
          >
            {t('pricing.addon.subtitle')}
          </p>
          <div className="plans" style={{ marginBottom: 0 }}>
            {ADDONS.map((n) => (
              <div key={n} className="plan">
                <div>
                  <div className="plan__name" style={{ fontSize: 18 }}>
                    {t('addon.' + n + '.title')}
                  </div>
                  <div className="plan__tag">{t('addon.' + n + '.desc')}</div>
                </div>
                <div
                  className="plan__price"
                  style={{ borderBottom: 0, paddingBottom: 0, marginTop: 'auto' }}
                >
                  <div
                    className="v"
                    style={{ fontSize: 28, whiteSpace: 'nowrap' }}
                  >
                    {t('addon.' + n + '.price')}
                  </div>
                  <div className="c">{t('addon.' + n + '.note')}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bảng so sánh bốn cấp độ dịch vụ */}
        <div style={{ marginTop: 80 }}>
          <h3 className="h-2" style={{ textAlign: 'center' }}>
            {t('pricing.compare.title')}
          </h3>
          <p
            className="lead"
            style={{
              textAlign: 'center',
              margin: '12px auto 32px',
              maxWidth: 720,
            }}
          >
            {t('pricing.compare.subtitle')}
          </p>
          <div className="compare__wrap">
            <table className="compare">
              <colgroup>
                <col className="compare__col-feat" />
                <col /><col /><col /><col />
              </colgroup>
              <thead>
                <tr className="compare__header">
                  <th>{t('compare.feature')}</th>
                  {TIERS.map((id, i) => (
                    <th key={id} className={i === 2 ? 'feat' : ''}>
                      {t('tier.' + id + '.name')}
                      <div
                        style={{
                          fontFamily: 'var(--f-body)',
                          fontSize: 11,
                          fontWeight: 400,
                          color: 'var(--muted)',
                          marginTop: 4,
                          letterSpacing: 0,
                        }}
                      >
                        {t('tier.' + id + '.tag')}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {CMP_GROUPS.map((g, gi) => (
                  <Fragment key={gi}>
                    <tr className="compare__group">
                      <td colSpan={5}>
                        <span className="compare__group-label">{t(g.label)}</span>
                      </td>
                    </tr>
                    {g.rows.map((row, ri) => (
                      <tr key={ri} className="compare__row">
                        <td>{t('feat.' + row.k)}</td>
                        {row.vals.map((v, vi) => (
                          <td key={vi} className={vi === 2 ? 'feat' : ''}>
                            {renderVal(v)}
                          </td>
                        ))}
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
