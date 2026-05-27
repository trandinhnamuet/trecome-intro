'use client';
import { useI18n } from '@/lib/I18nContext';
import { useModal } from '@/lib/ModalContext';

function HeroDashboard() {
  const { t } = useI18n();
  return (
    <div className="hero__visual">
      <div className="hero-photo">
        <div className="hero-photo__bg"></div>
        <div className="hero-photo__ring-3"></div>
        <div className="hero-photo__ring-2"></div>
        <div className="hero-photo__frame">
          <img src="/assets/hero.png" alt="Trecome team at work" />
        </div>
        <div className="hero-photo__ring"></div>
        <div className="hero-photo__dot hero-photo__dot--1"></div>
        <div className="hero-photo__dot hero-photo__dot--2"></div>
        <div className="hero-photo__dot hero-photo__dot--3"></div>

        <div
          className="float-card"
          style={{ top: '8%', left: '-8%', animationDelay: '0s' }}
        >
          <div className="ic">⚡</div>
          <div>
            <div className="t1">{t('hero.flash.title')}</div>
            <div className="t2">{t('hero.flash.sub')}</div>
          </div>
        </div>

        <div
          className="float-card"
          style={{ bottom: '6%', right: '-6%', animationDelay: '1.5s' }}
        >
          <div className="ic">★</div>
          <div>
            <div className="t1">{t('hero.kol.title')}</div>
            <div className="t2">{t('hero.kol.sub')}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  const { t } = useI18n();
  const { openModal } = useModal();
  const avatars: [string, string][] = [
    ['#0A66FF', 'S'],
    ['#FF6B35', 'T'],
    ['#7C3AED', 'L'],
    ['#EAB308', 'K'],
    ['#22C55E', '+'],
  ];

  return (
    <section className="hero" id="top">
      <div className="container">
        <div className="hero__grid">
          <div>
            <span className="eyebrow">
              <span className="dot"></span>
              {t('hero.eyebrow')}
            </span>
            <h1>
              {t('hero.title.a1')}
              <br />
              <span className="em">{t('hero.title.a2')}</span>{' '}
              <span className="underline">{t('hero.title.a3')}</span>
            </h1>
            <p className="lead">{t('hero.subtitle')}</p>
            <div className="hero__cta">
              <a
                href="#contact"
                className="btn btn--primary btn--lg"
                onClick={(e) => {
                  e.preventDefault();
                  openModal();
                }}
              >
                {t('hero.cta.primary')} <span className="arr">→</span>
              </a>
              <a href="#process" className="btn btn--ghost btn--lg">
                {t('hero.cta.secondary')}
              </a>
            </div>
            <div className="hero__trusted">
              <div className="avatars">
                {avatars.map(([c, l], i) => (
                  <span key={i} style={{ background: c }}>
                    {l}
                  </span>
                ))}
              </div>
              <span>{t('hero.trusted')}</span>
            </div>
          </div>
          <HeroDashboard />
        </div>
      </div>
    </section>
  );
}
