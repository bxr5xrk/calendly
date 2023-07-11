import { Task, useTasksStore } from '@entities/Task';
import { Modal } from '@shared/ui/Modal';
import { createTask } from '../../lib/createTask';
import { useTaskModalStore } from '../../model/store/modalStore';
import { Form } from '../Form/Form';

export function TaskModal() {
  const { taskParams, onReset } = useTaskModalStore();

  const { onAppend, setTasks, tasks } = useTasksStore();

  const onOpen = () => onReset();

  const open = !!taskParams;

  const isNewTask = taskParams ? !('id' in taskParams) : false;

  const onSubmit = (data: Omit<Task, 'id'>) => {
    if (isNewTask) {
      const newTask = createTask({ ...data });

      onAppend(newTask);
    } else {
      setTasks(
        tasks.map((task) => {
          if (taskParams?.id === task.id) {
            return { ...task, ...data };
          }

          return task;
        })
      );
    }

    onReset();
  };

  return (
    <Modal open={open} setOpen={onOpen}>
      <Form
        handleSubmit={onSubmit}
        initialTaskData={{
          labels: taskParams?.labels ?? [],
          title: taskParams?.title ?? '',
          day: taskParams?.day ?? '',
        }}
        title={isNewTask ? 'Create task' : 'Update task'}
        buttonTitle={isNewTask ? 'Create' : 'Update'}
      />
    </Modal>
  );
}
