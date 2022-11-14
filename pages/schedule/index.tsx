import type { NextPage } from 'next';

import useCurrentOrg from '../../libs/store/models/orgs/useCurrentOrg';
import PageWrapper from '../../components/nav/PageWrapper';
import AddOrEditTasksList from '../../components/tasks/AddOrEditTasksList';
import AddOrEditChoresList from '../../components/chores/AddOrEditChoresList';
import RoomTypeSelector from '../../components/roomTypes/RoomTypeSelector';
import { useCallback, useMemo, useState } from 'react';
import { RoomType } from '../../libs/store/models/roomTypes/types';
import { mapToArray } from '../../libs/store/models/sharedTransformers';
import { Task } from '../../libs/store/models/orgs/types';
import { Calendar, CalendarPage } from '../../components/base';
import {
  getLastSunday,
  getTimeFuture,
  getTimePast,
  timestampToDate,
} from '../../libs/dateTime';
import { Week } from '../../components/base/Calendar/CalendarWeek';
import { Day } from '../../components/base/Calendar/CalendarDay';

const Schedule: NextPage = () => {
  const firstDay = getLastSunday();

  const calendarPage: CalendarPage = [...Array(5)].map((_, wi) => {
    const week: Week = [...Array(7)].map((_, di) => {
      const daysFromNow = wi * 7 + di;
      // console.log('daysFromNow', daysFromNow);
      const date = getTimeFuture({ days: daysFromNow }, firstDay);
      console.log('date', timestampToDate(date));

      const day: Day = {
        date: timestampToDate(date),
        events: ['x'],
      };
      return day;
    });
    return week;
  });

  console.log('calendarPage', calendarPage);
  return (
    <PageWrapper metaTitle="Chore Schedule">
      <Calendar calendarPage={calendarPage} />
    </PageWrapper>
  );
};

export default Schedule;
