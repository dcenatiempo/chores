import { useDispatch, useSelector } from 'react-redux';
import * as selectors from './selectors';
import * as firebase from './firebase';
import { actions } from './reducer';
import { transformSurfacesFromFirebase } from './transformers';

export default function useSurfaces() {
  const dispatch = useDispatch();

  const surfaces = useSelector(selectors.surfaces);

  async function fetchSurfaces() {
    return firebase.fetchSurfaces().then((surfaces) => {
      const cleanSurfaces = transformSurfacesFromFirebase(surfaces);
      dispatch(actions.setSurfaces(cleanSurfaces));
      return cleanSurfaces;
    });
  }

  return {
    surfaces,
    fetchSurfaces,
  };
}
