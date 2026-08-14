import { I18nProvider } from '@/lib/I18nContext';
import { ModalProvider } from '@/lib/ModalContext';
import ContactModal from '@/components/ContactModal';
import ChatButton from '@/components/ChatButton';
import Toast from '@/components/Toast';

/**
 * Chrome của trang public (i18n, modal liên hệ, nút chat, toast).
 * Tách khỏi root layout để khu /admin không dính các thành phần này.
 */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <I18nProvider>
      <ModalProvider>
        {children}
        <ContactModal />
        <ChatButton />
        <Toast />
      </ModalProvider>
    </I18nProvider>
  );
}
