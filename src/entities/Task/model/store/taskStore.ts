import { create } from 'zustand';
import { Task } from '../types/task';

interface TasksState {
  tasks: Task[];
  setTasks: (data: Task[]) => void;
  onAppend: (task: Task) => void;
  draggableTask: Task | null;
  setDraggableTask: (i: Task | null) => void;
}

export const useTasksStore = create<TasksState>()((set) => ({
  tasks: [],
  draggableTask: null,
  setDraggableTask: (data) => set(() => ({ draggableTask: data })),
  setTasks: (data) => set(() => ({ tasks: data })),
  onAppend: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
}));
