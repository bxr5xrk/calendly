import { Task } from '../model/types/task';

const LS_KEY = 'calendar-tasks';

export const saveTasksToLS = (tasks: Task[]) =>
  localStorage.setItem(LS_KEY, JSON.stringify(tasks));

export const getTasksFromLS = (): Task[] | null =>
  JSON.parse(localStorage.getItem(LS_KEY) || 'null') as Task[] | null;
