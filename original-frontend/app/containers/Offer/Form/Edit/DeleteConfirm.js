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

const DeleteConfirm = ({ isOpen, onConfirm, onHide }) => {
  const { project = {} } = window;
  return (
    <Modal size="xl" isOpen={isOpen}>
      <ModalHeader>
        {`${project.Name} / ${project.Symbol}`}
        <br />
        <span className="color-warning">Dar de Baja la Oferta</span>
      </ModalHeader>
      <ModalBody className="p-3">
        <Alert type="danger">
          El modificar algunos datos implicará cambios importantes en el
          proceso.
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

DeleteConfirm.propTypes = {
  isOpen: PropTypes.bool,
  onHide: PropTypes.func,
  onConfirm: PropTypes.func,
};

export default DeleteConfirm;
