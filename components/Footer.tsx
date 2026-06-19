'use client';
import { useI18n } from '@/lib/I18nContext';

export default function Footer() {
  const { t } = useI18n();
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__brand">
            <img src="/assets/logo-small.png" alt="Trecome" />
            <p>{t('footer.tagline')}</p>
          </div>
          <div className="footer__col">
            <h4>{t('footer.col1')}</h4>
            <ul>
              <li>
                <a href="#services">{t('service.1.title')}</a>
              </li>
              <li>
                <a href="#services">{t('service.2.title')}</a>
              </li>
              <li>
                <a href="#services">{t('service.3.title')}</a>
              </li>
              <li>
                <a href="#services">{t('service.4.title')}</a>
              </li>
              <li>
                <a href="#pricing">{t('nav.pricing')}</a>
              </li>
            </ul>
          </div>
          <div className="footer__col">
            <h4>{t('footer.col2')}</h4>
            <ul>
              <li>
                <a href="#process">{t('nav.process')}</a>
              </li>
              <li>
                <a href="#cases">{t('nav.cases')}</a>
              </li>
              <li>
                <a href="#blog">{t('nav.blog')}</a>
              </li>
              <li>
                <a href="#contact">{t('nav.contact')}</a>
              </li>
            </ul>
          </div>
          <div className="footer__col">
            <h4>{t('footer.col3')}</h4>
            <ul>
              <li>
                <a href="#faq">{t('nav.faq')}</a>
              </li>
              <li>
                <a href="#blog">{t('blog.title')}</a>
              </li>
              <li>
                <a href="mailto:hi@trecome.vn">hi@trecome.vn</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer__bottom">
          <div>{t('footer.rights')}</div>
          <div style={{ display: 'flex', gap: 24 }}>
            <a href="#">{t('footer.privacy')}</a>
            <a href="#">{t('footer.terms')}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
