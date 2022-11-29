import { documentId, where } from 'firebase/firestore';
import { DateTime } from 'luxon';
import { UnixTimestamp } from '../../../dateTime';
import { Collection, fetchDocs } from '../../../firebase';
import { transformTimestamp } from '../sharedTransformers';
import { FBHistoryChore } from './types';

export async function fetchOrgsChoreHistory(
  orgIds: string[]
): Promise<FBHistoryChore[]> {
  if (!orgIds.length) return [];
  return fetchDocs(Collection.CHORE_HISTORY, where('orgId', 'in', orgIds));
}

export async function fetchOrgsChoreHistoryWithQuery(
  orgId: string,
  { range }: { range?: [UnixTimestamp, UnixTimestamp]; personId?: string }
): Promise<FBHistoryChore[]> {
  if (!orgId.length) return [];
  const orgQuery = where(documentId(), '==', orgId);

  const rangeQuery = (() => {
    if (!range?.length) return [];

    const [start, end] = range;
    let luxonStart = start ? DateTime.fromSeconds(start) : DateTime.local();
    let luxonEnd = end ? DateTime.fromSeconds(end) : DateTime.local();
    if (luxonStart > luxonEnd) {
      // swap values
      const tempStart = luxonStart;
      luxonStart = luxonEnd;
      luxonEnd = tempStart;
    }

    const _start = transformTimestamp.toFB(
      luxonStart.startOf('day').toSeconds()
    );
    const _end = transformTimestamp.toFB(luxonStart.endOf('day').toSeconds());
    return [where('startDate', '<=', _start), where('endDate', '<=', _end)];
  })();

  return fetchDocs(Collection.CHORE_HISTORY, orgQuery, ...rangeQuery);
}
