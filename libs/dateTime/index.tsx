import { DateTime } from 'luxon';

export type UnixTimestamp = number; // seconds

// import { DurationLikeObject } from 'luxon';
export interface DurationObject {
  years?: number | undefined;
  quarters?: number | undefined;
  months?: number | undefined;
  weeks?: number | undefined;
  days?: number | undefined;
  hours?: number | undefined;
  minutes?: number | undefined;
  seconds?: number | undefined;
}

/**
 *
 * @param date any ISO date/time string
 * @returns UnixTimestamp (seconds since epoch)
 */
export function ISOToTimestamp(date?: string): UnixTimestamp {
  if (!date) return 0;
  return DateTime.fromISO(date).toSeconds();
}

/**
 *
 * @param timestamp UnixTimestamp (seconds since epoch)
 * @returns ISO Date '2022-12-25'
 */
export function timestampToISODate(timestamp: UnixTimestamp): string {
  return DateTime.fromSeconds(timestamp).toISODate();
}

export function timestampToDate(timestamp: UnixTimestamp): string {
  return DateTime.fromSeconds(timestamp).toFormat(fmt.DATE);
}

export function timestampToMonth(timestamp: UnixTimestamp): string {
  return DateTime.fromSeconds(timestamp).toFormat(fmt.MONTH_L);
}

export function timestampToString(
  timestamp: UnixTimestamp,
  format: string
): string {
  return DateTime.fromSeconds(timestamp).toFormat(format);
}

export enum fmt {
  DATE = 'd',
  MONTH_L = 'LLLL',
  MONTH_S = 'LLL',
  MONTH_N = 'L',
  DAY_L = 'cccc',
  DAY_S = 'ccc',
  DAY_N = 'c',
  YEAR_L = 'yyyy',
  YEAR_S = 'yy',
}

/**
 *
 * @param timestamp UnixTimestamp (seconds since epoch)
 * @returns age in years
 */
export function timestampToAge(timestamp: UnixTimestamp): number {
  const end = DateTime.local();
  const start = DateTime.fromSeconds(timestamp);

  const diffInMonths = end.diff(start, 'years');
  return Math.floor(diffInMonths.years);
}

export function getNow(): UnixTimestamp {
  return DateTime.local().toSeconds();
}

export function getTimePast(
  durationObject: DurationObject,
  fromDate?: UnixTimestamp
): UnixTimestamp {
  const date = fromDate ? DateTime.fromSeconds(fromDate) : DateTime.local();
  return date.minus(durationObject).toSeconds();
}

export function getTimeFuture(
  durationObject: DurationObject,
  fromDate?: UnixTimestamp
): UnixTimestamp {
  const date = fromDate ? DateTime.fromSeconds(fromDate) : DateTime.local();
  return date.plus(durationObject).toSeconds();
}

/**
 * This will return the previous monday in unix timestamp
 * @param timestamp time in seconds
 * @returns time in seconds
 */
export function getFirstDayOfWeek(
  timestamp: UnixTimestamp = DateTime.local().toSeconds()
): UnixTimestamp {
  const date = DateTime.fromSeconds(timestamp);
  const dayOfWeek = parseInt(date.toFormat('c'));
  const firstDayOfWeek = date.minus({ days: dayOfWeek - 1 });
  return firstDayOfWeek.toSeconds();
}

export function getFirstDayOfMonth(
  timestamp: UnixTimestamp = DateTime.local().toSeconds()
): UnixTimestamp {
  const date = DateTime.fromSeconds(timestamp);
  const dayOfMonth = parseInt(date.toFormat('d'));
  const firstDayOfMonth = date.minus({ days: dayOfMonth - 1 });
  return firstDayOfMonth.toSeconds();
}

// DateTime.fromISO('2017-W23-3').plus({ weeks: 1, days: 2 }).toISOWeekDate(); //=>  '2017-W24-5'

////////////// <CalendarPage /> /////////////////
// export interface Day {
//   date: UnixtTimestamp;
// }
// export type Week = [Day, Day, Day, Day, Day, Day, Day];

// export type CalendarPage =
//   | [Week, Week, Week, Week]
//   | [Week, Week, Week, Week, Week];

// function makeCalendarPage({
//   firstDay = getFirstDayOfWeek(),
//   addEvents = () => [],
//   numWeeks = 5,
// }: {
//   firstDay?: UnixTimestamp;
//   addEvents?: (day: UnixTimestamp) => string[];
//   numWeeks: number;
// }): CalendarPage {
//   const calendarPage: CalendarPage = [...Array(numWeeks)].map((_, wi) => {
//     return makeCalendarWeek({ firstDay, wi, addEvents });
//   });

//   return calendarPage;
// }

// function makeCalendarWeek({
//   firstDay = getFirstDayOfWeek(),
//   wi = 0,
//   addEvents = () => [],
// }: {
//   firstDay?: UnixTimestamp;
//   wi?: number;
//   addEvents?: (day: UnixTimestamp) => string[];
// }) {
//   const week: Week = [...Array(7)].map((_, di) => {
//     const daysFromNow = wi * 7 + di;
//     const date = getTimeFuture({ days: daysFromNow }, firstDay);

//     const day: Day = {
//       date: timestampToDate(date),
//       events: addEvents(date),
//     };
//     return day;
//   });
//   return week;
// }

// export const getCalendarPage = {
//   nextThirtyDays: (addEvents?: (day: UnixTimestamp) => string[]) =>
//     makeCalendarPage({ addEvents }),
//   thisMonth: (addEvents?: (day: UnixTimestamp) => string[]) => {
//     return makeCalendarPage({
//       addEvents,
//       firstDay: getFirstDayOfWeek(getFirstDayOfMonth()),
//     });
//   },
// };

// export const getCalendarWeek = {
//   thisWeek: (addEvents?: (day: UnixTimestamp) => string[]) =>
//     makeCalendarWeek({ addEvents }),
// };
