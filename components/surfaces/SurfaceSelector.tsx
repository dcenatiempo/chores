import { FC, useMemo, useState } from 'react';
import useCurrentOrg from '../../libs/store/models/orgs/useCurrentOrg';
import { useSurfaces } from '../../libs/store/models/surfaces';
import {
  Surface,
  SurfaceTemplate,
} from '../../libs/store/models/surfaces/types';
import Dropdown from '../base/Dropdown';
import { AddButton } from '../buttons';

export interface SurfaceSelectorProps {
  onSelect: (surface: Surface | undefined) => void;
  excluding: Surface[];
}

const SurfaceSelector: FC<SurfaceSelectorProps> = ({ onSelect, excluding }) => {
  const [surface, setSurface] = useState<SurfaceTemplate>();
  const [surfaceDescriptor, setSurfaceDescriptor] = useState<string>();

  const { customSurfaces } = useCurrentOrg();
  const { surfaces } = useSurfaces();
  const allSurfaces = useMemo(() => {
    return [...surfaces, ...customSurfaces].reduce<SurfaceTemplate[]>(
      (acc, s) => {
        const excluded = excluding.find(
          (excluded) => excluded.id === s.id && s.descriptors.length
        );
        if (excluded) return acc;
        return [...acc, s];
      },
      []
    );
  }, [surfaces, customSurfaces, excluding]);

  function onAdd() {
    if (!surface) return;
    const surfaceToAdd = {
      id: '',
      surfaceId: surface.id,
      name: surface.name,
      descriptor: surfaceDescriptor || '',
    };
    onSelect(surfaceToAdd);
  }
  return (
    <div>
      <Dropdown
        label="Surfaces"
        valueKey={(option) => option?.id || ''}
        labelKey={(option) => option?.name || ''}
        options={allSurfaces}
        onSelect={(s) => {
          setSurfaceDescriptor(s?.descriptors?.[0]);
          setSurface(s);
        }}
        selected={surface}
        id="surfaces"
      />
      {surface?.descriptors?.length ? (
        <Dropdown
          options={surface?.descriptors}
          valueKey={(option) => option || ''}
          labelKey={(option) => option || ''}
          id="descriptors"
          onSelect={setSurfaceDescriptor}
          selected={surfaceDescriptor}
          label={`${surface.name} type`}
        />
      ) : null}
      <AddButton onClick={onAdd} />
    </div>
  );
};

export default SurfaceSelector;
