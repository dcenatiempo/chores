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
    <>
      <TextInput label="Level" value={levelName} onChange={setLevelName} />
    </>
  );
};

export default AddOrEditLevel;
