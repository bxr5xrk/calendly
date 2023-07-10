import { CreateTaskModal } from '@features/CreteTask';
import * as dayjs from 'dayjs';
import { useState } from 'react';
import { CalendarHeader } from '../CalendarHeader/CalendarHeader';
import { Month } from '../Month/ui/Month';

const dateNow = dayjs();

export type Action = 'previous' | 'next';

export function Calendar() {
  const [currentDate, setCurrentDate] = useState(dateNow);

  const onChange = (action: Action) => {
    setCurrentDate(currentDate.add(action === 'next' ? 1 : -1, 'month'));
  };

  return (
    <div className="bg-white rounded shadow w-full">
      <CalendarHeader
        month={currentDate.format('MMMM, YYYY')}
        onChange={onChange}
      />
      <Month day={currentDate} />

      <CreateTaskModal />
    </div>
  );
}
