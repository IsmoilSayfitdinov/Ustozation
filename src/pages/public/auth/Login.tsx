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
      <div className="space-y-8 animate-in fade-in slide-in-from-right duration-500">
        <div className="text-center space-y-3">
          <h1 className="text-3xl md:text-4xl font-extrabold font-headline tracking-tighter text-[#141F38]">
            Xush kelibsiz!
          </h1>
          <p className="text-on-surface-variant font-medium text-sm md:text-base">
            Hisobingizga kiring va o'rganishni davom eting
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <label className="text-sm font-bold text-[#1C2434] ml-1">
              Foydalanuvchi nomi
            </label>
            <input
              {...register('username')}
              type="text"
              placeholder="Foydalanuvchi nomi"
              className={`w-full px-6 py-4 bg-[#F2F4F7] rounded-2xl border-none outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium text-[#1C2434] ${
                errors.username ? 'ring-2 ring-red-500/50' : ''
              }`}
            />
            {errors.username && (
              <p className="text-red-500 text-xs font-bold ml-1">{errors.username.message}</p>
            )}
          </div>

          <div className="space-y-2 relative">
            <label className="text-sm font-bold text-[#1C2434] ml-1">
              Parol
            </label>
            <div className="relative">
              <input
                {...register('password')}
                type={showPassword ? "text" : "password"}
                placeholder="........"
                className={`w-full px-6 py-4 bg-[#F2F4F7] rounded-2xl border-none outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium text-[#1C2434] ${
                  errors.password ? 'ring-2 ring-red-500/50' : ''
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
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
            className="w-full bg-primary text-white py-5 rounded-2xl font-headline font-black text-sm uppercase tracking-widest hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-1 active:scale-95 transition-all duration-300 cursor-pointer border-none shadow-lg shadow-primary/20 mt-4 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loginMutation.isPending ? "Kutilmoqda..." : "Kirish"}
          </button>
        </form>

        <div className="text-center space-y-3">
          <Link to="/forgot-password" className="text-[#667085] font-medium text-sm hover:text-primary transition-colors">
            Parolni unutdingiz?
          </Link>
          <p className="text-on-surface-variant font-medium text-sm">
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
