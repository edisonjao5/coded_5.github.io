/**
 *
 * Offer Form
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import Alert from 'components/Alert';
import { isAprobacionInmobiliariaState } from '../../helper';

export function OfferInFormObservation({ entity }) {
  const { Condition = [] } = entity;
  return (
    <>
      {Condition.find(condition => condition.IsImportant) &&
        (!isAprobacionInmobiliariaState(entity) && (
          <Alert type="warning">
            Revisar todas las condiciones importantes para aprobar oferta
          </Alert>
        ))}
      {Condition.map(condition => (
        <Alert
          type={condition.IsImportant ? 'danger' : 'default'}
          key={condition.ConditionID}
          icon="alert"
        >
          {condition.Description}
        </Alert>
      ))}
    </>
  );
}

OfferInFormObservation.propTypes = {
  entity: PropTypes.object,
};

export default OfferInFormObservation;
