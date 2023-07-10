import { useDroppable } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { PublicEvent, PublicEventItem } from '@entities/PublicEvent';
import { Task, TaskItem } from '@entities/Task';
import { useCreateTaskModalStore } from '@features/CreteTask';
import { Button } from '@shared/ui/Button';
import { Dayjs } from 'dayjs';
import { PlusIcon } from 'lucide-react';

interface DayProps {
  day: Dayjs;
  tasks: Task[];
  publicEvents: PublicEvent[];
}

export function Day({ day, tasks, publicEvents }: DayProps) {
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
      style={{
        borderColor: isOver ? 'green' : undefined,
        backgroundColor: isOver ? 'green' : undefined,
      }}
      className="relative group border p-1 h-20 w-20 overflow-visible transition cursor-pointer duration-500 ease hover:bg-gray-300"
    >
      <Button
        onClick={onClickPlus}
        theme="ghost"
        className="absolute right-0 top-0 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <PlusIcon className="w-4 h-4" />
      </Button>

      <div className="flex flex-col h-20 w-20 mx-auto overflow-visible">
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
          <PublicEventItem name={i.name} date={i.date} />
        ))}
      </div>
    </td>
  );
}
