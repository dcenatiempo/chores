import { FC } from 'react';
import styles from './styles.module.css';

interface Props {}

const Footer: FC<Props> = () => {
  return (
    <footer className={styles.footer}>
      <a
        href="https://dcenatiempo.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        Powered by dcenatiempo.com
      </a>
    </footer>
  );
};

export default Footer;
