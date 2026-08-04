import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import HowItWorks from '../components/HowItWorks'
import Features from '../components/Features'
import Expert from '../components/Expert'
import StartFree from '../components/StartFree'
import Pricing from '../components/Pricing'
import Services from '../components/Services'
import Testimonials from '../components/Testimonials'
import CTA from '../components/CTA'
import Footer from '../components/Footer'

export default function Landing() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <HowItWorks />
        <Features />
        <Expert />
        <StartFree />
        <Pricing />
        <Services />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
