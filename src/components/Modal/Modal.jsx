import { useEffect } from "react";

import { Overlay, ModalWinow } from "./Modal.styled";


export const Modal = ({ children, onClose }) => {

  useEffect(() => {
    const handleKeyDown = event => {
      if (event.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    }
  }, [onClose])

  const handleBackdropClick = event => {
    if (event.currentTarget === event.target) { 
      onClose(); 
    }
  }

  return(
    <Overlay onClick={handleBackdropClick}>
      <ModalWinow> {children}  </ModalWinow>
    </Overlay>
  )
};