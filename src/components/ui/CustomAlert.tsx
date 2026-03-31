import { create } from 'zustand';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AlertTriangle,
  Info,
  CheckCircle2,
  XCircle,
  Trash2,
  type LucideIcon,
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type AlertVariant = 'info' | 'success' | 'warning' | 'error' | 'delete';

interface AlertConfig {
  variant?: AlertVariant;
  title: string;
  description?: string;
  icon?: LucideIcon;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void | Promise<void>;
  onCancel?: () => void;
  hideCancel?: boolean;
}

interface AlertStore {
  isOpen: boolean;
  config: AlertConfig | null;
  open: (config: AlertConfig) => void;
  close: () => void;
}

/* ------------------------------------------------------------------ */
/*  Store                                                              */
/* ------------------------------------------------------------------ */

export const useAlertStore = create<AlertStore>((set) => ({
  isOpen: false,
  config: null,
  open: (config) => set({ isOpen: true, config }),
  close: () => set({ isOpen: false, config: null }),
}));

/* ------------------------------------------------------------------ */
/*  Public API (imperative usage)                                      */
/* ------------------------------------------------------------------ */

export const customAlert = {
  show: (config: AlertConfig) => useAlertStore.getState().open(config),

  info: (title: string, description?: string) =>
    useAlertStore.getState().open({ variant: 'info', title, description, hideCancel: true }),

  success: (title: string, description?: string) =>
    useAlertStore.getState().open({ variant: 'success', title, description, hideCancel: true }),

  warning: (title: string, description?: string) =>
    useAlertStore.getState().open({ variant: 'warning', title, description, hideCancel: true }),

  error: (title: string, description?: string) =>
    useAlertStore.getState().open({ variant: 'error', title, description, hideCancel: true }),

  confirm: (config: Omit<AlertConfig, 'hideCancel'>) =>
    useAlertStore.getState().open({ variant: 'warning', ...config }),

  delete: (config: Pick<AlertConfig, 'title' | 'description' | 'onConfirm' | 'onCancel'>) =>
    useAlertStore.getState().open({
      variant: 'delete',
      confirmText: "O'chirish",
      ...config,
    }),
};

/* ------------------------------------------------------------------ */
/*  Variant styles                                                     */
/* ------------------------------------------------------------------ */

const variants: Record<
  AlertVariant,
  { Icon: LucideIcon; iconColor: string; bgColor: string; btnColor: string; btnHover: string }
> = {
  info: {
    Icon: Info,
    iconColor: 'text-blue-500',
    bgColor: 'bg-blue-50',
    btnColor: 'bg-blue-500',
    btnHover: 'hover:bg-blue-600',
  },
  success: {
    Icon: CheckCircle2,
    iconColor: 'text-emerald-500',
    bgColor: 'bg-emerald-50',
    btnColor: 'bg-emerald-500',
    btnHover: 'hover:bg-emerald-600',
  },
  warning: {
    Icon: AlertTriangle,
    iconColor: 'text-amber-500',
    bgColor: 'bg-amber-50',
    btnColor: 'bg-amber-500',
    btnHover: 'hover:bg-amber-600',
  },
  error: {
    Icon: XCircle,
    iconColor: 'text-red-500',
    bgColor: 'bg-red-50',
    btnColor: 'bg-red-500',
    btnHover: 'hover:bg-red-600',
  },
  delete: {
    Icon: Trash2,
    iconColor: 'text-red-500',
    bgColor: 'bg-red-50',
    btnColor: 'bg-red-500',
    btnHover: 'hover:bg-red-600',
  },
};

/* ------------------------------------------------------------------ */
/*  Component (render once at app root)                                */
/* ------------------------------------------------------------------ */

export function CustomAlertProvider() {
  const { isOpen, config, close } = useAlertStore();

  if (!config) return null;

  const variant = config.variant ?? 'info';
  const { Icon, iconColor, bgColor, btnColor, btnHover } = variants[variant];
  const DisplayIcon = config.icon ?? Icon;

  const handleConfirm = async () => {
    await config.onConfirm?.();
    close();
  };

  const handleCancel = () => {
    config.onCancel?.();
    close();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={handleCancel}
          />

          {/* Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            className="relative w-full max-w-[420px] bg-white rounded-3xl shadow-2xl overflow-hidden"
          >
            {/* Top accent */}
            <div className={`h-1.5 w-full ${btnColor}`} />

            <div className="p-6 pt-7">
              {/* Icon */}
              <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl ${bgColor} mb-5`}>
                <DisplayIcon className={`w-7 h-7 ${iconColor}`} />
              </div>

              {/* Title */}
              <h3 className="text-xl font-black text-slate-800 mb-2 font-headline">
                {config.title}
              </h3>

              {/* Description */}
              {config.description && (
                <p className="text-[15px] text-slate-500 leading-relaxed mb-6">
                  {config.description}
                </p>
              )}

              {/* Actions */}
              <div className="flex gap-3">
                {!config.hideCancel && (
                  <button
                    onClick={handleCancel}
                    className="flex-1 px-5 py-3 rounded-xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 active:scale-[0.98] transition-all duration-200"
                  >
                    {config.cancelText ?? 'Bekor qilish'}
                  </button>
                )}
                <button
                  onClick={handleConfirm}
                  className={`flex-1 px-5 py-3 rounded-xl font-bold text-white ${btnColor} ${btnHover} active:scale-[0.98] shadow-lg transition-all duration-200`}
                >
                  {config.confirmText ?? 'Tasdiqlash'}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
