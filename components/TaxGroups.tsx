'use client';
import { useI18n } from '@/lib/I18nContext';

const GROUPS = [1, 2, 3, 4];

/**
 * Bảng phân nhóm hộ/cá nhân kinh doanh theo doanh thu năm. Dùng lại đúng bảng
 * .compare của khu Bảng giá — cùng ngôn ngữ thị giác, và thừa hưởng luôn phần
 * responsive (cột đầu dính, cuộn ngang) đã viết sẵn cho .compare__col-feat.
 */
export default function TaxGroups() {
  const { t } = useI18n();
  return (
    <section
      className="section"
      id="groups"
      style={{ background: 'var(--bg-soft)' }}
    >
      <div className="container">
        <div className="section-head center">
          <span className="eyebrow">
            <span className="dot"></span>
            {t('groups.eyebrow')}
          </span>
          <h2 className="h-1">{t('groups.title')}</h2>
          <p className="lead">{t('groups.subtitle')}</p>
        </div>

        <div className="compare__wrap">
          <table className="compare">
            <colgroup>
              <col className="compare__col-feat" />
              <col /><col /><col />
            </colgroup>
            <thead>
              <tr className="compare__header">
                <th>{t('groups.col.group')}</th>
                <th>{t('groups.col.policy')}</th>
                <th>{t('groups.col.period')}</th>
                <th>{t('groups.col.einv')}</th>
              </tr>
            </thead>
            <tbody>
              {GROUPS.map((n) => (
                <tr key={n} className="compare__row">
                  <td>
                    <strong style={{ fontWeight: 600 }}>
                      {t(`group.${n}.name`)}
                    </strong>
                    <div className="val" style={{ marginTop: 4 }}>
                      {t(`group.${n}.rev`)}
                    </div>
                  </td>
                  <td>{t(`group.${n}.policy`)}</td>
                  <td>
                    <span className="val">{t(`group.${n}.period`)}</span>
                  </td>
                  <td>
                    <span className={n === 1 ? 'no' : 'yes'}>
                      {t(`group.${n}.einv`)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p
          className="market__source"
          style={{ color: 'var(--muted)', textAlign: 'center' }}
        >
          {t('groups.note')}
        </p>
      </div>
    </section>
  );
}
