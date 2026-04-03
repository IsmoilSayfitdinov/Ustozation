import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AppRouter from './routes/AppRouter';
import ErrorBoundary from './components/ui/ErrorBoundary';
import './i18n';
import './index.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: true,
      refetchOnMount: true,
      staleTime: 0, // Har doim yangi data — CRUD darhol ko'rinadi
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <AppRouter />
    </QueryClientProvider>
  </ErrorBoundary>
);
