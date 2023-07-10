export interface Task {
  id: TaskId;
  day: string;
  title: string;
  labels: Label[];
}

export type TaskId = string;

export interface Label {
  color: string;
}
