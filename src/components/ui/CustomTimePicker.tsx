import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Clock, ChevronUp, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

interface CustomTimePickerProps {
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  error?: boolean;
}

const CustomTimePicker: React.FC<CustomTimePickerProps> = ({
  value,
  onChange,
  placeholder = 'Vaqtni tanlang',
  className,
  error,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  
  // Initialize with current value or 12:00
  const initialTime = value || '12:00';
  const [hours, setHours] = useState(parseInt(initialTime.split(':')[0]));
  const [minutes, setMinutes] = useState(parseInt(initialTime.split(':')[1]));

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const updateCoords = () => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setCoords({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
      });
    }
  };

  useEffect(() => {
    if (isOpen) {
      updateCoords();
      window.addEventListener('resize', updateCoords);
      window.addEventListener('scroll', updateCoords, true);
    }
    return () => {
      window.removeEventListener('resize', updateCoords);
      window.removeEventListener('scroll', updateCoords, true);
    };
  }, [isOpen]);

  const formatTime = (h: number, m: number) => {
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
  };

  const handleApply = () => {
    onChange(formatTime(hours, minutes));
    setIsOpen(false);
  };

  const incrementHours = () => setHours((hours + 1) % 24);
  const decrementHours = () => setHours((hours - 1 + 24) % 24);
  const incrementMinutes = () => setMinutes((minutes + 5) % 60);
  const decrementMinutes = () => setMinutes((minutes - 5 + 60) % 60);

  return (
    <>
      <div className={cn('relative w-full', className)} ref={containerRef}>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            'w-full flex items-center gap-3 px-5 py-3.5 bg-[#F2F4F7] rounded-xl border-none outline-none focus:ring-2 focus:ring-[#F97316]/20 transition-all font-medium text-sm text-[#1C2434] text-left',
            !value && 'text-gray-400',
            error && 'ring-2 ring-red-500/50',
            isOpen && 'ring-2 ring-[#F97316]/20'
          )}
        >
          <Clock className="w-4 h-4 text-[#98A2B3]" />
          <span className="flex-1">{value || placeholder}</span>
        </button>
      </div>

      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              style={{
                position: 'absolute',
                top: coords.top + 8,
                left: Math.min(coords.left, window.innerWidth - 220),
                zIndex: 9999,
              }}
              className="mt-2 p-6 bg-white rounded-2xl shadow-2xl border border-gray-100 flex flex-col items-center w-[200px]"
            >
              <div className="flex items-center gap-4 mb-4">
                {/* Hours */}
                <div className="flex flex-col items-center">
                  <button onClick={incrementHours} type="button" className="p-1 hover:bg-[#F2F4F7] rounded-lg transition-colors">
                    <ChevronUp className="w-5 h-5 text-[#667085]" />
                  </button>
                  <span className="text-2xl font-black text-[#1C2434] my-1">
                    {hours.toString().padStart(2, '0')}
                  </span>
                  <button onClick={decrementHours} type="button" className="p-1 hover:bg-[#F2F4F7] rounded-lg transition-colors">
                    <ChevronDown className="w-5 h-5 text-[#667085]" />
                  </button>
                </div>

                <span className="text-2xl font-black text-[#1C2434]">:</span>

                {/* Minutes */}
                <div className="flex flex-col items-center">
                  <button onClick={incrementMinutes} type="button" className="p-1 hover:bg-[#F2F4F7] rounded-lg transition-colors">
                    <ChevronUp className="w-5 h-5 text-[#667085]" />
                  </button>
                  <span className="text-2xl font-black text-[#1C2434] my-1">
                    {minutes.toString().padStart(2, '0')}
                  </span>
                  <button onClick={decrementMinutes} type="button" className="p-1 hover:bg-[#F2F4F7] rounded-lg transition-colors">
                    <ChevronDown className="w-5 h-5 text-[#667085]" />
                  </button>
                </div>
              </div>

              <button
                type="button"
                onClick={handleApply}
                className="w-full py-2 bg-[#F97316] text-white rounded-xl text-sm font-bold shadow-lg shadow-[#F97316]/20 transition-all hover:scale-[1.02]"
              >
                Tanlash
              </button>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
};


export default CustomTimePicker;
