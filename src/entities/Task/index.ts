import { Task, TaskId } from './model/types/task.d';
import { useTasksStore } from './model/store/taskStore';
import { Task as TaskItem } from './ui/Task/Task';

export type { TaskId, Task };

export { TaskItem, useTasksStore };
