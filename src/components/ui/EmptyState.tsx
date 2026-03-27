import { motion } from 'framer-motion';
import { FileQuestion, RefreshCcw } from 'lucide-react';

interface EmptyStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
  icon?: React.ReactNode;
}

const EmptyState = ({ 
  title = "Ma'lumot topilmadi", 
  description = "Hozircha bu yerda hech qanday ma'lumot yo'q. Keyinroq qayta urinib ko'ring.", 
  onRetry,
  icon
}: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center min-h-[300px]">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ 
          type: "spring",
          stiffness: 260,
          damping: 20 
        }}
        className="relative mb-6"
      >
        <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full scale-150" />
        <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-3xl shadow-2xl">
          {icon || <FileQuestion className="w-16 h-16 text-primary" />}
        </div>
      </motion.div>
      
      <motion.h3 
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="text-2xl font-bold text-slate-800 mb-2"
      >
        {title}
      </motion.h3>
      
      <motion.p 
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-slate-500 max-w-sm mb-8"
      >
        {description}
      </motion.p>
      
      {onRetry && (
        <motion.button
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onRetry}
          className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-2xl font-semibold shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all duration-300"
        >
          <RefreshCcw className="w-5 h-5" />
          Qayta urinish
        </motion.button>
      )}
    </div>
  );
};

export default EmptyState;
