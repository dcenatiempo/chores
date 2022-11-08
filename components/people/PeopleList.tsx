import { FC } from 'react';
import { Person } from '../../libs/store/models/orgs/types';
import List from '../base/List';
import PersonListItem from './PersonListItem';

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
        <PersonListItem
          onClickDelete={onClickDelete}
          key={person.firstName}
          person={person}
        />
      )}
    />
  );
};

export default PeopleList;
