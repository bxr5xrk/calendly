import { Dayjs } from 'dayjs';

export const getCurrentDaysInMonth = (date: Dayjs): Dayjs[] => {
  const daysInMonth = [];
  const monthStart = date.startOf('month');
  const monthEnd = date.endOf('month');

  // Current month dates
  for (let i = 1; i <= monthEnd.date(); i++) {
    daysInMonth.push(monthStart.date(i));
  }

  return daysInMonth;
};
