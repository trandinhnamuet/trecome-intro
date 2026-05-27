import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import Marquee from '@/components/Marquee';
import Stats from '@/components/Stats';
import Process from '@/components/Process';
import Services from '@/components/Services';
import Pricing from '@/components/Pricing';
import Cases from '@/components/Cases';
import Testimonials from '@/components/Testimonials';
import Team from '@/components/Team';
import Blog from '@/components/Blog';
import FAQ from '@/components/FAQ';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <Marquee />
      <Stats />
      <Process />
      <Services />
      <Pricing />
      <Cases />
      <Testimonials />
      <Team />
      <Blog />
      <FAQ />
      <CTA />
      <Footer />
    </>
  );
}
