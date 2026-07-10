import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import About from '@/components/About'
import WhyChooseMe from '@/components/WhyChooseMe'
import Pricing from '@/components/Pricing'
import Showcase from '@/components/Showcase'
import Testimonials from '@/components/Testimonials'
import Skills from '@/components/Skills'
import Process from '@/components/Process'
import FAQ from '@/components/FAQ'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import CursorGlow from '@/components/CursorGlow'

export default function Home() {
  return (
    <>
      <CursorGlow />
      <Navigation />
      <main>
        <Hero />
        <About />
        <WhyChooseMe />
        <Pricing />
        <Showcase />
        <Testimonials />
        <Skills />
        <Process />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
