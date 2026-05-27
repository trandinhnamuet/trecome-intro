import type { Metadata } from 'next';
import './globals.css';
import { I18nProvider } from '@/lib/I18nContext';
import { ModalProvider } from '@/lib/ModalContext';
import ContactModal from '@/components/ContactModal';
import Toast from '@/components/Toast';

export const metadata: Metadata = {
  title: 'Trecome — E2E E-Commerce Operation',
  description:
    'Trecome đồng hành cùng các thương hiệu trên hành trình lên sàn TMĐT.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Be+Vietnam+Pro:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <I18nProvider>
          <ModalProvider>
            {children}
            <ContactModal />
            <Toast />
          </ModalProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
