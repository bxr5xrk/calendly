import { Label, useLabelsStore } from '@entities/Label';
import { LabelRounded } from '@entities/Label/ui/LabelItem/LabelRounded';
import { useTasksStore } from '@entities/Task';
import { Dialog } from '@headlessui/react';
import { Button } from '@shared/ui/Button';
import { Input } from '@shared/ui/Input';
import { Modal } from '@shared/ui/Modal';
import { useRef, useState } from 'react';
import { createTask } from '../../lib/createTask';
import { useCreateTaskModalStore } from '../../model/store/modalStore';

export function CreateTaskModal() {
  const { open, setOpen, date, setDate } = useCreateTaskModalStore();

  const { labels } = useLabelsStore();

  const { onAppend } = useTasksStore();
  const [selectedLabels, setSelectedLabels] = useState<Label[]>([]);
  const taskNameRef = useRef<HTMLInputElement>(null);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (taskNameRef.current) {
      const title = taskNameRef.current.value.trim();

      if (!title || !date) {
        return null;
      }

      const newTask = createTask({ day: date, title, labels: selectedLabels });

      onAppend(newTask);

      // reset
      taskNameRef.current.value = '';
      setOpen(false);
      setDate(null);
      setSelectedLabels([]);
    }
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
    <Modal open={open} setOpen={setOpen}>
      <form onSubmit={onSubmit} className="space-y-5">
        <Dialog.Title
          as="h3"
          className="text-lg font-medium leading-6 text-gray-900"
        >
          Create task
        </Dialog.Title>

        <p className="text-sm text-gray-500">{date}</p>

        <Input
          name="task-name"
          required
          minLength={2}
          ref={taskNameRef}
          placeholder="New task name..."
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
                  : i.color,
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
            Create
          </Button>
        </div>
      </form>
    </Modal>
  );
}
