import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, UserPlus, ChevronDown } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { registerSchema, type RegisterSchema } from '@/schemas/auth/register';
import AuthLayout from './AuthLayout';

interface RegisterProps {
  onLogin?: () => void;
  onRegister?: (data: RegisterSchema) => void;
}

const Register = ({ onLogin, onRegister }: RegisterProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterSchema) => {
    // Simulate API call
    console.log('Registering...', data);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    if (onRegister) {
      onRegister(data);
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <AuthLayout>
      <div className="space-y-8 animate-in fade-in slide-in-from-right duration-500 max-h-[85vh] overflow-y-auto px-4 custom-scrollbar pb-8">
        <div className="text-center space-y-3 pt-4">
          <h1 className="text-3xl md:text-4xl font-extrabold font-headline tracking-tighter text-[#1C2434]">
            Ro'yxatdan o'tish
          </h1>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#1C2434] ml-1 uppercase tracking-wider">
                Foydalanuvchi nomi
              </label>
              <input 
                {...register('username')}
                type="text" 
                placeholder="username" 
                className={`w-full px-5 py-3.5 bg-[#F2F4F7] rounded-xl border-none outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium text-[#1C2434] text-sm ${
                  errors.username ? 'ring-2 ring-red-500/50' : ''
                }`}
              />
              {errors.username && (
                <p className="text-red-500 text-[10px] font-bold ml-1">{errors.username.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#1C2434] ml-1 uppercase tracking-wider">
                Telegram username
              </label>
              <input 
                {...register('telegram_username')}
                type="text" 
                placeholder="@username" 
                className={`w-full px-5 py-3.5 bg-[#F2F4F7] rounded-xl border-none outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium text-[#1C2434] text-sm ${
                  errors.telegram_username ? 'ring-2 ring-red-500/50' : ''
                }`}
              />
              {errors.telegram_username && (
                <p className="text-red-500 text-[10px] font-bold ml-1">{errors.telegram_username.message}</p>
              )}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#1C2434] ml-1 uppercase tracking-wider">
                Jins
              </label>
              <div className="relative">
                <select 
                  {...register('gender')}
                  className={`w-full px-5 py-3.5 bg-[#F2F4F7] rounded-xl border-none outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium text-[#1C2434] text-sm appearance-none ${
                    errors.gender ? 'ring-2 ring-red-500/50' : ''
                  }`}
                >
                  <option value="">Tanlang</option>
                  <option value="male">Erkak</option>
                  <option value="female">Ayol</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant pointer-events-none" />
              </div>
              {errors.gender && (
                <p className="text-red-500 text-[10px] font-bold ml-1">{errors.gender.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#1C2434] ml-1 uppercase tracking-wider">
                Yosh
              </label>
              <input 
                {...register('age')}
                type="number" 
                placeholder="16" 
                className={`w-full px-5 py-3.5 bg-[#F2F4F7] rounded-xl border-none outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium text-[#1C2434] text-sm ${
                  errors.age ? 'ring-2 ring-red-500/50' : ''
                }`}
              />
              {errors.age && (
                <p className="text-red-500 text-[10px] font-bold ml-1">{errors.age.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-[#1C2434] ml-1 uppercase tracking-wider">
              Qaysi kursda o'qiyapsiz
            </label>
            <div className="relative">
              <select 
                {...register('course')}
                className={`w-full px-5 py-3.5 bg-[#F2F4F7] rounded-xl border-none outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium text-[#1C2434] text-sm appearance-none ${
                  errors.course ? 'ring-2 ring-red-500/50' : ''
                }`}
              >
                <option value="">Kursni tanlang</option>
                <option value="beginner">Beginner</option>
                <option value="elementary">Elementary</option>
                <option value="pre-int">Pre-Intermediate</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant pointer-events-none" />
            </div>
            {errors.course && (
              <p className="text-red-500 text-[10px] font-bold ml-1">{errors.course.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-[#1C2434] ml-1 uppercase tracking-wider">
              O'qituvchi
            </label>
            <div className="relative">
              <select 
                {...register('teacher')}
                className={`w-full px-5 py-3.5 bg-[#F2F4F7] rounded-xl border-none outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium text-[#1C2434] text-sm appearance-none ${
                  errors.teacher ? 'ring-2 ring-red-500/50' : ''
                }`}
              >
                <option value="">O'qituvchini tanlang</option>
                <option value="teacher1">John Doe</option>
                <option value="teacher2">Jane Smith</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant pointer-events-none" />
            </div>
            {errors.teacher && (
              <p className="text-red-500 text-[10px] font-bold ml-1">{errors.teacher.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-[#1C2434] ml-1 uppercase tracking-wider">
              Parol
            </label>
            <input 
              {...register('password')}
              type="password" 
              placeholder="........" 
              className={`w-full px-5 py-3.5 bg-[#F2F4F7] rounded-xl border-none outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium text-[#1C2434] text-sm ${
                errors.password ? 'ring-2 ring-red-500/50' : ''
              }`}
            />
            {errors.password && (
              <p className="text-red-500 text-[10px] font-bold ml-1">{errors.password.message}</p>
            )}
          </div>

          <button 
            disabled={isSubmitting}
            className="w-full bg-primary text-white py-4 rounded-xl font-headline font-black text-sm uppercase tracking-widest hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-1 active:scale-95 transition-all duration-300 cursor-pointer border-none shadow-lg shadow-primary/20 mt-4 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Kutilmoqda..." : "Ro'yxatdan o'tish"}
          </button>
        </form>

        <div className="text-center">
          <p className="text-on-surface-variant font-medium text-sm">
            Hisobingiz bormi?{' '}
            <button 
              onClick={onLogin}
              className="text-primary font-bold hover:underline cursor-pointer"
            >
              Kirish
            </button>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Register;
