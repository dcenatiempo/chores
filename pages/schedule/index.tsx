import type { NextPage } from 'next';

import PageWrapper from '../../components/nav/PageWrapper';

import { Calendar } from '../../components/base';
import {
  getFirstDayOfWeek,
  getTimeFuture,
  timestampToISODate,
} from '../../libs/dateTime';
import { DateTime } from 'luxon';
import CalendarEvent from '../../components/base/Calendar/CalendarEvent';
import ChoreFeedItem from '../../components/chores/ChoreFeedItem';
import { useState } from 'react';

const Schedule: NextPage = () => {
  const [eventsMap, setEventsMap] = useState({
    [timestampToISODate(getTimeFuture({ days: 11 }, getFirstDayOfWeek()))]: [
      {
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
      },
      {
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
      },
      ,
    ],
    [timestampToISODate(getTimeFuture({ days: 3 }, getFirstDayOfWeek()))]: [
      {
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
      },
    ],
  });

  function _onClickTask(date: string, choreId: string, taskId: string) {
    const chore = eventsMap[date].find((c) => c?.id === choreId);
    const task = chore?.tasks.find((t) => t.id === taskId);
    if (!!task) task.finished = !task?.finished;
    setEventsMap({ ...eventsMap });
  }

  function _onClickChore(date: string, choreId: string) {
    const chore = eventsMap[date].find((c) => c?.id === choreId);
    chore?.tasks.forEach((t) => {
      t.finished = true;
    });
    setEventsMap({ ...eventsMap });
  }

  return (
    <PageWrapper metaTitle="Chore Schedule">
      <Calendar
        numWeeks={1}
        date={DateTime.local().plus({ weeks: 1 }).toSeconds()}
        numDays={7}
        renderDay={(date: number) => {
          const key = timestampToISODate(date);
          const choreEvents = eventsMap[key];
          if (choreEvents)
            return choreEvents.map((c) =>
              c ? (
                <ChoreFeedItem
                  key={c.id}
                  chore={c}
                  onClickTask={(cid, tid) => _onClickTask(key, cid, tid)}
                  onClickChore={(cid) => _onClickChore(key, cid)}
                />
              ) : null
            );
          return null;
        }}
        type={'rigid'}
      />
    </PageWrapper>
  );
};

export default Schedule;
