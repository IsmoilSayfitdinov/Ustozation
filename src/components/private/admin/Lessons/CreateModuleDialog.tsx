import React from 'react';
import { X, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createModuleSchema, type CreateModuleSchema } from '@/schemas/private/admin/module';

interface CreateModuleDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { name: string; description: string }) => void;
  isPending?: boolean;
}

const CreateModuleDialog: React.FC<CreateModuleDialogProps> = ({ isOpen, onClose, onSubmit, isPending }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<CreateModuleSchema>({
    resolver: zodResolver(createModuleSchema),
    defaultValues: { title: '', description: '' },
  });

  if (!isOpen) return null;

  const onFormSubmit = (data: CreateModuleSchema) => {
    onSubmit({ name: data.title, description: data.description || '' });
  };

  const handleClose = () => { reset(); onClose(); };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={handleClose} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
        <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="relative w-full max-w-md bg-[#F9FAFB] rounded-[24px] shadow-2xl overflow-hidden flex flex-col">
          <div className="px-6 pt-6 pb-4 flex items-center justify-between">
            <div className="flex items-center gap-2 text-[#141F38]">
              <Sparkles className="w-5 h-5 text-[#F97316]" />
              <h2 className="text-xl font-headline font-black tracking-tighter">Yangi modul yaratish</h2>
            </div>
            <button onClick={handleClose} className="text-[#98A2B3] hover:bg-[#E4E7EC] p-1.5 rounded-xl transition-colors"><X className="w-5 h-5" /></button>
          </div>

          <form onSubmit={handleSubmit(onFormSubmit)} className="p-6 pt-0 space-y-5">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#667085] ml-1">Modul nomi *</label>
              <input {...register('title')} type="text" placeholder="Masalan: Grammar Basics" className={`w-full px-4 py-3 bg-white border rounded-xl outline-none focus:ring-2 focus:ring-[#F97316]/20 transition-all font-medium text-[#1C2434] text-sm ${errors.title ? 'border-red-400' : 'border-[#E4E7EC]'}`} />
              {errors.title && <p className="text-red-500 text-[11px] font-bold ml-1">{errors.title.message}</p>}
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#667085] ml-1">Tavsif</label>
              <textarea {...register('description')} placeholder="Qisqacha tavsif..." className="w-full px-4 py-3 bg-white border border-[#E4E7EC] rounded-xl outline-none focus:ring-2 focus:ring-[#F97316]/20 transition-all font-medium text-[#1C2434] text-sm min-h-[100px] resize-none" />
            </div>
            <div className="flex items-center justify-end gap-3 pt-4">
              <button type="button" onClick={handleClose} className="px-6 py-2.5 rounded-xl font-bold text-sm text-[#141F38] hover:bg-[#E4E7EC] transition-colors">Bekor qilish</button>
              <button type="submit" disabled={isPending} className="px-6 py-2.5 rounded-xl font-bold text-sm bg-[#F97316] text-white hover:bg-[#EA580C] transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                {isPending ? 'Yaratilmoqda...' : '+ Saqlash'}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default CreateModuleDialog;
