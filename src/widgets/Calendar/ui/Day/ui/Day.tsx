import { useDraggable, useDroppable } from '@dnd-kit/core';
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Dayjs } from 'dayjs';
import { PublicEvent } from '../../../model/service/publicEvents';
import { type Task, TaskId } from '../../../model/types/calendar';

interface DayProps {
  day: Dayjs;
  tasks: Task[];
  publicEvents: PublicEvent[];
}

export function Day({ day, tasks, publicEvents }: DayProps) {
  const { isOver, setNodeRef } = useDroppable({
    id: day.format('YYYY-MM-DD'),
    data: { isPlette: true },
  });

  return (
    <td
      ref={setNodeRef}
      style={{
        borderColor: isOver ? 'green' : undefined,
        backgroundColor: isOver ? 'green' : undefined,
      }}
      className="border p-1 h-40 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 overflow-visible transition cursor-pointer duration-500 ease hover:bg-gray-300"
    >
      <div className="flex flex-col h-40 xl:w-40 lg:w-30 md:w-30 sm:w-full w-10 mx-auto overflow-visible">
        <div className="top h-5 w-full">
          <span className="text-gray-500 text-sm">{day.date()}</span>
        </div>
        <div className="bottom flex-grow py-1 w-full cursor-pointer"></div>
      </div>

      <div className="bottom flex-grow py-1 w-full cursor-pointer">
        <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
          {tasks.map((i) => (
            <Task key={i.id} id={i.id} date={i.day} title={i.title} />
          ))}
        </SortableContext>

        {publicEvents.map((i) => (
          <div className="event bg-purple-400 text-white rounded p-1 text-sm mb-1">
            <div className="w-full h-full">
              <span className="event-name">{i.name}</span>
              <span className="time">{i.date}</span>
            </div>
          </div>
        ))}
      </div>
    </td>
  );
}

interface TaskProps {
  id: TaskId;
  date: string;
  title: string;
}

function Task({ id, date, title }: TaskProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
    data: { day: date },
  });

  const {
    attributes: attr,
    listeners: list,
    setNodeRef: setNode,
    transform: trans,
    transition,
  } = useSortable({ id, data: { isDay: true } });

  const style2 = {
    transform: CSS.Transform.toString(trans),
    transition,
  };

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <div
      ref={setNode}
      style={{ ...style2, ...style }}
      {...attr}
      {...listeners}
      {...attributes}
      {...list}
      className="event bg-purple-400 text-white rounded p-1 text-sm mb-1"
    >
      <div className="w-full h-full" ref={setNodeRef}>
        <span className="event-name">{title}</span>
        <span className="time">{date}</span>
      </div>
    </div>
  );
}
