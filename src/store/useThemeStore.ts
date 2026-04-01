import { create } from 'zustand';

type Theme = 'light' | 'dark' | 'system';

interface ThemeState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  isDark: () => boolean;
  initListener: () => () => void;
}

function getSystemDark() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

function resolveTheme(theme: Theme): boolean {
  if (theme === 'system') return getSystemDark();
  return theme === 'dark';
}

function applyTheme(dark: boolean) {
  document.documentElement.classList.toggle('dark', dark);
}

const saved = (localStorage.getItem('theme') as Theme) || 'light';
applyTheme(resolveTheme(saved));

export const useThemeStore = create<ThemeState>((set, get) => ({
  theme: saved,

  setTheme: (theme) => {
    localStorage.setItem('theme', theme);
    applyTheme(resolveTheme(theme));
    set({ theme });
  },

  toggleTheme: () => {
    const current = get().theme;
    const next = resolveTheme(current) ? 'light' : 'dark';
    localStorage.setItem('theme', next);
    applyTheme(next === 'dark');
    set({ theme: next });
  },

  isDark: () => resolveTheme(get().theme),

  // Call from App-level useEffect — returns cleanup function
  initListener: () => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => {
      if (get().theme === 'system') {
        applyTheme(getSystemDark());
      }
    };
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  },
}));
