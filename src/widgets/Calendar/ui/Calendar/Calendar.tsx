import { CreateTaskModal } from '@features/CreteTask';
import * as dayjs from 'dayjs';
import { useState } from 'react';
import { CalendarHeader } from '../CalendarHeader/CalendarHeader';
import { Month } from '../Month/ui/Month';

const dateNow = dayjs();

export function Calendar() {
  const [currentDate, setCurrentDate] = useState(dateNow);

  return (
    <div className="bg-white rounded shadow w-full">
      <CalendarHeader />
      <Month day={currentDate} />

      <CreateTaskModal />
    </div>
  );
}
