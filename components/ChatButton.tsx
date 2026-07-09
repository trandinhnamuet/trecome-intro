'use client';
import { useI18n } from '@/lib/I18nContext';

const MESSENGER_URL = 'https://m.me/trecomevietnam';

export default function ChatButton() {
  const { t } = useI18n();
  const label = t('chat.cta');

  return (
    <a
      href={MESSENGER_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="chat-fab"
      aria-label={label}
    >
      <svg
        className="chat-fab__ic"
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M12 2.5c-5.4 0-9.6 3.95-9.6 9.05 0 2.68 1.17 5.02 3.08 6.63v3.32l2.9-1.6c.82.23 1.7.35 2.62.35 5.4 0 9.6-3.95 9.6-9.05S17.4 2.5 12 2.5Z"
          fill="currentColor"
        />
        <path
          d="m6.5 14.1 3.02-3.2 1.53 1.6 2.9-1.6-3.02 3.2-1.53-1.6-2.9 1.6Z"
          fill="#fff"
        />
      </svg>
      <span className="chat-fab__label">{label}</span>
    </a>
  );
}
