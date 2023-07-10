import { useLabelsStore } from '@entities/Label';
import { Task } from '@entities/Task';

export const FilteredTasksByLabel = (tasks: Task[]) => {
  const { filterIds } = useLabelsStore();

  if (!filterIds.length) {
    return tasks;
  }

  return tasks.filter((task) =>
    task.labels.some((label) => filterIds.includes(label.id))
  );
};
