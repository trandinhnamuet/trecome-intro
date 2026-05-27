'use client';
import { useI18n } from '@/lib/I18nContext';

export default function Cases() {
  const { t } = useI18n();
  return (
    <section className="section" id="cases">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">
            <span className="dot"></span>
            {t('cases.eyebrow')}
          </span>
          <h2 className="h-1">{t('cases.title')}</h2>
          <p className="lead">{t('cases.subtitle')}</p>
        </div>

        <div className="cases__grid">
          <div className="case case--dark">
            <div>
              <div className="case__cat">{t('case.1.cat')}</div>
              <div className="case__title">{t('case.1.title')}</div>
            </div>
            <div className="case__metric">
              <div className="v" style={{ color: '#5BA3FF' }}>
                {t('case.1.metric')}
              </div>
              <div className="l">{t('case.1.label')}</div>
            </div>
            <svg
              className="case__bg"
              viewBox="0 0 400 360"
              preserveAspectRatio="none"
              style={{ opacity: 0.2 }}
            >
              <path
                d="M0,300 Q100,260 200,180 T400,40"
                stroke="#5BA3FF"
                strokeWidth="2"
                fill="none"
              />
              <path
                d="M0,340 Q100,310 200,260 T400,160"
                stroke="#5BA3FF"
                strokeWidth="1"
                fill="none"
                opacity="0.5"
              />
            </svg>
          </div>

          <div className="case case--blue">
            <div>
              <div className="case__cat">{t('case.2.cat')}</div>
              <div className="case__title">{t('case.2.title')}</div>
            </div>
            <div className="case__metric">
              <div className="v">{t('case.2.metric')}</div>
              <div className="l">{t('case.2.label')}</div>
            </div>
          </div>

          <div className="case">
            <div>
              <div className="case__cat">{t('case.3.cat')}</div>
              <div className="case__title">{t('case.3.title')}</div>
            </div>
            <div className="case__metric">
              <div className="v" style={{ color: 'var(--blue)' }}>
                {t('case.3.metric')}
                <span style={{ fontSize: '0.5em', color: 'var(--muted)' }}>
                  ₫
                </span>
              </div>
              <div className="l">{t('case.3.label')}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
