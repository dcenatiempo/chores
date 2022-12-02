import { useMemo } from 'react';
import { fmt, timestampToString, UnixTimestamp } from '../../../libs/dateTime';
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
  const dateString = useMemo(() => timestampToString(date, fmt.DATE), [date]);

  const dayString = useMemo(
    () => timestampToString(date, fmt.DAY_S).toUpperCase(),
    [date]
  );

  return (
    <div className={`${styles.calendarDay} ${isToday ? styles.today : ''}`}>
      <div className={styles.dateWrapper}>
        <div>{dayString}</div>
        <div>{dateString}</div>
      </div>

      <div className={styles.calendarDayContent}>{renderDay(date)}</div>
    </div>
  );
}
