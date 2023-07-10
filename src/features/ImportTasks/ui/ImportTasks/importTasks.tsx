import { Task, useTasksStore } from '@entities/Task';
import { buttonVariants } from '@shared/ui/Button';
import { Upload } from 'lucide-react';
import { ChangeEvent } from 'react';

export function ImportTasks() {
  const { setTasks, tasks } = useTasksStore();

  const onUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const contents = e.target?.result as string;
        const parsedData = JSON.parse(contents) as Task[];
        setTasks([...tasks, ...parsedData]);
      };

      reader.readAsText(file);
    }
  };

  return (
    <div>
      <label
        className={buttonVariants({
          size: 'default',
          className: 'cursor-pointer',
        })}
        htmlFor="fileInput"
      >
        <Upload className="w-5 h-5" />
      </label>
      <input
        id="fileInput"
        type="file"
        onChange={onUpload}
        accept=".json"
        className="hidden"
      />
    </div>
  );
}
