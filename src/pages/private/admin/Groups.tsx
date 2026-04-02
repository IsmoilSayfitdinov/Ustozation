import { useState } from 'react';
import { Search, Filter, Plus, Users, CheckCircle, GraduationCap, Loader2 } from 'lucide-react';
import GroupCard from '@/components/private/admin/Groups/GroupCard';
import ViewGroupDialog from '@/components/private/admin/Groups/ViewGroupDialog';
import CreateGroupDialog from '@/components/private/admin/Groups/CreateGroupDialog';
import { useCourses, useCreateCourse, useUpdateCourse, useDeleteCourse } from '@/hooks/useCourses';
import { useAuthStore } from '@/store/useAuthStore';
import type { Course } from '@/types/api';

const AdminGroups = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<Course | null>(null);
  const { user } = useAuthStore();
  const isTeacher = user?.role === 'teacher';

  const { data: courses, isLoading } = useCourses();
  const createMutation = useCreateCourse();
  const updateMutation = useUpdateCourse();
  const deleteMutation = useDeleteCourse();

  const handleUpdateCourse = (id: number, data: { title?: string; max_students?: number; is_active?: boolean }) => {
    updateMutation.mutate({ id, data });
  };

  const filteredCourses = (courses ?? []).filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (course.teacher?.full_name || course.teacher?.username || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' ||
      (statusFilter === 'active' && course.is_active) ||
      (statusFilter === 'inactive' && !course.is_active);
    return matchesSearch && matchesStatus;
  });

  const totalStudents = (courses ?? []).reduce((sum, c) => sum + c.student_count, 0);
  const activeCourses = (courses ?? []).filter(c => c.is_active).length;

  const handleCreate = (data: { title: string; level: number; max_students: number }) => {
    createMutation.mutate(data, {
      onSuccess: () => setIsCreateOpen(false),
    });
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Guruhni o'chirishni xohlaysizmi?")) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-3xl font-extrabold font-headline tracking-tighter text-[#141F38]">
          Guruhlar
        </h1>

        <div className="flex flex-wrap items-center gap-3">
          <div className="relative w-full sm:w-[300px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#98A2B3]" />
            <input
              type="text"
              placeholder="Guruh qidirish..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 bg-[#F2F4F7] border-none rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#F97316]/20 transition-all outline-none"
            />
          </div>

          <div className="relative">
            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#667085] pointer-events-none" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="pl-11 pr-10 py-2.5 bg-[#F2F4F7] border-none rounded-xl text-sm font-bold text-[#1C2434] appearance-none focus:ring-2 focus:ring-[#F97316]/20 transition-all outline-none cursor-pointer hover:bg-[#E4E7EC]"
            >
              <option value="all">Barcha</option>
              <option value="active">Aktiv</option>
              <option value="inactive">Nofaol</option>
            </select>
          </div>

          {isTeacher && (
            <button
              onClick={() => setIsCreateOpen(true)}
              className="flex items-center gap-2 bg-[#F97316] text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-[#F97316]/20 hover:-translate-y-0.5 transition-all w-full sm:w-auto justify-center"
            >
              <Plus className="w-5 h-5" />
              Yangi guruh
            </button>
          )}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white rounded-[24px] p-6 border border-[#F2F4F7] shadow-sm flex items-center gap-4 hover:shadow-lg transition-shadow">
          <div className="w-14 h-14 rounded-full flex items-center justify-center shrink-0 bg-orange-50">
            <Users className="w-5 h-5 text-orange-500" />
          </div>
          <div>
            <p className="text-2xl font-black text-[#141F38] font-headline">{courses?.length ?? 0}</p>
            <p className="text-[#667085] text-sm font-bold mt-0.5">Jami guruhlar</p>
          </div>
        </div>
        <div className="bg-white rounded-[24px] p-6 border border-[#F2F4F7] shadow-sm flex items-center gap-4 hover:shadow-lg transition-shadow">
          <div className="w-14 h-14 rounded-full flex items-center justify-center shrink-0 bg-emerald-50">
            <CheckCircle className="w-5 h-5 text-emerald-500" />
          </div>
          <div>
            <p className="text-2xl font-black text-[#141F38] font-headline">{activeCourses}</p>
            <p className="text-[#667085] text-sm font-bold mt-0.5">Aktiv guruhlar</p>
          </div>
        </div>
        <div className="bg-white rounded-[24px] p-6 border border-[#F2F4F7] shadow-sm flex items-center gap-4 hover:shadow-lg transition-shadow">
          <div className="w-14 h-14 rounded-full flex items-center justify-center shrink-0 bg-blue-50">
            <GraduationCap className="w-5 h-5 text-blue-500" />
          </div>
          <div>
            <p className="text-2xl font-black text-[#141F38] font-headline">{totalStudents}</p>
            <p className="text-[#667085] text-sm font-bold mt-0.5">Jami o'quvchilar</p>
          </div>
        </div>
      </div>

      {/* Grid */}
      {isLoading ? (
        <div className="bg-white rounded-[40px] border border-[#F2F4F7] overflow-hidden">
          <div className="flex flex-col items-center justify-center py-28 px-6">
            <div className="relative mb-6">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 flex items-center justify-center">
                <Loader2 className="w-10 h-10 text-[#F97316] animate-spin" />
              </div>
            </div>
            <p className="text-sm font-bold text-[#98A2B3]">Guruhlar yuklanmoqda...</p>
          </div>
        </div>
      ) : !filteredCourses.length ? (
        <div className="bg-white rounded-[40px] border border-[#F2F4F7] overflow-hidden">
          <div className="flex flex-col items-center justify-center py-28 px-6">
            <div className="relative mb-8">
              <div className="w-28 h-28 rounded-full bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 flex items-center justify-center">
                <Users className="w-14 h-14 text-[#F97316]" />
              </div>
              <div className="absolute -bottom-2 -right-2 w-12 h-12 rounded-full bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center border-4 border-white">
                <Plus className="w-5 h-5 text-[#3538CD]" />
              </div>
            </div>
            <h3 className="text-2xl font-black text-[#1D2939] mb-3">
              {searchQuery || statusFilter !== 'all' ? 'Guruhlar topilmadi' : 'Hali guruhlar yo\'q'}
            </h3>
            <p className="text-sm font-medium text-[#98A2B3] text-center max-w-lg leading-relaxed mb-6">
              {searchQuery || statusFilter !== 'all'
                ? 'Qidiruv yoki filterni o\'zgartiring'
                : 'Birinchi guruhingizni yaratib, o\'quvchilaringizni qo\'shishni boshlang'
              }
            </p>
            {!searchQuery && statusFilter === 'all' && (
              <button
                onClick={() => setIsCreateOpen(true)}
                className="flex items-center gap-2 bg-[#F97316] text-white px-6 py-3 rounded-2xl font-black text-sm shadow-lg shadow-[#F97316]/20 hover:-translate-y-0.5 transition-all"
              >
                <Plus className="w-5 h-5" />
                Yangi guruh yaratish
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <GroupCard
              key={course.id}
              group={course}
              onView={() => setSelectedGroup(course)}
              onEdit={isTeacher ? () => setSelectedGroup(course) : undefined}
              onDelete={isTeacher ? () => handleDelete(course.id) : undefined}
            />
          ))}
        </div>
      )}

      {/* Dialogs */}
      <ViewGroupDialog
        isOpen={selectedGroup !== null}
        onClose={() => setSelectedGroup(null)}
        group={selectedGroup}
        onUpdate={isTeacher ? handleUpdateCourse : undefined}
        isUpdating={updateMutation.isPending}
      />
      <CreateGroupDialog
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onSubmit={handleCreate}
        isPending={createMutation.isPending}
      />
    </div>
  );
};

export default AdminGroups;
