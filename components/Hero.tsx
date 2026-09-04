'use client';
import { useState, useEffect } from 'react';
import { useI18n } from '@/lib/I18nContext';
import { useModal } from '@/lib/ModalContext';

// Ảnh Unsplash (Unsplash License — dùng thương mại được, không cần xin phép).
// Nguồn từng ảnh ghi trong docs/trang-dich-vu-ke-toan.md.
const HERO_SLIDES = ['/hero-slide/1.jpg', '/hero-slide/2.jpg', '/hero-slide/3.jpg'];
const SLIDE_MS = 4000;

function HeroDashboard() {
  const { t } = useI18n();
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setActive((i) => (i + 1) % HERO_SLIDES.length),
      SLIDE_MS
    );
    return () => clearInterval(id);
  }, []);

  // Ảnh lấp đầy vòng tròn bằng object-fit: cover trong CSS. Trước đây chỗ này
  // có một hàm co ảnh theo đường chéo để lọt trọn vào vòng tròn, nhưng cách đó
  // chừa lại hai mảng trắng trên/dưới. Cắt bớt rìa đổi lấy vòng tròn kín thì
  // đáng hơn — chỉ cần chọn ảnh có chủ thể nằm giữa khung.

  return (
    <div className="hero__visual">
      <div className="hero-photo">
        <div className="hero-photo__bg"></div>
        <div className="hero-photo__ring-3"></div>
        <div className="hero-photo__ring-2"></div>
        <div className="hero-photo__frame">
          {HERO_SLIDES.map((src, i) => (
            <img
              key={src}
              src={src}
              alt={i === 0 ? t('hero.photo.alt') : ''}
              aria-hidden={i !== 0}
              className={
                'hero-photo__slide' + (i === active ? ' is-active' : '')
              }
              loading={i === 0 ? 'eager' : 'lazy'}
            />
          ))}
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
    ['#0A66FF', 'T'],
    ['#FF6B35', 'S'],
    ['#7C3AED', 'D'],
    ['#EAB308', 'X'],
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
