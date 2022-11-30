import type { NextPage } from 'next';
import React from 'react';
import MultiselectDropdown from '../../components/base/MultiselectDropdown';
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
  const [selected, setSelected] = React.useState<string[]>([]);
  return (
    <PageWrapper metaTitle="Chore Settings">
      <ThemeSelector />
      {isAuthenticated ? <KidModeSelector /> : null}
      <MultiselectDropdown
        options={options}
        valueKey={(o) => o.id}
        labelKey={(o) => o.label}
        id={'asdf'}
        onSelect={(items) => setSelected(items.map((x) => x.id))}
        selected={selected}
        label={'test'}
      />
    </PageWrapper>
  );
};

export default SettingsPage;
