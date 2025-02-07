import { create } from 'zustand';

interface IPageState {
  namePage: string;
  setNamePage: (path: string) => void;
}

export const usePageStore = create<IPageState>(set => ({
  namePage: '/',
  setNamePage: path => set({ namePage: path }),
}));
