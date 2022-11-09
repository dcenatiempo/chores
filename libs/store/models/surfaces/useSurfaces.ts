import { useDispatch, useSelector } from 'react-redux';
import * as selectors from './selectors';
import * as firebase from './firebase';
import { actions } from './reducer';
import { transformSurfaceTemplate } from './transformers';

export default function useSurfaces() {
  const dispatch = useDispatch();

  const surfaceTemplates = useSelector(selectors.surfaceTemplates);
  const surfaceTemplatesArray = useSelector(selectors.surfaceTemplatesArray);

  async function fetchSurfaceTemplates() {
    return firebase.fetchSurfaces().then((surfaces) => {
      dispatch(actions.setSurfaces(surfaces));
    });
  }

  return {
    surfaceTemplates,
    surfaceTemplatesArray,
    fetchSurfaceTemplates,
  };
}
