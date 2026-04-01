import React, { useState } from 'react';
import { Target, Package, BookOpen, Plus, Trash2, Edit2, ChevronDown, FileText, Layers, Loader2, Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import CreateLevelDialog from '@/components/private/admin/Lessons/CreateLevelDialog';
import CreateModuleDialog from '@/components/private/admin/Lessons/CreateModuleDialog';
import CreateLessonDialog from '@/components/private/admin/Lessons/CreateLessonDialog';
import EditModuleDialog from '@/components/private/admin/Lessons/EditModuleDialog';
import EditLessonDialog from '@/components/private/admin/Lessons/EditLessonDialog';
import { useLevels, useLevelDetail, useCreateLevel, useUpdateLevel, useDeleteLevel, useCreateModule, useCreateLesson, useDeleteModule, useDeleteLesson, useUpdateModule, useUpdateLesson } from '@/hooks/useCourses';
import { customAlert } from '@/components/ui/CustomAlert';
import type { Module as ModuleType, Lesson } from '@/types/api';

const levelColors: Record<string, { iconBg: string }> = {
  'Beginner': { iconBg: 'bg-emerald-400' },
  'Elementary': { iconBg: 'bg-blue-500' },
  'Pre-Intermediate': { iconBg: 'bg-cyan-500' },
  'Intermediate': { iconBg: 'bg-orange-500' },
  'Upper-Intermediate': { iconBg: 'bg-purple-500' },
  'Advanced': { iconBg: 'bg-pink-500' },
};

const LevelCard = ({ levelId, onDeleteLevel, onUpdateLevel }: { levelId: number; onDeleteLevel?: (id: number, name: string) => void; onUpdateLevel?: (id: number, data: Partial<{ name: string; description: string }>) => void }) => {
  const { data: level, isLoading } = useLevelDetail(levelId);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [editName, setEditName] = useState('');
  const [expandedModules, setExpandedModules] = useState<number[]>([]);

  // Create dialogs
  const [isModuleDialogOpen, setModuleDialogOpen] = useState(false);
  const [isLessonDialogOpen, setLessonDialogOpen] = useState(false);
  const [activeModuleId, setActiveModuleId] = useState<number | null>(null);

  // Edit dialogs
  const [editingModule, setEditingModule] = useState<ModuleType | null>(null);
  const [editingLesson, setEditingLesson] = useState<Lesson | null>(null);

  const createModuleMutation = useCreateModule();
  const createLessonMutation = useCreateLesson();
  const updateModuleMutation = useUpdateModule();
  const updateLessonMutation = useUpdateLesson();
  const deleteModuleMutation = useDeleteModule();
  const deleteLessonMutation = useDeleteLesson();

  if (isLoading || !level) {
    return (
      <div className="bg-white rounded-[24px] p-8 border border-[#E4E7EC] flex items-center justify-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center">
          <Loader2 className="w-5 h-5 text-[#F97316] animate-spin" />
        </div>
        <p className="text-sm font-bold text-[#98A2B3]">Daraja yuklanmoqda...</p>
      </div>
    );
  }

  const colors = levelColors[level.name] || { iconBg: 'bg-gray-500' };
  const totalLessons = level.modules.reduce((acc, m) => acc + m.lessons.length, 0);

  const toggleModule = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedModules(prev => prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]);
  };

  const handleCreateModule = (data: { name: string; description: string }) => {
    createModuleMutation.mutate(
      { levelId: level.id, data: { title: data.name, description: data.description || '', order: level.modules.length + 1, slug: data.name } },
      { onSuccess: () => setModuleDialogOpen(false) }
    );
  };

  const handleCreateLesson = (data: { name: string; description: string }) => {
    if (!activeModuleId) return;
    const mod = level.modules.find(m => m.id === activeModuleId);
    createLessonMutation.mutate(
      { moduleId: activeModuleId, data: { title: data.name, description: data.description || '', order: (mod?.lessons.length ?? 0) + 1 } },
      { onSuccess: () => { setLessonDialogOpen(false); } }
    );
  };

  const handleUpdateModule = (data: { title: string; description: string }) => {
    if (!editingModule) return;
    updateModuleMutation.mutate(
      { id: editingModule.id, data },
      { onSuccess: () => setEditingModule(null) }
    );
  };

  const handleUpdateLesson = (data: { title: string; description: string }) => {
    if (!editingLesson) return;
    updateLessonMutation.mutate(
      { id: editingLesson.id, data },
      { onSuccess: () => setEditingLesson(null) }
    );
  };

  return (
    <>
      <div className="bg-white rounded-[24px] shadow-sm border border-[#E4E7EC] overflow-hidden transition-all duration-300">
        {/* Level Header */}
        <div
          className="p-6 flex items-center justify-between cursor-pointer hover:bg-[#F9FAFB] transition-colors"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex items-start gap-4">
            <div className={cn("w-14 h-14 rounded-[16px] flex items-center justify-center shrink-0 shadow-inner", colors.iconBg)}>
              <Target className="w-7 h-7 text-white opacity-90" />
            </div>
            <div>
              {isEditingName ? (
                <div className="flex items-center gap-2 mb-1" onClick={(e) => e.stopPropagation()}>
                  <input
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="text-lg font-black text-[#1C2434] bg-[#F9FAFB] border border-[#E4E7EC] rounded-lg px-2 py-0.5 outline-none focus:border-primary/30 w-48"
                    autoFocus
                  />
                  <button
                    onClick={(e) => { e.stopPropagation(); onUpdateLevel?.(level.id, { name: editName }); setIsEditingName(false); }}
                    className="p-1 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors"
                  >
                    <Check className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={(e) => { e.stopPropagation(); setIsEditingName(false); }} className="p-1 rounded-lg hover:bg-[#F2F4F7]">
                    <X className="w-3.5 h-3.5 text-[#98A2B3]" />
                  </button>
                </div>
              ) : (
                <h3 className="text-lg font-black text-[#1C2434] tracking-tight">{level.name}</h3>
              )}
              <p className="text-sm font-medium text-[#667085] mb-2">{level.description}</p>
              <div className="flex items-center gap-3 text-xs font-bold text-[#98A2B3]">
                <span className="flex items-center gap-1"><Layers className="w-3.5 h-3.5" /> {level.modules.length} ta modul</span>
                <span className="flex items-center gap-1"><BookOpen className="w-3.5 h-3.5" /> {totalLessons} ta dars</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {onUpdateLevel && (
              <button
                onClick={(e) => { e.stopPropagation(); setEditName(level.name); setIsEditingName(true); }}
                className="p-2 rounded-xl hover:bg-primary/10 text-[#98A2B3] hover:text-primary transition-colors"
                title="Tahrirlash"
              >
                <Edit2 className="w-4 h-4" />
              </button>
            )}
            {onDeleteLevel && (
              <button
                onClick={(e) => { e.stopPropagation(); onDeleteLevel(level.id, level.name); }}
                className="p-2 rounded-xl hover:bg-[#FEE4E2] text-[#98A2B3] hover:text-[#F04438] transition-colors"
                title="O'chirish"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
            <div className={cn("p-2 text-[#98A2B3] transition-transform duration-300", isExpanded && "rotate-180")}>
              <ChevronDown className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Modules Area */}
        {isExpanded && (
          <div className="px-6 pb-6 pt-2 border-t border-[#F2F4F7] bg-[#FCFCFD]">
            <div className="flex items-center justify-between mb-4 mt-2">
              <h4 className="text-sm font-black text-[#1C2434] uppercase tracking-wider">Modullar</h4>
              <button
                onClick={() => setModuleDialogOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#F97316] text-white hover:bg-[#EA580C] rounded-lg text-xs font-bold transition-colors shadow-sm"
              >
                <Plus className="w-3.5 h-3.5" />
                Modul qo'shish
              </button>
            </div>

            {level.modules.length === 0 ? (
              <div className="bg-white border border-dashed border-[#E4E7EC] rounded-2xl p-8 text-center">
                <div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center mb-3">
                  <Package className="w-6 h-6 text-[#F97316]" />
                </div>
                <p className="text-sm font-bold text-[#667085]">Hali modullar yo'q</p>
                <p className="text-xs text-[#98A2B3] mt-1">Yuqoridagi "Modul qo'shish" tugmasini bosing</p>
              </div>
            ) : (
              <div className="space-y-3 pl-4 border-l-2 border-[#F2F4F7] ml-6">
                {level.modules.map(module => {
                  const isModuleExpanded = expandedModules.includes(module.id);

                  return (
                    <div key={module.id} className="bg-white border border-[#E4E7EC] rounded-2xl overflow-hidden shadow-sm">
                      {/* Module Header */}
                      <div
                        className="p-4 flex items-center justify-between cursor-pointer hover:bg-[#F9FAFB] transition-colors"
                        onClick={(e) => toggleModule(module.id, e)}
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-[#FFF5F0] flex items-center justify-center shrink-0">
                            <Layers className="w-5 h-5 text-[#F97316]" />
                          </div>
                          <div>
                            <h5 className="font-bold text-[#1C2434]">{module.title}</h5>
                            <p className="text-xs font-bold text-[#98A2B3]">{module.lessons.length} ta dars</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-1">
                          <button
                            className="p-1.5 text-[#98A2B3] hover:text-[#F97316] hover:bg-[#FFF5F0] rounded-lg transition-colors"
                            onClick={(e) => { e.stopPropagation(); setEditingModule(module); }}
                            title="Tahrirlash"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            className="p-1.5 text-[#98A2B3] hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (window.confirm(`"${module.title}" modulini o'chirishni xohlaysizmi?`)) {
                                deleteModuleMutation.mutate(module.id);
                              }
                            }}
                            title="O'chirish"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                          <div className="w-px h-5 bg-[#F2F4F7] mx-1" />
                          <button
                            onClick={(e) => { e.stopPropagation(); setActiveModuleId(module.id); setLessonDialogOpen(true); }}
                            className="flex items-center gap-1 px-2.5 py-1 text-[#F97316] text-xs font-bold hover:bg-[#FFF5F0] rounded-lg transition-colors"
                          >
                            <Plus className="w-3.5 h-3.5" /> Dars
                          </button>
                          <div className={cn("p-1.5 text-[#98A2B3] transition-transform duration-300", isModuleExpanded && "rotate-180")}>
                            <ChevronDown className="w-4 h-4" />
                          </div>
                        </div>
                      </div>

                      {/* Lessons */}
                      {isModuleExpanded && (
                        <div className="px-4 pb-4 bg-[#F9FAFB] border-t border-[#F2F4F7]">
                          <div className="pt-2">
                            {module.lessons.length === 0 ? (
                              <div className="text-center py-6">
                                <p className="text-xs font-medium text-[#98A2B3]">Hozircha darslar yo'q</p>
                              </div>
                            ) : (
                              module.lessons.map((lesson, idx) => (
                                <div key={lesson.id} className="flex items-center justify-between px-3 py-2.5 hover:bg-white rounded-xl transition-colors group">
                                  <div className="flex items-center gap-3">
                                    <div className="w-6 h-6 rounded-full bg-[#FFF5F0] text-[#F97316] flex items-center justify-center text-xs font-black">
                                      {idx + 1}
                                    </div>
                                    <div className="text-[#F97316]">
                                      <FileText className="w-4 h-4" />
                                    </div>
                                    <p className="text-sm font-bold text-[#1C2434]">{lesson.title}</p>
                                  </div>
                                  <div className="opacity-0 group-hover:opacity-100 flex items-center gap-1 transition-all">
                                    <button
                                      className="p-1.5 text-[#98A2B3] hover:text-[#F97316] hover:bg-[#FFF5F0] rounded-md transition-colors"
                                      onClick={() => setEditingLesson(lesson)}
                                      title="Tahrirlash"
                                    >
                                      <Edit2 className="w-3.5 h-3.5" />
                                    </button>
                                    <button
                                      className="p-1.5 text-[#98A2B3] hover:text-red-500 hover:bg-red-50 rounded-md transition-colors"
                                      onClick={() => {
                                        if (window.confirm(`"${lesson.title}" darsini o'chirishni xohlaysizmi?`)) {
                                          deleteLessonMutation.mutate(lesson.id);
                                        }
                                      }}
                                      title="O'chirish"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                </div>
                              ))
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Create Dialogs */}
      <CreateModuleDialog
        isOpen={isModuleDialogOpen}
        onClose={() => setModuleDialogOpen(false)}
        onSubmit={handleCreateModule}
        isPending={createModuleMutation.isPending}
      />
      <CreateLessonDialog
        isOpen={isLessonDialogOpen}
        onClose={() => setLessonDialogOpen(false)}
        onSubmit={handleCreateLesson}
        isPending={createLessonMutation.isPending}
      />

      {/* Edit Dialogs */}
      <EditModuleDialog
        isOpen={editingModule !== null}
        onClose={() => setEditingModule(null)}
        onSubmit={handleUpdateModule}
        isPending={updateModuleMutation.isPending}
        initialData={editingModule ? { title: editingModule.title, description: editingModule.description } : null}
      />
      <EditLessonDialog
        isOpen={editingLesson !== null}
        onClose={() => setEditingLesson(null)}
        onSubmit={handleUpdateLesson}
        isPending={updateLessonMutation.isPending}
        initialData={editingLesson ? { title: editingLesson.title, description: editingLesson.description } : null}
      />
    </>
  );
};

const AdminLessons = () => {
  const { data: levels, isLoading } = useLevels();
  const [isLevelDialogOpen, setLevelDialogOpen] = useState(false);
  const createLevelMutation = useCreateLevel();
  const updateLevelMutation = useUpdateLevel();
  const deleteLevelMutation = useDeleteLevel();

  const handleCreateLevel = (data: { name: string; slug: string; description: string; order: number }) => {
    createLevelMutation.mutate(data, {
      onSuccess: () => setLevelDialogOpen(false),
    });
  };

  const handleDeleteLevel = (id: number, name: string) => {
    customAlert.confirm({
      variant: 'warning',
      title: "Darajani o'chirish",
      description: `"${name}" darajasi va undagi barcha modullar o'chiriladi.`,
      confirmText: "O'chirish",
      cancelText: 'Bekor qilish',
      icon: Trash2,
      onConfirm: () => deleteLevelMutation.mutate(id),
    });
  };

  const dynamicStats = [
    { label: 'Levellar', value: (levels?.length ?? 0).toString(), icon: <Target className="w-5 h-5 text-orange-500" />, bg: 'bg-orange-50' },
    { label: 'Modullar', value: '—', icon: <Package className="w-5 h-5 text-blue-500" />, bg: 'bg-blue-50' },
    { label: 'Darslar', value: '—', icon: <BookOpen className="w-5 h-5 text-emerald-500" />, bg: 'bg-emerald-50' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-12 w-full mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-3xl font-extrabold font-headline tracking-tighter text-[#1C2434]">
          O'quv dasturi
        </h1>
        <button
          onClick={() => setLevelDialogOpen(true)}
          className="flex items-center justify-center gap-2 bg-[#F97316] text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-[#F97316]/20 hover:-translate-y-0.5 transition-all w-full sm:w-auto"
        >
          <Plus className="w-5 h-5" />
          Yangi daraja
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {dynamicStats.map((stat, idx) => (
          <div key={idx} className="bg-white rounded-[24px] p-6 border border-[#F2F4F7] shadow-sm flex items-center gap-4 hover:shadow-lg transition-shadow">
            <div className={`w-14 h-14 rounded-full flex items-center justify-center shrink-0 ${stat.bg}`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-2xl font-black text-[#141F38] tracking-tight">{stat.value}</p>
              <p className="text-[#667085] text-xs font-bold mt-0.5">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Levels List */}
      {isLoading ? (
        <div className="bg-white rounded-[40px] border border-[#F2F4F7] overflow-hidden">
          <div className="flex flex-col items-center justify-center py-28 px-6">
            <div className="relative mb-6">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 flex items-center justify-center">
                <Loader2 className="w-10 h-10 text-[#F97316] animate-spin" />
              </div>
            </div>
            <p className="text-sm font-bold text-[#98A2B3]">O'quv dasturi yuklanmoqda...</p>
          </div>
        </div>
      ) : !levels?.length ? (
        <div className="bg-white rounded-[40px] border border-[#F2F4F7] overflow-hidden">
          <div className="flex flex-col items-center justify-center py-28 px-6">
            <div className="relative mb-8">
              <div className="w-28 h-28 rounded-full bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 flex items-center justify-center">
                <Target className="w-14 h-14 text-[#12B76A]" />
              </div>
              <div className="absolute -bottom-2 -right-2 w-12 h-12 rounded-full bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center border-4 border-white">
                <BookOpen className="w-5 h-5 text-[#F97316]" />
              </div>
            </div>
            <h3 className="text-2xl font-black text-[#1D2939] mb-3">Darajalar hali yo'q</h3>
            <p className="text-sm font-medium text-[#98A2B3] text-center max-w-lg leading-relaxed mb-6">
              O'quv dasturini shakllantirish uchun birinchi darajani yarating
            </p>
            <button
              onClick={() => setLevelDialogOpen(true)}
              className="flex items-center gap-2 bg-[#F97316] text-white px-6 py-3 rounded-2xl font-black text-sm shadow-lg shadow-[#F97316]/20 hover:-translate-y-0.5 transition-all"
            >
              <Plus className="w-5 h-5" />
              Yangi daraja yaratish
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {levels.map(level => (
            <LevelCard key={level.id} levelId={level.id} onDeleteLevel={handleDeleteLevel} onUpdateLevel={(id, data) => updateLevelMutation.mutate({ id, data })} />
          ))}
        </div>
      )}

      {/* Create Level Dialog */}
      <CreateLevelDialog
        isOpen={isLevelDialogOpen}
        onClose={() => setLevelDialogOpen(false)}
        onSubmit={handleCreateLevel}
        isPending={createLevelMutation.isPending}
        currentCount={levels?.length ?? 0}
      />
    </div>
  );
};

export default AdminLessons;
