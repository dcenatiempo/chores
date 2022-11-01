import { FC } from 'react';
import styles from './Card.module.css';

export interface CardProps {
  children?: React.ReactNode;
}

const Card: FC<CardProps> = ({
  children,
}) => {
  return (
    <div className={styles.card }>
        {children}
    </div>
  );
};

export default Card;
