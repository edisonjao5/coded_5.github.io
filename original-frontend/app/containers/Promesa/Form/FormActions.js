/**
 *
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import Button from 'components/Button';

export function FormActions({ canEdit, onEdit, onCancel }) {
  return (
    <div className="d-flex after-expands-2 align-items-center">
      {canEdit && (
        <Button className="order-3 m-btn  mr-2 m-btn-pen" onClick={onEdit}>
          Modificación
        </Button>
      )}
      <Button
        className="order-3 m-btn m-btn-white"
        type="submit"
        onClick={onCancel}
      >
        Cancelar
      </Button>
    </div>
  );
}

FormActions.propTypes = {
  canEdit: PropTypes.func,
  onEdit: PropTypes.func,
  onCancel: PropTypes.func,
};

export default FormActions;
