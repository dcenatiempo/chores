import { DateTime } from 'luxon';

export function stringToTimestamp(date?: string): number {
  if (!date) return 0;
  return DateTime.fromISO(date).toMillis();
}

// export function timestampToDate(ms: number): string {
//   DateTime.fromMillis(ms).toFormat
// }

export function timestampToAge(ms: number): number {
  const end = DateTime.local();
  const start = DateTime.fromMillis(ms);

  const diffInMonths = end.diff(start, 'years');
  return Math.floor(diffInMonths.years);
}
