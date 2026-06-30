'use client';
import { useState, useEffect } from 'react';
import { useI18n } from '@/lib/I18nContext';
import { useModal } from '@/lib/ModalContext';

export default function Nav() {
  const { t, lang, setLang } = useI18n();
  const { openModal } = useModal();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const items: [string, string][] = [
    ['process', t('nav.process')],
    ['services', t('nav.services')],
    ['pricing', t('nav.pricing')],
    ['cases', t('nav.cases')],
    ['blog', t('nav.blog')],
    ['faq', t('nav.faq')],
  ];

  return (
    <header className={'nav' + (scrolled ? ' scrolled' : '')}>
      <div className="container nav__inner">
        <a href="#top" className="nav__brand">
          <img src="/assets/logo-small.png" alt="Trecome" className="nav__logo" />
        </a>
        <nav className="nav__menu">
          {items.map(([id, label]) => (
            <a key={id} href={'#' + id}>
              {label}
            </a>
          ))}
        </nav>
        <div className="nav__right">
          <div className="lang" role="group" aria-label="Language">
            <button
              className={lang === 'vi' ? 'on' : ''}
              onClick={() => setLang('vi')}
            >
              VI
            </button>
            <button
              className={lang === 'en' ? 'on' : ''}
              onClick={() => setLang('en')}
            >
              EN
            </button>
          </div>
          <a
            href="#contact"
            className="btn btn--primary btn--sm"
            onClick={(e) => {
              e.preventDefault();
              openModal();
            }}
          >
            {t('nav.cta')} <span className="arr">→</span>
          </a>
          <button
            className="nav__burger"
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
          >
            <svg width="18" height="14" viewBox="0 0 18 14" fill="none">
              <path
                d={
                  open
                    ? 'M2 2L16 12 M16 2L2 12'
                    : 'M0 2H18 M0 7H18 M0 12H18'
                }
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className={'mobile-menu' + (open ? ' open' : '')}>
        {items.map(([id, label]) => (
          <a key={id} href={'#' + id} onClick={() => setOpen(false)}>
            {label}
          </a>
        ))}
        <a
          href="#contact"
          className="mobile-menu__cta"
          onClick={(e) => {
            e.preventDefault();
            setOpen(false);
            openModal();
          }}
        >
          {t('nav.cta')} →
        </a>
        <div className="lang mobile-menu__lang" role="group" aria-label="Language">
          <button
            className={lang === 'vi' ? 'on' : ''}
            onClick={() => setLang('vi')}
          >
            VI
          </button>
          <button
            className={lang === 'en' ? 'on' : ''}
            onClick={() => setLang('en')}
          >
            EN
          </button>
        </div>
      </div>
    </header>
  );
}
