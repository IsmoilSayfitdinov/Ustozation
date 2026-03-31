import React from 'react';
import { X, User, Calendar, Users, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { useCourseStudents } from '@/hooks/useCourses';
import type { Course } from '@/types/api';

interface ViewGroupDialogProps {
  isOpen: boolean;
  onClose: () => void;
  group: Course | null;
}

const levelTheme: Record<string, string> = {
  'Beginner': 'bg-emerald-400',
  'Elementary': 'bg-blue-500',
  'Pre-Intermediate': 'bg-cyan-500',
  'Intermediate': 'bg-orange-500',
  'Upper-Intermediate': 'bg-purple-500',
  'Advanced': 'bg-pink-500',
};

const getInitials = (name: string) =>
  name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();

const ViewGroupDialog: React.FC<ViewGroupDialogProps> = ({ isOpen, onClose, group }) => {
  const { data: students, isLoading } = useCourseStudents(group?.id ?? 0);

  if (!isOpen || !group) return null;

  const bgClass = levelTheme[group.level.name] || 'bg-primary';

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100]">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="absolute right-0 top-0 h-full w-full max-w-[500px] bg-white shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className={cn("px-6 py-8 relative", bgClass)}>
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-white hover:bg-black/10 p-1.5 rounded-xl transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <h2 className="text-2xl font-black text-white font-headline tracking-tighter mb-2">
                {group.title}
              </h2>
              <div className="flex gap-2">
                <span className="bg-white/20 text-white px-2.5 py-1 rounded-lg text-xs font-bold backdrop-blur-sm">
                  {group.level.name}
                </span>
                <span className={cn(
                  "px-2.5 py-1 rounded-lg text-xs font-bold backdrop-blur-sm",
                  group.is_active ? "bg-white/20 text-white" : "bg-red-500/30 text-white"
                )}>
                  {group.is_active ? 'Aktiv' : 'Nofaol'}
                </span>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#F9FAFB] p-4 rounded-xl border border-[#F2F4F7]">
                  <div className="flex items-center gap-2 text-[#98A2B3] mb-1">
                    <User className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase tracking-wider">O'qituvchi</span>
                  </div>
                  <p className="font-bold text-[#1C2434] text-sm">{group.teacher_name}</p>
                </div>
                <div className="bg-[#F9FAFB] p-4 rounded-xl border border-[#F2F4F7]">
                  <div className="flex items-center gap-2 text-[#98A2B3] mb-1">
                    <Users className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase tracking-wider">O'quvchilar</span>
                  </div>
                  <p className="font-bold text-[#1C2434] text-sm">{group.student_count} / {group.max_students}</p>
                </div>
                <div className="bg-[#F9FAFB] p-4 rounded-xl border border-[#F2F4F7] col-span-2">
                  <div className="flex items-center gap-2 text-[#98A2B3] mb-1">
                    <Calendar className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase tracking-wider">Yaratilgan</span>
                  </div>
                  <p className="font-bold text-[#1C2434] text-sm">
                    {new Date(group.created_at).toLocaleDateString('uz-UZ', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                </div>
              </div>

              {/* Students List */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Users className="w-5 h-5 text-[#F97316]" />
                  <h3 className="text-lg font-bold text-[#141F38]">O'quvchilar ro'yxati</h3>
                </div>

                {isLoading ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="w-6 h-6 text-[#F97316] animate-spin" />
                  </div>
                ) : !students?.length ? (
                  <div className="text-center py-12">
                    <p className="text-[#98A2B3] font-medium text-sm">Hali o'quvchilar yo'q</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {students.map((student) => (
                      <div key={student.student_id} className="bg-white border text-sm font-medium border-[#F2F4F7] p-4 rounded-2xl shadow-sm">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-orange-100 text-[#F97316] flex items-center justify-center font-bold text-xs shrink-0">
                              {getInitials(student.full_name || student.username)}
                            </div>
                            <div>
                              <span className="text-[#1C2434] font-bold block">{student.full_name || student.username}</span>
                              {student.telegram_username && (
                                <span className="text-[#98A2B3] text-xs">{student.telegram_username}</span>
                              )}
                            </div>
                          </div>
                          <span className={cn(
                            "text-xs font-bold px-2 py-1 rounded-md",
                            student.is_active ? "bg-emerald-50 text-emerald-500" : "bg-gray-100 text-gray-500"
                          )}>
                            {student.is_active ? 'Aktiv' : 'Nofaol'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ViewGroupDialog;
