import { useDroppable } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { PublicEvent } from '@entities/PublicEvent';
import { Task, TaskItem } from '@entities/Task';
import { Dayjs } from 'dayjs';

interface DayProps {
  day: Dayjs;
  tasks: Task[];
  publicEvents: PublicEvent[];
}

export function Day({ day, tasks, publicEvents }: DayProps) {
  const { isOver, setNodeRef } = useDroppable({
    id: day.format('YYYY-MM-DD'),
    data: { isDay: true },
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
            <TaskItem key={i.id} id={i.id} date={i.day} title={i.title} />
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
