import { useEffect, useState } from 'react';
import {
  fmt,
  getNow,
  getTimeFuture,
  getTimePast,
  timestampToString,
  UnixTimestamp,
} from '../../../libs/dateTime';
import { useScreenSize } from '../../../libs/store/appState/useAppState';
import Button from '../Button';
import Dropdown from '../Dropdown';
import { IconName } from '../Icon';
import IconButton from '../IconButton';
import styles from './Calendar.module.css';
import { CalendarType } from './CalendarDay';
import CalendarWeek from './CalendarWeek';
import { getCalendarStartDate } from './utils';

const webCalendarViewOptions = [
  { label: 'Month', value: 'm', days: 7, weeks: 5 },
  { label: 'Week', value: 'w', days: 7, weeks: 1 },
  { label: '3 Day', value: '3d', days: 3, weeks: 1 },
  { label: 'Day', value: 'd', days: 1, weeks: 1 },
];

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
  now: UnixTimestamp;
}

export default function Calendar({
  numWeeks,
  numDays,
  date,
  type = 'rigid',
  calendarState,
  now,
  ...rest
}: CalendarProps) {
  const { isSmallScreen } = useScreenSize();
  const [calendarView, setCalendarView] = useState(
    webCalendarViewOptions[isSmallScreen ? 3 : 3]
  );

  const [calendarDays, setCalendarDays] = useState(calendarView.days);
  const [calendarWeeks, setCalendarWeeks] = useState(calendarView.weeks);
  const [today, setToday] = useState(now);

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
    <div className={styles.calendarWrapper}>
      {isSmallScreen ? null : (
        <div style={{ paddingLeft: 10, paddingRight: 10 }}>
          <Dropdown
            requireSelected
            options={webCalendarViewOptions}
            valueKey={(o) => o?.value || ''}
            labelKey={(o) => o?.label || ''}
            id={'calendar-view'}
            onSelect={onSelectCalendarView}
            selected={calendarView}
            label={'Calendar View'}
          />
          <br />
        </div>
      )}
      <div className={styles.calendarControls}>
        <Button label="Today" onClick={() => setToday(getNow())} />
        <IconButton
          outlined
          type="sentance"
          iconName={IconName.LEFT_CHEVRON}
          onClick={() => onClickChangeDate('prev')}
        />
        <IconButton
          outlined
          type="sentance"
          iconName={IconName.RIGHT_CHEVRON}
          onClick={() => onClickChangeDate('next')}
        />
        {timestampToString(today, `${fmt.MONTH_L}, ${fmt.DATE} ${fmt.YEAR_L}`)}
      </div>
      <br />
      <div className={styles.calendar}>
        {[...Array(calendarWeeks)].map((_, wi) => (
          <CalendarWeek
            now={now}
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
    </div>
  );
}
