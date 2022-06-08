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

function ActiveUser({ selector, onHide }) {
  return (
    <Modal isOpen={selector.screen === 'activeUser'} scrollable>
      <ModalHeader>Activar/desactivar</ModalHeader>
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

ActiveUser.propTypes = {
  selector: PropTypes.object,
  onHide: PropTypes.func,
};

export default ActiveUser;
