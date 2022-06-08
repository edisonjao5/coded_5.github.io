/**
 *
 * Restriction
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import { Modal, ModalBody, ModalFooter, ModalHeader } from 'components/Modal';
import Button from 'components/Button';
import Thead from 'components/Table/Thead';
import ControlUItem from './ControlUserItem';

export function ControlUserModal({ ControlUserItems, onHide, isOpen = false, query, onQuery }) {
  return (
    <>
      <Modal
        isOpen={isOpen}
        size="xl"
        scrollable
      >
        <ModalHeader>Control de Usuarios</ModalHeader>
        <ModalBody className="">
          <table className="table table-responsive-sm table-fixed table-sm m-0 border-bottom">
            <Thead
              ths={[
                { field: 'UserName', label: 'Nombre', sortable: true },
                { field: 'Role', label: 'Rol', className: "pl-3", sortable: true },
                { field: 'Pendientes', label: 'Pendientes', sortable: true },
                { field: 'Dias', label: 'Días atraso', sortable: true },
                { field: 'Average', label: 'Atraso promedio',sortable: true },
                { field: '', label: '' },
              ]}
              onQuery={onQuery}
              query={query}
            />
            <tbody>
              {ControlUserItems && (
                ControlUserItems.map((useraction, index) => (
                  <ControlUItem key={index} userAction={useraction} />
                ))
              )}
            </tbody>
          </table>
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

ControlUserModal.propTypes = {
  ControlUserItems: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
  onHide: PropTypes.func,
  isOpen: PropTypes.bool,
};

export default ControlUserModal;
