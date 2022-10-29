import { useDispatch, useSelector } from 'react-redux';
import * as selectors from './selectors';
import * as firebase from './firebase';
import { actions } from './reducer';
import { transformRoomTypesFromFirebase } from './transformers';

export default function useRoomTypes() {
  const dispatch = useDispatch();

  const surfaces = useSelector(selectors.roomTypes);

  async function fetchRoomTypes() {
    return firebase.fetchRoomTypes().then((roomTypes) => {
      const cleanTypes = transformRoomTypesFromFirebase(roomTypes);
      dispatch(actions.setRoomTypes(cleanTypes));
      return cleanTypes;
    });
  }

  return {
    surfaces,
    fetchRoomTypes,
  };
}
