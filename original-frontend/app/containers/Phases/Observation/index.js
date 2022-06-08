/**
 *
 * Offer Form
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import Alert from 'components/Alert';

export function PhaseObservation({ entity, isReview, onChange }) {
  const { Condition = [] } = entity;
  // if (isReview)
  //   return (
  //     <>
  //       {Condition.length > 0 && (
  //         <Alert type="warning">
  //           Debes seleccionar las observaciones importantes
  //         </Alert>
  //       )}
  //       {Condition.map((condition, index) => {
  //         if (condition.IsApprove) return null;
  //         return (
  //           <Alert
  //             onChange={isChecked => {
  //               Condition[index] = { ...condition, IsImportant: isChecked };
  //               onChange(Condition);
  //             }}
  //             key={condition.ConditionID}
  //             checked={condition.IsImportant && !condition.IsApprove}
  //           >
  //             {condition.Description}
  //           </Alert>
  //         );
  //       })}
  //     </>
  //   );
  return Condition.filter(cnd=> cnd.IsImportant).map(condition => (
    <Alert
      type='success'
      key={condition.ConditionID}
      icon={condition.IsApprove ? 'check' : 'alert'}
    >
      {condition.Description}
    </Alert>
  ));
}

PhaseObservation.propTypes = {
  isReview: PropTypes.bool,
  entity: PropTypes.object,
  onChange: PropTypes.func,
};

export default PhaseObservation;
