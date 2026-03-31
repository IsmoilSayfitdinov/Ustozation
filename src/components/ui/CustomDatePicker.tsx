import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

interface CustomDatePickerProps {
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  error?: boolean;
}

const months = [
  'Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'Iyun',
  'Iyul', 'Avgust', 'Sentabr', 'Oktabr', 'Noyabr', 'Dekabr'
];

const days = ['Du', 'Se', 'Ch', 'Pa', 'Ju', 'Sh', 'Ya'];

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  value,
  onChange,
  placeholder = 'Sanani tanlang',
  className,
  error,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [coords, setCoords] = useState({ top: 0, left: 0 });

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

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month: number, year: number) => {
    const day = new Date(year, month, 1).getDay();
    return day === 0 ? 6 : day - 1; // Adjust to start from Monday
  };

  const handleDateClick = (day: number) => {
    const selectedDate = new Date(currentYear, currentMonth, day);
    const formattedDate = selectedDate.toISOString().split('T')[0];
    onChange(formattedDate);
    setIsOpen(false);
  };

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const renderDays = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
    const dateList = [];

    for (let i = 0; i < firstDay; i++) {
      dateList.push(<div key={`empty-${i}`} className="h-9 w-9" />);
    }

    for (let d = 1; d <= daysInMonth; d++) {
      const isSelected = value === new Date(currentYear, currentMonth, d).toISOString().split('T')[0];
      const isToday = new Date().toISOString().split('T')[0] === new Date(currentYear, currentMonth, d).toISOString().split('T')[0];
      
      dateList.push(
        <button
          key={d}
          type="button"
          onClick={() => handleDateClick(d)}
          className={cn(
            "h-9 w-9 rounded-xl flex items-center justify-center text-sm font-medium transition-all hover:bg-[#F2F4F7]",
            isSelected ? "bg-[#F97316] text-white hover:bg-[#F97316]" : "text-[#1C2434]",
            isToday && !isSelected && "text-[#F97316] border border-[#F97316]/20"
          )}
        >
          {d}
        </button>
      );
    }

    return dateList;
  };

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
          <Calendar className="w-4 h-4 text-[#98A2B3]" />
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
                left: Math.min(coords.left, window.innerWidth - 320), // Prevent going off-screen
                zIndex: 9999,
              }}
              className="mt-2 p-4 bg-white rounded-2xl shadow-2xl border border-gray-100 w-[300px]"
            >
              <div className="flex items-center justify-between mb-4">
                <button onClick={handlePrevMonth} type="button" className="p-1 hover:bg-[#F2F4F7] rounded-lg transition-colors">
                  <ChevronLeft className="w-5 h-5 text-[#667085]" />
                </button>
                <span className="font-bold text-[#1C2434]">
                  {months[currentMonth]} {currentYear}
                </span>
                <button onClick={handleNextMonth} type="button" className="p-1 hover:bg-[#F2F4F7] rounded-lg transition-colors">
                  <ChevronRight className="w-5 h-5 text-[#667085]" />
                </button>
              </div>

              <div className="grid grid-cols-7 gap-1 mb-2">
                {days.map(d => (
                  <div key={d} className="h-9 w-9 flex items-center justify-center text-[11px] font-bold text-[#98A2B3] uppercase tracking-wider">
                    {d}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-1">
                {renderDays()}
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
};


export default CustomDatePicker;
