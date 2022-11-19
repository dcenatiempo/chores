import { FC, useMemo } from 'react';
import { UnixTimestamp } from '../../../libs/dateTime';
import styles from './Calendar.module.css';
import CalendarDay, { CalendarType } from './CalendarDay';
import { getCalendarRowDateRange } from './utils';

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
}

const CalendarWeek: FC<CalendarWeekProps> = ({
  numDays,
  renderWeek,
  weekIndex,
  calendarStartDate,
  renderDay,
}) => {
  const { start, end } = useMemo(
    () => getCalendarRowDateRange(calendarStartDate, weekIndex, numDays),
    [calendarStartDate, weekIndex, numDays]
  );
  return (
    <div className={styles.calendarWeekWrapper}>
      {renderWeek(start, end, numDays)}

      <div className={styles.calendarWeek}>
        {[...Array(numDays)].map((_, di) => (
          <CalendarDay
            dayIndex={di}
            weekIndex={weekIndex}
            calendarStartDate={calendarStartDate}
            key={`${weekIndex}-${di}`}
            renderDay={renderDay}
          />
        ))}
      </div>
    </div>
  );
};

export default CalendarWeek;
