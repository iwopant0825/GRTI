import { create } from 'zustand';

type AppView = 'scene' | 'cards' | 'result';

interface AppViewState {
  view: AppView;
  setView: (next: AppView) => void;
}

export const useAppViewStore = create<AppViewState>((set) => ({
  view: 'scene',
  setView: (next) => set({ view: next })
}));


