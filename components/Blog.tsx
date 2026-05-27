'use client';
import { useI18n } from '@/lib/I18nContext';

export default function Blog() {
  const { t } = useI18n();
  const posts = [1, 2, 3].map((n) => ({
    n,
    cat: t(`blog.${n}.cat`),
    title: t(`blog.${n}.title`),
    date: t(`blog.${n}.date`),
  }));
  return (
    <section className="section" id="blog">
      <div className="container">
        <div
          className="section-head"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'end',
            maxWidth: 'none',
            flexDirection: 'row',
          }}
        >
          <div style={{ display: 'grid', gap: 16, maxWidth: 600 }}>
            <span className="eyebrow">
              <span className="dot"></span>
              {t('blog.eyebrow')}
            </span>
            <h2 className="h-1">{t('blog.title')}</h2>
            <p className="lead">{t('blog.subtitle')}</p>
          </div>
          <a href="#blog" className="btn btn--ghost">
            {t('blog.cta')} <span className="arr">→</span>
          </a>
        </div>
        <div className="blog__grid">
          {posts.map((p) => (
            <a key={p.n} href="#" className="post">
              <div className="post__cover">
                <div className="ph"></div>
                <span className="lbl">{p.cat}</span>
              </div>
              <div className="post__body">
                <div className="post__date">{p.date}</div>
                <h3>{p.title}</h3>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
