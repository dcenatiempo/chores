import { FC, useMemo } from 'react';
import { UnixTimestamp } from '../../../libs/dateTime';
import styles from './Calendar.module.css';
import { CalendarType } from './CalendarDay';
import CalendarWeek from './CalendarWeek';

export interface CalendarProps {
  numWeeks: number;
  date: UnixTimestamp;
  numDays: number;
  renderDay: (date: UnixTimestamp) => React.ReactNode;
  type: CalendarType;
}

const Calendar: FC<CalendarProps> = ({ numWeeks, numDays, ...rest }) => {
  const actualNumWeeks = useMemo(() => {
    if (numWeeks <= 0) return 1;
    return numWeeks;
  }, [numWeeks]);

  const actualNumDays = useMemo(() => {
    if (actualNumWeeks > 1) {
      return 7;
    }
    if (numDays <= 0) return 7;
    if (numDays > 7) return 7;
    return numDays;
  }, [numDays, actualNumWeeks]);

  return (
    <div className={styles.calendar}>
      {[...Array(actualNumWeeks)].map((_, wi) => (
        <CalendarWeek
          numWeeks={numWeeks}
          key={`${wi}`}
          {...rest}
          weekIndex={wi}
          numDays={actualNumDays}
        />
      ))}
    </div>
  );
};

export default Calendar;
