'use client';
import { useEffect } from 'react';
import { useI18n } from '@/lib/I18nContext';
import { useModal } from '@/lib/ModalContext';
import ContactForm from './ContactForm';

export default function ContactModal() {
  const { t } = useI18n();
  const { open, plan, closeModal, showToast } = useModal();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };
    if (open) document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, closeModal]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
  }, [open]);

  if (!open) return null;
  return (
    <div className={'modal' + (open ? ' open' : '')}>
      <div className="modal__bg" onClick={closeModal}></div>
      <div className="modal__card">
        <button className="modal__close" onClick={closeModal}>
          ×
        </button>
        <h3>{t('cta.title')}</h3>
        <p className="lead">{t('cta.subtitle')}</p>
        <ContactForm
          defaultPlan={plan}
          onSuccess={() => {
            closeModal();
            showToast();
          }}
        />
      </div>
    </div>
  );
}
