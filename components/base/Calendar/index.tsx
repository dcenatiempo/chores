import { FC, useEffect, useMemo } from 'react';
import { getTimeFuture, UnixTimestamp } from '../../../libs/dateTime';
import styles from './Calendar.module.css';
import { CalendarType } from './CalendarDay';
import CalendarWeek from './CalendarWeek';
import { getCalendarStartDate } from './utils';

export interface CalendarProps {
  calendarState: {
    calendarStartDate: UnixTimestamp;
    setCalendarStartDate: (date: UnixTimestamp) => void;
    setCalendarEndDate: (date: UnixTimestamp) => void;
  };
  numWeeks: number;
  date: UnixTimestamp;
  numDays: number;
  renderDay: (date: UnixTimestamp) => React.ReactNode;
  renderWeek: (
    startDate: UnixTimestamp,
    endDate: UnixTimestamp,
    numCells: number
  ) => React.ReactNode;
  type: CalendarType;
}

const Calendar: FC<CalendarProps> = ({
  numWeeks,
  numDays,
  date,
  type,
  calendarState,
  ...rest
}) => {
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

  useEffect(() => {
    const startDate = getCalendarStartDate(
      actualNumWeeks,
      actualNumDays,
      date,
      type
    );
    const endDate = getTimeFuture(
      { days: actualNumWeeks * actualNumDays - 1 },
      startDate
    );
    calendarState.setCalendarStartDate(startDate);
    calendarState.setCalendarEndDate(endDate);
  }, [actualNumWeeks, actualNumDays, date, type]);

  // const calendarStartDate = useMemo(
  //   () => getCalendarStartDate(actualNumWeeks, actualNumDays, date, type),
  //   [actualNumWeeks, actualNumDays, date, type]
  // );

  return (
    <div className={styles.calendar}>
      {[...Array(actualNumWeeks)].map((_, wi) => (
        <CalendarWeek
          calendarStartDate={calendarState.calendarStartDate}
          numWeeks={numWeeks}
          key={`${wi}`}
          type={type}
          {...rest}
          weekIndex={wi}
          numDays={actualNumDays}
        />
      ))}
    </div>
  );
};

export default Calendar;
