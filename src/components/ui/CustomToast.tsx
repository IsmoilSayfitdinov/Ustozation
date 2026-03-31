import { toast as sonnerToast } from 'sonner';
import {
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Info,
  Loader2,
  type LucideIcon,
} from 'lucide-react';
import { type ReactNode } from 'react';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type ToastVariant = 'success' | 'error' | 'warning' | 'info';

interface ToastOptions {
  description?: string;
  duration?: number;
  action?: { label: string; onClick: () => void };
  icon?: ReactNode;
  position?: 'top-right' | 'top-left' | 'top-center' | 'bottom-right' | 'bottom-left' | 'bottom-center';
}

/* ------------------------------------------------------------------ */
/*  Config                                                             */
/* ------------------------------------------------------------------ */

const variantConfig: Record<
  ToastVariant,
  { Icon: LucideIcon; iconColor: string; accentColor: string; borderColor: string; bgColor: string }
> = {
  success: {
    Icon: CheckCircle2,
    iconColor: 'text-emerald-500',
    accentColor: 'bg-emerald-500',
    borderColor: 'border-emerald-100',
    bgColor: 'bg-emerald-50',
  },
  error: {
    Icon: XCircle,
    iconColor: 'text-red-500',
    accentColor: 'bg-red-500',
    borderColor: 'border-red-100',
    bgColor: 'bg-red-50',
  },
  warning: {
    Icon: AlertTriangle,
    iconColor: 'text-amber-500',
    accentColor: 'bg-amber-500',
    borderColor: 'border-amber-100',
    bgColor: 'bg-amber-50',
  },
  info: {
    Icon: Info,
    iconColor: 'text-blue-500',
    accentColor: 'bg-blue-500',
    borderColor: 'border-blue-100',
    bgColor: 'bg-blue-50',
  },
};

/* ------------------------------------------------------------------ */
/*  Render helper                                                      */
/* ------------------------------------------------------------------ */

function renderToast(variant: ToastVariant, title: string, opts: ToastOptions = {}) {
  const { Icon, iconColor, accentColor, borderColor, bgColor } = variantConfig[variant];

  return sonnerToast.custom(
    (id) => (
      <div
        className={`relative overflow-hidden w-[380px] rounded-2xl border ${borderColor} bg-white/90 backdrop-blur-xl shadow-2xl shadow-black/8`}
      >
        {/* Accent bar */}
        <div className={`absolute top-0 left-0 w-full h-1 ${accentColor}`} />

        <div className="flex items-start gap-3.5 p-4 pt-5">
          {/* Icon */}
          <div className={`flex-shrink-0 p-2 rounded-xl ${bgColor}`}>
            {opts.icon || <Icon className={`w-5 h-5 ${iconColor}`} />}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <p className="text-[15px] font-bold text-slate-800 leading-snug">{title}</p>
            {opts.description && (
              <p className="text-[13px] text-slate-500 mt-1 leading-relaxed">{opts.description}</p>
            )}
            {opts.action && (
              <button
                onClick={() => {
                  opts.action!.onClick();
                  sonnerToast.dismiss(id);
                }}
                className={`mt-3 text-[13px] font-bold ${iconColor} hover:underline underline-offset-2 transition-all`}
              >
                {opts.action.label}
              </button>
            )}
          </div>

          {/* Close */}
          <button
            onClick={() => sonnerToast.dismiss(id)}
            className="flex-shrink-0 p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <XCircle className="w-4 h-4" />
          </button>
        </div>
      </div>
    ),
    {
      duration: opts.duration ?? 4000,
      position: opts.position ?? 'top-right',
    },
  );
}

/* ------------------------------------------------------------------ */
/*  Public API                                                         */
/* ------------------------------------------------------------------ */

export const customToast = {
  success: (title: string, opts?: ToastOptions) => renderToast('success', title, opts),
  error: (title: string, opts?: ToastOptions) => renderToast('error', title, opts),
  warning: (title: string, opts?: ToastOptions) => renderToast('warning', title, opts),
  info: (title: string, opts?: ToastOptions) => renderToast('info', title, opts),

  /** Loading toast — returns an id you can dismiss later */
  loading: (title: string, opts?: Omit<ToastOptions, 'action'>) => {
    return sonnerToast.custom(
      (id) => (
        <div className="relative overflow-hidden w-[380px] rounded-2xl border border-primary/10 bg-white/90 backdrop-blur-xl shadow-2xl shadow-black/8">
          <div className="absolute top-0 left-0 w-full h-1 bg-primary overflow-hidden">
            <div className="h-full w-1/2 bg-white/40 animate-[shimmer_1.5s_infinite]" />
          </div>
          <div className="flex items-start gap-3.5 p-4 pt-5">
            <div className="flex-shrink-0 p-2 rounded-xl bg-primary/10">
              <Loader2 className="w-5 h-5 text-primary animate-spin" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[15px] font-bold text-slate-800 leading-snug">{title}</p>
              {opts?.description && (
                <p className="text-[13px] text-slate-500 mt-1 leading-relaxed">
                  {opts.description}
                </p>
              )}
            </div>
            <button
              onClick={() => sonnerToast.dismiss(id)}
              className="flex-shrink-0 p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <XCircle className="w-4 h-4" />
            </button>
          </div>
        </div>
      ),
      {
        duration: opts?.duration ?? Infinity,
        position: opts?.position ?? 'top-right',
      },
    );
  },

  /** Promise-based toast: shows loading → success/error */
  promise: <T,>(
    promise: Promise<T>,
    msgs: { loading: string; success: string; error: string },
    opts?: ToastOptions,
  ) => {
    const id = customToast.loading(msgs.loading, opts);
    promise
      .then(() => {
        sonnerToast.dismiss(id);
        customToast.success(msgs.success, opts);
      })
      .catch(() => {
        sonnerToast.dismiss(id);
        customToast.error(msgs.error, opts);
      });
    return id;
  },

  dismiss: sonnerToast.dismiss,
};
