import React from 'react';
import { motion } from 'framer-motion';

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen bg-[#f8f9fb] dark:bg-[#0a0a0a] flex items-center justify-center p-4 md:p-8 transition-colors duration-300">
      <div className="w-full max-w-[1440px] grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
        
        {/* Left Side - Illustration Card */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="hidden lg:flex flex-col items-center justify-center rounded-[3rem] p-12 text-center relative overflow-hidden h-[800px]
            bg-[#FFF3E8] dark:bg-linear-to-br dark:from-[#111111] dark:via-[#181818] dark:to-[#0f0f0f]
            border border-orange-100/60 dark:border-white/5"
        >
          {/* Dark mode glow orbs */}
          <div className="absolute top-20 left-10 w-48 h-48 rounded-full blur-[80px] pointer-events-none
            bg-primary/8 dark:bg-primary/20 opacity-60 dark:opacity-100" />
          <div className="absolute bottom-32 right-10 w-64 h-64 rounded-full blur-[100px] pointer-events-none
            bg-orange-300/10 dark:bg-primary/15 opacity-60 dark:opacity-100" />
          <div className="absolute top-1/2 right-0 w-32 h-32 rounded-full blur-[60px] pointer-events-none
            dark:bg-primary-light/10" />

          {/* Logo at Top */}
          <div className="absolute top-10 left-10 z-10">
            <img src="/img/Mask group.png" alt="Ustoznation Logo" className="h-8" />
          </div>

          {/* 3D Illustration */}
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="mb-12 relative z-10"
          >
            <img 
              src="/img/image 38.png" 
              alt="Education 3D Illustration" 
              className="w-full max-w-md drop-shadow-2xl"
            />
          </motion.div>

          {/* Content */}
          <div className="space-y-4 max-w-md relative z-10">
            <h2 className="text-3xl font-black font-headline tracking-tighter text-[#141F38] dark:text-white">
              Bilim sari yangi bosqich
            </h2>
            <p className="text-[#667085] dark:text-[#a1a1aa] font-medium leading-relaxed">
              Interaktiv darslar, testlar va reyting tizimi orqali bilimlaringizni mustahkamlang.
            </p>
          </div>

          {/* Carousel Indicators */}
          <div className="flex gap-2 mt-8 relative z-10">
            <div className="w-8 h-2 rounded-full bg-primary"></div>
            <div className="w-2 h-2 rounded-full bg-[#141F38]/20 dark:bg-white/25"></div>
            <div className="w-2 h-2 rounded-full bg-[#141F38]/20 dark:bg-white/25"></div>
          </div>
        </motion.div>

        {/* Right Side - Forms */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-md mx-auto"
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
};

export default AuthLayout;
