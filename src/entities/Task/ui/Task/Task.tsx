import { useDraggable } from '@dnd-kit/core';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { TaskId } from '../../model/types/task';

interface TaskProps {
  id: TaskId;
  date: string;
  title: string;
}

export function Task({ id, date, title }: TaskProps) {
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

  return (
    <div
      ref={setNodeRefSort}
      style={style}
      {...attributesSort}
      {...listenersDrag}
      {...attributesDrag}
      {...listenersSort}
      className="bg-purple-400 text-white rounded p-1 text-sm mb-1"
    >
      <div className="w-full h-full" ref={setNodeRefDrag}>
        <span className="">{title}</span>
        <span className="time">{date}</span>
      </div>
    </div>
  );
}
