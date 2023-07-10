import { closestCenter, DndContext, DragEndEvent } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { usePublicEvents } from '@entities/PublicEvent';
import { useTasksStore } from '@entities/Task';
import { FilteredTasksByLabel } from '@widgets/Calendar/lib/useFilteredTasks';
import * as dayjs from 'dayjs';
import { Day } from '../../../Day/ui/Day';
import {
  getCurrentDaysInMonth,
  isDateInCurrentMonth,
} from '../../lib/monthUtils';
import { MonthHeader } from '../MonthHeader/MonthHeader';

interface MonthProps {
  day: dayjs.Dayjs;
}

function splitArray(arr: dayjs.Dayjs[]) {
  const result = [];
  const chunkSize = 7;

  for (let i = 0; i < arr.length; i += chunkSize) {
    result.push(arr.slice(i, i + chunkSize));
  }

  // Pad the last array with null values if needed
  // const lastArray = result[result.length - 1];
  // if (lastArray.length < chunkSize) {
  // const paddingLength = chunkSize - lastArray.length;
  // for (let i = 0; i < paddingLength; i++) {
  //   lastArray.push(null);
  // }
  // }

  return result;
}

export function Month({ day }: MonthProps) {
  const { tasks, setTasks } = useTasksStore();
  const days = getCurrentDaysInMonth(day);

  const { data: publicEvents } = usePublicEvents();

  const weeks = splitArray(days);

  const onDragEnd = (e: DragEndEvent) => {
    const active = e.active;
    const over = e.over;

    const activeId = active.id;

    const overId = over?.id;

    if (!overId) {
      return null;
    }

    // sorting
    if (active.data.current?.isTask && over.data.current?.isTask) {
      if (active.id !== over.id) {
        const oldIndex = tasks.findIndex((i) => i.id === active.id);
        const newIndex = tasks.findIndex((i) => i.id === over.id);

        setTasks(arrayMove(tasks, oldIndex, newIndex));
      } else {
        return null;
      }
    }

    // dragging
    if (over.data.current?.isDay) {
      setTasks(
        tasks.map((task) => {
          if (task.id === activeId) {
            return { ...task, day: String(over.id) };
          }
          return task;
        })
      );
    }
  };

  return (
    <table className="w-full">
      <MonthHeader />

      <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
        <tbody>
          {weeks.map((week, index) => (
            <tr key={index} className="text-center h-20">
              {week.map((date) => {
                const matchTasks = tasks.filter((task) =>
                  dayjs(task.day).isSame(date)
                );

                const filteredTasks = FilteredTasksByLabel(matchTasks);

                const matchPublicEvents =
                  publicEvents?.filter((event) =>
                    dayjs(event.date).isSame(date)
                  ) ?? [];

                return (
                  <Day
                    isCurrentMonth={isDateInCurrentMonth(date, day)}
                    day={date}
                    key={date.format()}
                    tasks={filteredTasks}
                    publicEvents={matchPublicEvents}
                  />
                );
              })}
            </tr>
          ))}
        </tbody>

              
      </DndContext>
    </table>
  );
}
