import { FC } from 'react';
import { Person } from '../../libs/store/models/orgs/types';
import List from '../base/List';
import PersonRow from './PersonRow';

export interface PeopleListProps {
  people: Person[] | undefined;
  onClickDelete: (person: Person) => void;
}

const PeopleList: FC<PeopleListProps> = ({ people = [], onClickDelete }) => {
  return (
    <List
      items={people}
      keyExtractor={(person) => `${person.firstName + person.lastName}`}
      renderItem={(person) => (
        <PersonRow
          onClickDelete={onClickDelete}
          key={person.firstName}
          person={person}
        />
      )}
    />
  );
};

export default PeopleList;
