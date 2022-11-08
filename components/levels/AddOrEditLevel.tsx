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
  const [level, setLevel] = useState(initialResource || '');

  function onClickAddLevel() {
    if (!level) return;
    onSubmitResource(level);
    setLevel('');
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
      <TextInput label="Level" value={level} onChange={setLevel} />
      <AddButton onClick={onClickAddLevel} />
    </div>
  );
};

export default AddOrEditLevel;
