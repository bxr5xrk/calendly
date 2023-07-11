import { Task } from '@entities/Task';
import { nanoid } from '@shared/lib/nanoid';

type CreateTaskProps = Omit<Task, 'id'>;

export const createTask = (data: CreateTaskProps): Task => ({
  ...data,
  id: nanoid(8)
});
