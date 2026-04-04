import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff } from 'lucide-react';
import { Link } from 'react-router-dom';
import { registerSchema, type RegisterSchema } from '@/schemas/auth/register';
import AuthLayout from './AuthLayout';
import { useRegister } from '@/hooks/useAuth';
import { useCourses } from '@/hooks/useCourses';
import CustomSelect from '@/components/ui/CustomSelect';

const genderOptions = [
  { label: 'Erkak', value: 'male' },
  { label: 'Ayol', value: 'female' },
];

const inputClass = "w-full px-5 py-3.5 bg-[#F2F4F7] dark:bg-[#1a1a1a] rounded-xl border border-transparent dark:border-white/8 outline-none focus:ring-2 focus:ring-primary/30 transition-all font-medium text-[#1C2434] dark:text-white text-sm placeholder:text-[#98A2B3] dark:placeholder:text-[#52525b]";
const labelClass = "text-[11px] font-bold text-[#1C2434] dark:text-[#e5e7eb] ml-1 uppercase tracking-wider";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const registerMutation = useRegister();
  const { data: courses } = useCourses();

  const courseOptions = (courses ?? []).map((c) => ({
    label: `${c.title} (${c.level.name})`,
    value: String(c.id),
  }));

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: RegisterSchema) => {
    registerMutation.mutate({
      username: data.username,
      password: data.password,
      password_confirm: data.password_confirm,
      telegram_username: data.telegram_username || undefined,
      gender: data.gender || undefined,
      age: data.age ? Number(data.age) : undefined,
      course_id: data.course_id ? Number(data.course_id) : undefined,
    });
  };

  return (
    <AuthLayout>
      <div className="space-y-8 animate-in fade-in slide-in-from-right duration-500 max-h-[85vh] overflow-y-auto custom-scrollbar pb-2 bg-white dark:bg-[#111111] rounded-3xl p-6 md:p-8 border border-[#F2F4F7] dark:border-white/8 shadow-sm dark:shadow-none">
        <div className="text-center space-y-3 pt-2">
          <h1 className="text-3xl md:text-4xl font-extrabold font-headline tracking-tighter text-[#141F38] dark:text-white">
            Ro'yxatdan o'tish
          </h1>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className={labelClass}>Foydalanuvchi nomi *</label>
              <input
                {...register('username')}
                type="text"
                placeholder="username"
                className={`${inputClass} ${errors.username ? 'ring-2 ring-red-500/50' : ''}`}
              />
              {errors.username && <p className="text-red-500 text-[10px] font-bold ml-1">{errors.username.message}</p>}
            </div>
            <div className="space-y-2">
              <label className={labelClass}>Telegram username</label>
              <input
                {...register('telegram_username')}
                type="text"
                placeholder="@username"
                className={inputClass}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className={labelClass}>Jins</label>
              <Controller
                name="gender"
                control={control}
                render={({ field }) => (
                  <CustomSelect options={genderOptions} value={field.value} onChange={field.onChange} placeholder="Tanlang" />
                )}
              />
            </div>
            <div className="space-y-2">
              <label className={labelClass}>Yosh</label>
              <input
                {...register('age')}
                type="number"
                placeholder="16"
                className={`${inputClass} ${errors.age ? 'ring-2 ring-red-500/50' : ''}`}
              />
              {errors.age && <p className="text-red-500 text-[10px] font-bold ml-1">{errors.age.message}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <label className={labelClass}>Qaysi kursga yozilmoqchisiz</label>
            <Controller
              name="course_id"
              control={control}
              render={({ field }) => (
                <CustomSelect options={courseOptions} value={field.value ?? undefined} onChange={field.onChange} placeholder="Kursni tanlang" />
              )}
            />
            <p className="text-[10px] font-medium text-[#98A2B3] dark:text-[#6b7280] ml-1">Kurs tanlasangiz avtomatik yozilasiz</p>
          </div>

          <div className="space-y-2">
            <label className={labelClass}>Parol *</label>
            <div className="relative">
              <input
                {...register('password')}
                type={showPassword ? "text" : "password"}
                placeholder="Kamida 8 ta belgi"
                className={`${inputClass} ${errors.password ? 'ring-2 ring-red-500/50' : ''}`}
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#98A2B3] dark:text-[#6b7280] hover:text-primary transition-colors cursor-pointer">
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-[10px] font-bold ml-1">{errors.password.message}</p>}
          </div>

          <div className="space-y-2">
            <label className={labelClass}>Parolni tasdiqlang *</label>
            <div className="relative">
              <input
                {...register('password_confirm')}
                type={showConfirm ? "text" : "password"}
                placeholder="Parolni qayta kiriting"
                className={`${inputClass} ${errors.password_confirm ? 'ring-2 ring-red-500/50' : ''}`}
              />
              <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#98A2B3] dark:text-[#6b7280] hover:text-primary transition-colors cursor-pointer">
                {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.password_confirm && <p className="text-red-500 text-[10px] font-bold ml-1">{errors.password_confirm.message}</p>}
          </div>

          <button
            disabled={registerMutation.isPending}
            className="w-full bg-primary text-white py-4 rounded-xl font-headline font-black text-sm uppercase tracking-widest hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-1 active:scale-95 transition-all duration-300 cursor-pointer border-none shadow-lg shadow-primary/20 mt-4 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {registerMutation.isPending ? "Kutilmoqda..." : "Ro'yxatdan o'tish"}
          </button>
        </form>

        <div className="text-center">
          <p className="text-[#667085] dark:text-[#9ca3af] font-medium text-sm">
            Hisobingiz bormi?{' '}
            <Link to="/login" className="text-primary font-bold hover:underline">
              Kirish
            </Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Register;
