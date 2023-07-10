import { create } from 'zustand';
import { Task } from '../types/task';

interface TasksState {
  tasks: Task[];
  setTasks: (data: Task[]) => void;
  onAppend: (task: Task) => void;
}

export const useTasksStore = create<TasksState>()((set) => ({
  tasks: [
    {
      id: '3456789987',
      day: '2023-07-10',
      title: 'some title',
      labels: [
        {
          title: 'title 1',
          color: 'red',
        },
      ],
    },
    {
      id: '8765432345',
      day: '2023-07-10',
      title: 'some title 2',
      labels: [
        {
          title: 'title 2',
          color: 'blue',
        },
      ],
    },
  ],
  setTasks: (data) => set(() => ({ tasks: data })),
  onAppend: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
}));
