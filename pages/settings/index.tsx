import type { NextPage } from 'next';
import React from 'react';
import { Dropdown } from '../../components/base';
import MultiselectDropdown from '../../components/base/MultiselectDropdown';
import NativeMultiselectDropdown from '../../components/base/MultiselectDropdown/nativeMultiSelect';
import NativeDropdown from '../../components/base/MultiselectDropdown/nativeSelect';
import KidModeSelector from '../../components/KidModeSelector';

import PageWrapper from '../../components/nav/PageWrapper';
import ThemeSelector from '../../components/ThemeSelector';
import useUser from '../../libs/store/models/user/useUser';
const options = [
  { label: 'apples', id: 'a' },
  { label: 'APPLES', id: 'aa' },
  { label: 'bannanas', id: 'b' },
  { label: 'cherries', id: 'c' },
  { label: 'donuts', id: 'd' },
  { label: 'eggs', id: 'e' },
  { label: 'french fries', id: 'f' },
];
const SettingsPage: NextPage = () => {
  const { isAuthenticated } = useUser();
  const [multiSelected, setMultiSelected] = React.useState<string[]>([]);
  const [selected, setSelected] = React.useState<
    { label: string; id: string } | undefined
  >();
  return (
    <PageWrapper metaTitle="Chore Settings">
      <div style={{ paddingLeft: 10, paddingRight: 10 }}>
        <ThemeSelector />
        <br />
        {isAuthenticated ? <KidModeSelector /> : null}
        <MultiselectDropdown
          options={options}
          valueKey={(o) => o?.id}
          labelKey={(o) => o?.label}
          id={'multiselect'}
          onSelect={(items) => setMultiSelected(items.map((x) => x.id))}
          selected={multiSelected}
          label={'multiselect'}
        />
        <Dropdown
          options={options}
          valueKey={(o) => o?.id || ''}
          labelKey={(o) => o?.label || ''}
          id={'select'}
          onSelect={setSelected}
          selected={selected}
          label={'select'}
        />

        <NativeMultiselectDropdown
          options={options}
          valueKey={(o) => o?.id}
          labelKey={(o) => o?.label}
          id={'native-multiselect'}
          onSelect={(items) => setMultiSelected(items.map((x) => x.id))}
          selected={multiSelected}
          label={'native-multiselect'}
        />
        <NativeDropdown
          options={options}
          valueKey={(o) => o?.id}
          labelKey={(o) => o?.label}
          id={'native-select'}
          onSelect={setSelected}
          selected={selected}
          label={'native-select'}
        />
      </div>
    </PageWrapper>
  );
};

export default SettingsPage;
