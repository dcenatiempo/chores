import { FC } from 'react';
import { TextInput } from '../base';

interface AddOrEditLevelProps {
  levelName: string;
  setLevelName: (levelName: string) => void;
}

const AddOrEditLevel: FC<AddOrEditLevelProps> = ({
  levelName,
  setLevelName,
}) => {
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
    </div>
  );
};

export default AddOrEditLevel;
