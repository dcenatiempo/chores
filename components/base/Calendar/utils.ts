import { DateTime } from 'luxon';
import {
  getFirstDayOfMonth,
  getFirstDayOfWeek,
  getTimeFuture,
  getTimePast,
  timestampToDate,
  UnixTimestamp,
} from '../../../libs/dateTime';
import { CalendarType } from './CalendarDay';

export function getCalendarStartDate(
  numWeeks: number,
  numDays: number,
  startDate: UnixTimestamp,
  type: CalendarType
): UnixTimestamp {
  let actualStartDate = DateTime.fromSeconds(startDate)
    .startOf('day')
    .toSeconds();

  if (numWeeks > 5 || numWeeks < 1) {
    throw new Error('numWeeks needs to be between 1 and 5 (inclusive)');
  }
  if (numDays > 7 || numDays < 1) {
    throw new Error('numDays needs to be between 1 and 7 (inclusive)');
  }
  if (numWeeks > 1 && numDays < 7) {
    throw new Error('if numWeeks > 1, numDays MUST be 7');
  }

  if (numWeeks === 1) {
    if (type === 'centered') {
      const middleDayIndex = Math.floor(numDays / 2);
      actualStartDate = getTimePast({ days: middleDayIndex }, actualStartDate);
    } else if (numDays === 7 && type === 'rigid') {
      actualStartDate = getFirstDayOfWeek(actualStartDate);
    }
  } else {
    if (type === 'centered') {
      const middleWeekIndex = Math.floor((numWeeks - 1) / 2);
      actualStartDate = getFirstDayOfWeek(
        getTimePast({ weeks: middleWeekIndex }, actualStartDate)
      );
    } else if (numWeeks == 5 && type === 'rigid') {
      actualStartDate = getFirstDayOfWeek(getFirstDayOfMonth(actualStartDate));
    } else {
      actualStartDate = getFirstDayOfWeek(actualStartDate);
    }
  }
  return actualStartDate;
}

export function getCalendarRowDateRange(
  calendarStartDate: UnixTimestamp,
  weekIndex: number,
  numDays: number
): { start: UnixTimestamp; end: UnixTimestamp } {
  const start = getTimeFuture({ days: weekIndex * 7 }, calendarStartDate);
  const end = getTimeFuture(
    { days: numDays + weekIndex * 7 - 1 },
    calendarStartDate
  );

  return { start, end };
}

export function getCalendarCellDate(
  calendarStartDate: UnixTimestamp,
  weekIndex: number,
  dayIndex: number
): UnixTimestamp {
  const days = dayIndex + 7 * weekIndex;
  return getTimeFuture({ days }, calendarStartDate);
}
