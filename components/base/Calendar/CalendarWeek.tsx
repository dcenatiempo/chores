import { FC } from 'react';
import styles from './Calendar.module.css';
import CalendarDay, { Day } from './CalendarDay';

export type Week = [Day, Day, Day, Day, Day, Day, Day];

export interface CalendarWeekProps {
  week: Week;
}

const CalendarWeek: FC<CalendarWeekProps> = ({ week }) => {
  return (
    <div className={styles.calendarWeek}>
      {week.map((d) => (
        <CalendarDay key={d.date} day={d} />
      ))}
    </div>
  );
};

export default CalendarWeek;
