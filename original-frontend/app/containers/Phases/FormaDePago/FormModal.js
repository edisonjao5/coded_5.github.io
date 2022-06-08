/**
 *
 * Forma Form
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import Button from 'components/Button';
import { Modal, ModalFooter, ModalHeader, ModalBody } from 'components/Modal';

import PhaseFormaDePagoForm from './Form';

function FormModal({ form, onHide, onUpdate, isOpen }) {
  return (
    <>
      <Modal isOpen={isOpen} size="xl" scrollable>
        <ModalHeader>Editar Cuotas</ModalHeader>
        <ModalBody className="p-3">
          <PhaseFormaDePagoForm form={form} />
        </ModalBody>
        <ModalFooter>
          <Button className="ml-2" onClick={onUpdate}>
            Guardar
          </Button>
          <Button className="ml-2" color="white" onClick={onHide}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

FormModal.propTypes = {
  isOpen: PropTypes.bool,
  form: PropTypes.object,
  onHide: PropTypes.func,
  onUpdate: PropTypes.func,
};

export default FormModal;
