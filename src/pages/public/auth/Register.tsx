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
      <div className="space-y-8 animate-in fade-in slide-in-from-right duration-500 max-h-[85vh] overflow-y-auto px-4 custom-scrollbar pb-8">
        <div className="text-center space-y-3 pt-4">
          <h1 className="text-3xl md:text-4xl font-extrabold font-headline tracking-tighter text-[#141F38]">
            Ro'yxatdan o'tish
          </h1>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-[#1C2434] ml-1 uppercase tracking-wider">
                Foydalanuvchi nomi *
              </label>
              <input
                {...register('username')}
                type="text"
                placeholder="username"
                className={`w-full px-5 py-3.5 bg-[#F2F4F7] rounded-xl border-none outline-none focus:ring-2 focus:ring-[#F97316]/20 transition-all font-medium text-[#1C2434] text-sm ${
                  errors.username ? 'ring-2 ring-red-500/50' : ''
                }`}
              />
              {errors.username && (
                <p className="text-red-500 text-[10px] font-bold ml-1">{errors.username.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-[#1C2434] ml-1 uppercase tracking-wider">
                Telegram username
              </label>
              <input
                {...register('telegram_username')}
                type="text"
                placeholder="@username"
                className="w-full px-5 py-3.5 bg-[#F2F4F7] rounded-xl border-none outline-none focus:ring-2 focus:ring-[#F97316]/20 transition-all font-medium text-[#1C2434] text-sm"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-[#1C2434] ml-1 uppercase tracking-wider">
                Jins
              </label>
              <Controller
                name="gender"
                control={control}
                render={({ field }) => (
                  <CustomSelect
                    options={genderOptions}
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Tanlang"
                  />
                )}
              />
            </div>
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-[#1C2434] ml-1 uppercase tracking-wider">
                Yosh
              </label>
              <input
                {...register('age')}
                type="number"
                placeholder="16"
                className={`w-full px-5 py-3.5 bg-[#F2F4F7] rounded-xl border-none outline-none focus:ring-2 focus:ring-[#F97316]/20 transition-all font-medium text-[#1C2434] text-sm ${
                  errors.age ? 'ring-2 ring-red-500/50' : ''
                }`}
              />
              {errors.age && (
                <p className="text-red-500 text-[10px] font-bold ml-1">{errors.age.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[11px] font-bold text-[#1C2434] ml-1 uppercase tracking-wider">
              Qaysi kursga yozilmoqchisiz
            </label>
            <Controller
              name="course_id"
              control={control}
              render={({ field }) => (
                <CustomSelect
                  options={courseOptions}
                  value={field.value ?? undefined}
                  onChange={field.onChange}
                  placeholder="Kursni tanlang"
                />
              )}
            />
            <p className="text-[10px] font-medium text-[#98A2B3] ml-1">Kurs tanlasangiz avtomatik yozilasiz</p>
          </div>

          <div className="space-y-2">
            <label className="text-[11px] font-bold text-[#1C2434] ml-1 uppercase tracking-wider">
              Parol *
            </label>
            <div className="relative">
              <input
                {...register('password')}
                type={showPassword ? "text" : "password"}
                placeholder="Kamida 8 ta belgi"
                className={`w-full px-5 py-3.5 bg-[#F2F4F7] rounded-xl border-none outline-none focus:ring-2 focus:ring-[#F97316]/20 transition-all font-medium text-[#1C2434] text-sm ${
                  errors.password ? 'ring-2 ring-red-500/50' : ''
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-[#F97316] transition-colors cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-[10px] font-bold ml-1">{errors.password.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-[11px] font-bold text-[#1C2434] ml-1 uppercase tracking-wider">
              Parolni tasdiqlang *
            </label>
            <div className="relative">
              <input
                {...register('password_confirm')}
                type={showConfirm ? "text" : "password"}
                placeholder="Parolni qayta kiriting"
                className={`w-full px-5 py-3.5 bg-[#F2F4F7] rounded-xl border-none outline-none focus:ring-2 focus:ring-[#F97316]/20 transition-all font-medium text-[#1C2434] text-sm ${
                  errors.password_confirm ? 'ring-2 ring-red-500/50' : ''
                }`}
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-[#F97316] transition-colors cursor-pointer"
              >
                {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.password_confirm && (
              <p className="text-red-500 text-[10px] font-bold ml-1">{errors.password_confirm.message}</p>
            )}
          </div>

          <button
            disabled={registerMutation.isPending}
            className="w-full bg-[#F97316] text-white py-4 rounded-xl font-headline font-black text-sm uppercase tracking-widest hover:shadow-xl hover:shadow-[#F97316]/30 hover:-translate-y-1 active:scale-95 transition-all duration-300 cursor-pointer border-none shadow-lg shadow-[#F97316]/20 mt-4 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {registerMutation.isPending ? "Kutilmoqda..." : "Ro'yxatdan o'tish"}
          </button>
        </form>

        <div className="text-center">
          <p className="text-on-surface-variant font-medium text-sm">
            Hisobingiz bormi?{' '}
            <Link to="/login" className="text-[#F97316] font-bold hover:underline">
              Kirish
            </Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Register;
