import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useEffect } from 'react';
import { Toaster, toast } from 'sonner';
import { publicRoutes } from './public.routes';
import { privateRoutes } from './private.routes';
import { useNetworkStatus } from '../hooks/useNetworkStatus';
import { useAppStore } from '../store/useAppStore';
import NotFound from '../pages/public/NotFound';
import ServerError from '../pages/public/ServerError';
import { Wifi, WifiOff } from 'lucide-react';
import { CustomAlertProvider } from '../components/ui/CustomAlert';
import { useThemeStore } from '../store/useThemeStore';

const router = createBrowserRouter([
  ...publicRoutes,
  ...privateRoutes,
  {
    path: '*',
    element: <NotFound />,
  },
]);

const AppRouter = () => {
  const { isOnline, isInitial } = useNetworkStatus();
  const { isServerError } = useAppStore();
  const initThemeListener = useThemeStore((s) => s.initListener);

  useEffect(() => {
    const cleanup = initThemeListener();
    return cleanup;
  }, [initThemeListener]);

  useEffect(() => {
    if (!isOnline) {
      toast.error("Internet ulanishi uzildi", {
        description: "Iltimos, internetingizni tekshiring.",
        icon: <WifiOff className="w-5 h-5 text-red-500" />,
        duration: Infinity,
        id: "network-status",
      });
    } else if (!isInitial) {
      toast.dismiss("network-status");
      toast.success("Internet tiklandi", {
        description: "Siz yana onlaynsiz.",
        icon: <Wifi className="w-5 h-5 text-green-500" />,
        duration: 3000,
      });
    }
  }, [isOnline]);

  if (isServerError) {
    return <ServerError />;
  }

  return (
    <>
      <Toaster 
        position="top-right" 
        expand={false} 
        richColors 
        closeButton
        toastOptions={{
          classNames: {
            toast: 'bg-white/80 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl p-4',
            title: 'font-bold text-slate-800',
            description: 'text-slate-500 font-medium',
          },
        }}
      />
      <CustomAlertProvider />
      <RouterProvider router={router} />
    </>
  );
};

export default AppRouter;
