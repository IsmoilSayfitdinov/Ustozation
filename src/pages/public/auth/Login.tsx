import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff } from 'lucide-react';
import { Link } from 'react-router-dom';
import AuthLayout from './AuthLayout';
import { loginSchema, type LoginSchema } from '@/schemas/auth/login';
import { useLogin } from '@/hooks/useAuth';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const loginMutation = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginSchema) => {
    loginMutation.mutate(data);
  };

  return (
    <AuthLayout>
      <div className="space-y-8 animate-in fade-in slide-in-from-right duration-500 bg-white dark:bg-[#111111] rounded-3xl p-8 md:p-10 border border-[#F2F4F7] dark:border-white/8 shadow-sm dark:shadow-none">
        <div className="text-center space-y-3">
          <h1 className="text-3xl md:text-4xl font-extrabold font-headline tracking-tighter text-[#141F38] dark:text-white">
            Xush kelibsiz!
          </h1>
          <p className="text-[#667085] dark:text-[#a1a1aa] font-medium text-sm md:text-base">
            Hisobingizga kiring va o'rganishni davom eting
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <label className="text-sm font-bold text-[#1C2434] dark:text-[#e5e7eb] ml-1">
              Foydalanuvchi nomi
            </label>
            <input
              {...register('username')}
              type="text"
              placeholder="Foydalanuvchi nomi"
              className={`w-full px-6 py-4 bg-[#F2F4F7] dark:bg-[#1a1a1a] rounded-2xl border border-transparent dark:border-white/8 outline-none focus:ring-2 focus:ring-primary/30 transition-all font-medium text-[#1C2434] dark:text-white placeholder:text-[#98A2B3] dark:placeholder:text-[#52525b] ${
                errors.username ? 'ring-2 ring-red-500/50' : ''
              }`}
            />
            {errors.username && (
              <p className="text-red-500 text-xs font-bold ml-1">{errors.username.message}</p>
            )}
          </div>

          <div className="space-y-2 relative">
            <label className="text-sm font-bold text-[#1C2434] dark:text-[#e5e7eb] ml-1">
              Parol
            </label>
            <div className="relative">
              <input
                {...register('password')}
                type={showPassword ? "text" : "password"}
                placeholder="........"
                className={`w-full px-6 py-4 bg-[#F2F4F7] dark:bg-[#1a1a1a] rounded-2xl border border-transparent dark:border-white/8 outline-none focus:ring-2 focus:ring-primary/30 transition-all font-medium text-[#1C2434] dark:text-white placeholder:text-[#98A2B3] dark:placeholder:text-[#52525b] ${
                  errors.password ? 'ring-2 ring-red-500/50' : ''
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#98A2B3] dark:text-[#71717a] hover:text-primary transition-colors cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs font-bold ml-1">{errors.password.message}</p>
            )}
          </div>

          <button
            disabled={loginMutation.isPending}
            className="w-full bg-primary dark:bg-orange-500 text-white py-5 rounded-2xl font-headline font-black text-sm uppercase tracking-widest hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-1 active:scale-95 transition-all duration-300 cursor-pointer border-none shadow-lg shadow-primary/20 mt-4 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loginMutation.isPending ? "Kutilmoqda..." : "Kirish"}
          </button>
        </form>

        <div className="text-center space-y-3">
          <Link to="/forgot-password" className="text-[#667085] dark:text-[#a1a1aa] font-medium text-sm hover:text-primary transition-colors">
            Parolni unutdingiz?
          </Link>
          <p className="text-[#667085] dark:text-[#a1a1aa] font-medium text-sm">
            Hisobingiz yo'qmi?{' '}
            <Link to="/register" className="text-primary font-bold hover:underline">
              Ro'yxatdan o'tish
            </Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Login;
