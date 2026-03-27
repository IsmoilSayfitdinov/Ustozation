import { create } from 'zustand';

interface AppState {
  isServerError: boolean;
  setServerError: (isError: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  isServerError: false,
  setServerError: (isError: boolean) => set({ isServerError: isError }),
}));
