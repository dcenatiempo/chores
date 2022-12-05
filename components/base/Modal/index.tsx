import { FC, useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { useSSR, usePortal, useInterval } from '../../../libs/hooks';
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
  const [hidden, setHidden] = useState(true);

  function onClickClose() {
    setHidden(true);

    setTimeout(
      () => {
        onClose();
      },
      isSmallScreen ? 501 : 151
    );
  }

  useEffect(() => {
    if (!portal || !isBrowser) return;
    setTimeout(() => {
      onClickOpen();
    }, 50);
  }, [isBrowser, portal]);

  function onClickOpen() {
    setHidden(false);
  }

  const modalContent = (
    <>
      <div
        className={`${styles.overlay} ${hidden ? styles.hidden : ''}  ${
          isSmallScreen ? styles.smallScreen : ''
        }`}
        onClick={onClickClose}
      />
      <div
        className={`${styles.modalWrapper} ${
          isSmallScreen ? styles.smallScreen : ''
        }`}
      >
        <div className={`${styles.modal} ${hidden ? styles.hidden : ''}`}>
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
