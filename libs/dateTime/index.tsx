import { DateTime, DurationLike } from 'luxon';

export type UnixTimestamp = number; // seconds

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
  return DateTime.local().minus(durationObject).toSeconds();
}
