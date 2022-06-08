/**
 *
 * Reservation Upload Form
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import PhaseObservationForm from 'containers/Phases/Observation/Form';

function PromesaObservationForm({ form }) {
  return <PhaseObservationForm form={form} />;
}

PromesaObservationForm.propTypes = {
  form: PropTypes.object,
};

export default PromesaObservationForm;
