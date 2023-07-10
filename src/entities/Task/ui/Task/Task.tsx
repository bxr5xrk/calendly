import { useDraggable } from '@dnd-kit/core';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Label, ListLabelsReadonly } from '@entities/Label';
import { useTasksStore } from '@entities/Task/model/store/taskStore';
import { Button } from '@shared/ui/Button';
import { XIcon } from 'lucide-react';
import { TaskId } from '../../model/types/task';

interface TaskProps {
  id: TaskId;
  date: string;
  title: string;
  labels: Label[];
}

export function Task({ id, date, title, labels }: TaskProps) {
  const { setTasks, tasks } = useTasksStore();

  const {
    attributes: attributesDrag,
    listeners: listenersDrag,
    setNodeRef: setNodeRefDrag,
    transform: transformDrag,
  } = useDraggable({
    id,
    data: { day: date },
  });

  const {
    attributes: attributesSort,
    listeners: listenersSort,
    setNodeRef: setNodeRefSort,
    transform: transformSort,
    transition,
  } = useSortable({ id, data: { isTask: true, labels, title } });

  const style = {
    opacity: transformDrag ? 0 : undefined,
    transform: CSS.Transform.toString(transformSort),
    transition,
    zIndex: 1000,
  };

  const onRemove = () => setTasks(tasks.filter((i) => i.id !== id));

  return (
    <div className="relative">
      <div
        ref={setNodeRefSort}
        style={style}
        {...attributesSort}
        {...listenersDrag}
        {...attributesDrag}
        {...listenersSort}
        className="text-gray-600 border-purple-200 bg-purple-100 border rounded p-1 text-sm mb-1"
      >
        <div
          className="group/item w-full h-full text-center"
          ref={setNodeRefDrag}
        >
          <ListLabelsReadonly labels={labels} />
          <span className="text-center">{title}</span>

          {/* remove button */}
          <Button
            className="absolute opacity-0 group-hover/item:opacity-100 hover:opacity-100 z-1 -top-2 -right-2 p-0.5 rounded-full bg-red-100 text-red-500"
            theme="clear"
            size="clear"
            onClick={onRemove}
          >
            <XIcon className="w-3 h-3 stroke-current" />
          </Button>
        </div>
      </div>
    </div>
  );
}
