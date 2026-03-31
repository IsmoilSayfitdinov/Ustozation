import { useState } from 'react';
import { Search, Plus, Trash2, UserCheck, UserX, Loader2 } from 'lucide-react';
import { useTeachers, useCreateTeacher, useDeleteTeacher } from '@/hooks/useAuth';
import { customAlert } from '@/components/ui/CustomAlert';
import type { TeacherListItem } from '@/types/api';

const AdminTeachers = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [form, setForm] = useState({ username: '', password: '', telegram_username: '' });

  const { data: teachers, isLoading } = useTeachers();
  const createMutation = useCreateTeacher();
  const deleteMutation = useDeleteTeacher();

  const filtered = (teachers ?? []).filter((t) =>
    t.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (t.profile?.full_name || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreate = () => {
    if (!form.username || !form.password) return;
    createMutation.mutate(
      { username: form.username, password: form.password, telegram_username: form.telegram_username || undefined },
      {
        onSuccess: () => {
          setForm({ username: '', password: '', telegram_username: '' });
          setIsCreating(false);
        },
      }
    );
  };

  const handleDelete = (teacher: TeacherListItem) => {
    customAlert.confirm({
      variant: 'warning',
      title: "O'qituvchini o'chirish",
      description: `"${teacher.username}" o'qituvchisini o'chirmoqchimisiz?`,
      confirmText: "O'chirish",
      cancelText: 'Bekor qilish',
      icon: Trash2,
      onConfirm: () => deleteMutation.mutate(teacher.id),
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-3xl font-extrabold font-headline tracking-tighter text-[#141F38]">
          O'qituvchilar
        </h1>
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative w-full sm:w-[300px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#98A2B3]" />
            <input
              type="text"
              placeholder="Qidirish..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 bg-[#F2F4F7] border-none rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#F97316]/20 transition-all outline-none"
            />
          </div>
          <button
            onClick={() => setIsCreating(true)}
            className="flex items-center gap-2 bg-[#F97316] text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-[#F97316]/20 hover:-translate-y-0.5 transition-all w-full sm:w-auto justify-center"
          >
            <Plus className="w-5 h-5" />
            Yangi o'qituvchi
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-[#F2F4F7]">
          <p className="text-[#98A2B3] text-xs font-bold uppercase tracking-wider">Jami</p>
          <p className="text-2xl font-black text-[#141F38] mt-1">{teachers?.length ?? 0}</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-[#F2F4F7]">
          <p className="text-[#98A2B3] text-xs font-bold uppercase tracking-wider">Aktiv</p>
          <p className="text-2xl font-black text-[#22C55E] mt-1">{(teachers ?? []).filter(t => t.is_active).length}</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-[#F2F4F7]">
          <p className="text-[#98A2B3] text-xs font-bold uppercase tracking-wider">Nofaol</p>
          <p className="text-2xl font-black text-[#F04438] mt-1">{(teachers ?? []).filter(t => !t.is_active).length}</p>
        </div>
      </div>

      {/* Create Form */}
      {isCreating && (
        <div className="bg-white p-6 rounded-2xl border border-[#F2F4F7] space-y-4">
          <h4 className="text-lg font-black text-[#141F38]">Yangi o'qituvchi qo'shish</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              placeholder="Username"
              value={form.username}
              onChange={(e) => setForm(p => ({ ...p, username: e.target.value }))}
              className="px-4 py-3 bg-[#F9FAFB] border border-[#F2F4F7] rounded-xl text-sm font-medium outline-none focus:border-[#F97316]/30"
            />
            <input
              placeholder="Parol (kamida 8 ta belgi)"
              type="password"
              value={form.password}
              onChange={(e) => setForm(p => ({ ...p, password: e.target.value }))}
              className="px-4 py-3 bg-[#F9FAFB] border border-[#F2F4F7] rounded-xl text-sm font-medium outline-none focus:border-[#F97316]/30"
            />
            <input
              placeholder="Telegram username (ixtiyoriy)"
              value={form.telegram_username}
              onChange={(e) => setForm(p => ({ ...p, telegram_username: e.target.value }))}
              className="px-4 py-3 bg-[#F9FAFB] border border-[#F2F4F7] rounded-xl text-sm font-medium outline-none focus:border-[#F97316]/30"
            />
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleCreate}
              disabled={createMutation.isPending || !form.username || !form.password}
              className="px-6 py-2.5 bg-[#F97316] text-white rounded-xl font-bold text-sm hover:-translate-y-0.5 transition-all disabled:opacity-70"
            >
              {createMutation.isPending ? 'Qo\'shilmoqda...' : 'Qo\'shish'}
            </button>
            <button
              onClick={() => { setIsCreating(false); setForm({ username: '', password: '', telegram_username: '' }); }}
              className="px-6 py-2.5 bg-[#F2F4F7] text-[#667085] rounded-xl font-bold text-sm"
            >
              Bekor qilish
            </button>
          </div>
        </div>
      )}

      {/* Teachers List */}
      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 text-[#F97316] animate-spin" />
        </div>
      ) : filtered.length > 0 ? (
        <div className="bg-white rounded-2xl border border-[#F2F4F7] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#F2F4F7]">
                  <th className="text-left px-6 py-4 text-[10px] font-black text-[#98A2B3] uppercase tracking-wider">O'qituvchi</th>
                  <th className="text-left px-6 py-4 text-[10px] font-black text-[#98A2B3] uppercase tracking-wider">Telegram</th>
                  <th className="text-left px-6 py-4 text-[10px] font-black text-[#98A2B3] uppercase tracking-wider">Holat</th>
                  <th className="text-left px-6 py-4 text-[10px] font-black text-[#98A2B3] uppercase tracking-wider">Qo'shilgan</th>
                  <th className="text-right px-6 py-4 text-[10px] font-black text-[#98A2B3] uppercase tracking-wider">Amallar</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((teacher) => {
                  const name = teacher.profile?.full_name || teacher.username;
                  const initials = name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
                  return (
                    <tr key={teacher.id} className="border-b border-[#F2F4F7] last:border-none hover:bg-[#F9FAFB] transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-[#F97316]/10 flex items-center justify-center text-[#F97316] font-black text-sm shrink-0">
                            {initials}
                          </div>
                          <div>
                            <p className="font-bold text-[#141F38] text-sm">{name}</p>
                            <p className="text-[#98A2B3] text-xs font-medium">@{teacher.username}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm font-medium text-[#667085]">
                          {teacher.telegram_username || '—'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {teacher.is_active ? (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ECFDF3] text-[#22C55E] text-xs font-bold">
                            <UserCheck className="w-3 h-3" /> Aktiv
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FEE4E2] text-[#F04438] text-xs font-bold">
                            <UserX className="w-3 h-3" /> Nofaol
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm font-medium text-[#667085]">
                          {new Date(teacher.date_joined).toLocaleDateString('uz')}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => handleDelete(teacher)}
                          className="p-2 rounded-xl hover:bg-[#FEE4E2] transition-colors"
                        >
                          <Trash2 className="w-4 h-4 text-[#F04438]" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-[#F2F4F7]">
          <p className="text-[#98A2B3] font-bold">
            {searchQuery ? 'Hech qanday natija topilmadi' : "Hali o'qituvchilar yo'q"}
          </p>
        </div>
      )}
    </div>
  );
};

export default AdminTeachers;
