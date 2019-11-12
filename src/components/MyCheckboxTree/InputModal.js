import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const InputModal = (props) => {
  const {
    isOpen,
    onOk,
    onCancel,
    className,
    inputValue,
    onChangeInput,
    inputValueCanBeAddedToNodes
  } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);
  console.log('inputValueCanBeAddedToNodes', inputValueCanBeAddedToNodes);
  
  return (
    <div>
      {/* <Button color="danger" onClick={toggle}>{buttonLabel}</Button> */}
      <Modal isOpen={isOpen} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Modal title</ModalHeader>
        <ModalBody>
            <input type="text" value={inputValue} onChange={onChangeInput} />
        </ModalBody>
        <ModalFooter>
          <Button color="primary" disabled={!inputValueCanBeAddedToNodes} onClick={onOk}>Add</Button>{' '}
          <Button color="secondary" onClick={onCancel}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default InputModal;