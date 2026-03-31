import React, { useState } from 'react';
import { X, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import CustomSelect from '@/components/ui/CustomSelect';
import { useLevels } from '@/hooks/useCourses';

interface CreateGroupDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { title: string; level: number; max_students: number }) => void;
  isPending?: boolean;
}

const CreateGroupDialog: React.FC<CreateGroupDialogProps> = ({ isOpen, onClose, onSubmit, isPending }) => {
  const [formData, setFormData] = useState({
    title: '',
    level: '',
    maxStudents: '',
  });

  const { data: levels } = useLevels();

  const levelOptions = (levels ?? []).map((l) => ({
    label: l.name,
    value: String(l.id),
  }));

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.level || !formData.title.trim()) return;
    onSubmit({
      title: formData.title,
      level: Number(formData.level),
      max_students: Number(formData.maxStudents) || 200,
    });
  };

  const handleClose = () => {
    setFormData({ title: '', level: '', maxStudents: '' });
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-[500px] bg-white rounded-[24px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="px-6 py-5 bg-[#F97316] relative flex items-center justify-between">
            <div className="flex items-center gap-2 text-white">
              <Sparkles className="w-5 h-5" />
              <h2 className="text-xl font-headline font-black tracking-tighter">
                Yangi guruh yaratish
              </h2>
            </div>
            <button
              onClick={handleClose}
              className="text-white hover:bg-black/10 p-1.5 rounded-xl transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
            {/* Guruh nomi */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#1C2434] ml-1 uppercase tracking-wider">
                Guruh nomi
              </label>
              <input
                type="text"
                placeholder="Masalan: English Beginner — 2026 #1"
                value={formData.title}
                onChange={e => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-5 py-3.5 bg-[#F2F4F7] rounded-xl border-none outline-none focus:ring-2 focus:ring-[#F97316]/20 transition-all font-medium text-[#1C2434] text-sm"
                required
              />
            </div>

            {/* Level tanlash */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#1C2434] ml-1 uppercase tracking-wider">
                Daraja tanlash
              </label>
              <CustomSelect
                options={levelOptions}
                value={formData.level}
                onChange={val => setFormData({ ...formData, level: val })}
                placeholder="Darajani tanlang"
              />
              <p className="text-[10px] text-[#98A2B3] font-medium ml-1">
                Daraja tanlaganda barcha darslar va testlar avtomatik klonlanadi
              </p>
            </div>

            {/* Maksimal o'quvchilar */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#1C2434] ml-1 uppercase tracking-wider">
                Maksimal o'quvchilar soni
              </label>
              <input
                type="number"
                placeholder="200"
                value={formData.maxStudents}
                onChange={e => setFormData({ ...formData, maxStudents: e.target.value })}
                className="w-full px-5 py-3.5 bg-[#F2F4F7] rounded-xl border-none outline-none focus:ring-2 focus:ring-[#F97316]/20 transition-all font-medium text-[#1C2434] text-sm"
              />
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-6">
              <button
                type="button"
                onClick={handleClose}
                className="px-6 py-3 rounded-xl font-bold text-sm text-[#667085] hover:bg-[#F2F4F7] transition-colors"
              >
                Bekor qilish
              </button>
              <button
                type="submit"
                disabled={isPending}
                className="px-6 py-3 rounded-xl font-bold text-sm bg-[#F97316] text-white hover:bg-[#EA580C] shadow-lg shadow-[#F97316]/20 transition-all hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isPending ? "Yaratilmoqda..." : "+ Guruh yaratish"}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default CreateGroupDialog;
