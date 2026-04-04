import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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

function SplashScreen() {
  return (
    <motion.div
      key="splash"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.02 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      className="fixed inset-0 z-9999 bg-white dark:bg-[#0a0a0a] flex flex-col items-center justify-center"
    >
      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative mb-8"
      >
        <img src="/img/Mask group.png" alt="Ustoznation" className="h-12 md:h-14" />
      </motion.div>

      <div className="w-48 h-1.5 bg-[#F2F4F7] rounded-full overflow-hidden">
        <motion.div
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 2, ease: 'easeInOut' }}
          className="h-full bg-linear-to-r from-primary via-primary-dark to-primary rounded-full"
        />
      </div>

      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="mt-6 text-[11px] font-bold text-[#C0C5CD] dark:text-[#52525b] uppercase tracking-[0.3em]"
      >
        Yuklanmoqda...
      </motion.p>

      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-blue-500/5 rounded-full blur-[80px] pointer-events-none" />
    </motion.div>
  )
}

function Parent() {
  const { data: landing, isLoading } = useLandingPage();
  const [ready, setReady] = useState(false);
  const minTimePassed = useRef(false);
  const dataLoaded = useRef(false);

  // Minimum 2s splash
  useEffect(() => {
    const timer = setTimeout(() => {
      minTimePassed.current = true;
      if (dataLoaded.current) setReady(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // When data arrives
  useEffect(() => {
    if (!isLoading) {
      dataLoaded.current = true;
      if (minTimePassed.current) setReady(true);
    }
  }, [isLoading]);

  return (
    <AnimatePresence mode="wait">
      {!ready ? (
        <SplashScreen />
      ) : (
        <motion.div
          key="landing"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="bg-white dark:bg-[#0a0a0a] min-w-full text-on-surface font-body selection:bg-primary/20 selection:text-primary"
        >
          <Navbar />
          <Hero stats={landing?.stats} />
          <About features={landing?.features} />
          <Courses />
          <BentoGrid />
          <Pricing plans={landing?.pricing} />
          <Testimonials reviews={landing?.reviews} />
          <CTA />
          <Footer contact={landing?.contact} />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Parent
