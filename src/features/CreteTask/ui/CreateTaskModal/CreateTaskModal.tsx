import { useTasksStore } from '@entities/Task';
import { Dialog } from '@headlessui/react';
import { Button } from '@shared/ui/Button';
import { Input } from '@shared/ui/Input';
import { Modal } from '@shared/ui/Modal';
import { useRef } from 'react';
import { createTask } from '../../lib/createTask';
import { useCreateTaskModalStore } from '../../model/store/modalStore';

export function CreateTaskModal() {
  const { open, setOpen, date, setDate } = useCreateTaskModalStore();

  const { onAppend } = useTasksStore();

  const taskNameRef = useRef<HTMLInputElement>(null);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (taskNameRef.current) {
      const title = taskNameRef.current.value.trim();

      if (!title || !date) {
        return null;
      }

      const newTask = createTask({ day: date, title, labels: [] });

      onAppend(newTask);

      // reset
      taskNameRef.current.value = '';
      setOpen(false);
      setDate(null);
    }
  };

  return (
    <Modal open={open} setOpen={setOpen}>
      <form onSubmit={onSubmit}>
        <Dialog.Title
          as="h3"
          className="text-lg font-medium leading-6 text-gray-900"
        >
          Create task
        </Dialog.Title>

        <p className="text-sm text-gray-500">{date}</p>

        <div className="mt-2">
          <Input
            required
            minLength={2}
            ref={taskNameRef}
            placeholder="New task name..."
          />
        </div>

        <div className="mt-4">
          <Button className="w-full" theme="ghost" type="submit">
            Create
          </Button>
        </div>
      </form>
    </Modal>
  );
}
