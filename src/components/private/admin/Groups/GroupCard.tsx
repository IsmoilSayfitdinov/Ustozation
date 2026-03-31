import React from 'react';
import { BookOpen, Star, GraduationCap, Sparkles, TrendingUp, Eye, Edit2, Trash2, Users } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Course } from '@/types/api';

interface GroupCardProps {
  group: Course;
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const levelTheme: Record<string, { bgClass: string; textClass: string; icon: React.ReactNode }> = {
  'Beginner': { bgClass: 'bg-emerald-400', textClass: 'text-emerald-500', icon: <BookOpen className="w-5 h-5 text-white" /> },
  'Elementary': { bgClass: 'bg-blue-500', textClass: 'text-blue-500', icon: <Star className="w-5 h-5 text-white" /> },
  'Pre-Intermediate': { bgClass: 'bg-cyan-500', textClass: 'text-cyan-500', icon: <TrendingUp className="w-5 h-5 text-white" /> },
  'Intermediate': { bgClass: 'bg-orange-500', textClass: 'text-orange-500', icon: <GraduationCap className="w-5 h-5 text-white" /> },
  'Upper-Intermediate': { bgClass: 'bg-purple-500', textClass: 'text-purple-500', icon: <TrendingUp className="w-5 h-5 text-white" /> },
  'Advanced': { bgClass: 'bg-pink-500', textClass: 'text-pink-500', icon: <Sparkles className="w-5 h-5 text-white" /> },
};

const defaultTheme = { bgClass: 'bg-gray-500', textClass: 'text-gray-500', icon: <BookOpen className="w-5 h-5 text-white" /> };

const getInitials = (name: string) =>
  name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();

const GroupCard: React.FC<GroupCardProps> = ({ group, onView, onEdit, onDelete }) => {
  const theme = levelTheme[group.level.name] || defaultTheme;
  const progressPercent = group.max_students > 0
    ? Math.min(100, (group.student_count / group.max_students) * 100)
    : 0;

  return (
    <div className="bg-white rounded-[24px] shadow-sm border border-[#F2F4F7] p-6 hover:shadow-xl transition-shadow duration-300 relative overflow-hidden group">
      {/* Top Border Color Bar */}
      <div className={cn("absolute top-0 left-0 w-full h-2", theme.bgClass)} />

      <div className="flex justify-between items-start mb-6 mt-2">
        <div className="flex items-center gap-4">
          <div className={cn("w-12 h-12 rounded-full flex items-center justify-center shrink-0 shadow-inner", theme.bgClass)}>
            {theme.icon}
          </div>
          <div>
            <h3 className="font-extrabold text-[#141F38] text-lg leading-tight">{group.title}</h3>
            <div className="mt-1 flex items-center gap-2">
              <span className={cn(
                "px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider",
                group.is_active ? 'bg-emerald-50 text-emerald-500' : 'bg-gray-100 text-gray-500'
              )}>
                {group.is_active ? 'Aktiv' : 'Nofaol'}
              </span>
              {group.is_full && (
                <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-red-50 text-red-500">
                  To'lgan
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="px-3 py-1 bg-[#F2F4F7] rounded-lg text-xs font-bold text-[#667085]">
          {group.level.name}
        </div>
      </div>

      <div className="space-y-4 mb-6">
        {/* Teacher */}
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-[10px] font-bold">
            {getInitials(group.teacher_name)}
          </div>
          <p className="text-[#667085] text-sm font-medium">{group.teacher_name}</p>
        </div>

        {/* Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-[#667085] text-sm font-medium">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-[#98A2B3]" />
              <span>{group.student_count} / {group.max_students} ta o'quvchi</span>
            </div>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden flex">
            <div
              className="h-full bg-orange-500 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Date */}
        <div className="bg-[#F9FAFB] p-3 rounded-xl border border-[#F2F4F7]">
          <p className="text-[#667085] text-sm font-medium">
            Yaratilgan: {new Date(group.created_at).toLocaleDateString('uz-UZ')}
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-[#F2F4F7]">
        <button
          onClick={onView}
          className="flex items-center gap-1.5 text-sm font-bold text-[#1C2434] hover:text-primary transition-colors"
        >
          <Eye className="w-4 h-4" />
          Ko'rish
        </button>
        <button
          onClick={onEdit}
          className="flex items-center gap-1.5 text-sm font-bold text-[#1C2434] hover:text-primary transition-colors"
        >
          <Edit2 className="w-4 h-4" />
          Tahrirlash
        </button>
        <button
          onClick={onDelete}
          className="p-1.5 text-[#98A2B3] hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-100"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default GroupCard;
