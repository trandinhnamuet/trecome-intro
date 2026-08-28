import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import Marquee from '@/components/Marquee';
import Why from '@/components/Why';
import TaxPolicy from '@/components/TaxPolicy';
import TaxGroups from '@/components/TaxGroups';
import Process from '@/components/Process';
import Services from '@/components/Services';
import Reports from '@/components/Reports';
import Pricing from '@/components/Pricing';
import FAQ from '@/components/FAQ';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <Marquee />
      <Why />
      {/* Khu nền tối: chính sách thuế theo nhóm doanh thu */}
      <TaxPolicy />
      <TaxGroups />
      <Process />
      <Services />
      <Reports />
      <Pricing />
      <FAQ />
      <CTA />
      <Footer />
    </>
  );
}
