'use client';
import { useI18n } from '@/lib/I18nContext';
import { useModal } from '@/lib/ModalContext';
import ContactForm from './ContactForm';

export default function CTA() {
  const { t } = useI18n();
  const { showToast } = useModal();
  return (
    <section className="section" id="contact">
      <div className="container">
        <div className="cta">
          <div className="cta__grid">
            <div>
              <span
                className="eyebrow"
                style={{
                  background: 'rgba(91,163,255,.15)',
                  borderColor: 'rgba(91,163,255,.3)',
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
                {t('nav.contact')}
              </span>
              <h2 style={{ marginTop: 16, color: '#fff' }}>{t('cta.title')}</h2>
              <p>{t('cta.subtitle')}</p>
              <div className="cta__contact">
                <div
                  style={{
                    fontFamily: 'var(--f-mono)',
                    fontSize: 12,
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    color: 'rgba(255,255,255,.5)',
                    marginTop: 16,
                  }}
                >
                  {t('cta.contact.title')}
                </div>
                <div className="row">
                  <span className="ic">✉</span>
                  <a href="mailto:info@trecome.com.vn">
                    {t('cta.contact.email')}
                  </a>
                </div>
                <div className="row">
                  <span className="ic">◔</span>
                  <span>{t('cta.contact.hours')}</span>
                </div>
                <div className="row">
                  <span className="ic">◎</span>
                  <span>{t('cta.contact.office')}</span>
                </div>
              </div>
            </div>
            <ContactForm onSuccess={showToast} />
          </div>
        </div>
      </div>
    </section>
  );
}
