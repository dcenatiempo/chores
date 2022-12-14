import { doc, Timestamp } from 'firebase/firestore';
import { UnixTimestamp } from '../../dateTime';
import { Collection, db, FBReference, FBTimestamp } from '../../firebase';
import { Map, OrgMap } from './types';

export const transformTimestamp = {
  fromFB(fbTimestamp?: FBTimestamp): UnixTimestamp {
    return fbTimestamp?.seconds || 0;
  },
  toFB(timestamp: UnixTimestamp): FBTimestamp {
    return Timestamp.fromMillis(timestamp * 1000);
  },
};

export const transformReference = {
  fromFB(fbReference: FBReference) {
    return fbReference.id;
  },
  toFB(collection: Collection, refId: string) {
    return doc(db, collection, refId);
  },
};

export function transformMap<A, B>(
  map: Map<A> | undefined = {},
  transform: (map: A) => B
): Map<B> {
  const x = Object.entries(map);

  const newMap: Map<B> = {};

  Object.entries(map).forEach(([key, value]) => {
    newMap[key] = transform(value);
  });

  return newMap;
}

export function arrayToMap<T>(a?: T[], key: string = 'id'): Map<T> {
  const map: Map<T> = {};
  if (!a) return map;

  a.forEach((item) => {
    // @ts-expect-error
    const mapKey = item[key];
    if (!mapKey) return;
    map[mapKey] = item as T;
  });
  return map;
}

export function mapToArray<T>(m?: Map<T>): T[] {
  if (!m) return [] as T[];
  return Object.values(m);
}
