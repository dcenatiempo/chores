import { FC, useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { useSSR, usePortal } from '../../../libs/hooks';
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

  const modalWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isBrowser) return;
    window.addEventListener('click', backDropHandler);

    return () => window.removeEventListener('click', backDropHandler);
  }, [isBrowser]);

  function backDropHandler(e: MouseEvent) {
    if (!e) return;
    // @ts-expect-error
    if (!modalWrapperRef?.current?.contains(e.target)) {
      onClose();
    }
  }

  function handleCloseClick(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    onClose();
  }

  const modalContent = (
    <div className={styles.overlay}>
      <div className={styles.modalWrapper} ref={modalWrapperRef}>
        <div className={styles.modal}>
          <div className={styles.header}>
            <a href="#" onClick={handleCloseClick}>
              x
            </a>
          </div>
          {title && <div className={styles.title}>{title}</div>}
          <div className={styles.body}>{children}</div>
        </div>
      </div>
    </div>
  );

  if (!portal || !isBrowser) return null;
  return ReactDOM.createPortal(modalContent, portal);
};
