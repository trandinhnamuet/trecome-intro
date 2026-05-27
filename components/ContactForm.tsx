'use client';
import { useState, ChangeEvent, FormEvent } from 'react';
import { useI18n } from '@/lib/I18nContext';

interface ContactFormProps {
  defaultPlan?: string;
  onSuccess?: () => void;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  brand: string;
  plan: string;
  msg: string;
}

export default function ContactForm({
  defaultPlan = '',
  onSuccess,
}: ContactFormProps) {
  const { t } = useI18n();
  const [prevDefaultPlan, setPrevDefaultPlan] = useState(defaultPlan);
  const [data, setData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    brand: '',
    plan: defaultPlan,
    msg: '',
  });
  const [submitting, setSubmitting] = useState(false);

  // Sync plan during render when defaultPlan prop changes
  if (defaultPlan !== prevDefaultPlan) {
    setPrevDefaultPlan(defaultPlan);
    if (defaultPlan) {
      setData((d) => ({ ...d, plan: defaultPlan }));
    }
  }

  const set =
    (k: keyof FormData) =>
    (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setData((d) => ({ ...d, [k]: e.target.value }));

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!data.email || !data.name) return;
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setData({
        name: '',
        email: '',
        phone: '',
        brand: '',
        plan: '',
        msg: '',
      });
      if (onSuccess) onSuccess();
    }, 700);
  };

  return (
    <form className="form" onSubmit={onSubmit}>
      <div className="form__row">
        <div className="field">
          <label>{t('cta.name')}</label>
          <input
            required
            value={data.name}
            onChange={set('name')}
            placeholder={t('cta.name.ph')}
          />
        </div>
        <div className="field">
          <label>{t('cta.email')}</label>
          <input
            type="email"
            required
            value={data.email}
            onChange={set('email')}
            placeholder={t('cta.email.ph')}
          />
        </div>
      </div>
      <div className="form__row">
        <div className="field">
          <label>{t('cta.phone')}</label>
          <input
            value={data.phone}
            onChange={set('phone')}
            placeholder={t('cta.phone.ph')}
          />
        </div>
        <div className="field">
          <label>{t('cta.brand')}</label>
          <input
            value={data.brand}
            onChange={set('brand')}
            placeholder={t('cta.brand.ph')}
          />
        </div>
      </div>
      <div className="field">
        <label>{t('cta.plan')}</label>
        <select value={data.plan} onChange={set('plan')}>
          <option value="">—</option>
          <option value="buildup">{t('cta.plan.opt1')}</option>
          <option value="starter">{t('cta.plan.opt2')}</option>
          <option value="growup">{t('cta.plan.opt3')}</option>
          <option value="scale">{t('cta.plan.opt4')}</option>
          <option value="unknown">{t('cta.plan.opt5')}</option>
        </select>
      </div>
      <div className="field">
        <label>{t('cta.msg')}</label>
        <textarea
          value={data.msg}
          onChange={set('msg')}
          placeholder={t('cta.msg.ph')}
          rows={3}
        />
      </div>
      <button
        type="submit"
        className="btn btn--primary btn--lg"
        disabled={submitting}
        style={{ justifySelf: 'start', marginTop: 4 }}
      >
        {submitting ? '...' : t('cta.submit')} <span className="arr">→</span>
      </button>
    </form>
  );
}
