import { useMemo } from 'react';
import { timestampToISODate, UnixTimestamp } from '../../../libs/dateTime';
import styles from './Calendar.module.css';
import CalendarDay, { CalendarType } from './CalendarDay';
import { getCalendarCellDate, getCalendarRowDateRange } from './utils';

export interface CalendarWeekProps {
  numWeeks: number;
  weekIndex: number;
  numDays: number;
  renderDay: (date: UnixTimestamp) => React.ReactNode;
  renderWeek: (
    startDate: UnixTimestamp,
    endDate: UnixTimestamp,
    numCells: number
  ) => React.ReactNode;
  type: CalendarType;
  calendarStartDate: UnixTimestamp;
  now: UnixTimestamp;
}

export default function CalendarWeek({
  numDays,
  renderWeek,
  weekIndex,
  calendarStartDate,
  renderDay,
  now,
}: CalendarWeekProps) {
  const { start, end } = useMemo(
    () => getCalendarRowDateRange(calendarStartDate, weekIndex, numDays),
    [calendarStartDate, weekIndex, numDays]
  );
  return (
    <div className={styles.calendarWeekWrapper}>
      {renderWeek(start, end, numDays)}

      <div className={styles.calendarWeek}>
        {[...Array(numDays)].map((_, di) => {
          const date = getCalendarCellDate(calendarStartDate, weekIndex, di);
          const nowDate = timestampToISODate(now);
          const isToday = timestampToISODate(date) === nowDate;

          return (
            <CalendarDay
              key={`${weekIndex}-${di}`}
              renderDay={renderDay}
              isToday={isToday}
              date={date}
            />
          );
        })}
      </div>
    </div>
  );
}
