import React from 'react';
import { Camera, X, Check } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const profileSchema = z.object({
  firstName: z.string().min(2, 'Ism kamida 2 ta harfdan iborat bo\'lishi kerak'),
  lastName: z.string().min(2, 'Familiya kamida 2 ta harfdan iborat bo\'lishi kerak'),
  email: z.string().email('Noto\'g\'ri email manzili'),
  phone: z.string().min(9, 'Telefon raqami noto\'g\'ri'),
  bio: z.string().max(200, 'Bio 200 ta harfdan oshmasligi kerak'),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

interface EditProfileFormProps {
  initialValues: ProfileFormValues;
  avatar: string;
  onSave: (values: ProfileFormValues) => void;
  onCancel: () => void;
}

const EditProfileForm = ({ initialValues, avatar, onSave, onCancel }: EditProfileFormProps) => {
  const { register, handleSubmit, formState: { errors } } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: initialValues,
  });

  return (
    <div className="bg-white p-8 md:p-12 rounded-[40px] border border-[#F2F4F7] shadow-sm max-w-2xl mx-auto w-full">
      <form onSubmit={handleSubmit(onSave)} className="space-y-10">
        {/* Avatar Edit */}
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
          <div className="space-y-2">
            <label className="text-sm font-black text-[#141F38] ml-1">Ism</label>
            <input 
              {...register('firstName')}
              className={`w-full bg-[#F9FAFB] border ${errors.firstName ? 'border-red-500' : 'border-[#F2F4F7]'} px-6 py-4 rounded-[20px] font-semibold text-[#141F38] focus:bg-white focus:border-surface-tint outline-none transition-all`}
              placeholder="Ismingiz"
            />
            {errors.firstName && <p className="text-red-500 text-xs font-bold mt-1 ml-1">{errors.firstName.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-black text-[#141F38] ml-1">Familiya</label>
            <input 
              {...register('lastName')}
              className={`w-full bg-[#F9FAFB] border ${errors.lastName ? 'border-red-500' : 'border-[#F2F4F7]'} px-6 py-4 rounded-[20px] font-semibold text-[#141F38] focus:bg-white focus:border-surface-tint outline-none transition-all`}
              placeholder="Familiyangiz"
            />
            {errors.lastName && <p className="text-red-500 text-xs font-bold mt-1 ml-1">{errors.lastName.message}</p>}
          </div>

          <div className="md:col-span-2 space-y-2">
            <label className="text-sm font-black text-[#141F38] ml-1">Email</label>
            <input 
              {...register('email')}
              className={`w-full bg-[#F9FAFB] border ${errors.email ? 'border-red-500' : 'border-[#F2F4F7]'} px-6 py-4 rounded-[20px] font-semibold text-[#141F38] focus:bg-white focus:border-surface-tint outline-none transition-all`}
              placeholder="Email manzilingiz"
            />
            {errors.email && <p className="text-red-500 text-xs font-bold mt-1 ml-1">{errors.email.message}</p>}
          </div>

          <div className="md:col-span-2 space-y-2">
            <label className="text-sm font-black text-[#141F38] ml-1">Telefon raqami</label>
            <input 
              {...register('phone')}
              className={`w-full bg-[#F9FAFB] border ${errors.phone ? 'border-red-500' : 'border-[#F2F4F7]'} px-6 py-4 rounded-[20px] font-semibold text-[#141F38] focus:bg-white focus:border-surface-tint outline-none transition-all`}
              placeholder="+998 90 123 45 67"
            />
            {errors.phone && <p className="text-red-500 text-xs font-bold mt-1 ml-1">{errors.phone.message}</p>}
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
            className="flex-1 bg-surface-tint text-white py-4 rounded-[20px] font-black text-sm flex items-center justify-center gap-2 hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-surface-tint/20"
          >
            <Check className="w-5 h-5" />
            Saqlash
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfileForm;
