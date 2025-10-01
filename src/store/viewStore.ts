import { create } from 'zustand';

type AppView = 'start' | 'scene' | 'cards' | 'result';

interface AppViewState {
  view: AppView;
  setView: (next: AppView) => void;
}

interface LoadingState {
  progress: number;
  loaded: boolean;
  setProgress: (progress: number) => void;
  setLoaded: (loaded: boolean) => void;
}

export const useAppViewStore = create<AppViewState & LoadingState>((set) => ({
  view: 'start',
  progress: 0,
  loaded: false,
  setView: (next) => set({ view: next }),
  setProgress: (progress) => set({ progress }),
  setLoaded: (loaded) => set({ loaded })
}));


