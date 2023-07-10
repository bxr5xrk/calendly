import { Task } from '@entities/Task';
import { useSearchStore } from '@features/TaskSearch';

export const FilteredTasksBySearch = (tasks: Task[]) => {
  const { query } = useSearchStore();

  if (!query.trim().length) {
    return tasks;
  }

  return tasks.filter((i) => i.title.includes(query));
};
