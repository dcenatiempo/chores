import { FC, useState } from 'react';
import useCurrentOrg from '../../libs/store/slices/orgs/useCurrentOrg';
import { useSurfaces } from '../../libs/store/slices/surfaces';
import {
  Surface,
  SurfaceTemplate,
} from '../../libs/store/slices/surfaces/types';
import { Button } from '../base';
import Dropdown from '../base/Dropdown';
import { AddButton } from '../buttons';

export interface SurfaceSelectorProps {
  onSelect: (surface: Surface | undefined) => void;
}

const SurfaceSelector: FC<SurfaceSelectorProps> = ({ onSelect }) => {
  const [surface, setSurface] = useState<SurfaceTemplate>();
  const [surfaceDescriptor, setSurfaceDescriptor] = useState<string>();

  const { org } = useCurrentOrg();
  const { surfaces } = useSurfaces();
  const customSurfaces = org.customSurfaces || [];
  const allSurfaces = [...surfaces, ...customSurfaces];

  function onAdd() {
    if (!surface) return;
    const surfaceToAdd = {
      id: surface.id,
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
