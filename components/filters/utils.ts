import { Room } from '../../libs/store/models/orgs/types';
import { mapToArray } from '../../libs/store/models/sharedTransformers';
import { SurfaceTemplate } from '../../libs/store/models/surfaces/types';
import { Map } from '../../libs/store/models/types';

export function surfacesFromRooms(rooms: Room[]) {
  const siuMap: Map<SurfaceTemplate> = {};
  rooms.forEach((r) => {
    Object.values(r.surfaces).forEach((s) => {
      const key = s.surfaceTemplate.id;
      if (!siuMap[key]) siuMap[key] = s.surfaceTemplate;
    });
  });
  return mapToArray(siuMap);
}
