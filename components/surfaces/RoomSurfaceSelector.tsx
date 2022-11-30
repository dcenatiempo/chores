import { FC, useMemo } from 'react';
import useCurrentOrg from '../../libs/store/models/orgs/useCurrentOrg';
import { useSurfaces } from '../../libs/store/models/surfaces';
import { SurfaceTemplate } from '../../libs/store/models/surfaces/types';
import MultiselectDropdown from '../base/MultiselectDropdown';

export interface RoomSurfaceSelectorProps {
  onSelect: (surfaces: SurfaceTemplate[]) => void;
  selected: SurfaceTemplate[];
  options?: SurfaceTemplate[];
  detached?: boolean;
}

const RoomSurfaceSelector: FC<RoomSurfaceSelectorProps> = ({
  options,
  onSelect,
  selected,
  detached = false,
}) => {
  const { customSurfacesArray } = useCurrentOrg();
  const { detachedSurfacesTemplatesArray, attachedSurfacesTemplatesArray } =
    useSurfaces();
  const surfaceTemplatesArray = detached
    ? detachedSurfacesTemplatesArray
    : attachedSurfacesTemplatesArray;

  const _options = useMemo(() => {
    return options || [...surfaceTemplatesArray, ...customSurfacesArray];
  }, [options, surfaceTemplatesArray, customSurfacesArray]);

  return (
    <MultiselectDropdown
      label="Surfaces"
      valueKey={(option) => option?.id || ''}
      labelKey={(option) => option?.name || ''}
      options={_options}
      onSelect={onSelect}
      selected={selected}
      id="surfaces"
    />
  );
};

export default RoomSurfaceSelector;
