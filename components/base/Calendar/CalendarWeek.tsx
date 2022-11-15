import { FC } from 'react';
import { UnixTimestamp } from '../../../libs/dateTime';
import styles from './Calendar.module.css';
import CalendarDay, { CalendarType } from './CalendarDay';

export interface CalendarWeekProps {
  numWeeks: number;
  weekIndex: number;
  date: UnixTimestamp;
  numDays: number;
  renderDay: (date: UnixTimestamp) => React.ReactNode;
  type: CalendarType;
}

const CalendarWeek: FC<CalendarWeekProps> = ({
  weekIndex,
  numDays,
  ...rest
}) => {
  return (
    <div className={styles.calendarWeek}>
      {[...Array(numDays)].map((_, di) => (
        <CalendarDay
          numDays={numDays}
          key={`${weekIndex}-${di}`}
          dayIndex={di}
          weekIndex={weekIndex}
          {...rest}
        />
      ))}
    </div>
  );
};

export default CalendarWeek;
