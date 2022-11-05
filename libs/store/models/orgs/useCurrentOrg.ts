import { useSelector } from 'react-redux';
import * as selectors from './selectors';

export default function useCurrentOrg() {
  const org = useSelector(selectors.currentOrg);
  const rooms = useSelector(selectors.rooms);
  const people = useSelector(selectors.people);
  const orgName = useSelector(selectors.name);
  const orgId = useSelector(selectors.id);
  const levels = useSelector(selectors.id);

  return {
    org,
    rooms,
    levels,
    people,
    orgName,
    orgId,
  };
}
