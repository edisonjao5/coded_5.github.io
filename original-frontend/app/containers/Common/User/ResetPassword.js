/**
 *
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Modal, ModalBody, ModalHeader, ModalFooter } from 'components/Modal';
import WithLoading from 'components/WithLoading';
import Button from 'components/Button';

const SyncMessage = WithLoading();

function ResetPassword({ selector, onHide }) {
  return (
    <Modal isOpen={selector.screen === 'resetPassword'} scrollable>
      <ModalHeader>Restablecer contraseña</ModalHeader>
      <ModalBody>
        <div className="p-3">
          <SyncMessage {...selector} timeout={0} />
        </div>
      </ModalBody>
      <ModalFooter>
        <Button
          disabled={selector.loading}
          className="ml-2"
          color="white"
          onClick={onHide}
        >
          Cancelar
        </Button>
      </ModalFooter>
    </Modal>
  );
}

ResetPassword.propTypes = {
  selector: PropTypes.object,
  onHide: PropTypes.func,
};

export default ResetPassword;
