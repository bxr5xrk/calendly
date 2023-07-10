import { Task, useTasksStore } from '@entities/Task';
import { Button } from '@shared/ui/Button';
import { Download } from 'lucide-react';

const exportJsonToFile = (data: Task[], filename: string) => {
  const jsonData = JSON.stringify(data);
  const blob = new Blob([jsonData], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();

  URL.revokeObjectURL(url);
};

export function ExportTasks() {
  const { tasks } = useTasksStore();

  const onDownload = () => {
    const data = [...tasks];
    exportJsonToFile(data, 'data.json');
  };

  return tasks.length ? (
    <Button onClick={onDownload}>
      <Download className="h-5 w-5" />
    </Button>
  ) : null;
}
