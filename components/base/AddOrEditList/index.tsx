import { useState } from 'react';
import Button from '../Button';
import Card from '../Card';
import Modal from '../Modal';
import ResourceList from './ResourceList';

export interface AddOrEditResourceProps<T> {
  onSubmitResource: (resource: T) => void;
  initialResource?: T;
}

export interface AddOrEditResourceListProps<T> {
  resources: T[] | undefined;
  addResource: (resource: T) => void;
  deleteResource: (resource: T) => void;
  editResource: (resource: T) => void;
  resourceName: string;
  renderResource: (resource: T) => React.ReactNode;
  keyExtractor: (item: T, index: number) => string;
  AddOrEditResource: React.ElementType<AddOrEditResourceProps<T>>;
}

type Modals = 'none' | 'add' | 'edit';

function AddOrEditResourceList<T>({
  resources = [],
  resourceName,
  addResource,
  deleteResource,
  editResource,
  renderResource,
  keyExtractor,
  AddOrEditResource,
}: React.PropsWithChildren<AddOrEditResourceListProps<T>>) {
  const [showModal, setShowModal] = useState<Modals>('none');
  const [resourceToEdit, setResourceToEdit] = useState<T>();
  return (
    <>
      <Card>
        <>
          <div style={{ paddingLeft: 10, paddingRight: 10, fontSize: 20 }}>
            {resourceName}
          </div>
          <ResourceList
            resources={resources}
            renderResource={renderResource}
            onClickDelete={deleteResource}
            onClickEdit={(resource) => {
              setResourceToEdit(resource);
              setShowModal('edit');
            }}
            keyExtractor={keyExtractor}
          />
          <Button onClick={() => setShowModal('add')} label="Add Person" />
        </>
      </Card>
      <Modal
        visible={showModal !== 'none'}
        onClose={() => {
          setResourceToEdit(undefined);
          setShowModal('none');
        }}
        title={'Hello modal'}
      >
        <AddOrEditResource
          onSubmitResource={(resource) => {
            if (showModal === 'add') addResource(resource);
            if (showModal === 'edit') editResource(resource);
            setResourceToEdit(undefined);
            setShowModal('none');
          }}
          initialResource={showModal === 'edit' ? resourceToEdit : undefined}
        />
      </Modal>
    </>
  );
}

export default AddOrEditResourceList;