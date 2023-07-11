import { Task } from '@entities/Task';
import { create } from 'zustand';

type PartialExcept<T, Keys extends keyof T> = Partial<Omit<T, Keys>> &
  Pick<T, Keys>;

type PartialTaskParams = PartialExcept<Task, 'day'>;

interface ModalState {
  taskParams: PartialTaskParams | null;
  setTaskParams: (i: PartialTaskParams) => void;
  onReset: VoidFunction;
}

export const useTaskModalStore = create<ModalState>()((set) => ({
  taskParams: null,
  setTaskParams: (i) => set(() => ({ taskParams: i })),
  onReset: () => set(() => ({ taskParams: null }))
}));
