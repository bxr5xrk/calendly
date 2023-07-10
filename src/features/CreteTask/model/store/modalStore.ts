import { create } from 'zustand';

interface ModalState {
  open: boolean;
  date: string | null;
  setOpen: (i: boolean) => void;
  setDate: (i: string | null) => void;
}

export const useCreateTaskModalStore = create<ModalState>()((set) => ({
  open: false,
  date: null,
  setOpen: (i) => set(() => ({ open: i })),
  setDate: (i) => set(() => ({ date: i })),
}));
