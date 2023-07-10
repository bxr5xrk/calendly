import { getTasksFromLS } from "./../../lib/LS";
import { saveTasksToLS } from '@entities/Task/lib/LS';
import { create } from 'zustand';
import { Task } from '../types/task';

const tasksFromLS = getTasksFromLS()

interface TasksState {
  tasks: Task[];
  setTasks: (data: Task[]) => void;
  onAppend: (task: Task) => void;
  draggableTask: Task | null;
  setDraggableTask: (i: Task | null) => void;
}

export const useTasksStore = create<TasksState>()((set) => ({
  tasks: tasksFromLS ?? [],
  draggableTask: null,
  setDraggableTask: (data) => set(() => ({ draggableTask: data })),
  setTasks: (data) =>
    set(() => {
      saveTasksToLS(data);

      return { tasks: data };
    }),
  onAppend: (task) =>
    set((state) => {
      saveTasksToLS([...state.tasks, task]);

      return { tasks: [...state.tasks, task] };
    }),
}));
