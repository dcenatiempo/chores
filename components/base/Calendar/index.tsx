import { FC } from 'react';
import styles from './Calendar.module.css';
import CalendarWeek, { Week } from './CalendarWeek';

export type CalendarPage =
  | [Week, Week, Week, Week]
  | [Week, Week, Week, Week, Week];

export interface CalendarProps {
  calendarPage: CalendarPage;
}

const Calendar: FC<CalendarProps> = ({ calendarPage }) => {
  return (
    <div className={styles.calendar}>
      {calendarPage.map((w) => (
        <CalendarWeek key={`${w[0].date}`} week={w} />
      ))}
    </div>
  );
};

export default Calendar;
