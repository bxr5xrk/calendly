import { useDraggable } from '@dnd-kit/core';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useTasksStore } from '@entities/Task/model/store/taskStore';
import { Button } from '@shared/ui/Button';
import { XIcon } from 'lucide-react';
import { TaskId } from '../../model/types/task';

interface TaskProps {
  id: TaskId;
  date: string;
  title: string;
}

export function Task({ id, date, title }: TaskProps) {
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
  } = useSortable({ id, data: { isTask: true } });

  const style = {
    transform: transformDrag
      ? `translate3d(${transformDrag.x}px, ${transformDrag.y}px, 0)`
      : CSS.Transform.toString(transformSort),
    transition,
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
        className="peer bg-purple-400 text-white rounded p-1 text-sm mb-1"
      >
        <div className="w-full h-full" ref={setNodeRefDrag}>
          <span className="">{title}</span>
          <span className="time">{date}</span>
        </div>
      </div>
      <Button
        className="absolute opacity-0 peer-hover:opacity-100 hover:opacity-100 z-1 -top-2 -right-2 p-0.5 rounded-full bg-red-100 text-red-500"
        theme="clear"
        size="clear"
        onClick={onRemove}
      >
        <XIcon className="w-3 h-3 stroke-current" />
      </Button>
    </div>
  );
}
