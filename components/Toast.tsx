'use client';
import { useI18n } from '@/lib/I18nContext';
import { useModal } from '@/lib/ModalContext';

export default function Toast() {
  const { t } = useI18n();
  const { toastShow } = useModal();
  return (
    <div className={'toast' + (toastShow ? ' show' : '')}>
      <span className="ic">✓</span> {t('cta.toast')}
    </div>
  );
}
