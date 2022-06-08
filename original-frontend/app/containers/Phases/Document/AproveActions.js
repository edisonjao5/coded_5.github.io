/**
 *
 * Reservation Upload Form
 *
 */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'components/Button';

export function CarpetaDigitalAproveActions({
  selector,
  onAproveModification,
  onCancel
}) {
  const { loading } = selector;
  const [withText, setWithText] = useState({ text: '', open: false });

  return (
    <div className="d-flex py-3 after-expands-2 align-items-center">
      <Button
        disabled={loading}
        className="order-3 m-btn mr-2"
        onClick={() => onAproveModification()}
      >
        Apruebo cambio hecho por VN 
      </Button>
      <Button
        disabled={loading}
        className="order-3 m-btn m-btn-white mr-2"
        onClick={onCancel}
      >
        Cancelar
      </Button>
    </div>
  );
}

CarpetaDigitalAproveActions.propTypes = {
  selector: PropTypes.object,
  onAproveModification: PropTypes.func,
  onCancel: PropTypes.func,
};

export default CarpetaDigitalAproveActions;
