import List from '../List';
import ResourceListItem, { CanDelete } from './ResourceListItem';

export interface ResourceListProps<T> {
  resources: T[] | undefined;
  renderResource: (resource: T) => React.ReactNode;
  keyExtractor: (item: T, index: number) => string;
  onClickDelete?: (resource: T) => void;
  onClickEdit?: (resource: T) => void;
}

function ResourceList<T>({
  resources = [],
  renderResource,
  keyExtractor,
  onClickDelete,
  onClickEdit,
}: React.PropsWithChildren<ResourceListProps<T & CanDelete>>) {
  return (
    <List
      items={resources}
      keyExtractor={keyExtractor}
      renderItem={(resource) => (
        <ResourceListItem
          onClickDelete={onClickDelete}
          onClickEdit={onClickEdit}
          resource={resource}
          renderResource={(resource) => renderResource(resource)}
        />
      )}
    />
  );
}

export default ResourceList;
