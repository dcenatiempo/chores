import type { NextPage } from 'next';

import PageWrapper from '../../components/nav/PageWrapper';

import { Calendar } from '../../components/base';
import {
  getFirstDayOfWeek,
  getTimeFuture,
  timestampToISODate,
  UnixTimestamp,
} from '../../libs/dateTime';
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
import dynamic from 'next/dynamic';

const nextWeek = DateTime.local().plus({ weeks: 1 });

const Schedule: NextPage = () => {
  const { addScheduledChore, editScheduledChore, scheduledChoresArray } =
    useScheduledChores();

  const [calendarStartDate, setCalendarStartDate] = useState(0);
  const [calendarEndDate, setCalendarEndDate] = useState(0);
  const dailyStuff: Map<UIChoreFeedItem[]> = {
    [timestampToISODate(getTimeFuture({ days: 11 }, getFirstDayOfWeek()))]: [
      item1,
      item2,
    ],
    [timestampToISODate(getTimeFuture({ days: 3 }, getFirstDayOfWeek()))]: [
      item3,
    ],
  };

  const multiDayStuff: {
    startDate: UnixTimestamp;
    endDate: UnixTimestamp;
    item: UIChoreFeedItem;
  }[] = [
    {
      startDate: nextWeek.plus({ days: 2 }).toSeconds(),
      endDate: nextWeek.plus({ days: 4 }).toSeconds(),
      item: item1,
    },
    {
      startDate: nextWeek.minus({ days: 2 }).toSeconds(),
      endDate: nextWeek.plus({ days: 3 }).toSeconds(),
      item: item2,
    },
    {
      startDate: nextWeek.minus({ days: 100 }).toSeconds(),
      endDate: nextWeek.minus({ days: 18 }).toSeconds(),
      item: item3,
    },
  ];

  const offCalendarStuff: {
    dueDate: UnixTimestamp;
    item: UIChoreFeedItem;
  }[] = [
    // {
    //   startDate: nextWeek.plus({ days: 2 }).toSeconds(),
    //   endDate: nextWeek.plus({ months: 4 }).toSeconds(),
    //   item: item1,
    // },
  ];

  const choresFeed = useMemo(() => {
    const feed: {
      offCalendar: {
        dueDate: UnixTimestamp;
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
    // TODO: build feed
    feed.daily = dailyStuff;
    feed.multiDay = multiDayStuff;
    feed.offCalendar = offCalendarStuff;
    return feed;
  }, [scheduledChoresArray, calendarStartDate, calendarEndDate]);

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
        numWeeks={5}
        date={nextWeek.toSeconds()}
        numDays={7}
        renderWeek={(
          startDate: UnixTimestamp,
          endDate: UnixTimestamp,
          numCells: number
        ) => {
          const calendarStart = DateTime.fromSeconds(calendarStartDate);
          const calendarEnd = DateTime.fromSeconds(calendarEndDate);
          const weekStart = DateTime.fromSeconds(startDate);
          const weekEnd = DateTime.fromSeconds(endDate);
          const thisWeeksChores = choresFeed.multiDay.reduce<React.ReactNode[]>(
            (acc, item) => {
              // TODO: is the item in range?
              const itemStart = DateTime.fromSeconds(item.startDate);
              const itemEnd = DateTime.fromSeconds(item.endDate);
              const calendarEndDiff = calendarEnd.diff(itemEnd, 'days').days;

              if (calendarEndDiff < 0) {
                console.log(calendarEndDiff);
                console.log(timestampToISODate(calendarEndDate));
                console.log(timestampToISODate(item.endDate));
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

const item1 = {
  id: '123',
  name: 'Clean your room',
  tasks: [
    {
      name: 'make bed',
      id: '234',
      finished: false,
    },
    {
      name: 'put away clothes',
      id: '345',
      finished: false,
    },
    {
      name: 'tidy room',
      id: '346',
      finished: false,
    },
  ],
  // room?: Room;
  person: {
    name: 'Creed',
    id: '123',
  },
};

const item2 = {
  id: '1234',
  name: 'Clean your room',
  tasks: [
    {
      name: 'make bed',
      id: '234',
      finished: false,
    },
    {
      name: 'put away clothes',
      id: '2345',
      finished: false,
    },
    {
      name: 'tidy room',
      id: '346',
      finished: false,
    },
  ],
  // room?: Room;
  person: {
    name: 'Will',
    id: '234',
  },
};

const item3 = {
  id: '1235',
  name: 'Clean your room',
  tasks: [
    {
      name: 'make bed',
      id: '234',
      finished: false,
    },
    {
      name: 'put away clothes',
      id: '234',
      finished: false,
    },
    {
      name: 'tidy room',
      id: '346',
      finished: false,
    },
  ],
  // room?: Room;
  person: {
    name: 'Creed',
    id: '123',
  },
};
