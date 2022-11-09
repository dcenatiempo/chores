import { FC, useState } from 'react';
import { Chore, Person, Task } from '../../libs/store/models/orgs/types';
import useCurrentOrg from '../../libs/store/models/orgs/useCurrentOrg';
import { arrayToMap } from '../../libs/store/models/sharedTransformers';
import { TextInput } from '../base';
import { AddOrEditResourceProps } from '../base/AddOrEditList';
import MultiselectDropdown from '../base/MultiselectDropdown';
import { AddButton } from '../buttons';

interface AddOrEditChoreProps extends AddOrEditResourceProps<Chore> {}

const AddOrEditChore: FC<AddOrEditChoreProps> = ({
  initialResource,
  onSubmitResource,
}) => {
  const choreId = initialResource?.id || '';
  const { peopleArray, tasksArray } = useCurrentOrg();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [people, setPeople] = useState<Person[]>([]);
  const [name, setName] = useState('');

  function onClickAddChore() {
    if (!tasks.length) return;
    setTasks([]);
    setPeople([]);
    setName('');
    onSubmitResource({
      name,
      defaultPeople: arrayToMap(people),
      tasks: arrayToMap(tasks),
      id: choreId,
    });
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
      <TextInput value={name} onChange={setName} label="Name" />
      <MultiselectDropdown
        options={peopleArray}
        valueKey={(option) => option?.id || ''}
        labelKey={(option) =>
          `${option?.firstName || ''} ${option?.lastName || ''}`.trim()
        }
        id={'defaultPeople'}
        onSelect={setPeople}
        selected={people}
        label={'Default People'}
      />
      <MultiselectDropdown
        options={tasksArray}
        valueKey={(option) => option?.id || ''}
        labelKey={(option) =>
          `${option?.action.name || ''} ${option?.room?.name || ''} ${
            option?.surface?.name || ''
          }`.trim()
        }
        id={'defaultPeople'}
        onSelect={setTasks}
        selected={tasks}
        label={'Tasks'}
      />
      <AddButton onClick={onClickAddChore} />
    </div>
  );
};

export default AddOrEditChore;
