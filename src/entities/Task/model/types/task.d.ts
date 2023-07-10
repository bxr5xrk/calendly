import { Label } from '@entities/Label';

export interface Task {
  id: TaskId;
  day: string;
  title: string;
  labels: Label[];
}

export type TaskId = string;
