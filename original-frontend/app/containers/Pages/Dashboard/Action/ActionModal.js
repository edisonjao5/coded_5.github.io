/**
 *
 * Restriction
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import { Modal, ModalBody, ModalFooter, ModalHeader } from 'components/Modal';
import Button from 'components/Button';
import { Box } from 'components/Box';
import ActionItem from './ActionItem';

export function ActionModal({ actionModal, onHide }) {
  return (
    <>
      <Modal
        isOpen={actionModal.open}
        size="xl"
        scrollable
      >
        <ModalHeader>Acciones Pendientes {actionModal.header}</ModalHeader>
        <ModalBody className="px-2 py-0">
          {actionModal.actions && (actionModal.actions.length > 0) && (
            actionModal.actions.map((values, key) => (
              <ActionItem key={key} Action={values} />
            ))
          )}
          {/* <SyncMessage {...restSelector} /> */}
        </ModalBody>
        <ModalFooter>
          <Button color="white" onClick={onHide}>
            Volver
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

ActionModal.propTypes = {
  actionModal: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  onHide: PropTypes.func,
};

export default ActionModal;
