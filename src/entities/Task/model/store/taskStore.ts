import { create } from 'zustand';
import { Task } from '../../../../widgets/Calendar/model/types/calendar';

interface TasksState {
  tasks: Task[];
  setTasks: (data: Task[]) => void;
}

export const useTasksStore = create<TasksState>()((set) => ({
  tasks: [
    {
      id: '3456789987',
      day: '2023-07-10',
      title: 'some title',
      labels: [
        {
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
          color: 'blue',
        },
      ],
    },
  ],
  setTasks: (data) => set(() => ({ tasks: data })),
}));
