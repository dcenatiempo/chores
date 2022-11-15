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

const Schedule: NextPage = () => {
  const eventsMap = {
    [timestampToISODate(getTimeFuture({ days: 11 }, getFirstDayOfWeek()))]: [
      'foo',
      'bar',
    ],
    [timestampToISODate(getTimeFuture({ days: 3 }, getFirstDayOfWeek()))]: [
      'baz',
    ],
  };

  return (
    <PageWrapper metaTitle="Chore Schedule">
      <Calendar
        numWeeks={5}
        date={DateTime.local().toSeconds()}
        numDays={7}
        renderDay={(date: number) => {
          const key = timestampToISODate(date);
          const events = eventsMap[key];
          if (events)
            return events.map((e) => <CalendarEvent key={e} description={e} />);
          return null;
        }}
        type={'rigid'}
      />
    </PageWrapper>
  );
};

export default Schedule;
