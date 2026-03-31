import { Component, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Bug, RefreshCw, Home, Copy, ChevronDown, ChevronUp } from 'lucide-react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  showDetails: boolean;
  copied: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      showDetails: false,
      copied: false,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return { hasError: true, error };
  }

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  handleCopyError = () => {
    if (this.state.error) {
      const errorText = `${this.state.error.name}: ${this.state.error.message}\n\n${this.state.error.stack || ''}`;
      navigator.clipboard.writeText(errorText);
      this.setState({ copied: true });
      setTimeout(() => this.setState({ copied: false }), 2000);
    }
  };

  toggleDetails = () => {
    this.setState((prev) => ({ showDetails: !prev.showDetails }));
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      const { error, showDetails, copied } = this.state;

      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-6 overflow-hidden relative">
          {/* Background glow */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-500/8 blur-[120px] rounded-full" />
            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-primary/6 blur-[100px] rounded-full" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 text-center max-w-lg w-full"
          >
            {/* Animated Bug Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
              className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-red-50 border border-red-100 mb-8"
            >
              <motion.div
                animate={{ rotate: [0, -8, 8, -4, 0] }}
                transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
              >
                <Bug className="w-12 h-12 text-red-500" />
              </motion.div>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-3xl md:text-4xl font-black text-slate-800 mb-4 font-headline"
            >
              Kutilmagan xatolik yuz berdi
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-slate-500 text-lg mb-8 leading-relaxed"
            >
              Dasturda nosozlik yuz berdi. Sahifani qayta yuklang yoki bosh sahifaga qayting.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-3 justify-center mb-8"
            >
              <button
                onClick={this.handleReload}
                className="group flex items-center justify-center gap-2.5 px-7 py-3.5 bg-primary text-white rounded-2xl font-bold shadow-xl shadow-primary/25 hover:shadow-primary/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
              >
                <RefreshCw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
                Qayta yuklash
              </button>

              <button
                onClick={this.handleGoHome}
                className="group flex items-center justify-center gap-2.5 px-7 py-3.5 bg-white text-slate-700 rounded-2xl font-bold shadow-lg border border-slate-200 hover:bg-slate-50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
              >
                <Home className="w-5 h-5" />
                Bosh sahifa
              </button>
            </motion.div>

            {/* Error Details (Collapsible) */}
            {error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-left"
              >
                <button
                  onClick={this.toggleDetails}
                  className="flex items-center gap-2 text-sm text-slate-400 hover:text-slate-600 transition-colors mx-auto mb-3"
                >
                  {showDetails ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                  Texnik ma'lumotlar
                </button>

                {showDetails && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="relative bg-slate-900 rounded-2xl p-5 overflow-hidden"
                  >
                    <button
                      onClick={this.handleCopyError}
                      className="absolute top-3 right-3 p-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors"
                      title="Nusxa olish"
                    >
                      <Copy className="w-4 h-4 text-slate-400" />
                    </button>
                    {copied && (
                      <span className="absolute top-3.5 right-14 text-xs text-green-400 font-medium">
                        Nusxalandi!
                      </span>
                    )}
                    <p className="text-red-400 font-mono text-sm font-bold mb-2">
                      {error.name}: {error.message}
                    </p>
                    <pre className="text-slate-400 font-mono text-xs overflow-x-auto whitespace-pre-wrap max-h-48 overflow-y-auto leading-relaxed">
                      {error.stack}
                    </pre>
                  </motion.div>
                )}
              </motion.div>
            )}
          </motion.div>

          {/* Floating decorative elements */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -15, 0],
                rotate: [0, 5, -5, 0],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 4 + i * 0.8,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.5,
              }}
              className="absolute hidden md:block w-10 h-10 bg-white/60 backdrop-blur-md rounded-xl border border-slate-200/50 shadow-sm pointer-events-none"
              style={{
                top: `${15 + i * 18}%`,
                left: `${10 + i * 20}%`,
              }}
            />
          ))}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
