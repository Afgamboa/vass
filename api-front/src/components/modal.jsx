import React from "react";
import Modal from 'react-bootstrap/Modal';

function ModalProfile({show, handleClose}) {
  return (
    <Modal show={show} onHide={handleClose} backdrop={'static'}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          
         <button>
          hola
         </button>
        </Modal.Footer>
      </Modal>
  );
}

export default ModalProfile;
