import { FC, useMemo } from 'react';
import Card from '../Card';
import ListItem from '../ListItem';
import styles from './List.module.css';

export interface ListProps<T> {
  items: T[] | undefined;
  keyExtractor: (item: T, index: number) => string;
  renderItem: (item: T, index: number) => React.ReactNode;
  hideSeparator?: boolean;
}

function List<T>({
  items = [],
  keyExtractor,
  renderItem,
  hideSeparator = false,
}: React.PropsWithChildren<ListProps<T>>) {
  return (
    <>
      {items.map((item, i) => {
        const renderedItem = renderItem(item, i);
        const style = (() => {
          if (hideSeparator) return '';
          return i < items.length - 1 ? styles.separator : '';
        })();
        return (
          <div key={keyExtractor(item, i)} className={style}>
            {renderedItem}
          </div>
        );
      })}
    </>
  );
}

export default List;
