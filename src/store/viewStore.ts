import { create } from 'zustand';

type AppView = 'start' | 'scene' | 'cards' | 'result';

interface AppViewState {
  view: AppView;
  setView: (next: AppView) => void;
}

export const useAppViewStore = create<AppViewState>((set) => ({
  view: 'start',
  setView: (next) => set({ view: next })
}));


