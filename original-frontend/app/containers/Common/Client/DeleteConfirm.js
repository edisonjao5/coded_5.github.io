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

const DeleteConfirm = ({ isOpen, onConfirm, onHide, client }) => {
  if (!client) return null;
  return (
    <Modal size="s" isOpen={isOpen}>
      <ModalHeader>
        { `${client.Name} ${client.LastNames}`}
        <br />
        <span className="color-warning">Eliminar Usuario</span>
      </ModalHeader>
      <ModalBody className="p-3">
        <Alert type="danger">
          {/* El modificar algunos datos implicará cambios importantes en el
          proceso. */}
          ¿Estás seguro de que deseas eliminar a este usuario?
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
