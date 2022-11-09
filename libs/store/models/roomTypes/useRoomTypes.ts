import { useDispatch, useSelector } from 'react-redux';
import * as selectors from './selectors';
import * as firebase from './firebase';
import { actions } from './reducer';

export default function useRoomTypes() {
  const dispatch = useDispatch();

  const roomTypes = useSelector(selectors.roomTypes);
  const roomTypesArray = useSelector(selectors.roomTypesArray);

  async function fetchRoomTypes() {
    return firebase.fetchRoomTypes().then((roomTypes) => {
      dispatch(actions.setRoomTypes(roomTypes));
    });
  }

  return {
    roomTypes,
    roomTypesArray,
    fetchRoomTypes,
  };
}
