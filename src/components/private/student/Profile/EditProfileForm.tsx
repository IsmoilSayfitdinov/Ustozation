import { Camera, X, Check } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useMe, useUpdateProfile } from '@/hooks/useAuth';

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

  const { register, handleSubmit, formState: { errors } } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      full_name: user?.profile?.full_name || '',
      telegram_username: user?.telegram_username || '',
      gender: user?.gender || '',
      age: user?.age ? String(user.age) : '',
      bio: user?.profile?.bio || '',
    },
  });

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
    <div className="bg-white p-8 md:p-12 rounded-[40px] border border-[#F2F4F7] shadow-sm max-w-2xl mx-auto w-full">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
        {/* Avatar */}
        <div className="relative w-32 h-32 mx-auto">
          <div className="w-full h-full bg-surface-tint rounded-3xl flex items-center justify-center text-white text-5xl font-black shadow-xl shadow-surface-tint/20">
            {avatar}
          </div>
          <button
            type="button"
            className="absolute -bottom-2 -right-2 bg-white p-2.5 rounded-2xl border border-[#F2F4F7] shadow-lg text-surface-tint hover:scale-110 active:scale-95 transition-all"
          >
            <Camera className="w-6 h-6" />
          </button>
        </div>

        {/* Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="md:col-span-2 space-y-2">
            <label className="text-sm font-black text-[#141F38] ml-1">To'liq ism</label>
            <input
              {...register('full_name')}
              className={`w-full bg-[#F9FAFB] border ${errors.full_name ? 'border-red-500' : 'border-[#F2F4F7]'} px-6 py-4 rounded-[20px] font-semibold text-[#141F38] focus:bg-white focus:border-surface-tint outline-none transition-all`}
              placeholder="Ismingiz"
            />
            {errors.full_name && <p className="text-red-500 text-xs font-bold mt-1 ml-1">{errors.full_name.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-black text-[#141F38] ml-1">Telegram</label>
            <input
              {...register('telegram_username')}
              className="w-full bg-[#F9FAFB] border border-[#F2F4F7] px-6 py-4 rounded-[20px] font-semibold text-[#141F38] focus:bg-white focus:border-surface-tint outline-none transition-all"
              placeholder="@username"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-black text-[#141F38] ml-1">Yosh</label>
            <input
              {...register('age')}
              type="number"
              className="w-full bg-[#F9FAFB] border border-[#F2F4F7] px-6 py-4 rounded-[20px] font-semibold text-[#141F38] focus:bg-white focus:border-surface-tint outline-none transition-all"
              placeholder="16"
            />
          </div>

          <div className="md:col-span-2 space-y-2">
            <label className="text-sm font-black text-[#141F38] ml-1">Jins</label>
            <select
              {...register('gender')}
              className="w-full bg-[#F9FAFB] border border-[#F2F4F7] px-6 py-4 rounded-[20px] font-semibold text-[#141F38] focus:bg-white focus:border-surface-tint outline-none transition-all"
            >
              <option value="">Tanlang</option>
              <option value="male">Erkak</option>
              <option value="female">Ayol</option>
            </select>
          </div>

          <div className="md:col-span-2 space-y-2">
            <label className="text-sm font-black text-[#141F38] ml-1">Bio</label>
            <textarea
              {...register('bio')}
              rows={4}
              className={`w-full bg-[#F9FAFB] border ${errors.bio ? 'border-red-500' : 'border-[#F2F4F7]'} px-6 py-4 rounded-[20px] font-semibold text-[#141F38] focus:bg-white focus:border-surface-tint outline-none transition-all resize-none`}
              placeholder="O'zingiz haqingizda qisqacha..."
            />
            {errors.bio && <p className="text-red-500 text-xs font-bold mt-1 ml-1">{errors.bio.message}</p>}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-4 pt-2">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-[#F2F4F7] text-[#141F38] py-4 rounded-[20px] font-black text-sm flex items-center justify-center gap-2 hover:bg-[#EAECF0] transition-all"
          >
            <X className="w-5 h-5" />
            Bekor qilish
          </button>
          <button
            type="submit"
            disabled={updateProfile.isPending}
            className="flex-1 bg-surface-tint text-white py-4 rounded-[20px] font-black text-sm flex items-center justify-center gap-2 hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-surface-tint/20 disabled:opacity-70"
          >
            <Check className="w-5 h-5" />
            {updateProfile.isPending ? 'Saqlanmoqda...' : 'Saqlash'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfileForm;
