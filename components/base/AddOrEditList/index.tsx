import { useState } from 'react';
import { AddButton, SaveButton } from '../../buttons';
import Button from '../Button';
import Card from '../Card';
import Modal from '../Modal';
import ResourceList from './ResourceList';

export interface AddOrEditResourceListProps<T> {
  resources: T[] | undefined;
  onClickAdd?: () => void;
  onClickSave?: () => void;
  onClickDelete?: (resource: T) => void;
  editResource?: (resource: T) => void;
  resourceName: string | string[];
  renderResource: (resource: T) => React.ReactNode;
  keyExtractor: (item: T, index: number) => string;
  addOrEditResource: React.ReactNode;
  setResourceToEdit?: (resource?: T) => void;
  disabled: boolean;
}

type Modals = 'none' | 'add' | 'edit';

function AddOrEditResourceList<T>({
  resources = [],
  resourceName,
  onClickAdd,
  onClickSave,
  onClickDelete,
  renderResource,
  keyExtractor,
  addOrEditResource,
  setResourceToEdit,
  disabled,
}: React.PropsWithChildren<AddOrEditResourceListProps<T>>) {
  const [showModal, setShowModal] = useState<Modals>('none');
  const resourceNameArray = Array.isArray(resourceName)
    ? resourceName
    : [resourceName, `${resourceName}s`];
  const [singularName, pluralName] = resourceNameArray;

  function _onClickAdd() {
    setShowModal('none');
    onClickAdd?.();
  }

  function _onClickSave() {
    setShowModal('none');
    onClickSave?.();
  }

  function _onClickEdit(resource: T) {
    setResourceToEdit?.(resource);
    setShowModal('edit');
  }

  function _onClickDelete(resource: T) {
    onClickDelete?.(resource);
  }

  return (
    <>
      <Card>
        <>
          <div style={{ paddingLeft: 10, paddingRight: 10, fontSize: 20 }}>
            {pluralName}
          </div>
          <ResourceList
            resources={resources}
            renderResource={renderResource}
            onClickDelete={onClickDelete ? _onClickDelete : undefined}
            onClickEdit={
              setResourceToEdit && onClickSave ? _onClickEdit : undefined
            }
            keyExtractor={keyExtractor}
          />
          {onClickAdd ? (
            <Button
              onClick={() => setShowModal('add')}
              label={`Add ${singularName}`}
            />
          ) : null}
        </>
      </Card>
      <Modal
        visible={showModal !== 'none'}
        onClose={() => {
          setResourceToEdit?.(undefined);
          setShowModal('none');
        }}
        title={`${showModal === 'edit' ? 'EDIT' : 'ADD'} ${singularName}`}
      >
        {addOrEditResource}

        {showModal === 'add' ? (
          <AddButton disabled={disabled} onClick={_onClickAdd} />
        ) : null}
        {showModal === 'edit' ? (
          <SaveButton disabled={disabled} onClick={_onClickSave} />
        ) : null}
      </Modal>
    </>
  );
}

export default AddOrEditResourceList;
