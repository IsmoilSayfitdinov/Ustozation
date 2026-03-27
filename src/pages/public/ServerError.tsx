import { motion } from 'framer-motion';
import { ServerCrash, RefreshCw, MessageCircle } from 'lucide-react';

const ServerError = () => {
  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900 text-white p-6 overflow-hidden relative">
      {/* Animated Matrix-like Background or Glitchy Glow */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 blur-[150px] rounded-full animate-pulse" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 text-center max-w-2xl"
      >
        <motion.div
          animate={{ 
            rotate: [0, -5, 5, -5, 0],
            scale: [1, 1.05, 1]
          }}
          transition={{ duration: 4, repeat: Infinity }}
          className="inline-block p-6 rounded-3xl bg-red-500/10 border border-red-500/20 mb-8"
        >
          <ServerCrash className="w-20 h-20 text-red-500" />
        </motion.div>

        <h1 className="text-4xl md:text-5xl font-black mb-6 bg-clip-text text-transparent bg-linear-to-r from-white to-slate-400">
          Ulanishda muammo yuz berdi
        </h1>
        
        <p className="text-slate-400 text-lg mb-10 leading-relaxed">
          Server bilan aloqa yo'qolgan ko'rinadi. Bu bizning texnik ishlarimiz yoki sizning internet ulanishingiz bilan bog'liq bo'lishi mumkin.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleReload}
            className="flex items-center justify-center gap-3 px-8 py-4 bg-primary text-white rounded-2xl font-bold shadow-2xl shadow-primary/30 hover:shadow-primary/50 transition-all duration-300"
          >
            <RefreshCw className="w-5 h-5" />
            Qayta yuklash
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center justify-center gap-3 px-8 py-4 bg-slate-800 text-white rounded-2xl font-bold border border-slate-700 hover:bg-slate-700 transition-all duration-300"
          >
            <MessageCircle className="w-5 h-5 text-primary" />
            Yordam olish
          </motion.button>
        </div>
      </motion.div>

      {/* Decorative glitch squares */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: [0, 0.2, 0],
            x: [0, Math.random() * 40 - 20, 0],
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity, 
            delay: Math.random() * 2 
          }}
          className="absolute w-20 h-1 bg-primary/30"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
        />
      ))}
    </div>
  );
};

export default ServerError;
