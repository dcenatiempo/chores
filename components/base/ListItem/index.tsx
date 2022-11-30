import { FC } from 'react';
import Button from '../Button';
// import styles from './ListItem.module.css';

export interface ListItemProps {
  children: React.ReactNode;
  onClick?: () => void;
}

const ListItem: FC<ListItemProps> = ({ children, onClick }) => {
  if (onClick)
    return (
      <Button type="invisible" onClick={onClick}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            padding: 10,
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingLeft: 10,
            paddingRight: 10,
            columnGap: 10,
          }}
        >
          {children}
        </div>
      </Button>
    );
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        padding: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10,
        columnGap: 10,
      }}
    >
      {children}
    </div>
  );
};

export default ListItem;

const styles = {
  listItem: {
    display: 'flex',
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    columnGap: 10,
  },
};
