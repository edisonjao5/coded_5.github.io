/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';

import PhasePreCreditoForm from './Form';
import PhasePreCreditoView from './View';
const PhasePreCredito = ({
  isCollapse,
  isConfirmed,
  canEdit,
  canEditCredit,
  step,
  initialValues,
  isPendienteAprobacion,
  onContinue,
  dispatch,
  showScreen,
  promesa,
}) => {
  if (showScreen === 'form')
    return (
      <PhasePreCreditoForm
        isCollapse={isCollapse}
        isConfirmed={isConfirmed}
        initialValues={initialValues}
        step={step}
        dispatch={dispatch}
        onSubmit={onContinue}
      />
    );
  return (
    <PhasePreCreditoView
      isCollapse={isCollapse}
      initialValues={initialValues}
      canEdit={canEdit}
      canEditCredit={canEditCredit}
      isPendienteAprobacion={isPendienteAprobacion}
      onSubmit={onContinue}
      dispatch={dispatch}
      promesa={promesa}
    />
  );
};

PhasePreCredito.propTypes = {
  isCollapse: PropTypes.bool,
  isConfirmed: PropTypes.bool,
  showScreen: PropTypes.string,
  canEdit: PropTypes.bool,
  canEditCredit: PropTypes.bool,
  step: PropTypes.number,
  initialValues: PropTypes.object,
  onContinue: PropTypes.func,
  dispatch: PropTypes.func,
  promesa: PropTypes.bool,
};
export default PhasePreCredito;
