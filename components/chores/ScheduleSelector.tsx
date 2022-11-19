import { DateTime } from 'luxon';
import { FC, useMemo, useState } from 'react';
import { UnixTimestamp } from '../../libs/dateTime';
import { Dropdown, Switch } from '../base';
import { DateSelector } from '../base/DateSelector';
import MultiselectDropdown from '../base/MultiselectDropdown';

enum MaxFrequency {
  WEEK = 4,
  MONTH = 12,
}

const weeklyOptions = [
  {
    label: 'Monday',
    value: 'M',
  },
  {
    label: 'Tuesday',
    value: 'T',
  },
  {
    label: 'Wednesday',
    value: 'W',
  },
  {
    label: 'Thursday',
    value: 'H',
  },
  {
    label: 'Friday',
    value: 'F',
  },
  {
    label: 'Saturday',
    value: 'S',
  },
  {
    label: 'Sunday',
    value: 'U',
  },
];

export interface ScheduledSelectorProps {
  startDate: UnixTimestamp;
  setStartDate: (date: UnixTimestamp) => void;
  dueDate: UnixTimestamp;
  setDueDate: (date: UnixTimestamp) => void;
  frequency?: number;
  setFrequency: (frequency?: number) => void;
  interval?: 'week' | 'month';
  setInterval: (interval?: 'week' | 'month') => void;
  weekly?: string; // 'MTWHFSU' array
  setWeekly: (weekly: string) => void;
  monthly?: 'day' | 'date';
  setMonthly: (monthly?: 'day' | 'date') => void;
}

const ScheduledSelector: FC<ScheduledSelectorProps> = ({
  startDate = 0,
  setStartDate,
  dueDate = 0,
  setDueDate,
  frequency,
  setFrequency,
  interval,
  setInterval,
  weekly,
  setWeekly,
  monthly,
  setMonthly,
}) => {
  function _setWeekly(selected: { label: string; value: string }[]) {
    setWeekly(selected.map((o) => o.value).join(''));
  }

  function _setMonthly(selected?: { label: string; value: 'date' | 'day' }) {
    setMonthly(selected?.value);
  }

  const _weekly = weeklyOptions.filter((o) => {
    return weekly?.toUpperCase()?.includes(o?.value?.toUpperCase());
  });

  const [minFrequency, setMinFrequency] = useState(1);

  const monthlyOptions: { label: string; value: 'day' | 'date' }[] =
    useMemo(() => {
      if (!dueDate) return [];
      const d = DateTime.fromSeconds(dueDate);
      return [
        { label: `Monthly on day ${d.toFormat('d')}`, value: 'day' },
        {
          label: `Monthly on the ${Math.ceil(
            +d.toFormat('d') / 7
          )} ${d.toFormat('cccc')}`,
          value: 'date',
        },
      ];
    }, [dueDate]);

  const [minInterval, setMinInterval] = useState(
    getMinInterval(startDate, dueDate)
  );

  function getMinInterval(startDate: UnixTimestamp, dueDate: UnixTimestamp) {
    if (!dueDate || !startDate) {
      return;
    }
    const end = DateTime.fromSeconds(dueDate);
    const start = DateTime.fromSeconds(startDate);
    const monthRange = end.diff(start, ['months', 'days']);
    const minInterval = monthRange.months >= 1 ? 'month' : 'week';
    return minInterval;
  }

  function _setInterval(val?: 'week' | 'month') {
    setInterval(val);
    keepFormValid(dueDate, startDate, val);
  }

  function _setIsSimple(val: boolean) {
    if (val) setStartDate(dueDate);
    setIsSimple(val);
  }

  function keepFormValid(
    dueDate: UnixTimestamp,
    startDate: UnixTimestamp,
    interval: 'week' | 'month' | undefined
  ) {
    if (!startDate) {
      if (interval === 'week') setInterval('month');
    }
    if (interval === 'week' && frequency && frequency > MaxFrequency.WEEK)
      setFrequency(MaxFrequency.WEEK);

    if (!dueDate || !startDate) {
      return;
    }
    const end = DateTime.fromSeconds(dueDate);
    const start = DateTime.fromSeconds(startDate);
    const weekRange = end.diff(start, ['weeks', 'days']);
    const monthRange = end.diff(start, ['months', 'days']);
    const minInterval = monthRange.months >= 1 ? 'month' : 'week';
    setMinInterval(minInterval);
    const effectiveInterval = monthRange.months >= 1 ? 'month' : interval;
    if (effectiveInterval !== interval) setInterval(effectiveInterval);

    if (effectiveInterval === 'week') {
      const extraWeek = weekRange.days > 0 ? 1 : 0;
      const effectiveWeeks = extraWeek + weekRange.weeks;
      if (!frequency || frequency < effectiveWeeks) {
        setFrequency(effectiveWeeks);
      }
      setMinFrequency(Math.max(1, effectiveWeeks));
    }

    if (effectiveInterval == 'month') {
      const extraMonth = monthRange.days > 0 ? 1 : 0;
      const effectiveMonths = extraMonth + monthRange.months;
      if (!frequency || frequency < effectiveMonths) {
        setFrequency(effectiveMonths);
      }
      setMinFrequency(Math.max(effectiveMonths, 1));
    }
  }

  function _setDueDate(date: UnixTimestamp) {
    if (isSimple) setStartDate(date);
    setDueDate(date);

    keepFormValid(date, startDate, interval);
  }

  function _setStartDate(date: UnixTimestamp) {
    setStartDate(date);
    keepFormValid(dueDate, date, interval);
  }

  const intervalOptions: ('week' | 'month')[] = useMemo(() => {
    if (!startDate) return ['month'];
    return ['week', 'month'];
  }, [startDate, minFrequency, interval]);

  const frequencyOptions = useMemo(() => {
    const num = interval === 'week' ? MaxFrequency.WEEK : MaxFrequency.MONTH;
    return [...Array(num)]
      .map((_, index) => index + 1)
      .filter((o) => o >= minFrequency);
  }, [minFrequency, interval]);

  const [isSimple, setIsSimple] = useState(true);
  const showStartDate = !isSimple;
  const showInterval = !!dueDate;
  const showFrequency = !!dueDate && !!interval;
  const showWeekly = !!dueDate && interval === 'week';
  const showMonthly = !!dueDate && interval === 'month';

  return (
    <>
      <Switch value={isSimple} onChange={_setIsSimple} />
      {showStartDate ? (
        <DateSelector
          label={'Start Date'}
          id={'start-date'}
          onChange={_setStartDate}
          date={startDate}
        />
      ) : null}
      <DateSelector
        label={'due Date'}
        id={'due-date'}
        onChange={_setDueDate}
        date={dueDate}
      />
      {showInterval ? (
        <Dropdown
          options={intervalOptions}
          valueKey={(o) => `${o}`}
          labelKey={(o) => `${o}`}
          id={'interval-selector'}
          onSelect={_setInterval}
          selected={interval}
          label={'Interval'}
        />
      ) : null}
      {showFrequency ? (
        <Dropdown
          options={frequencyOptions}
          valueKey={(o) => `${o}`}
          labelKey={(o) => `${o}`}
          id={'frequency-selector'}
          onSelect={setFrequency}
          selected={frequency}
          label={'Frequency'}
        />
      ) : null}

      {showWeekly ? (
        <MultiselectDropdown
          options={weeklyOptions}
          valueKey={(o) => o?.value || ''}
          labelKey={(o) => o?.label || ''}
          id={'weeks-options'}
          onSelect={_setWeekly}
          selected={_weekly}
          label={'Repeats on days'}
        />
      ) : null}
      {showMonthly ? (
        <Dropdown
          options={monthlyOptions}
          valueKey={(o) => o?.value || ''}
          labelKey={(o) => o?.label || ''}
          id={'weeks-options'}
          onSelect={_setMonthly}
          selected={monthly}
          label={'Repeats on'}
        />
      ) : null}
    </>
  );
};

export default ScheduledSelector;
