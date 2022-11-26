import type { NextPage } from 'next';

import PageWrapper from '../../components/nav/PageWrapper';

import { Calendar } from '../../components/base';
import { timestampToISODate, UnixTimestamp } from '../../libs/dateTime';
import { DateTime } from 'luxon';
import ChoreFeedItem from '../../components/chores/ChoreFeedItem';
import React, { useMemo, useState } from 'react';
import AddOrEditScheduledChoresList from '../../components/chores/AddOrEditScheduledChoresList';
import useScheduledChores from '../../libs/store/models/scheduledChores/useScheduledChores';
import { Map } from '../../libs/store/models/types';
import {
  FeedChore,
  UIChoreFeedItem,
} from '../../libs/store/models/scheduledChores/types';
import { getUIChoreFeedItem } from '../../libs/store/models/scheduledChores/transformers';
import { CalendarType } from '../../components/base/Calendar/CalendarDay';

const todaySeconds = DateTime.local().toSeconds();

const SchedulePage: NextPage = () => {
  const {
    addScheduledChore,
    editScheduledChore,
    deleteScheduledChore,
    scheduledChoresArray,
    feedChoresArray,
  } = useScheduledChores();

  const [calendarStartDate, setCalendarStartDate] = useState(0);
  const [calendarEndDate, setCalendarEndDate] = useState(0);
  const [calendarType, setCalendarType] = useState<CalendarType>('rigid');
  const [calendarDays, setCalendarDays] = useState(7);
  const [calendarWeeks, setCalendarWeeks] = useState(5);
  const [today, setToday] = useState(todaySeconds);

  const extrapolatedFeedChoresArray = useMemo(() => {
    let extrapolated: FeedChore[] = [];

    feedChoresArray.forEach((c) => {
      extrapolated = [
        ...getOccurances(c, calendarStartDate, calendarEndDate),
        ...extrapolated,
      ];
    });

    return extrapolated;
  }, [feedChoresArray, calendarStartDate, calendarEndDate]);

  const choresFeed = useMemo(() => {
    const feed: {
      offCalendar: {
        dueDate?: UnixTimestamp;
        item: UIChoreFeedItem;
      }[];
      multiDay: {
        startDate: UnixTimestamp;
        endDate: UnixTimestamp;
        item: UIChoreFeedItem;
      }[];
      daily: Map<UIChoreFeedItem[]>;
    } = {
      offCalendar: [],
      multiDay: [],
      daily: {},
    };

    extrapolatedFeedChoresArray.forEach((c) => {
      const luxonStart = c.schedule.startDate
        ? DateTime.fromSeconds(c.schedule.startDate)
        : undefined;

      const luxonDue = c.schedule.dueDate
        ? DateTime.fromSeconds(c.schedule.dueDate)
        : undefined;

      const calendarEnd = DateTime.fromSeconds(calendarEndDate);

      const calendarStart = DateTime.fromSeconds(calendarStartDate);

      const isDaily =
        luxonStart &&
        luxonDue &&
        luxonStart.toISODate() === luxonDue.toISODate();
      if (isDaily) {
        const key = luxonStart.toISODate();
        if (!feed.daily[key]) feed.daily[key] = [];
        return feed.daily[key].push(getUIChoreFeedItem(c));
      }

      const startDiff = luxonStart?.diff(calendarStart, 'days').days ?? -1;
      const endDiff = luxonDue?.diff(calendarEnd, 'days').days ?? 1;
      const startBeforeEnd = luxonStart?.diff(calendarEnd, 'days').days ?? -1;
      const dueAfterStart = luxonDue?.diff(calendarStart, 'days').days ?? 1;

      const startWithinRange = startDiff >= 0 && startBeforeEnd <= 0;
      const endWithinRange = endDiff <= 0 && dueAfterStart >= 0;
      const startBeforeRange = startDiff < 0;
      const endAfterRange = endDiff > 0;

      if (startWithinRange && endWithinRange) {
        return feed.multiDay.push({
          startDate: c.schedule.startDate || calendarStartDate,
          endDate: c.schedule.dueDate || calendarEndDate,
          item: getUIChoreFeedItem(c),
        });
      }
      if (startWithinRange && endAfterRange) {
        return feed.offCalendar.push({
          dueDate: calendarEndDate,
          item: getUIChoreFeedItem(c),
        });
      }
      if (startBeforeRange && endWithinRange) {
        return feed.multiDay.push({
          startDate: calendarStartDate,
          endDate: c.schedule.dueDate || calendarEndDate,
          item: getUIChoreFeedItem(c),
        });
      }
      if (startBeforeRange && endAfterRange) {
        return feed.offCalendar.push({
          dueDate: calendarEndDate,
          item: getUIChoreFeedItem(c),
        });
      }
      // else its not in calendar range at all
    });
    return feed;
  }, [calendarStartDate, calendarEndDate, extrapolatedFeedChoresArray]);

  function _onClickDailyTask(date: string, choreId: string, taskId: string) {
    const chore = choresFeed.daily[date].find((c) => c?.id === choreId);
    const task = chore?.tasks.find((t) => t.id === taskId);
    if (!!task) task.completed = !task?.completed;
    // TODO: toggle in FB
    // setEventsMap({ ...eventsMap });
  }

  function _onClickDailyChore(date: string, choreId: string) {
    const chore = choresFeed.daily[date].find((c) => c?.id === choreId);
    chore?.tasks.forEach((t) => {
      t.completed = true;
    });
    // TODO: toggle in FB
    // setEventsMap({ ...eventsMap });
  }

  return (
    <PageWrapper metaTitle="Chore Schedule">
      <AddOrEditScheduledChoresList
        addChore={addScheduledChore}
        editChore={editScheduledChore}
        deleteChore={deleteScheduledChore}
        chores={scheduledChoresArray}
      />
      <Calendar
        numWeeks={calendarWeeks}
        date={today}
        numDays={calendarDays}
        renderWeek={(
          startDate: UnixTimestamp,
          endDate: UnixTimestamp,
          numCells: number
        ) => {
          const calendarEnd = DateTime.fromSeconds(calendarEndDate);
          const weekStart = DateTime.fromSeconds(startDate);
          const weekEnd = DateTime.fromSeconds(endDate);

          const thisWeeksChores = choresFeed.multiDay.reduce<React.ReactNode[]>(
            (acc, item) => {
              const itemStart = DateTime.fromSeconds(item.startDate);
              const itemEnd = DateTime.fromSeconds(item.endDate);
              const calendarEndDiff = calendarEnd.diff(itemEnd, 'days').days;

              if (calendarEndDiff < 0) {
                return acc;
              }

              let endDiff = weekEnd.diff(itemEnd, 'days').days;

              if (endDiff >= 7) return acc;
              if (endDiff <= 0) endDiff = 0; // this is not due this week
              let weekStartDiff = itemStart.diff(weekStart, 'days').days;
              if (weekStartDiff >= 7) return acc;
              if (weekStartDiff < 0) weekStartDiff = 0;

              return [
                ...acc,
                <div
                  key={`${item.item.id}`}
                  style={{ display: 'flex', flexDirection: 'row' }}
                >
                  <div style={{ flex: weekStartDiff }} />
                  <div
                    style={{
                      flex: numCells - weekStartDiff - endDiff,
                      backgroundColor: 'pink',
                      padding: 5,
                      margin: 2,
                    }}
                  >
                    {item.item.name} {item.item.id}
                  </div>
                  <div style={{ flex: endDiff }} />
                </div>,
              ];
            },
            []
          );
          return (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {thisWeeksChores}
            </div>
          );
        }}
        renderDay={(date: UnixTimestamp) => {
          const key = timestampToISODate(date);
          const todaysChores = choresFeed.daily[key];
          if (todaysChores)
            return todaysChores.map((c) =>
              c ? (
                <ChoreFeedItem
                  key={c.id}
                  chore={c}
                  onClickTask={(cid, tid) => _onClickDailyTask(key, cid, tid)}
                  onClickChore={(cid) => _onClickDailyChore(key, cid)}
                />
              ) : null
            );
          return null;
        }}
        type={calendarType}
        calendarState={{
          calendarStartDate,
          setCalendarStartDate,
          setCalendarEndDate,
        }}
      />
    </PageWrapper>
  );
};

export default SchedulePage;

function getOccurances(
  c: FeedChore,
  startDate: UnixTimestamp,
  endDate: UnixTimestamp
): FeedChore[] {
  if (!startDate || !endDate) return [];
  const schedule = c.schedule;
  if (!schedule.dueDate && !schedule.startDate) {
    // if no startDate or dueDate, does MUST NOT repeat, and MUST always be on schedule
    return [c];
  } else if (!schedule.dueDate && schedule.startDate) {
    // if startDate but no dueDate, does MUST NOT repeat, and MAY be on schedule
    const res = dateWithinRange(schedule.startDate, {
      startDate,
      endDate,
    });
    if (res === 'in') return [c];
    return [];
  } else if (
    schedule.dueDate &&
    !schedule.startDate &&
    schedule.interval === 'week'
  ) {
    // if no startDate but has dueDate, interval MUST NOT be 'week' - bad state
    return [];
  } else if (schedule.interval === 'week') {
    if (!schedule.startDate) return []; // bad state
    // repeats on days of the week
    return getWeeklyOccurances(c, startDate, endDate);
  } else if (schedule.interval === 'month') {
    if (schedule.monthly === 'day') {
      // repeats on day of week
      return getMonthlyDayOccurances(c, startDate, endDate);
    } else if (schedule.monthly === 'date') {
      // repeats on date of month
      return getMonthlyDateOccurances(c, startDate, endDate);
    }
  }
  return [];
}

function dateWithinRange(
  target: UnixTimestamp,
  range: { startDate?: UnixTimestamp; endDate?: UnixTimestamp }
): 'before' | 'in' | 'after' {
  if (!range.startDate && !range.endDate) return 'in';
  const luxonTarget = DateTime.fromSeconds(target);
  const luxonStart = range.startDate
    ? DateTime.fromSeconds(range.startDate)
    : undefined;

  const luxonEnd = range.endDate
    ? DateTime.fromSeconds(range.endDate)
    : undefined;

  const startDif = luxonStart?.diff(luxonTarget, 'days').days ?? 1;
  const endDif = luxonEnd?.diff(luxonTarget, 'days').days ?? -1;

  if (startDif > 0) {
    return 'before';
  }
  if (endDif < 0) {
    return 'after';
  }
  return 'in';
}

//// WEEKLU ////
function getWeeklyOccurances(
  c: FeedChore,
  startDate: UnixTimestamp,
  endDate: UnixTimestamp,
  occurances: FeedChore[] = []
): FeedChore[] {
  if (!c.schedule.startDate || !c.schedule.dueDate) return [];

  // if current occurance before, in, or after range?
  const res = dateWithinRange(c.schedule.dueDate, { startDate, endDate });
  if (res === 'in') {
    occurances.push(c);
  }

  if (res === 'before' || res === 'in') {
    getWeeklyOccurances(
      getNextWeeklyDateOccurance(c),
      startDate,
      endDate,
      occurances
    );
  }

  return occurances;
}

function getNextWeeklyDateOccurance(c: FeedChore): FeedChore {
  if (!c.schedule.startDate || !c.schedule.dueDate) return c;
  const frequency = c.schedule.frequency;
  const newDate = getNextWeeklyDate(
    c.schedule.dueDate,
    frequency,
    c.schedule.weekly
  );
  return {
    ...c,
    schedule: { ...c.schedule, dueDate: newDate, startDate: newDate },
  };
}

const weeklyMap = { M: 1, T: 2, W: 3, H: 4, F: 5, S: 6, U: 7 };
type DayNum = 1 | 2 | 3 | 4 | 5 | 6 | 7;

// weekly = 'MTWHFSU'
function getNextWeeklyDate(
  date: UnixTimestamp,
  frequency: number,
  weekly: string | undefined
): number {
  const luxonDate = DateTime.fromSeconds(date);
  const dayOfWeek = +luxonDate.toFormat('c'); // (Monday is 1, Sunday is 7)
  const effectiveWeekly = weekly
    ? // @ts-expect-error
      weekly.split('').map((item) => weeklyMap[item])
    : [dayOfWeek];
  const nextDayOfWeek = (() => {
    let i = 1;
    while (i <= 7) {
      let next = dayOfWeek + i;
      if (next > 7) next -= 7;
      if (effectiveWeekly.includes(next)) return next;
      i += 1;
    }
    // we should never hit this
    return dayOfWeek;
  })();
  if (dayOfWeek < nextDayOfWeek)
    return luxonDate
      .startOf('week')
      .plus({ days: nextDayOfWeek - 1 })
      .toSeconds();
  return luxonDate
    .plus({ weeks: frequency })
    .startOf('week')
    .plus({ days: nextDayOfWeek - 1 })
    .toSeconds();
}

//// MONTHLY DATE ////
function getMonthlyDateOccurances(
  c: FeedChore,
  startDate: UnixTimestamp,
  endDate: UnixTimestamp,
  occurances: FeedChore[] = []
): FeedChore[] {
  // bad data return
  if (!c.schedule.dueDate) return occurances;

  // if current occurance before, in, or after range?
  const res = dateWithinRange(c.schedule.dueDate, { startDate, endDate });
  if (res === 'in') {
    occurances.push(c);
  }

  if (res === 'before' || res === 'in') {
    getMonthlyDateOccurances(
      getNextMonthlyDateOccurance(c),
      startDate,
      endDate,
      occurances
    );
  }

  return occurances;
}

function getNextMonthlyDateOccurance(c: FeedChore): FeedChore {
  if (!c.schedule.dueDate) return c;
  const frequency = c.schedule.frequency;
  const newDueDate = getNextMonthlyDate(c.schedule.dueDate, frequency);
  const newStartDate = c.schedule.startDate
    ? getNextMonthlyDate(c.schedule.startDate, frequency)
    : c.schedule.startDate;
  return {
    ...c,
    schedule: { ...c.schedule, dueDate: newDueDate, startDate: newStartDate },
  };
}

function getNextMonthlyDate(date: UnixTimestamp, frequency: number) {
  const luxonDue = DateTime.fromSeconds(date);
  const dayOfWeek = +luxonDue.toFormat('c'); // (Monday is 1, Sunday is 7)
  const nthOccurance = Math.ceil(+luxonDue.toFormat('d') / 7);
  const nextMonth = luxonDue.plus({ months: frequency });
  const firstDayOfNextMonth = +nextMonth.startOf('month').toFormat('c'); // (Monday is 1, Sunday is 7)
  let offset = dayOfWeek - firstDayOfNextMonth - 7;
  offset = offset < -7 ? offset + 7 : offset;
  const dayOfMonthIndex = nthOccurance * 7 + offset;
  return nextMonth.startOf('month').plus({ days: dayOfMonthIndex }).toSeconds();
}

//// MONTHLY DAY ////
function getMonthlyDayOccurances(
  c: FeedChore,
  startDate: UnixTimestamp,
  endDate: UnixTimestamp,
  occurances: FeedChore[] = []
): FeedChore[] {
  // bad data return
  if (!c.schedule.dueDate) return occurances;

  // if current occurance before, in, or after range?
  const res = dateWithinRange(c.schedule.dueDate, { startDate, endDate });
  if (res === 'in') {
    occurances.push(c);
  }

  if (res === 'before' || res === 'in') {
    getMonthlyDayOccurances(
      getNextMonthlyDayOccurance(c),
      startDate,
      endDate,
      occurances
    );
  }

  return occurances;
}

function getNextMonthlyDayOccurance(c: FeedChore): FeedChore {
  if (!c.schedule.dueDate) return c;
  const frequency = c.schedule.frequency;
  const newDueDate = getNextMonthlyDay(c.schedule.dueDate, frequency);
  const newStartDate = getNextMonthlyDay(c.schedule.dueDate, frequency);
  return {
    ...c,
    schedule: { ...c.schedule, dueDate: newDueDate, startDate: newStartDate },
  };
}

function getNextMonthlyDay(date: UnixTimestamp, frequency: number) {
  if (!date) return undefined;
  const luxonDue = DateTime.fromSeconds(date);
  const dayOfMonthIndex = +luxonDue.toFormat('d') - 1;
  const nextMonth = luxonDue.plus({ months: frequency });
  return nextMonth.startOf('month').plus({ days: dayOfMonthIndex }).toSeconds();
}
