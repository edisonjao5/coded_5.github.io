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
import ReviewInmuebleList from './InmuebleList';

const SyncMessage = WithLoading();

function InmuebleReview({ selector, onSave, onHide }) {
  const { loading, reviewInmuebles, screen } = selector;
  return (
    <Modal
      isOpen={screen === 'review'}
      size="xl"
      scrollable
      id="seleccion_inmuebles_modal"
    >
      <ModalHeader>Inmuebles</ModalHeader>
      <ModalBody>
        {loading && <SyncMessage {...selector} />}
        {!loading && reviewInmuebles && (
          <ReviewInmuebleList entities={reviewInmuebles} />
        )}
      </ModalBody>
      <ModalFooter>
        {reviewInmuebles && (
          <Button loading={loading} disabled={loading} onClick={onSave}>
            Guardar y continuar
          </Button>
        )}
        <Button
          disabled={loading}
          onClick={onHide}
          type="reset"
          className="font-14-rem shadow-sm m-btn m-btn-white ml-2"
        >
          Volver
        </Button>
      </ModalFooter>
    </Modal>
  );
}

InmuebleReview.propTypes = {
  selector: PropTypes.object,
  onSave: PropTypes.func,
  onHide: PropTypes.func,
};

export default InmuebleReview;
