import React, { useState, useEffect } from 'react';
import { X, User, Calendar, Users, Loader2, Pencil, Save, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { useCourseStudents, useCourseLessons, useToggleLesson } from '@/hooks/useCourses';
import type { Course } from '@/types/api';

interface ViewGroupDialogProps {
  isOpen: boolean;
  onClose: () => void;
  group: Course | null;
  onUpdate?: (id: number, data: { title?: string; max_students?: number; is_active?: boolean }) => void;
  isUpdating?: boolean;
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

const ViewGroupDialog: React.FC<ViewGroupDialogProps> = ({ isOpen, onClose, group, onUpdate, isUpdating }) => {
  const { data: students, isLoading } = useCourseStudents(group?.id ?? 0);
  const { data: courseLessons } = useCourseLessons(group?.id ?? 0);
  const toggleLessonMutation = useToggleLesson();
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editMaxStudents, setEditMaxStudents] = useState('');

  useEffect(() => {
    if (group) {
      setEditTitle(group.title);
      setEditMaxStudents(String(group.max_students));
      setIsEditing(false);
    }
  }, [group]);

  if (!isOpen || !group) return null;

  const handleSave = () => {
    onUpdate?.(group.id, {
      title: editTitle,
      max_students: Number(editMaxStudents) || group.max_students,
    });
    setIsEditing(false);
  };

  const handleToggleActive = () => {
    onUpdate?.(group.id, { is_active: !group.is_active });
  };

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
              {isEditing ? (
                <input
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="text-2xl font-black text-white font-headline tracking-tighter mb-2 bg-white/20 rounded-xl px-3 py-1 border border-white/30 outline-none w-full"
                />
              ) : (
                <h2 className="text-2xl font-black text-white font-headline tracking-tighter mb-2">
                  {group.title}
                </h2>
              )}
              <div className="flex gap-2 items-center">
                <span className="bg-white/20 text-white px-2.5 py-1 rounded-lg text-xs font-bold backdrop-blur-sm">
                  {group.level.name}
                </span>
                <button
                  onClick={handleToggleActive}
                  disabled={isUpdating}
                  className={cn(
                    "px-2.5 py-1 rounded-lg text-xs font-bold backdrop-blur-sm cursor-pointer transition-colors",
                    group.is_active ? "bg-white/20 text-white hover:bg-red-500/30" : "bg-red-500/30 text-white hover:bg-white/20"
                  )}
                >
                  {group.is_active ? 'Aktiv' : 'Nofaol'}
                </button>
                {!isEditing ? (
                  <button onClick={() => setIsEditing(true)} className="bg-white/20 text-white p-1.5 rounded-lg hover:bg-white/30 transition-colors">
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button onClick={handleSave} disabled={isUpdating} className="bg-white/30 text-white p-1.5 rounded-lg hover:bg-white/40 transition-colors">
                    <Save className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                  {isEditing ? (
                    <input
                      type="number"
                      value={editMaxStudents}
                      onChange={(e) => setEditMaxStudents(e.target.value)}
                      className="font-bold text-[#1C2434] text-sm bg-white border border-[#E4E7EC] rounded-lg px-2 py-1 w-24 outline-none"
                    />
                  ) : (
                    <p className="font-bold text-[#1C2434] text-sm">{group.student_count} / {group.max_students}</p>
                  )}
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

              {/* Lessons Toggle */}
              {courseLessons && courseLessons.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <BookOpen className="w-5 h-5 text-[#F97316]" />
                    <h3 className="text-lg font-bold text-[#141F38]">Darslar boshqaruvi</h3>
                  </div>
                  <div className="space-y-2">
                    {courseLessons.map((cl) => (
                      <div key={cl.id} className="flex items-center justify-between p-3 bg-[#F9FAFB] rounded-xl border border-[#F2F4F7]">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold text-[#1C2434] truncate">{cl.lesson.title}</p>
                          <p className="text-[11px] text-[#98A2B3] font-medium">{cl.module_title}</p>
                        </div>
                        <button
                          onClick={() => toggleLessonMutation.mutate({ courseId: group.id, lessonId: cl.lesson.id, unlock: !cl.is_unlocked })}
                          disabled={toggleLessonMutation.isPending}
                          className={cn(
                            "px-3 py-1.5 rounded-lg text-xs font-bold transition-colors shrink-0",
                            cl.is_unlocked ? "bg-[#E8FFF0] text-[#22C55E] hover:bg-[#22C55E] hover:text-white" : "bg-[#F2F4F7] text-[#98A2B3] hover:bg-primary hover:text-white"
                          )}
                        >
                          {cl.is_unlocked ? 'Ochiq' : 'Yopiq'}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

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
