import { FC } from 'react';
import {
  getFirstDayOfMonth,
  getFirstDayOfWeek,
  getTimeFuture,
  getTimePast,
  timestampToDate,
  timestampToISODate,
  UnixTimestamp,
} from '../../../libs/dateTime';
import styles from './Calendar.module.css';

export type CalendarType = 'centered' | 'start' | 'rigid';

export interface CalendarDayProps {
  numWeeks: number;
  numDays: number;
  weekIndex: number;
  dayIndex: number;
  date: UnixTimestamp;
  renderDay: (date: UnixTimestamp) => React.ReactNode;
  type: CalendarType;
}

const CalendarDay: FC<CalendarDayProps> = ({
  numWeeks,
  numDays,
  dayIndex,
  weekIndex,
  date: startDate,
  renderDay,
  type,
}) => {
  const date = getDate(numWeeks, numDays, weekIndex, dayIndex, startDate, type);
  const dateString = timestampToDate(date);
  return (
    <div className={styles.calendarDay}>
      {dateString}
      {renderDay(date)}
    </div>
  );
};

export default CalendarDay;

function getDate(
  numWeeks: number,
  numDays: number,
  weekIndex: number,
  dayIndex: number,
  startDate: UnixTimestamp,
  type: CalendarType
): UnixTimestamp {
  let actualStartDate = startDate;

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
      actualStartDate = getTimePast({ days: middleDayIndex }, startDate);
    } else if (numDays === 7 && type === 'rigid') {
      actualStartDate = getFirstDayOfWeek(startDate);
    }
  } else {
    if (type === 'centered') {
      const middleWeekIndex = Math.floor((numWeeks - 1) / 2);
      actualStartDate = getFirstDayOfWeek(
        getTimePast({ weeks: middleWeekIndex }, startDate)
      );
      console.log(timestampToISODate(actualStartDate));
    } else if (numWeeks == 5 && type === 'rigid') {
      actualStartDate = getFirstDayOfWeek(getFirstDayOfMonth(startDate));
    } else {
      actualStartDate = getFirstDayOfWeek(startDate);
    }
  }
  // debugger;
  const days = dayIndex + 1 + 7 * weekIndex - 1;
  return getTimeFuture({ days }, actualStartDate);
}
