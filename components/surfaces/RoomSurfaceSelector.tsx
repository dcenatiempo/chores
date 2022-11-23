import { FC, useMemo, useState } from 'react';
import useCurrentOrg from '../../libs/store/models/orgs/useCurrentOrg';
import { useSurfaces } from '../../libs/store/models/surfaces';
import {
  Surface,
  SurfaceTemplate,
} from '../../libs/store/models/surfaces/types';
import { TextInput } from '../base';
import Dropdown from '../base/Dropdown';
import { AddButton } from '../buttons';

export interface RoomSurfaceSelectorProps {
  onSelect: (surface: Surface | undefined) => void;
  excluding: Surface[];
  detached?: boolean;
}

const RoomSurfaceSelector: FC<RoomSurfaceSelectorProps> = ({
  onSelect,
  excluding,
  detached = false,
}) => {
  const [surface, setSurface] = useState<SurfaceTemplate>();
  const [surfaceName, setSurfaceName] = useState<string>('');

  const { customSurfacesArray, getNextId } = useCurrentOrg();
  const { detachedSurfacesTemplatesArray, attachedSurfacesTemplatesArray } =
    useSurfaces();
  const surfaceTemplatesArray = detached
    ? detachedSurfacesTemplatesArray
    : attachedSurfacesTemplatesArray;
  const allSurfaces = useMemo(() => {
    return [...surfaceTemplatesArray, ...customSurfacesArray].reduce<
      SurfaceTemplate[]
    >((acc, s) => {
      const excluded = excluding.find(
        (exclude) => exclude.surfaceTemplate.id === s.id
      );
      if (excluded) return acc;
      return [...acc, s];
    }, []);
  }, [surfaceTemplatesArray, customSurfacesArray, excluding]);

  function onAdd() {
    if (!surface) return;

    const surfaceToAdd = {
      id: surface.id || getNextId(),
      surfaceTemplate: surface,
      name: surfaceName,
    };
    setSurface(undefined);
    setSurfaceName('');
    onSelect(surfaceToAdd);
  }

  console.log('selected', surface);
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'end',
        justifyContent: 'space-between',
      }}
    >
      <TextInput
        value={surfaceName}
        onChange={setSurfaceName}
        label={'Custom Name'}
      />
      <Dropdown
        label="Surfaces"
        valueKey={(option) => option?.id || ''}
        labelKey={(option) => option?.name || ''}
        options={allSurfaces}
        onSelect={(s) => {
          setSurfaceName(s?.name || '');
          setSurface(s);
        }}
        selected={surface}
        id="surfaces"
      />
      <AddButton disabled={!surface} onClick={onAdd} />
    </div>
  );
};

export default RoomSurfaceSelector;
