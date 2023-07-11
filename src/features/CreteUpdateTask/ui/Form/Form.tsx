import { Label, useLabelsStore } from '@entities/Label';
import { LabelRounded } from '@entities/Label/ui/LabelItem/LabelRounded';
import { Task } from '@entities/Task';
import { Dialog } from '@headlessui/react';
import { Button } from '@shared/ui/Button';
import { Input } from '@shared/ui/Input';
import { useState } from 'react';

interface FormProps {
  handleSubmit: (i: Omit<Task, 'id'>) => void;
  initialTaskData: Omit<Task, 'id'>;
  title: string;
  buttonTitle: string;
}

export function Form({
  initialTaskData,
  handleSubmit,
  title,
  buttonTitle
}: FormProps) {
  const [taskName, setTaskName] = useState(initialTaskData.title);

  const date = initialTaskData.day;

  const { labels } = useLabelsStore();
  const [selectedLabels, setSelectedLabels] = useState<Label[]>([
    ...initialTaskData.labels
  ]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    handleSubmit({
      title: taskName,
      labels: selectedLabels,
      day: date
    });

    // reset
    setTaskName('');
    setSelectedLabels([]);
  };

  const onToggleLabel = (label: Label) => {
    const isExists = selectedLabels.map((i) => i.id).includes(label.id);

    if (isExists) {
      setSelectedLabels((prev) => prev.filter((i) => i.id !== label.id));
    } else {
      setSelectedLabels((prev) => [...prev, label]);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <Dialog.Title
        as="h3"
        className="text-lg font-medium leading-6 text-gray-900"
      >
        {title}
      </Dialog.Title>

      <p className="text-sm text-gray-500">{date}</p>

      <Input
        name="task-name"
        required
        minLength={2}
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        placeholder="Task name..."
        className="mt-2"
      />

      <div className="flex gap-2 flex-wrap mt-2">
        {labels.map((i) => (
          <LabelRounded
            onClick={() => onToggleLabel(i)}
            style={{
              backgroundColor: selectedLabels.map((i) => i.id).includes(i.id)
                ? i.color
                : `${i.color}10`,
              border: `1px solid ${i.color}`,
              color: selectedLabels.map((i) => i.id).includes(i.id)
                ? 'white'
                : i.color
            }}
            key={i.id}
          >
            {i.title}
          </LabelRounded>
        ))}
      </div>

      <div className="mt-4">
        <Button
          className="w-full border border-gray-300 hover:bg-gray-100 transition"
          theme="ghost"
          type="submit"
        >
          {buttonTitle}
        </Button>
      </div>
    </form>
  );
}
