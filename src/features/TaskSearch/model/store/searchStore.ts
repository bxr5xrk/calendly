import { create } from 'zustand';

interface SearchState {
  query: string;
  setQuery: (i: string) => void;
}

export const useSearchStore = create<SearchState>()((set) => ({
  query: '',
  setQuery: (data) => set(() => ({ query: data })),
}));
