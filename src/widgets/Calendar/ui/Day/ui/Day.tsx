import { useDroppable } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { PublicEvent, PublicEventItem } from '@entities/PublicEvent';
import { Task, TaskItem } from '@entities/Task';
import { useCreateTaskModalStore } from '@features/CreteTask';
import { cl } from '@shared/lib/cl';
import { Button } from '@shared/ui/Button';
import { Dayjs } from 'dayjs';
import { PlusIcon } from 'lucide-react';

interface DayProps {
  day: Dayjs;
  tasks: Task[];
  publicEvents: PublicEvent[];
  isCurrentMonth: boolean;
}

export function Day({ day, tasks, publicEvents, isCurrentMonth }: DayProps) {
  const { setOpen, setDate } = useCreateTaskModalStore();

  const { isOver, setNodeRef } = useDroppable({
    id: day.format('YYYY-MM-DD'),
    data: { isDay: true },
  });

  const onClickPlus = () => {
    setOpen(true);
    setDate(day.format('YYYY-MM-DD'));
  };

  return (
    <td
      ref={setNodeRef}
      className={cl(
        'relative group border p-1 h-32 w-32 overflow-visible transition cursor-pointer duration-300 ease hover:bg-gray-50',
        !isCurrentMonth && 'bg-gray-100',
        isOver && 'bg-gray-300'
      )}
    >
      {/* add task button */}
      <Button
        onClick={onClickPlus}
        theme="ghost"
        className="absolute -right-2 top-0 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <PlusIcon className="w-4 h-4" />
      </Button>

      <div className="grid grid-cols-1 h-full grid-rows-autoFr">
        <div className=" mx-auto overflow-visible">
          <span className="text-gray-500 text-sm">{day.date()}</span>
        </div>

        <div className="bottom flex-grow py-1 w-full cursor-pointer">
          <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
            {tasks.map((i) => (
              <TaskItem
                key={i.id}
                id={i.id}
                date={i.day}
                title={i.title}
                labels={i.labels}
              />
            ))}
          </SortableContext>

          {publicEvents.map((i, index) => (
            <PublicEventItem key={index} name={i.name} />
          ))}
        </div>
      </div>
    </td>
  );
}
