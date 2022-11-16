import { FC } from 'react';
import Button from '../Button';
import styles from './ListItem.module.css';

export interface ListItemProps {
  children: React.ReactNode;
  onClick?: () => void;
}

const ListItem: FC<ListItemProps> = ({ children, onClick }) => {
  if (onClick)
    return (
      <Button type="invisible" onClick={onClick}>
        <div className={styles.listItem}>{children}</div>
      </Button>
    );
  return <div className={styles.listItem}>{children}</div>;
};

export default ListItem;
