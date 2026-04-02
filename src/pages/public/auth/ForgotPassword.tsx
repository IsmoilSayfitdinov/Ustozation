import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link } from 'react-router-dom';
import { ArrowLeft, KeyRound, Check } from 'lucide-react';
import AuthLayout from './AuthLayout';
import { useRequestPasswordReset, useConfirmPasswordReset } from '@/hooks/useAuth';

const requestSchema = z.object({
  username: z.string().min(1, "Username kiritilishi shart"),
});

const confirmSchema = z.object({
  token: z.string().min(1, "Token kiritilishi shart"),
  new_password: z.string().min(8, "Parol kamida 8 ta belgidan iborat bo'lishi kerak"),
  new_password_confirm: z.string().min(1, "Parolni tasdiqlang"),
}).refine(d => d.new_password === d.new_password_confirm, {
  message: "Parollar mos kelmadi",
  path: ["new_password_confirm"],
});

const ForgotPassword = () => {
  const [step, setStep] = useState<'request' | 'confirm' | 'done'>('request');
  const requestMutation = useRequestPasswordReset();
  const confirmMutation = useConfirmPasswordReset();

  const requestForm = useForm({ resolver: zodResolver(requestSchema), defaultValues: { username: '' } });
  const confirmForm = useForm({ resolver: zodResolver(confirmSchema), defaultValues: { token: '', new_password: '', new_password_confirm: '' } });

  const handleRequest = (data: { username: string }) => {
    requestMutation.mutate(data, { onSuccess: () => setStep('confirm') });
  };

  const handleConfirm = (data: { token: string; new_password: string; new_password_confirm: string }) => {
    confirmMutation.mutate(data, { onSuccess: () => setStep('done') });
  };

  return (
    <AuthLayout>
      <div className="space-y-8 animate-in fade-in slide-in-from-right duration-500 px-4 pb-8">
        <div className="text-center space-y-3 pt-4">
          <div className="w-16 h-16 bg-primary/10 rounded-2xl mx-auto flex items-center justify-center mb-4">
            <KeyRound className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold font-headline tracking-tighter text-[#141F38]">
            {step === 'done' ? 'Parol tiklandi!' : 'Parolni tiklash'}
          </h1>
          <p className="text-sm text-[#667085] font-medium">
            {step === 'request' && "Username ingizni kiriting, biz sizga tiklash kodini beramiz"}
            {step === 'confirm' && "Tiklash kodini va yangi parolni kiriting"}
            {step === 'done' && "Endi yangi parol bilan tizimga kirishingiz mumkin"}
          </p>
        </div>

        {step === 'request' && (
          <form className="space-y-5" onSubmit={requestForm.handleSubmit(handleRequest)}>
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-[#1C2434] ml-1 uppercase tracking-wider">Username</label>
              <input
                {...requestForm.register('username')}
                type="text"
                placeholder="Username ingizni kiriting"
                className={`w-full px-5 py-3.5 bg-[#F2F4F7] rounded-xl border-none outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium text-[#1C2434] text-sm ${
                  requestForm.formState.errors.username ? 'ring-2 ring-red-500/50' : ''
                }`}
              />
              {requestForm.formState.errors.username && (
                <p className="text-red-500 text-[10px] font-bold ml-1">{requestForm.formState.errors.username.message}</p>
              )}
            </div>
            <button
              type="submit"
              disabled={requestMutation.isPending}
              className="w-full bg-primary text-white py-4 rounded-xl font-headline font-black text-sm uppercase tracking-widest hover:shadow-xl hover:shadow-primary/30 transition-all disabled:opacity-70"
            >
              {requestMutation.isPending ? "Yuborilmoqda..." : "Kodni yuborish"}
            </button>
          </form>
        )}

        {step === 'confirm' && (
          <form className="space-y-5" onSubmit={confirmForm.handleSubmit(handleConfirm)}>
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-[#1C2434] ml-1 uppercase tracking-wider">Tiklash kodi</label>
              <input
                {...confirmForm.register('token')}
                type="text"
                placeholder="Kodini kiriting"
                className={`w-full px-5 py-3.5 bg-[#F2F4F7] rounded-xl border-none outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium text-[#1C2434] text-sm ${
                  confirmForm.formState.errors.token ? 'ring-2 ring-red-500/50' : ''
                }`}
              />
              {confirmForm.formState.errors.token && (
                <p className="text-red-500 text-[10px] font-bold ml-1">{confirmForm.formState.errors.token.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-[#1C2434] ml-1 uppercase tracking-wider">Yangi parol</label>
              <input
                {...confirmForm.register('new_password')}
                type="password"
                placeholder="Kamida 8 ta belgi"
                className={`w-full px-5 py-3.5 bg-[#F2F4F7] rounded-xl border-none outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium text-[#1C2434] text-sm ${
                  confirmForm.formState.errors.new_password ? 'ring-2 ring-red-500/50' : ''
                }`}
              />
              {confirmForm.formState.errors.new_password && (
                <p className="text-red-500 text-[10px] font-bold ml-1">{confirmForm.formState.errors.new_password.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-[#1C2434] ml-1 uppercase tracking-wider">Parolni tasdiqlang</label>
              <input
                {...confirmForm.register('new_password_confirm')}
                type="password"
                placeholder="Parolni qayta kiriting"
                className={`w-full px-5 py-3.5 bg-[#F2F4F7] rounded-xl border-none outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium text-[#1C2434] text-sm ${
                  confirmForm.formState.errors.new_password_confirm ? 'ring-2 ring-red-500/50' : ''
                }`}
              />
              {confirmForm.formState.errors.new_password_confirm && (
                <p className="text-red-500 text-[10px] font-bold ml-1">{confirmForm.formState.errors.new_password_confirm.message}</p>
              )}
            </div>
            <button
              type="submit"
              disabled={confirmMutation.isPending}
              className="w-full bg-primary text-white py-4 rounded-xl font-headline font-black text-sm uppercase tracking-widest hover:shadow-xl hover:shadow-primary/30 transition-all disabled:opacity-70"
            >
              {confirmMutation.isPending ? "Tiklanmoqda..." : "Parolni tiklash"}
            </button>
          </form>
        )}

        {step === 'done' && (
          <div className="text-center space-y-6">
            <div className="w-16 h-16 bg-[#E8FFF0] rounded-2xl mx-auto flex items-center justify-center">
              <Check className="w-8 h-8 text-[#22C55E]" />
            </div>
            <Link
              to="/login"
              className="block w-full bg-primary text-white py-4 rounded-xl font-headline font-black text-sm uppercase tracking-widest text-center"
            >
              Tizimga kirish
            </Link>
          </div>
        )}

        <div className="text-center">
          <Link to="/login" className="text-[#667085] font-medium text-sm hover:text-primary flex items-center justify-center gap-2">
            <ArrowLeft className="w-4 h-4" /> Loginga qaytish
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
};

export default ForgotPassword;
