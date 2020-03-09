import React from 'react';
import { createPortal } from 'react-dom';
import { CSSTransition } from 'react-transition-group';

import Backdrop from './Backdrop';
import './Modal.css';

type ModalOverlay = {
  className?: string,
  headerClass?: string,
  header: string,
  onSubmit?: () => void,
  contentClass?: string,
  footerClass?: string,
  footer: React.ReactNode,
};

const ModalOverlay:React.FC<ModalOverlay> = props => {
  const content = (
    <div className={`modal ${props.className}`}>
      <header className={`modal__header ${props.headerClass}`}>
        <h2>{props.header}</h2>
      </header>
      <form
        onSubmit={
          props.onSubmit ? props.onSubmit : event => event.preventDefault()
        }
      >
        <div className={`modal__content ${props.contentClass}`}>
          {props.children}
        </div>
        <footer className={`modal__footer ${props.footerClass}`}>
          {props.footer}
        </footer>
      </form>
    </div>
  );

  return createPortal(
    content,
    document.getElementById('modal-hook')!
  );
};

type Modal = {
  show: boolean,
  onCancel: () => void,
  header: string,
  contentClass?: string,
  footerClass?: string,
  footer: React.ReactNode,
};

const Modal:React.FC<Modal> = props => (
  <>
    {props.show && <Backdrop onClick={props.onCancel} />}
    <CSSTransition
      in={props.show}
      mountOnEnter
      unmountOnExit
      timeout={200}
      classNames="modal"
    >
      <ModalOverlay {...props} />
    </CSSTransition>
  </>
);

export default Modal;
