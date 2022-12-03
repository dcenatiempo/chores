import { FC, useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { useSSR, usePortal } from '../../../libs/hooks';
import { useScreenSize } from '../../../libs/store/appState/useAppState';
import { IconName } from '../Icon';
import IconButton from '../IconButton';
import styles from './Modal.module.css';

export interface ModalProps {
  children?: React.ReactNode;
  onClose: () => void;
  title: React.ReactNode;
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
  const { isSmallScreen } = useScreenSize();
  const portal = usePortal('modal-root');
  const { isBrowser } = useSSR();
  const [closing, setClosing] = useState(false);
  console.log('closing', closing);

  function onClickClose() {
    setClosing(true);
    setTimeout(
      () => {
        setClosing(false);
        onClose();
      },
      isSmallScreen ? 200 : 95
    );
  }

  const modalContent = (
    <>
      <div
        className={`${styles.overlay} ${closing ? styles.closing : ''}  ${
          isSmallScreen ? styles.smallScreen : ''
        }`}
        onClick={onClose}
      />
      <div
        className={`${styles.modalWrapper} ${
          isSmallScreen ? styles.smallScreen : ''
        }`}
      >
        <div className={`${styles.modal} ${closing ? styles.closing : ''}`}>
          <div className={styles.header}>
            {title && <div className={styles.title}>{title}</div>}

            <IconButton
              type="invisible"
              iconName={IconName.X}
              onClick={onClickClose}
            />
          </div>
          <div className={styles.body}>{children}</div>
        </div>
      </div>
    </>
  );

  if (!portal || !isBrowser) return null;
  return ReactDOM.createPortal(modalContent, portal);
};
