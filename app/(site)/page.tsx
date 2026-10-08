import type { Metadata } from 'next';
import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import Marquee from '@/components/Marquee';
import MarketData from '@/components/MarketData';
import Process from '@/components/Process';
import Services from '@/components/Services';
import Pricing from '@/components/Pricing';
import Cases from '@/components/Cases';
import Testimonials from '@/components/Testimonials';
import Blog from '@/components/Blog';
import FAQ from '@/components/FAQ';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';

// Trang này phục vụ ở cả trecome.vn lẫn www.trecome.vn; canonical báo Google
// gom về bản không www.
export const metadata: Metadata = {
  alternates: { canonical: '/' },
};

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <Marquee />
      {/* <Stats /> — thay bằng section số liệu thị trường TMĐT */}
      <MarketData />
      <Process />
      <Services />
      <Pricing />
      {/* <Cases /> */}
      {/* <Testimonials /> */}
      {/* <Blog /> */}
      {/* <FAQ /> */}
      <CTA />
      <Footer />
    </>
  );
}
