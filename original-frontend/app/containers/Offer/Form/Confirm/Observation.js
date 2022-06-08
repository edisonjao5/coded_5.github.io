/**
 *
 * Offer Form
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import Alert from 'components/Alert';

export function OfferConfirmObservation({ entity, onChange }) {
  const { Condition = [] } = entity;
  return (
    <>
      {Condition.length > 0 && (
        <Alert type="warning">
          Debes seleccionar las observaciones importantes
        </Alert>
      )}
      {Condition.map((condition, index) => (
        <Alert
          onChange={isChecked => {
            Condition[index] = { ...condition, IsImportant: isChecked };
            onChange(Condition);
          }}
          key={condition.ConditionID}
          checked={condition.IsImportant}
        >
          {condition.Description}
        </Alert>
      ))}
    </>
  );
}

OfferConfirmObservation.propTypes = {
  entity: PropTypes.object,
  onChange: PropTypes.func,
};

export default OfferConfirmObservation;
