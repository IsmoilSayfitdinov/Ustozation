import { useState, useRef, useEffect } from 'react';
import { Search, X, LayoutGrid, Users, Layers, Book, CheckSquare, Award, PieChart, FileText, GraduationCap, Globe, ArrowRight, Command } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useGlobalSearch, type SearchResult } from '@/hooks/useGlobalSearch';

const ICON_MAP: Record<string, typeof LayoutGrid> = {
  LayoutGrid, Users, Layers, Book, CheckSquare, Award, PieChart, FileText, GraduationCap, Globe,
};

const TYPE_COLORS: Record<string, { bg: string; text: string }> = {
  page: { bg: 'bg-primary/10', text: 'text-primary' },
  group: { bg: 'bg-blue-500/10', text: 'text-blue-500' },
  teacher: { bg: 'bg-purple-500/10', text: 'text-purple-500' },
  student: { bg: 'bg-green-500/10', text: 'text-green-500' },
  action: { bg: 'bg-amber-500/10', text: 'text-amber-500' },
};

interface SearchPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchPanel = ({ isOpen, onClose }: SearchPanelProps) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { grouped, typeLabels, isEmpty } = useGlobalSearch(query);

  // Focus on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      setQuery('');
    }
  }, [isOpen]);

  // Ctrl+K shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else document.dispatchEvent(new CustomEvent('open-search'));
      }
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  const handleSelect = (result: SearchResult) => {
    navigate(result.path);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-sm z-[100]"
          />

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -20 }}
            transition={{ type: 'spring', duration: 0.35, bounce: 0.1 }}
            className="fixed top-[15%] left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-[580px] bg-white dark:bg-[#1a1a1a] rounded-[24px] shadow-2xl shadow-black/15 dark:shadow-black/50 border border-[#F2F4F7] dark:border-white/10 z-[101] overflow-hidden"
          >
            {/* Search Input */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-[#F2F4F7] dark:border-white/8">
              <Search className="w-5 h-5 text-[#98A2B3] shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Sahifa, guruh yoki o'qituvchi qidirish..."
                className="flex-1 bg-transparent border-none outline-none text-[15px] font-medium text-[#141F38] dark:text-white placeholder:text-[#C0C5CD] dark:placeholder:text-white/30"
              />
              {query && (
                <button onClick={() => setQuery('')} className="p-1 rounded-lg hover:bg-[#F2F4F7] dark:hover:bg-white/10 transition-colors">
                  <X className="w-4 h-4 text-[#98A2B3]" />
                </button>
              )}
              <kbd className="hidden sm:flex items-center gap-1 px-2 py-1 rounded-lg bg-[#F2F4F7] dark:bg-white/10 text-[10px] font-bold text-[#98A2B3] border border-[#E4E7EC] dark:border-white/10">
                ESC
              </kbd>
            </div>

            {/* Results */}
            <div className="max-h-[50vh] overflow-y-auto custom-scrollbar">
              {query.length === 0 ? (
                /* Quick Links */
                <div className="p-3">
                  <p className="text-[10px] font-black text-[#98A2B3] dark:text-white/30 uppercase tracking-widest px-3 py-2">Tez havolalar</p>
                  {[
                    { title: 'Bosh sahifa', path: '/admin/dashboard', icon: 'LayoutGrid' },
                    { title: 'Talabalar', path: '/admin/students', icon: 'Users' },
                    { title: 'Guruhlar', path: '/admin/groups', icon: 'Layers' },
                    { title: 'Testlar', path: '/admin/tests', icon: 'CheckSquare' },
                  ].map((item) => {
                    const Icon = ICON_MAP[item.icon] || LayoutGrid;
                    return (
                      <button
                        key={item.path}
                        onClick={() => { navigate(item.path); onClose(); }}
                        className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-left hover:bg-[#F9FAFB] dark:hover:bg-white/5 transition-colors group"
                      >
                        <div className="w-9 h-9 rounded-xl bg-primary/8 dark:bg-primary/15 flex items-center justify-center group-hover:bg-primary/15 transition-colors">
                          <Icon className="w-4 h-4 text-primary" />
                        </div>
                        <span className="text-sm font-bold text-[#141F38] dark:text-white">{item.title}</span>
                        <ArrowRight className="w-4 h-4 text-[#D0D5DD] ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                      </button>
                    );
                  })}
                </div>
              ) : isEmpty ? (
                /* No results */
                <div className="flex flex-col items-center justify-center py-14 px-6">
                  <div className="w-14 h-14 rounded-full bg-[#F9FAFB] dark:bg-white/5 flex items-center justify-center mb-4">
                    <Search className="w-6 h-6 text-[#D0D5DD]" />
                  </div>
                  <p className="text-sm font-bold text-[#98A2B3]">"{query}" bo'yicha natija topilmadi</p>
                  <p className="text-xs font-medium text-[#D0D5DD] mt-1">Boshqa kalit so'z bilan qidirib ko'ring</p>
                </div>
              ) : (
                /* Grouped Results */
                <div className="p-3 space-y-1">
                  {Object.entries(grouped).map(([type, items]) => {
                    const colors = TYPE_COLORS[type] || TYPE_COLORS.page;
                    return (
                      <div key={type}>
                        <p className="text-[10px] font-black text-[#98A2B3] dark:text-white/30 uppercase tracking-widest px-3 py-2">{typeLabels[type]}</p>
                        {items.map((item) => {
                          const Icon = ICON_MAP[item.icon] || LayoutGrid;
                          return (
                            <button
                              key={item.id}
                              onClick={() => handleSelect(item)}
                              className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-left hover:bg-[#F9FAFB] dark:hover:bg-white/5 transition-colors group"
                            >
                              <div className={`w-9 h-9 rounded-xl ${colors.bg} flex items-center justify-center shrink-0`}>
                                <Icon className={`w-4 h-4 ${colors.text}`} />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-bold text-[#141F38] dark:text-white truncate">{item.title}</p>
                                {item.subtitle && (
                                  <p className="text-[11px] font-medium text-[#98A2B3] dark:text-white/40 truncate">{item.subtitle}</p>
                                )}
                              </div>
                              <ArrowRight className="w-4 h-4 text-[#D0D5DD] shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </button>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-5 py-3 border-t border-[#F2F4F7] dark:border-white/8 flex items-center justify-between">
              <div className="flex items-center gap-4 text-[10px] font-bold text-[#C0C5CD] dark:text-white/20">
                <span className="flex items-center gap-1"><kbd className="px-1.5 py-0.5 rounded bg-[#F2F4F7] dark:bg-white/10 border border-[#E4E7EC] dark:border-white/10">↑↓</kbd> navigatsiya</span>
                <span className="flex items-center gap-1"><kbd className="px-1.5 py-0.5 rounded bg-[#F2F4F7] dark:bg-white/10 border border-[#E4E7EC] dark:border-white/10">↵</kbd> tanlash</span>
              </div>
              <div className="flex items-center gap-1 text-[10px] font-bold text-[#C0C5CD] dark:text-white/20">
                <Command className="w-3 h-3" /> + K
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SearchPanel;
