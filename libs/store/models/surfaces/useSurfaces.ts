import { useDispatch, useSelector } from 'react-redux';
import * as selectors from './selectors';
import * as firebase from './firebase';
import { actions } from './reducer';
import { useMemo } from 'react';

export default function useSurfaces() {
  const dispatch = useDispatch();

  const surfaceTemplates = useSelector(selectors.surfaceTemplates);
  const surfaceTemplatesArray = useSelector(selectors.surfaceTemplatesArray);
  const attachedSurfacesTemplatesArray = useMemo(() => {
    return surfaceTemplatesArray.filter((s) => s.attached !== false);
  }, [surfaceTemplatesArray]);
  const detachedSurfacesTemplatesArray = useMemo(() => {
    return surfaceTemplatesArray.filter((s) => !s.attached);
  }, [surfaceTemplatesArray]);

  async function fetchSurfaceTemplates() {
    return firebase.fetchSurfaces().then((surfaces) => {
      dispatch(actions.setSurfaces(surfaces));
    });
  }

  return {
    surfaceTemplates,
    surfaceTemplatesArray,
    attachedSurfacesTemplatesArray,
    detachedSurfacesTemplatesArray,
    fetchSurfaceTemplates,
  };
}
