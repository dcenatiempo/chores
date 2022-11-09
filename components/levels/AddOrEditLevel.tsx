import { FC, useState } from 'react';
import { Level } from '../../libs/store/models/orgs/types';
import { TextInput } from '../base';
import { AddOrEditResourceProps } from '../base/AddOrEditList';
import { AddButton } from '../buttons';

interface AddOrEditLevelProps extends AddOrEditResourceProps<Level> {}

const AddOrEditLevel: FC<AddOrEditLevelProps> = ({
  initialResource,
  onSubmitResource,
}) => {
  const levelId = initialResource?.id || '';
  const [levelName, setLevelName] = useState<string>(
    initialResource?.name || ''
  );

  function onClickAddLevel() {
    if (!levelName) return;
    onSubmitResource({ id: levelId, name: levelName });
    setLevelName('');
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'end',
        columnGap: 10,
        paddingLeft: 10,
        paddingRight: 10,
      }}
    >
      <TextInput label="Level" value={levelName} onChange={setLevelName} />
      <AddButton onClick={onClickAddLevel} />
    </div>
  );
};

export default AddOrEditLevel;
