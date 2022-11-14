import { FC } from 'react';
import styles from './Calendar.module.css';
import CalendarEvent from './CalendarEvent';

export interface Day {
  date: string;
  events: string[];
}

export interface CalendarDayProps {
  day: Day;
}

const CalendarDay: FC<CalendarDayProps> = ({ day }) => {
  return (
    <div className={styles.calendarDay}>
      {day.date}
      {day.events.map((e) => (
        <CalendarEvent key={e} description={e} />
      ))}
    </div>
  );
};

export default CalendarDay;
