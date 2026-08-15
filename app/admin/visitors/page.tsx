import type { Metadata } from 'next';
import VisitorsDashboard from './VisitorsDashboard';

export const metadata: Metadata = {
  title: 'Nhật ký truy cập — Trecome',
  robots: { index: false, follow: false },
};

export default function VisitorsPage() {
  return <VisitorsDashboard />;
}
