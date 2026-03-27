import React from 'react';
import { motion } from 'framer-motion';

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-[1440px] grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
        
        {/* Left Side - Illustration Card */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="hidden lg:flex flex-col items-center justify-center bg-[#F970151F] rounded-[3rem] p-12 text-center relative overflow-hidden h-[800px]"
        >
          {/* Logo at Top */}
          <div className="absolute top-10 left-10">
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
            <h2 className="text-3xl font-black font-headline tracking-tighter text-[#141F38]">
              Bilim sari yangi bosqich
            </h2>
            <p className="text-on-surface-variant font-medium leading-relaxed">
              Interaktiv darslar, testlar va reyting tizimi orqali bilimlaringizni mustahkamlang.
            </p>
          </div>

          {/* Carousel Indicators */}
          <div className="flex gap-2 mt-8 relative z-10">
            <div className="w-8 h-2 rounded-full bg-primary"></div>
            <div className="w-2 h-2 rounded-full bg-white"></div>
            <div className="w-2 h-2 rounded-full bg-white"></div>
          </div>
          
          {/* Decorative shapes */}
          <div className="absolute top-1/2 left-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
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
