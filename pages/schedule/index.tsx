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
import { UIChoreFeedItem } from '../../libs/store/models/scheduledChores/types';
import { getUIChoreFeedItem } from '../../libs/store/models/scheduledChores/transformers';
import useCurrentOrg from '../../libs/store/models/orgs/useCurrentOrg';

const nextWeek = DateTime.local().plus({ weeks: 1 });

const Schedule: NextPage = () => {
  const {
    addScheduledChore,
    editScheduledChore,
    scheduledChoresArray,
    feedChoresArray,
  } = useScheduledChores();

  const { chores } = useCurrentOrg();

  const [calendarStartDate, setCalendarStartDate] = useState(0);
  const [calendarEndDate, setCalendarEndDate] = useState(0);

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

    feedChoresArray.forEach((c) => {
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
        return feed.daily[key].push(getUIChoreFeedItem(c, chores));
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
          item: getUIChoreFeedItem(c, chores),
        });
      }
      if (startWithinRange && endAfterRange) {
        return feed.offCalendar.push({
          dueDate: calendarEndDate,
          item: getUIChoreFeedItem(c, chores),
        });
      }
      if (startBeforeRange && endWithinRange) {
        return feed.multiDay.push({
          startDate: calendarStartDate,
          endDate: c.schedule.dueDate || calendarEndDate,
          item: getUIChoreFeedItem(c, chores),
        });
      }
      if (startBeforeRange && endAfterRange) {
        return feed.offCalendar.push({
          dueDate: calendarEndDate,
          item: getUIChoreFeedItem(c, chores),
        });
      }
      // else its not in calendar range at all
    });
    return feed;
  }, [calendarStartDate, calendarEndDate, feedChoresArray]);

  function _onClickDailyTask(date: string, choreId: string, taskId: string) {
    const chore = choresFeed.daily[date].find((c) => c?.id === choreId);
    const task = chore?.tasks.find((t) => t.id === taskId);
    if (!!task) task.finished = !task?.finished;
    // TODO: toggle in FB
    // setEventsMap({ ...eventsMap });
  }

  function _onClickDailyChore(date: string, choreId: string) {
    const chore = choresFeed.daily[date].find((c) => c?.id === choreId);
    chore?.tasks.forEach((t) => {
      t.finished = true;
    });
    // TODO: toggle in FB
    // setEventsMap({ ...eventsMap });
  }

  return (
    <PageWrapper metaTitle="Chore Schedule">
      <AddOrEditScheduledChoresList
        addChore={addScheduledChore}
        editChore={editScheduledChore}
        chores={scheduledChoresArray}
      />
      <Calendar
        numWeeks={1}
        date={nextWeek.toSeconds()}
        numDays={7}
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
        type={'rigid'}
        calendarState={{
          calendarStartDate,
          setCalendarStartDate,
          setCalendarEndDate,
        }}
      />
    </PageWrapper>
  );
};

export default Schedule;
