import { useState } from 'react';
import { Camera, X, Check, User, AtSign, Calendar, UserCheck, FileText, Loader2 } from 'lucide-react';
import CustomSelect from '@/components/ui/CustomSelect';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useMe, useUpdateProfile } from '@/hooks/useAuth';
import { motion } from 'framer-motion';

const profileSchema = z.object({
  full_name: z.string().min(2, 'Ism kamida 2 ta harfdan iborat bo\'lishi kerak'),
  telegram_username: z.string().optional(),
  gender: z.string().optional(),
  age: z.string().optional(),
  bio: z.string().max(200, 'Bio 200 ta harfdan oshmasligi kerak').optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

interface EditProfileFormProps {
  avatar: string;
  onCancel: () => void;
  onSuccess: () => void;
}

const EditProfileForm = ({ avatar, onCancel, onSuccess }: EditProfileFormProps) => {
  const { data: user } = useMe();
  const updateProfile = useUpdateProfile();
  const [avatarHover, setAvatarHover] = useState(false);

  const { register, handleSubmit, setValue, watch, formState: { errors, isDirty } } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      full_name: user?.profile?.full_name || '',
      telegram_username: user?.telegram_username || '',
      gender: user?.gender || '',
      age: user?.age ? String(user.age) : '',
      bio: user?.profile?.bio || '',
    },
  });

  const bioLength = (watch('bio') || '').length;

  const onSubmit = (data: ProfileFormValues) => {
    updateProfile.mutate(
      {
        telegram_username: data.telegram_username || undefined,
        gender: data.gender || undefined,
        age: data.age ? Number(data.age) : undefined,
        profile: {
          full_name: data.full_name,
          bio: data.bio || '',
        },
      },
      { onSuccess }
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className=" mx-auto w-full space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-black text-[#141F38]">Profilni tahrirlash</h2>
        <button onClick={onCancel} className="p-2.5 rounded-xl hover:bg-[#F2F4F7] text-[#98A2B3] transition-colors">
          <X className="w-5 h-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Avatar */}
        <div className="bg-white p-6 rounded-[24px] border border-[#F2F4F7] flex items-center gap-5">
          <div
            className="relative w-20 h-20 shrink-0"
            onMouseEnter={() => setAvatarHover(true)}
            onMouseLeave={() => setAvatarHover(false)}
          >
            <div className="w-full h-full bg-gradient-to-br from-primary to-[#EA580C] rounded-2xl flex items-center justify-center text-white text-3xl font-black shadow-lg shadow-primary/20">
              {avatar}
            </div>
            {avatarHover && (
              <div className="absolute inset-0 bg-black/40 rounded-2xl flex items-center justify-center cursor-pointer">
                <Camera className="w-6 h-6 text-white" />
              </div>
            )}
          </div>
          <div>
            <p className="text-base font-black text-[#141F38]">{user?.profile?.full_name || user?.username}</p>
            <p className="text-xs font-medium text-[#98A2B3]">@{user?.username}</p>
          </div>
        </div>

        {/* Shaxsiy ma'lumotlar */}
        <div className="bg-white p-6 rounded-[24px] border border-[#F2F4F7] space-y-5">
          <h3 className="text-sm font-black text-[#667085] uppercase tracking-wider flex items-center gap-2">
            <User className="w-4 h-4" /> Shaxsiy ma'lumotlar
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2 space-y-1.5">
              <label className="text-xs font-bold text-[#667085] ml-1">To'liq ism *</label>
              <input
                {...register('full_name')}
                className={`w-full bg-[#F9FAFB] border ${errors.full_name ? 'border-red-400' : 'border-[#F2F4F7]'} px-4 py-3.5 rounded-xl font-medium text-sm text-[#141F38] focus:bg-white focus:border-primary/30 focus:ring-2 focus:ring-primary/10 outline-none transition-all`}
                placeholder="Ismingiz Familiyangiz"
              />
              {errors.full_name && <p className="text-red-500 text-[11px] font-bold ml-1">{errors.full_name.message}</p>}
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#667085] ml-1 flex items-center gap-1">
                <AtSign className="w-3 h-3" /> Telegram
              </label>
              <input
                {...register('telegram_username')}
                className="w-full bg-[#F9FAFB] border border-[#F2F4F7] px-4 py-3.5 rounded-xl font-medium text-sm text-[#141F38] focus:bg-white focus:border-primary/30 focus:ring-2 focus:ring-primary/10 outline-none transition-all"
                placeholder="@username"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#667085] ml-1 flex items-center gap-1">
                <Calendar className="w-3 h-3" /> Yosh
              </label>
              <input
                {...register('age')}
                type="number"
                min={5}
                max={100}
                className="w-full bg-[#F9FAFB] border border-[#F2F4F7] px-4 py-3.5 rounded-xl font-medium text-sm text-[#141F38] focus:bg-white focus:border-primary/30 focus:ring-2 focus:ring-primary/10 outline-none transition-all"
                placeholder="16"
              />
            </div>

            <div className="md:col-span-2 space-y-1.5">
              <label className="text-xs font-bold text-[#667085] ml-1 flex items-center gap-1">
                <UserCheck className="w-3 h-3" /> Jins
              </label>
              <CustomSelect
                options={[{ label: 'Erkak', value: 'male' }, { label: 'Ayol', value: 'female' }]}
                value={watch('gender') || ''}
                onChange={(val) => setValue('gender', val, { shouldDirty: true })}
                placeholder="Tanlang..."
              />
            </div>

            <div className="md:col-span-2 space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-[#667085] ml-1 flex items-center gap-1">
                  <FileText className="w-3 h-3" /> Bio
                </label>
                <span className={`text-[10px] font-bold ${bioLength > 180 ? 'text-[#F04438]' : 'text-[#98A2B3]'}`}>
                  {bioLength}/200
                </span>
              </div>
              <textarea
                {...register('bio')}
                rows={3}
                className={`w-full bg-[#F9FAFB] border ${errors.bio ? 'border-red-400' : 'border-[#F2F4F7]'} px-4 py-3.5 rounded-xl font-medium text-sm text-[#141F38] focus:bg-white focus:border-primary/30 focus:ring-2 focus:ring-primary/10 outline-none transition-all resize-none`}
                placeholder="O'zingiz haqingizda qisqacha..."
              />
              {errors.bio && <p className="text-red-500 text-[11px] font-bold ml-1">{errors.bio.message}</p>}
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-[#F2F4F7] text-[#667085] py-3.5 rounded-xl font-black text-sm flex items-center justify-center gap-2 hover:bg-[#EAECF0] transition-all"
          >
            <X className="w-4 h-4" />
            Bekor qilish
          </button>
          <button
            type="submit"
            disabled={updateProfile.isPending || !isDirty}
            className="flex-1 bg-primary text-white py-3.5 rounded-xl font-black text-sm flex items-center justify-center gap-2 hover:brightness-110 active:scale-[0.98] transition-all shadow-lg shadow-primary/20 disabled:opacity-60"
          >
            {updateProfile.isPending ? (
              <><Loader2 className="w-4 h-4 animate-spin" /> Saqlanmoqda...</>
            ) : (
              <><Check className="w-4 h-4" /> Saqlash</>
            )}
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default EditProfileForm;
