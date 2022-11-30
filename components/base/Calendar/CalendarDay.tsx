import { useMemo } from 'react';
import { timestampToDate, UnixTimestamp } from '../../../libs/dateTime';
import styles from './Calendar.module.css';

export type CalendarType = 'centered' | 'start' | 'rigid';

export interface CalendarDayProps {
  isToday: boolean;
  date: UnixTimestamp;
  renderDay: (date: UnixTimestamp) => React.ReactNode;
}

export default function CalendarDay({
  renderDay,
  isToday,
  date,
}: CalendarDayProps) {
  const dateString = useMemo(() => timestampToDate(date), [date]);

  return (
    <div className={`${styles.calendarDay} ${isToday ? styles.today : ''}`}>
      {dateString}
      <div style={{ padding: 4 }}>{renderDay(date)}</div>
    </div>
  );
}
