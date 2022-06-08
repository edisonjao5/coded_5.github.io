/**
 *
 * Quotation
 *
 */
import React, { useState } from 'react';

import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { Form as ExForm } from 'components/ExForm';
import WithLoading from 'components/WithLoading';
import DetailForm from './DetailForm';
import DetailView from './DetailView';
import QuotaForm from './Quota';
import model from '../../model';
import { updateQuotation } from '../actions';

const SyncMessage = WithLoading();

export function PhaseCreationForm({
  selector,
  selectorProject,
  onSubmit,
  onCancel,
  dispatch,
}) {
  const { project = {} } = selectorProject;
  const { quotation = {}, ...restSelector } = selector;
  const [step, setStep] = useState(1);

  const initialValues = model({ project, entity: quotation });

  const defaultPercent = {
    ContadoMontoPromesa: project.ContadoMontoPromesa || 20,
    ContadoMontoCuotas: project.ContadoMontoCuotas || 20,
    ContadoMontoEscrituraContado: project.ContadoMontoEscrituraContado || 20,
    ContadoAhorroPlus: project.ContadoAhorroPlus || 20,
    CreditoMontoPromesa: project.CreditoMontoPromesa || 20,
    CreditoMontoCuotas: project.CreditoMontoCuotas || 20,
    CreditoMontoEscrituraContado: project.CreditoMontoEscrituraContado || 20,
    CreditoAhorroPlus: project.CreditoAhorroPlus || 20,
  }

  let directAfterSubmitted = 'list';

  return (
    <ExForm
      initialValues={initialValues}
      onSubmit={values => {
        if (step === 2) {
          const Inmuebles = values.Inmuebles.map(inmueble=>({
            ...inmueble,
            Discount: inmueble.Discount === "" ? 0 : inmueble.Discount,
          }));
          values.Inmuebles = Inmuebles;

          onSubmit(values, directAfterSubmitted);
        }
        else {
          dispatch(updateQuotation(values));
          setStep(2);
        }
      }}
      validationSchema={{
        Inmuebles: Yup.array().required('Debe seleccionar inmuebles'),
      }}
    >
      {form => {
        const { submitForm } = form;
        return (
          <>
            <h4 className="font-21">{project.Name}</h4>
            <h5 className="mb-3 font-16 d-flex align-items-center justify-content-between">
              <span className="line-height-1">Nueva Cotización</span>
              <span className="font-14 line-height-1">
                {quotation.Folio && <b>FOLIO : {quotation.Folio}</b>}
              </span>
            </h5>

            <SyncMessage {...restSelector} />
            {step === 1 && (
              <DetailForm
                onCancel={onCancel}
                onContinue={submitForm}
                form={form}
              />
            )}
            {step === 2 && (
              <>
                <DetailForm form={form} />
                <QuotaForm
                  form={form}
                  onCancel={onCancel}
                  goReserva={() => {
                    directAfterSubmitted = 'reserva';
                    submitForm();
                  }}
                  defaultPercent={defaultPercent}
                />
              </>
            )}
          </>
        );
      }}
    </ExForm>
  );
}

PhaseCreationForm.propTypes = {
  selector: PropTypes.object,
  selectorProject: PropTypes.object,
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,
  dispatch: PropTypes.func,
};

export default PhaseCreationForm;
