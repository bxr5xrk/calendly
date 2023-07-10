import * as dayjs from 'dayjs';

export const getCurrentDaysInMonth = (date: dayjs.Dayjs): dayjs.Dayjs[] => {
  const daysInMonth = [];
  const monthStart = date.startOf('month');
  const monthEnd = date.endOf('month');

  // Get the starting day of the week (Sunday = 0, Monday = 1, ...)
  const startDayOfWeek = monthStart.day();

  // Calculate the number of days to subtract from the current month
  const numDaysToSubtract = (startDayOfWeek + 6) % 7; // Number of days to subtract to make Monday the start

  // Add the dates from the previous month
  const prevMonthEnd = monthStart.subtract(1, 'day');
  for (let i = numDaysToSubtract; i > 0; i--) {
    daysInMonth.push(prevMonthEnd.subtract(i, 'day'));
  }

  // Add the dates from the current month
  for (let i = 1; i <= monthEnd.date(); i++) {
    daysInMonth.push(monthStart.date(i));
  }

  // Add the dates from the next month to fill the grid
  const nextMonthStart = monthEnd.add(1, 'day');
  const numDaysToAdd = 42 - daysInMonth.length; // Total number of cells in a 6x7 grid
  for (let i = 0; i < numDaysToAdd; i++) {
    daysInMonth.push(nextMonthStart.add(i, 'day'));
  }

  return daysInMonth;
};

export const isDateInCurrentMonth = (
  date: dayjs.Dayjs,
  month: dayjs.Dayjs
): boolean => date.month() === month.month() && date.year() === month.year();
