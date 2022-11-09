import { defaultMemoize, createSelector } from 'reselect';
import { RootState } from '../../store';
import { arrayToMap } from '../sharedTransformers';
import { transformSurfaceTemplate } from './transformers';

const surfaceTemplatesArray = defaultMemoize((state: RootState) =>
  state.surfaces.data.map((item) => transformSurfaceTemplate.fromFB(item))
);

const surfaceTemplates = createSelector(surfaceTemplatesArray, (sta) =>
  arrayToMap(sta)
);

export { surfaceTemplates, surfaceTemplatesArray };
