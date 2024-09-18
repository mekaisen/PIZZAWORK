/* eslint-disable siberiacancode-jsx-a11y/no-static-element-interactions */
/* eslint-disable siberiacancode-jsx-a11y/click-events-have-key-events */
import { createPortal } from 'react-dom';
import clsx from 'clsx';

import styles from './Modal.module.css';

interface ModalPizzaProps {
  className: string
  children: React.ReactNode
  onClose: () => void
}

const Modal = ({ className, children, onClose }: ModalPizzaProps) =>
  (createPortal(
    <>
      <div className={clsx(styles.modal)} onClick={() => onClose()}></div>
      <div className={clsx(styles.modal_content, className)}>{children}</div>
    </>,
    document.body
  ));
;
export { Modal };
