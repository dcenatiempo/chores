import { DateTime } from 'luxon';
import { FC, useEffect, useState } from 'react';
import {
  fmt,
  getNow,
  getTimeFuture,
  getTimePast,
  timestampToString,
  UnixTimestamp,
} from '../../../libs/dateTime';
import Button from '../Button';
import Dropdown from '../Dropdown';
import { IconName } from '../Icon';
import IconButton from '../IconButton';
import styles from './Calendar.module.css';
import { CalendarType } from './CalendarDay';
import CalendarWeek from './CalendarWeek';
import { getCalendarStartDate } from './utils';

const todaySeconds = DateTime.local().toSeconds();

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
  type = 'rigid',
  calendarState,
  ...rest
}) => {
  const calendarViewOptions = [
    { label: 'Month', value: 'm', days: 7, weeks: 5 },
    { label: 'Week', value: 'w', days: 7, weeks: 1 },
    { label: '3 Day', value: '3d', days: 3, weeks: 1 },
    { label: 'Day', value: 'd', days: 1, weeks: 1 },
  ];
  const [calendarView, setCalendarView] = useState(calendarViewOptions[2]);

  const [calendarDays, setCalendarDays] = useState(calendarView.days);
  const [calendarWeeks, setCalendarWeeks] = useState(calendarView.weeks);
  const [today, setToday] = useState(todaySeconds);

  function onSelectCalendarView(view?: {
    label: string;
    value: string;
    days: number;
    weeks: number;
  }) {
    if (!view) return;
    setCalendarDays(view.days);
    setCalendarWeeks(view.weeks);
    setCalendarView(view);
  }

  // const actualNumWeeks = useMemo(() => {
  //   if (numWeeks <= 0) return 1;
  //   return numWeeks;
  // }, [numWeeks]);

  // const actualNumDays = useMemo(() => {
  //   if (actualNumWeeks > 1) {
  //     return 7;
  //   }
  //   if (numDays <= 0) return 7;
  //   if (numDays > 7) return 7;
  //   return numDays;
  // }, [numDays, actualNumWeeks]);

  useEffect(() => {
    const startDate = getCalendarStartDate(
      calendarWeeks,
      calendarDays,
      today,
      type
    );
    const endDate = getTimeFuture(
      { days: calendarWeeks * calendarDays - 1 },
      startDate
    );
    calendarState.setCalendarStartDate(startDate);
    calendarState.setCalendarEndDate(endDate);
  }, [calendarWeeks, calendarDays, today, calendarState, type]);

  function onClickChangeDate(direction: 'prev' | 'next') {
    const getTime = direction === 'prev' ? getTimePast : getTimeFuture;
    const view = calendarView.value;
    const duration = (() => {
      if (view === 'm') return { months: 1 };
      if (view === 'w') return { weeks: 1 };
      if (type.includes('d')) return { days: 1 };
      return { weeks: 1 };
    })();
    setToday(getTime(duration, today));
  }

  return (
    <div className={styles.calendar}>
      <Dropdown
        requireSelected
        options={calendarViewOptions}
        valueKey={(o) => o?.value || ''}
        labelKey={(o) => o?.label || ''}
        id={'calendar-view'}
        onSelect={onSelectCalendarView}
        selected={calendarView}
        label={'Calendar View'}
      />
      <div
        style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
      >
        <Button label="Today" onClick={() => setToday(getNow())} />
        <IconButton
          outlined
          type="sentance"
          iconName={IconName.LEFT_CHEVRON}
          onClick={() => onClickChangeDate('prev')}
        />
        {timestampToString(today, `${fmt.MONTH_L} ${fmt.YEAR_L}`)}
        <IconButton
          outlined
          type="sentance"
          iconName={IconName.RIGHT_CHEVRON}
          onClick={() => onClickChangeDate('next')}
        />
      </div>
      {[...Array(calendarWeeks)].map((_, wi) => (
        <CalendarWeek
          calendarStartDate={calendarState.calendarStartDate}
          numWeeks={calendarWeeks}
          key={`${wi}`}
          type={type}
          {...rest}
          weekIndex={wi}
          numDays={calendarDays}
        />
      ))}
    </div>
  );
};

export default Calendar;
