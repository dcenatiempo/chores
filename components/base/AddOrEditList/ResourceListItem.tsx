import { DeleteButton, EditButton } from '../../buttons';
import ListItem from '../ListItem';

interface ResourceListItemProps<T> {
  resource: T;
  renderResource: (resource: T) => React.ReactNode;
  onClickDelete?: (resource: T) => void;
  onClickEdit?: (resource: T) => void;
}

export interface CanDelete {
  noDelete?: boolean;
}
function ResourceListItem<T>({
  resource,
  renderResource,
  onClickDelete,
  onClickEdit,
}: React.PropsWithChildren<ResourceListItemProps<T & CanDelete>>) {
  function onClickDeleteResource() {
    onClickDelete?.(resource);
  }

  function onClickEditResource() {
    onClickEdit?.(resource);
  }

  return (
    <ListItem>
      {renderResource(resource)}
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          columnGap: 10,
        }}
      >
        {onClickEdit ? <EditButton onClick={onClickEditResource} /> : null}
        {onClickDelete ? (
          <DeleteButton
            disabled={!!resource.noDelete}
            onClick={onClickDeleteResource}
          />
        ) : null}
      </div>
    </ListItem>
  );
}

export default ResourceListItem;
