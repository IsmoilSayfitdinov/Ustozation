import { useState } from 'react';
import { MessageSquare, CreditCard, Sparkles, Settings, Plus, Pencil, Trash2, Star, Eye, EyeOff, Loader2, Save, Phone, Mail, MapPin, Send, AtSign, Video, ExternalLink } from 'lucide-react';
import {
  useReviews, useCreateReview, useUpdateReview, useDeleteReview,
  usePricingPlans, useCreatePricingPlan, useUpdatePricingPlan, useDeletePricingPlan,
  useFeatures, useCreateFeature, useUpdateFeature, useDeleteFeature,
  useSiteSettings, useUpdateSiteSettings,
} from '@/hooks/useLanding';
import type { Review, PricingPlan, Feature, SiteSetting } from '@/types/api';
import { customAlert } from '@/components/ui/CustomAlert';
import { IMaskInput } from 'react-imask';

type Tab = 'reviews' | 'pricing' | 'features' | 'settings';

const ICON_OPTIONS = [
  { value: 'verified_user', label: 'Sertifikat' },
  { value: 'auto_graph', label: 'Grafik' },
  { value: 'rocket_launch', label: 'Raketa' },
  { value: 'devices', label: 'Qurilmalar' },
  { value: 'school', label: 'Maktab' },
  { value: 'menu_book', label: 'Kitob' },
  { value: 'psychology', label: 'Aql' },
  { value: 'groups', label: 'Guruh' },
  { value: 'workspace_premium', label: 'Premium' },
  { value: 'star', label: 'Yulduz' },
  { value: 'support_agent', label: "Qo'llab-quvvatlash" },
  { value: 'translate', label: 'Tarjima' },
  { value: 'emoji_events', label: 'Kubok' },
  { value: 'trending_up', label: "O'sish" },
  { value: 'timer', label: 'Taymer' },
  { value: 'task_alt', label: 'Vazifa' },
  { value: 'lightbulb', label: 'Fikr' },
  { value: 'shield', label: 'Himoya' },
  { value: 'headphones', label: 'Audio' },
  { value: 'videocam', label: 'Video' },
  { value: 'forum', label: 'Forum' },
  { value: 'schedule', label: 'Vaqt' },
  { value: 'bolt', label: 'Tezlik' },
  { value: 'volunteer_activism', label: 'Yordam' },
];

const TABS: { key: Tab; label: string; icon: typeof MessageSquare }[] = [
  { key: 'reviews', label: 'Izohlar', icon: MessageSquare },
  { key: 'pricing', label: 'Tariflar', icon: CreditCard },
  { key: 'features', label: 'Xususiyatlar', icon: Sparkles },
  { key: 'settings', label: 'Sozlamalar', icon: Settings },
];

// ==================== Reviews Tab ====================

function ReviewsTab() {
  const { data: reviews, isLoading } = useReviews();
  const createMutation = useCreateReview();
  const updateMutation = useUpdateReview();
  const deleteMutation = useDeleteReview();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [form, setForm] = useState({ full_name: '', course_name: '', text: '', rating: 5 });

  const resetForm = () => {
    setForm({ full_name: '', course_name: '', text: '', rating: 5 });
    setEditingId(null);
    setIsCreating(false);
  };

  const startEdit = (r: Review) => {
    setForm({ full_name: r.full_name, course_name: r.course_name, text: r.text, rating: r.rating });
    setEditingId(r.id);
    setIsCreating(false);
  };

  const handleSave = () => {
    if (!form.full_name || !form.text) return;
    if (editingId) {
      updateMutation.mutate({ id: editingId, data: form }, { onSuccess: resetForm });
    } else {
      createMutation.mutate(form, { onSuccess: resetForm });
    }
  };

  const handleDelete = (id: number) => {
    customAlert.confirm({
      variant: 'warning',
      title: "Izohni o'chirish",
      description: "Bu izoh butunlay o'chiriladi. Davom etasizmi?",
      confirmText: "O'chirish",
      cancelText: 'Bekor qilish',
      icon: Trash2,
      onConfirm: () => deleteMutation.mutate(id),
    });
  };

  const toggleActive = (r: Review) => {
    updateMutation.mutate({ id: r.id, data: { is_active: !r.is_active } });
  };

  if (isLoading) return <LoadingState />;

  return (
    <div className="space-y-6">
      {/* Create / Edit Form */}
      {(isCreating || editingId) && (
        <div className="bg-white p-6 rounded-2xl border border-[#F2F4F7] space-y-4">
          <h4 className="text-lg font-black text-[#141F38]">{editingId ? 'Izohni tahrirlash' : 'Yangi izoh'}</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              placeholder="Ism familiya"
              value={form.full_name}
              onChange={(e) => setForm(p => ({ ...p, full_name: e.target.value }))}
              className="px-4 py-3 bg-[#F9FAFB] border border-[#F2F4F7] rounded-xl text-sm font-medium outline-none focus:border-[#F97316]/30"
            />
            <input
              placeholder="Kurs nomi"
              value={form.course_name}
              onChange={(e) => setForm(p => ({ ...p, course_name: e.target.value }))}
              className="px-4 py-3 bg-[#F9FAFB] border border-[#F2F4F7] rounded-xl text-sm font-medium outline-none focus:border-[#F97316]/30"
            />
          </div>
          <textarea
            placeholder="Izoh matni..."
            value={form.text}
            onChange={(e) => setForm(p => ({ ...p, text: e.target.value }))}
            rows={3}
            className="w-full px-4 py-3 bg-[#F9FAFB] border border-[#F2F4F7] rounded-xl text-sm font-medium outline-none focus:border-[#F97316]/30 resize-none"
          />
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold text-[#667085]">Baho:</span>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map(n => (
                <button key={n} onClick={() => setForm(p => ({ ...p, rating: n }))} className="p-1">
                  <Star className={`w-5 h-5 ${n <= form.rating ? 'fill-[#F97316] text-[#F97316]' : 'text-[#D0D5DD]'}`} />
                </button>
              ))}
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleSave}
              disabled={createMutation.isPending || updateMutation.isPending}
              className="px-6 py-2.5 bg-[#F97316] text-white rounded-xl font-bold text-sm hover:-translate-y-0.5 transition-all disabled:opacity-70"
            >
              {createMutation.isPending || updateMutation.isPending ? 'Saqlanmoqda...' : 'Saqlash'}
            </button>
            <button onClick={resetForm} className="px-6 py-2.5 bg-[#F2F4F7] text-[#667085] rounded-xl font-bold text-sm">
              Bekor qilish
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      {!isCreating && !editingId && (
        <div className="flex items-center justify-between">
          <p className="text-sm font-bold text-[#98A2B3]">{reviews?.length ?? 0} ta izoh</p>
          <button
            onClick={() => setIsCreating(true)}
            className="flex items-center gap-2 bg-[#F97316] text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-[#F97316]/20 hover:-translate-y-0.5 transition-all"
          >
            <Plus className="w-4 h-4" /> Yangi izoh
          </button>
        </div>
      )}

      {/* List */}
      <div className="space-y-4">
        {(reviews ?? []).map((r) => (
          <div key={r.id} className="bg-white p-5 rounded-2xl border border-[#F2F4F7] flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-1">
                <h4 className="font-black text-[#141F38]">{r.full_name}</h4>
                <span className="text-xs font-bold text-[#98A2B3] bg-[#F9FAFB] px-2 py-0.5 rounded-lg">{r.course_name}</span>
                {!r.is_active && <span className="text-xs font-bold text-[#F04438] bg-[#FEE4E2] px-2 py-0.5 rounded-lg">Nofaol</span>}
              </div>
              <p className="text-sm text-[#667085] font-medium line-clamp-2">{r.text}</p>
              <div className="flex gap-0.5 mt-2">
                {[1, 2, 3, 4, 5].map(n => (
                  <Star key={n} className={`w-3.5 h-3.5 ${n <= r.rating ? 'fill-[#F97316] text-[#F97316]' : 'text-[#D0D5DD]'}`} />
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button onClick={() => toggleActive(r)} className="p-2 rounded-xl hover:bg-[#F9FAFB] transition-colors" title={r.is_active ? 'Yashirish' : "Ko'rsatish"}>
                {r.is_active ? <Eye className="w-4 h-4 text-[#22C55E]" /> : <EyeOff className="w-4 h-4 text-[#98A2B3]" />}
              </button>
              <button onClick={() => startEdit(r)} className="p-2 rounded-xl hover:bg-[#F9FAFB] transition-colors">
                <Pencil className="w-4 h-4 text-[#667085]" />
              </button>
              <button onClick={() => handleDelete(r.id)} className="p-2 rounded-xl hover:bg-[#FEE4E2] transition-colors">
                <Trash2 className="w-4 h-4 text-[#F04438]" />
              </button>
            </div>
          </div>
        ))}
        {reviews?.length === 0 && <EmptyState text="Hali izohlar yo'q" />}
      </div>
    </div>
  );
}

// ==================== Pricing Tab ====================

function PricingTab() {
  const { data: plans, isLoading } = usePricingPlans();
  const createMutation = useCreatePricingPlan();
  const updateMutation = useUpdatePricingPlan();
  const deleteMutation = useDeletePricingPlan();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [form, setForm] = useState({ name: '', description: '', price: 0, is_popular: false, features: '' });

  const resetForm = () => {
    setForm({ name: '', description: '', price: 0, is_popular: false, features: '' });
    setEditingId(null);
    setIsCreating(false);
  };

  const startEdit = (p: PricingPlan) => {
    setForm({ name: p.name, description: p.description, price: p.price, is_popular: p.is_popular, features: p.features.join('\n') });
    setEditingId(p.id);
    setIsCreating(false);
  };

  const handleSave = () => {
    if (!form.name) return;
    const payload = { ...form, features: form.features.split('\n').filter(Boolean) };
    if (editingId) {
      updateMutation.mutate({ id: editingId, data: payload }, { onSuccess: resetForm });
    } else {
      createMutation.mutate(payload, { onSuccess: resetForm });
    }
  };

  const handleDelete = (id: number) => {
    customAlert.confirm({
      variant: 'warning',
      title: "Tarifni o'chirish",
      description: "Bu tarif butunlay o'chiriladi.",
      confirmText: "O'chirish",
      cancelText: 'Bekor qilish',
      icon: Trash2,
      onConfirm: () => deleteMutation.mutate(id),
    });
  };

  if (isLoading) return <LoadingState />;

  return (
    <div className="space-y-6">
      {(isCreating || editingId) && (
        <div className="bg-white p-6 rounded-2xl border border-[#F2F4F7] space-y-4">
          <h4 className="text-lg font-black text-[#141F38]">{editingId ? 'Tarifni tahrirlash' : 'Yangi tarif'}</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              placeholder="Tarif nomi"
              value={form.name}
              onChange={(e) => setForm(p => ({ ...p, name: e.target.value }))}
              className="px-4 py-3 bg-[#F9FAFB] border border-[#F2F4F7] rounded-xl text-sm font-medium outline-none focus:border-[#F97316]/30"
            />
            <input
              placeholder="Narxi (so'm)"
              type="number"
              value={form.price}
              onChange={(e) => setForm(p => ({ ...p, price: Number(e.target.value) }))}
              className="px-4 py-3 bg-[#F9FAFB] border border-[#F2F4F7] rounded-xl text-sm font-medium outline-none focus:border-[#F97316]/30"
            />
          </div>
          <input
            placeholder="Tavsif"
            value={form.description}
            onChange={(e) => setForm(p => ({ ...p, description: e.target.value }))}
            className="w-full px-4 py-3 bg-[#F9FAFB] border border-[#F2F4F7] rounded-xl text-sm font-medium outline-none focus:border-[#F97316]/30"
          />
          <textarea
            placeholder="Xususiyatlar (har bir qator = 1 xususiyat)"
            value={form.features}
            onChange={(e) => setForm(p => ({ ...p, features: e.target.value }))}
            rows={4}
            className="w-full px-4 py-3 bg-[#F9FAFB] border border-[#F2F4F7] rounded-xl text-sm font-medium outline-none focus:border-[#F97316]/30 resize-none"
          />
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={form.is_popular}
              onChange={(e) => setForm(p => ({ ...p, is_popular: e.target.checked }))}
              className="w-4 h-4 accent-[#F97316] rounded"
            />
            <span className="text-sm font-bold text-[#667085]">Mashhur tarif</span>
          </label>
          <div className="flex gap-3">
            <button
              onClick={handleSave}
              disabled={createMutation.isPending || updateMutation.isPending}
              className="px-6 py-2.5 bg-[#F97316] text-white rounded-xl font-bold text-sm hover:-translate-y-0.5 transition-all disabled:opacity-70"
            >
              Saqlash
            </button>
            <button onClick={resetForm} className="px-6 py-2.5 bg-[#F2F4F7] text-[#667085] rounded-xl font-bold text-sm">
              Bekor qilish
            </button>
          </div>
        </div>
      )}

      {!isCreating && !editingId && (
        <div className="flex items-center justify-between">
          <p className="text-sm font-bold text-[#98A2B3]">{plans?.length ?? 0} ta tarif</p>
          <button
            onClick={() => setIsCreating(true)}
            className="flex items-center gap-2 bg-[#F97316] text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-[#F97316]/20 hover:-translate-y-0.5 transition-all"
          >
            <Plus className="w-4 h-4" /> Yangi tarif
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {(plans ?? []).map((p) => (
          <div key={p.id} className={`bg-white p-6 rounded-2xl border ${p.is_popular ? 'border-[#F97316] shadow-lg shadow-[#F97316]/10' : 'border-[#F2F4F7]'} relative`}>
            {p.is_popular && (
              <span className="absolute -top-3 left-4 bg-[#F97316] text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider">Mashhur</span>
            )}
            <div className="flex items-start justify-between mb-4">
              <div>
                <h4 className="text-lg font-black text-[#141F38]">{p.name}</h4>
                <p className="text-sm text-[#667085] font-medium">{p.description}</p>
              </div>
              {!p.is_active && <span className="text-[10px] font-bold text-[#F04438] bg-[#FEE4E2] px-2 py-0.5 rounded-lg">Nofaol</span>}
            </div>
            <p className="text-3xl font-black text-[#141F38] mb-4">
              {p.price.toLocaleString()} <span className="text-sm font-bold text-[#98A2B3]">so'm</span>
            </p>
            <ul className="space-y-2 mb-6">
              {p.features.map((f, i) => (
                <li key={i} className="text-sm font-medium text-[#667085] flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F97316] shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
            <div className="flex gap-2 pt-4 border-t border-[#F2F4F7]">
              <button onClick={() => startEdit(p)} className="flex-1 py-2 text-sm font-bold text-[#667085] bg-[#F9FAFB] rounded-xl hover:bg-[#F2F4F7] transition-colors">
                <Pencil className="w-3.5 h-3.5 inline mr-1" /> Tahrirlash
              </button>
              <button onClick={() => handleDelete(p.id)} className="py-2 px-4 text-sm font-bold text-[#F04438] bg-[#FEE4E2]/50 rounded-xl hover:bg-[#FEE4E2] transition-colors">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
        {plans?.length === 0 && <EmptyState text="Hali tariflar yo'q" />}
      </div>
    </div>
  );
}

// ==================== Features Tab ====================

function FeaturesTab() {
  const { data: features, isLoading } = useFeatures();
  const createMutation = useCreateFeature();
  const updateMutation = useUpdateFeature();
  const deleteMutation = useDeleteFeature();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [form, setForm] = useState({ title: '', description: '', icon: '' });

  const resetForm = () => {
    setForm({ title: '', description: '', icon: '' });
    setEditingId(null);
    setIsCreating(false);
  };

  const startEdit = (f: Feature) => {
    setForm({ title: f.title, description: f.description, icon: f.icon });
    setEditingId(f.id);
    setIsCreating(false);
  };

  const handleSave = () => {
    if (!form.title) return;
    if (editingId) {
      updateMutation.mutate({ id: editingId, data: form }, { onSuccess: resetForm });
    } else {
      createMutation.mutate(form, { onSuccess: resetForm });
    }
  };

  const handleDelete = (id: number) => {
    customAlert.confirm({
      variant: 'warning',
      title: "Xususiyatni o'chirish",
      description: "Bu xususiyat butunlay o'chiriladi.",
      confirmText: "O'chirish",
      cancelText: 'Bekor qilish',
      icon: Trash2,
      onConfirm: () => deleteMutation.mutate(id),
    });
  };

  if (isLoading) return <LoadingState />;

  return (
    <div className="space-y-6">
      {(isCreating || editingId) && (
        <div className="bg-white p-6 rounded-2xl border border-[#F2F4F7] space-y-4">
          <h4 className="text-lg font-black text-[#141F38]">{editingId ? 'Xususiyatni tahrirlash' : 'Yangi xususiyat'}</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              placeholder="Sarlavha"
              value={form.title}
              onChange={(e) => setForm(p => ({ ...p, title: e.target.value }))}
              className="px-4 py-3 bg-[#F9FAFB] border border-[#F2F4F7] rounded-xl text-sm font-medium outline-none focus:border-[#F97316]/30"
            />
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                {form.icon && (
                  <div className="w-10 h-10 rounded-xl bg-[#F97316]/10 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[#F97316] text-xl">{form.icon}</span>
                  </div>
                )}
                <select
                  value={form.icon}
                  onChange={(e) => setForm(p => ({ ...p, icon: e.target.value }))}
                  className="flex-1 px-4 py-3 bg-[#F9FAFB] border border-[#F2F4F7] rounded-xl text-sm font-medium outline-none focus:border-[#F97316]/30 appearance-none cursor-pointer"
                >
                  <option value="">Icon tanlang</option>
                  {ICON_OPTIONS.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label} ({opt.value})</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <textarea
            placeholder="Tavsif..."
            value={form.description}
            onChange={(e) => setForm(p => ({ ...p, description: e.target.value }))}
            rows={3}
            className="w-full px-4 py-3 bg-[#F9FAFB] border border-[#F2F4F7] rounded-xl text-sm font-medium outline-none focus:border-[#F97316]/30 resize-none"
          />
          <div className="flex gap-3">
            <button
              onClick={handleSave}
              disabled={createMutation.isPending || updateMutation.isPending}
              className="px-6 py-2.5 bg-[#F97316] text-white rounded-xl font-bold text-sm hover:-translate-y-0.5 transition-all disabled:opacity-70"
            >
              Saqlash
            </button>
            <button onClick={resetForm} className="px-6 py-2.5 bg-[#F2F4F7] text-[#667085] rounded-xl font-bold text-sm">
              Bekor qilish
            </button>
          </div>
        </div>
      )}

      {!isCreating && !editingId && (
        <div className="flex items-center justify-between">
          <p className="text-sm font-bold text-[#98A2B3]">{features?.length ?? 0} ta xususiyat</p>
          <button
            onClick={() => setIsCreating(true)}
            className="flex items-center gap-2 bg-[#F97316] text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-[#F97316]/20 hover:-translate-y-0.5 transition-all"
          >
            <Plus className="w-4 h-4" /> Yangi xususiyat
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {(features ?? []).map((f) => (
          <div key={f.id} className="bg-white p-5 rounded-2xl border border-[#F2F4F7] flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#F973161A] flex items-center justify-center text-[#F97316] font-black text-lg shrink-0">
              <span className="material-symbols-outlined text-lg">{f.icon || 'star'}</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h4 className="font-black text-[#141F38] truncate">{f.title}</h4>
                {!f.is_active && <span className="text-[10px] font-bold text-[#F04438] bg-[#FEE4E2] px-2 py-0.5 rounded-lg shrink-0">Nofaol</span>}
              </div>
              <p className="text-sm text-[#667085] font-medium line-clamp-2 mt-1">{f.description}</p>
            </div>
            <div className="flex gap-1 shrink-0">
              <button onClick={() => startEdit(f)} className="p-2 rounded-xl hover:bg-[#F9FAFB]">
                <Pencil className="w-4 h-4 text-[#667085]" />
              </button>
              <button onClick={() => handleDelete(f.id)} className="p-2 rounded-xl hover:bg-[#FEE4E2]">
                <Trash2 className="w-4 h-4 text-[#F04438]" />
              </button>
            </div>
          </div>
        ))}
        {features?.length === 0 && <EmptyState text="Hali xususiyatlar yo'q" />}
      </div>
    </div>
  );
}

// ==================== Settings Tab ====================

const PHONE_MASK = '+{998} 00 000 00 00';
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const URL_REGEX = /^https?:\/\/.+/;

function SettingsTab() {
  const { data: settings, isLoading } = useSiteSettings();
  const updateMutation = useUpdateSiteSettings();
  const [form, setForm] = useState<Partial<SiteSetting>>({});
  const [errors, setErrors] = useState<Partial<Record<keyof SiteSetting, string>>>({});
  const [initialized, setInitialized] = useState(false);

  if (settings && !initialized) {
    setForm(settings);
    setInitialized(true);
  }

  const validate = (): boolean => {
    const errs: typeof errors = {};

    if (!form.phone?.trim()) {
      errs.phone = 'Telefon raqami kiritilishi shart';
    } else if (form.phone.replace(/\D/g, '').length < 12) {
      errs.phone = "To'liq telefon raqamini kiriting";
    }

    if (!form.email?.trim()) {
      errs.email = 'Email kiritilishi shart';
    } else if (!EMAIL_REGEX.test(form.email)) {
      errs.email = "Noto'g'ri email formati";
    }

    if (!form.address?.trim()) {
      errs.address = 'Manzil kiritilishi shart';
    }

    if (form.telegram && !URL_REGEX.test(form.telegram)) {
      errs.telegram = "URL https:// bilan boshlanishi kerak";
    }
    if (form.instagram && !URL_REGEX.test(form.instagram)) {
      errs.instagram = "URL https:// bilan boshlanishi kerak";
    }
    if (form.youtube && !URL_REGEX.test(form.youtube)) {
      errs.youtube = "URL https:// bilan boshlanishi kerak";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;
    updateMutation.mutate(form);
  };

  const setField = (key: keyof SiteSetting, value: string) => {
    setForm(p => ({ ...p, [key]: value }));
    if (errors[key]) setErrors(p => ({ ...p, [key]: undefined }));
  };

  if (isLoading) return <LoadingState />;

  const inputClass = (key: keyof SiteSetting) =>
    `w-full px-4 py-3 bg-[#F9FAFB] border rounded-xl text-sm font-medium outline-none transition-colors ${
      errors[key] ? 'border-[#F04438] focus:border-[#F04438]/50' : 'border-[#F2F4F7] focus:border-[#F97316]/30'
    }`;

  return (
    <div className="space-y-6">
      {/* Contact Info */}
      <div className="bg-white p-6 md:p-8 rounded-2xl border border-[#F2F4F7] space-y-6">
        <h4 className="text-lg font-black text-[#141F38]">Aloqa ma'lumotlari</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Phone with mask */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#667085] ml-1 uppercase tracking-wider flex items-center gap-2">
              <Phone className="w-3.5 h-3.5" /> Telefon
            </label>
            <IMaskInput
              mask={PHONE_MASK}
              value={form.phone ?? ''}
              unmask={false}
              onAccept={(value: string) => setField('phone', value)}
              placeholder="+998 90 123 45 67"
              className={inputClass('phone')}
            />
            {errors.phone && <p className="text-[#F04438] text-[11px] font-bold ml-1">{errors.phone}</p>}
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#667085] ml-1 uppercase tracking-wider flex items-center gap-2">
              <Mail className="w-3.5 h-3.5" /> Email
            </label>
            <input
              type="email"
              value={form.email ?? ''}
              onChange={(e) => setField('email', e.target.value)}
              placeholder="info@ustoznation.uz"
              className={inputClass('email')}
            />
            {errors.email && <p className="text-[#F04438] text-[11px] font-bold ml-1">{errors.email}</p>}
          </div>

          {/* Address */}
          <div className="md:col-span-2 space-y-2">
            <label className="text-xs font-bold text-[#667085] ml-1 uppercase tracking-wider flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5" /> Manzil
            </label>
            <input
              type="text"
              value={form.address ?? ''}
              onChange={(e) => setField('address', e.target.value)}
              placeholder="Toshkent, O'zbekiston"
              className={inputClass('address')}
            />
            {errors.address && <p className="text-[#F04438] text-[11px] font-bold ml-1">{errors.address}</p>}
          </div>
        </div>
      </div>

      {/* Social Links */}
      <div className="bg-white p-6 md:p-8 rounded-2xl border border-[#F2F4F7] space-y-6">
        <h4 className="text-lg font-black text-[#141F38]">Ijtimoiy tarmoq havolalari</h4>
        <div className="grid grid-cols-1 gap-4">
          {([
            { key: 'telegram' as const, label: 'Telegram', icon: Send, placeholder: 'https://t.me/ustoznation' },
            { key: 'instagram' as const, label: 'Instagram', icon: AtSign, placeholder: 'https://instagram.com/ustoznation' },
            { key: 'youtube' as const, label: 'YouTube', icon: Video, placeholder: 'https://youtube.com/@ustoznation' },
          ]).map(({ key, label, icon: Icon, placeholder }) => (
            <div key={key} className="space-y-2">
              <label className="text-xs font-bold text-[#667085] ml-1 uppercase tracking-wider flex items-center gap-2">
                <Icon className="w-3.5 h-3.5" /> {label}
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="url"
                  value={form[key] ?? ''}
                  onChange={(e) => setField(key, e.target.value)}
                  placeholder={placeholder}
                  className={`flex-1 px-4 py-3 bg-[#F9FAFB] border rounded-xl text-sm font-medium outline-none transition-colors ${
                    errors[key] ? 'border-[#F04438] focus:border-[#F04438]/50' : 'border-[#F2F4F7] focus:border-[#F97316]/30'
                  }`}
                />
                {form[key] && !errors[key] && (
                  <a
                    href={form[key]}
                    target="_blank"
                    rel="noreferrer"
                    className="shrink-0 w-10 h-10 rounded-xl bg-[#F97316]/10 text-[#F97316] flex items-center justify-center hover:bg-[#F97316] hover:text-white transition-colors"
                    title="Havolani ochish"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
              {errors[key] && <p className="text-[#F04438] text-[11px] font-bold ml-1">{errors[key]}</p>}
            </div>
          ))}
        </div>
      </div>

      {/* Save Button */}
      <button
        onClick={handleSave}
        disabled={updateMutation.isPending}
        className="flex items-center gap-2 bg-[#F97316] text-white px-8 py-3 rounded-xl font-bold text-sm shadow-lg shadow-[#F97316]/20 hover:-translate-y-0.5 transition-all disabled:opacity-70"
      >
        <Save className="w-4 h-4" />
        {updateMutation.isPending ? 'Saqlanmoqda...' : 'Saqlash'}
      </button>
    </div>
  );
}

// ==================== Shared Components ====================

function LoadingState() {
  return (
    <div className="flex items-center justify-center py-20">
      <Loader2 className="w-8 h-8 text-[#F97316] animate-spin" />
    </div>
  );
}

function EmptyState({ text }: { text: string }) {
  return (
    <div className="col-span-full text-center py-16 bg-white rounded-2xl border border-dashed border-[#F2F4F7]">
      <p className="text-[#98A2B3] font-bold">{text}</p>
    </div>
  );
}

// ==================== Main Page ====================

const AdminLanding = () => {
  const [activeTab, setActiveTab] = useState<Tab>('reviews');

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-12">
      <h1 className="text-3xl font-extrabold font-headline tracking-tighter text-[#141F38]">
        Landing sahifa boshqaruvi
      </h1>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 bg-[#F9FAFB] p-1.5 rounded-2xl border border-[#F2F4F7]">
        {TABS.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
              activeTab === key
                ? 'bg-white text-[#141F38] shadow-sm'
                : 'text-[#98A2B3] hover:text-[#667085]'
            }`}
          >
            <Icon className="w-4 h-4" />
            {label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'reviews' && <ReviewsTab />}
      {activeTab === 'pricing' && <PricingTab />}
      {activeTab === 'features' && <FeaturesTab />}
      {activeTab === 'settings' && <SettingsTab />}
    </div>
  );
};

export default AdminLanding;
