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

export interface SurfaceTemplateSelectorProps {
  onSelect: (surface: SurfaceTemplate | undefined) => void;
  excluding: SurfaceTemplate[];
  detached?: boolean;
  template?: boolean;
}

const SurfaceTemplateSelector: FC<SurfaceTemplateSelectorProps> = ({
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
      const excluded = excluding.find((exclude) => exclude.id === s.id);
      if (excluded) return acc;
      return [...acc, s];
    }, []);
  }, [surfaceTemplatesArray, customSurfacesArray, excluding]);

  function onAdd() {
    if (!surface) return;

    setSurface(undefined);
    setSurfaceName('');
    onSelect(surface);
  }

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
      xxx
      <AddButton disabled={!surface} onClick={onAdd} />
    </div>
  );
};

export default SurfaceTemplateSelector;
