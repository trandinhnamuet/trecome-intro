import type { Metadata } from 'next';
import './globals.css';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import VisitTracker from '@/components/VisitTracker';

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
        {children}
        {/* Hai lớp đo song song: GA4 cho bức tranh tổng hợp, VisitTracker ghi
            từng lượt kèm IP và visitor ID vào DB của mình — thứ GA4 không cho,
            và không bị ad-blocker chặn vì beacon về ngay domain này. */}
        <GoogleAnalytics />
        <VisitTracker />
      </body>
    </html>
  );
}
