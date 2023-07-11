import { useDraggable } from '@dnd-kit/core';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Label, ListLabelsReadonly } from '@entities/Label';
import { useTasksStore } from '@entities/Task/model/store/taskStore';
import { useTaskModalStore } from '@features/CreteUpdateTask';
import { Button } from '@shared/ui/Button';
import { Edit2Icon, GripVertical, XIcon } from 'lucide-react';
import { TaskId } from '../../model/types/task';

interface TaskProps {
  id: TaskId;
  date: string;
  title: string;
  labels: Label[];
}

export function Task({ id, date, title, labels }: TaskProps) {
  const { setTasks, tasks } = useTasksStore();
  const { setTaskParams } = useTaskModalStore();

  const {
    attributes: attributesDrag,
    listeners: listenersDrag,
    setNodeRef: setNodeRefDrag,
    transform: transformDrag
  } = useDraggable({
    id,
    data: { day: date }
  });

  const {
    attributes: attributesSort,
    listeners: listenersSort,
    setNodeRef: setNodeRefSort,
    transform: transformSort,
    transition
  } = useSortable({ id, data: { isTask: true, labels, title } });

  const style = {
    opacity: transformDrag ? 0 : undefined,
    transform: CSS.Transform.toString(transformSort),
    transition,
    zIndex: 1000
  };

  const onEdit = () => {
    setTaskParams({
      id,
      day: date,
      title,
      labels
    });
  };

  const onRemove = () => setTasks(tasks.filter((i) => i.id !== id));

  return (
    <div className="group/item relative">
      <div
        ref={setNodeRefSort}
        style={style}
        {...attributesSort}
        {...listenersSort}
        className="text-gray-600 flex items-center border-purple-200 bg-purple-100 border rounded p-1 text-sm mb-1"
      >
        <span {...listenersDrag} {...attributesDrag} ref={setNodeRefDrag}>
          <GripVertical className="w-5 h-5" />
        </span>

        <div className="w-full h-full text-left">
          <ListLabelsReadonly labels={labels} />
          <span>{title}</span>
        </div>
      </div>

      {/* edit */}
      <span className="absolute top-0 bottom-0 right-1 flex items-center">
        <Button
          onClick={onEdit}
          className="text-gray-500 bg-purple-100 w-5 h-5 rounded-full opacity-0 group-hover/item:opacity-100 transition"
        >
          <Edit2Icon className="w-4 h-4" />
        </Button>
      </span>

      {/* remove */}
      <Button
        className="absolute opacity-0 group-hover/item:opacity-100 hover:opacity-100 transition-all p-1 z-1 -top-2 -right-2 rounded-full bg-red-100 text-red-500"
        theme="clear"
        size="clear"
        onClick={onRemove}
      >
        <XIcon className="w-3 h-3 stroke-current" />
      </Button>
    </div>
  );
}
