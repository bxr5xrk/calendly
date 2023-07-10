import { CreateTaskModal } from '@features/CreteTask';
import * as dayjs from 'dayjs';
import { useState } from 'react';
import { CalendarHeader } from '../CalendarHeader/CalendarHeader';
import { Month } from '../Month/ui/Month/Month';

const dateNow = dayjs();

export type Action = 'previous' | 'next';

export function Calendar() {
  const [currentDate, setCurrentDate] = useState(dateNow);

  const onChange = (action: Action) =>
    setCurrentDate(currentDate.add(action === 'next' ? 1 : -1, 'month'));

  return (
    <div className="bg-white w-full max-w-7xl mx-auto">
      <CalendarHeader
        month={currentDate.format('MMMM, YYYY')}
        onChange={onChange}
      />
      <div className="mb-10">
        <Month day={currentDate} />
      </div>

      <CreateTaskModal />
    </div>
  );
}
