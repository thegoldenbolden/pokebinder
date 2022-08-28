import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const Modal = ({ closeModal, children }) => {
 const [mounted, setMounted] = useState(false);
 const modalRef = useRef();

 useEffect(() => {
  setMounted(true);
 }, []);

 if (!mounted) return;

 const close = (e) => {
  e.stopPropagation();
  if (modalRef.current == e.target) {
   closeModal();
  }
 };

 const ModalContent = (
  <div ref={modalRef} className="backdrop" onClick={close}>
   {children}
   <style jsx>
    {`
     .backdrop {
      position: fixed;
      z-index: 1000;
      top: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(0, 0, 0, 0.75);
     }
    `}
   </style>
  </div>
 );

 return createPortal(ModalContent, document.getElementById("modal-root"));
};

export default Modal;
