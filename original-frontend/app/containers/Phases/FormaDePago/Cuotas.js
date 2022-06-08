/**
 *
 * Cuotas
 *
 */

import React from 'react';

import PropTypes from 'prop-types';

import { Modal } from 'components/Modal';
import CuotasView from './CuotasView';
import CuotasForm from './CuotasForm';

function Cuotas({ form, isOpen, onHide, onView, onEdit }) {
  const { values, setValues } = form;

  return (
    <Modal isOpen={isOpen !== 0} size="xl" scrollable>
      {isOpen === 1 && (
        <CuotasForm form={form} onView={onView} onHide={onView} />
      )}
      {isOpen === 2 && (
        <CuotasView values={values} 
                    onEdit={onEdit} onHide={onHide} 
                    onSetCuotas={cuotas => 
                      setValues({...values, printCuotas: cuotas})
                    }
        />
      )}
    </Modal>
  );
}

Cuotas.propTypes = {
  isOpen: PropTypes.number,
  onHide: PropTypes.func.isRequired,
  onView: PropTypes.func,
  onEdit: PropTypes.func,
  form: PropTypes.object,
};

export default Cuotas;
