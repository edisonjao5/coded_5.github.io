/**
 *
 * Project
 *
 */
import React from 'react';

import PropTypes from 'prop-types';
import Button from 'components/Button';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'components/Modal';
import WithLoading from 'components/WithLoading';
import InmuebleList from './InmuebleList';
import { selectEntity } from './actions';

const SyncMessage = WithLoading();

function InmuebleModal({
  isOpen,
  defaultShowType = 'list',
  selector,
  onSelect,
  onHide,
  dispatch,
}) {
  const { entities, loading } = selector;

  return (
    <Modal isOpen={isOpen} size="xl" scrollable id="seleccion_inmuebles_modal">
      <ModalHeader>Inmuebles</ModalHeader>
      <ModalBody>
        {loading && <SyncMessage {...selector} />}
        {!loading && entities && (
          <InmuebleList
            defaultShowType={defaultShowType}
            entities={entities}
            onSelectItem={
              onSelect ? entity => dispatch(selectEntity(entity)) : null
            }
          />
        )}
      </ModalBody>
      <ModalFooter>
        {onSelect && (
          <Button disabled={loading} onClick={onSelect}>
            Seleccionados
          </Button>
        )}
        <Button disabled={loading} onClick={onHide} type="reset" color="white">
          Volver
        </Button>
      </ModalFooter>
    </Modal>
  );
}

InmuebleModal.propTypes = {
  defaultShowType: PropTypes.string,
  isOpen: PropTypes.bool,
  selected: PropTypes.array,
  selector: PropTypes.object,
  onHide: PropTypes.func,
  onSelect: PropTypes.func,
  dispatch: PropTypes.func,
};

export default InmuebleModal;
