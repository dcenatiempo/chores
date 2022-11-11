import { FC, useMemo, useState } from 'react';
import { Level } from '../../libs/store/models/orgs/types';
import useCurrentOrg from '../../libs/store/models/orgs/useCurrentOrg';
import AddOrEditList from '../base/AddOrEditList';
import AddOrEditLevel from './AddOrEditLevel';
import LevelsListItem from './LevelsListItem';

interface AddLevelProps {
  levels: Level[] | undefined;
  addLevel?: (level: Level) => void;
  deleteLevel?: (level: Level) => void;
  editLevel?: (level: Level) => void;
}

const AddOrEditLevelsList: FC<AddLevelProps> = ({
  levels = [],
  addLevel,
  deleteLevel,
  editLevel,
}) => {
  const { roomsGroupedByLevel } = useCurrentOrg();
  const levelsWithExtra = useMemo(() => {
    return levels.map((l) => ({
      ...l,
      noDelete: !!roomsGroupedByLevel[l.id]?.length,
    }));
  }, [roomsGroupedByLevel, levels]);

  const [levelName, setLevelName] = useState('');
  const [levelId, setLevelId] = useState('');

  const disabled = !isFormValid();

  function setForm(level?: Level) {
    setLevelId(level?.id || '');
    setLevelName(level?.name || '');
  }

  function clearForm() {
    setLevelId('');
    setLevelName('');
  }

  function isFormValid() {
    if (!levelName) return false;
    return true;
  }

  function onClickAddOrSave(callback?: (level: Level) => void) {
    if (!isFormValid()) return;
    clearForm();
    callback?.({
      name: levelName,
      id: levelId,
    });
  }

  function _onClickAdd() {
    onClickAddOrSave(addLevel);
  }
  function _onClickEdit() {
    onClickAddOrSave(editLevel);
  }
  function _onClickDelete(level: Level) {
    deleteLevel?.(level);
  }

  return (
    <AddOrEditList
      resources={levelsWithExtra}
      onClickAdd={addLevel ? _onClickAdd : undefined}
      onClickSave={editLevel ? _onClickEdit : undefined}
      onClickDelete={deleteLevel ? _onClickDelete : undefined}
      resourceName={'Level'}
      renderResource={(item) => <LevelsListItem level={item} />}
      keyExtractor={(level) => level.id}
      disabled={disabled}
      addOrEditResource={
        <AddOrEditLevel levelName={levelName} setLevelName={setLevelName} />
      }
      setResourceToEdit={setForm}
    />
  );
};

export default AddOrEditLevelsList;
