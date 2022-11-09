import { FC, useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { useSSR, usePortal } from '../../../libs/hooks';
import { IconName } from '../Icon';
import IconButton from '../IconButton';
import styles from './Modal.module.css';

export interface ModalProps {
  children?: React.ReactNode;
  onClose: () => void;
  title: string;
  visible: boolean;
}

const Modal: FC<ModalProps> = ({ visible, ...rest }) => {
  if (!visible) return null;
  return <ModalContent {...rest} />;
};

export default Modal;

const ModalContent: FC<Omit<ModalProps, 'visible'>> = ({
  onClose,
  children,
  title,
}) => {
  const portal = usePortal('modal-root');
  const { isBrowser } = useSSR();

  const overlayRef = useRef<HTMLDivElement>(null);

  function onClickClose() {
    console.log('y');
    onClose();
  }

  const modalContent = (
    <>
      <div className={styles.overlay} onClick={onClose} />
      <div className={styles.modalWrapper}>
        <div className={styles.modal}>
          <div className={styles.header}>
            <IconButton
              type="invisible"
              iconName={IconName.X}
              onClick={onClickClose}
            />
          </div>
          {title && <div className={styles.title}>{title}</div>}
          <div className={styles.body}>{children}</div>
        </div>
      </div>
    </>
  );

  if (!portal || !isBrowser) return null;
  return ReactDOM.createPortal(modalContent, portal);
};
