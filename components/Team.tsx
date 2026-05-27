'use client';
import { useI18n } from '@/lib/I18nContext';

export default function Team() {
  const { t } = useI18n();
  const members = [1, 2, 3, 4].map((n) => ({
    n,
    name: t(`team.${n}.name`),
    role: t(`team.${n}.role`),
  }));
  return (
    <section className="section">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">
            <span className="dot"></span>
            {t('team.eyebrow')}
          </span>
          <h2 className="h-1">{t('team.title')}</h2>
          <p className="lead">{t('team.subtitle')}</p>
        </div>
        <div className="team__grid">
          {members.map((m) => {
            const initials = m.name
              .split(' ')
              .map((w) => w[0])
              .slice(-2)
              .join('');
            return (
              <div key={m.n} className="member">
                <div className="member__photo">
                  <div className="ph"></div>
                  <div className="init">{initials}</div>
                </div>
                <div className="member__info">
                  <div className="member__name">{m.name}</div>
                  <div className="member__role">{m.role}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
