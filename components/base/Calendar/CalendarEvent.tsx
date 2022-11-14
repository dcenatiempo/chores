import { FC } from 'react';
import styles from './Calendar.module.css';

export interface CalendarEventProps {
  description: string;
}

const CalendarEvent: FC<CalendarEventProps> = ({ description }) => {
  return <div className={styles.calendarEvent}>{description}</div>;
};

export default CalendarEvent;
