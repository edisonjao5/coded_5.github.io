/**
 *
 * AlertPopup
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'components/Modal';
import Button from 'components/Button';
import Alert from 'components/Alert';

const ReplaceConfirm = ({ isOpen, onConfirm, onHide }) => {
  return (
    <Modal size="s" isOpen={isOpen}>
      <ModalHeader>
        <span className="color-warning"> Replace </span>
      </ModalHeader>
      <ModalBody className="p-3">
        <Alert type="danger">
          Existen inmuebles que están en medio de un proceso de venta, estas seguro que quieres modificarlos?
        </Alert>
      </ModalBody>
      <ModalFooter>
        <Button onClick={onConfirm}>Confirmar</Button>
        <Button className="m-btn-white" onClick={onHide}>
          Cancelar
        </Button>
      </ModalFooter>
    </Modal>
  );
};

ReplaceConfirm.propTypes = {
  isOpen: PropTypes.bool,
  onHide: PropTypes.func,
  onConfirm: PropTypes.func,
};

export default ReplaceConfirm;
