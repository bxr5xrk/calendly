import {
  closestCenter,
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
} from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { Label } from '@entities/Label';
import { usePublicEvents } from '@entities/PublicEvent';
import { TaskItem, useTasksStore } from '@entities/Task';
import { FilteredTasksBySearch } from '@widgets/Calendar/lib/FilteredTasksBySearch';
import { splitArray } from '@widgets/Calendar/lib/splitArray';
import { FilteredTasksByLabel } from '@widgets/Calendar/lib/FilteredTasksByLabel';
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

export function Month({ day }: MonthProps) {
  const { tasks, setTasks, draggableTask, setDraggableTask } = useTasksStore();
  const days = getCurrentDaysInMonth(day);
  const { data: publicEvents } = usePublicEvents();

  const weeks = splitArray(days);

  const onDragEnd = (e: DragEndEvent) => {
    setDraggableTask(null);

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

  const onDragStart = (e: DragStartEvent) => {
    setDraggableTask({
      id: String(e.active.id),
      labels: e.active.data.current?.labels as Label[],
      title: e.active.data.current?.title as string,
      day: e.active.data.current?.day as string,
    });
  };

  return (
    <table className="w-full">
      <MonthHeader />

      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={onDragEnd}
        onDragStart={onDragStart}
      >
        <tbody>
          {weeks.map((week, index) => (
            <tr key={index} className="text-center h-20">
              {week.map((date) => {
                const matchTasks = tasks.filter(
                  (task) => task.day === date.format('YYYY-MM-DD')
                );

                const filteredTasks = FilteredTasksByLabel(matchTasks);

                const filteredBySearch = FilteredTasksBySearch(filteredTasks);

                const matchPublicEvents =
                  publicEvents?.filter((event) =>
                    dayjs(event.date).isSame(date)
                  ) ?? [];

                return (
                  <Day
                    isCurrentMonth={isDateInCurrentMonth(date, day)}
                    day={date}
                    key={date.format()}
                    tasks={filteredBySearch}
                    publicEvents={matchPublicEvents}
                  />
                );
              })}
            </tr>
          ))}
        </tbody>

        <DragOverlay>
          {draggableTask ? (
            <TaskItem
              id={draggableTask.id}
              date={draggableTask.day}
              title={draggableTask.title}
              labels={draggableTask.labels || []}
            />
          ) : null}
        </DragOverlay>
      </DndContext>
    </table>
  );
}
