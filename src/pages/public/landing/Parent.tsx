import Navbar from '@/components/landing/Navbar'
import Hero from '@/components/landing/Hero'
import About from '@/components/landing/About'
import Courses from '@/components/landing/Courses'
import BentoGrid from '@/components/landing/BentoGrid'
import Pricing from '@/components/landing/Pricing'
import Testimonials from '@/components/landing/Testimonials'
import CTA from '@/components/landing/CTA'
import Footer from '@/components/landing/Footer'
import { useLandingPage } from '@/hooks/useLanding'

function Parent() {
  const { data: landing } = useLandingPage();

  return (
    <div className="bg-white min-w-full text-on-surface font-body selection:bg-primary/20 selection:text-primary">
        <Navbar />
        <Hero stats={landing?.stats} />
        <About features={landing?.features} />
        <Courses />
        <BentoGrid />
        <Pricing plans={landing?.pricing} />
        <Testimonials reviews={landing?.reviews} />
        <CTA />
        <Footer contact={landing?.contact} />
    </div>
  )
}

export default Parent
