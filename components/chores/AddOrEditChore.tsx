import { FC } from 'react';
import { Person, Task } from '../../libs/store/models/orgs/types';
import useCurrentOrg from '../../libs/store/models/orgs/useCurrentOrg';
import { TextInput } from '../base';
import MultiselectDropdown from '../base/MultiselectDropdown';

interface AddOrEditChoreProps {
  name: string;
  setName: (name: string) => void;
  people: Person[];
  setPeople: (people: Person[]) => void;
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
}

const AddOrEditChore: FC<AddOrEditChoreProps> = ({
  name,
  setName,
  people,
  setPeople,
  tasks,
  setTasks,
}) => {
  const { peopleArray, tasksArray } = useCurrentOrg();

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
    </div>
  );
};

export default AddOrEditChore;
