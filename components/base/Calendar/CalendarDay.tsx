import { FC, useMemo } from 'react';
import {
  getNow,
  timestampToDate,
  timestampToISODate,
  UnixTimestamp,
} from '../../../libs/dateTime';
import styles from './Calendar.module.css';
import { getCalendarCellDate } from './utils';

export type CalendarType = 'centered' | 'start' | 'rigid';

export interface CalendarDayProps {
  weekIndex: number;
  dayIndex: number;
  calendarStartDate: UnixTimestamp;
  renderDay: (date: UnixTimestamp) => React.ReactNode;
}

const CalendarDay: FC<CalendarDayProps> = ({
  dayIndex,
  weekIndex,
  calendarStartDate,
  renderDay,
}) => {
  const date = useMemo(
    () => getCalendarCellDate(calendarStartDate, weekIndex, dayIndex),
    [calendarStartDate, weekIndex, dayIndex]
  );

  const dateString = useMemo(() => timestampToDate(date), [date]);
  const now = timestampToISODate(getNow());
  const isToday = timestampToISODate(date) === now;

  return (
    <div className={`${styles.calendarDay} ${isToday ? styles.today : ''}`}>
      {dateString}
      <div>{renderDay(date)}</div>
    </div>
  );
};

export default CalendarDay;
