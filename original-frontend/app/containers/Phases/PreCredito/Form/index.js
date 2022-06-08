/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import { push } from 'connected-react-router';
import { Box, BoxContent, BoxHeader } from 'components/Box';
import Button from 'components/Button';
import Tab from 'components/Tab';
import { Form as ExForm } from 'components/ExForm';
import { calculates } from 'containers/Phases/FormaDePago/helper';
import { isCreditPayment } from 'containers/App/helpers';
import Labor from './Labor';
import Codeudor from './Codeudor';
import Patrimony from './Patrimony';
import CoPatrimony from './CoPatrimony';
import Renta from './Renta';
import Summary from './Summary';
import { calculateRenta } from '../helper';
const PhasePreCreditoForm = ({
  isConfirmed,
  step,
  initialValues,
  onSubmit,
  dispatch,
}) => (
  <ExForm initialValues={initialValues} onSubmit={onSubmit}>
    {form => {
      const { values, submitForm } = form;
      const isCredit = isCreditPayment(values.PayType);
      const { IsCompany=false } = values.Cliente;

      let new_moneyErr = false;
      if (isCredit) {
        const { moneyErr, SumRenta } = calculateRenta(values);
        const { total, discount } = calculates(values);
        new_moneyErr = moneyErr && Math.floor(total - discount) >= SumRenta;
      }

      const PatrimonyTabs =  [{
        label: 'Deudor', content: ( <Patrimony form={form} readOnly={step == 3}/> ),
      }]
    
      if(values.Codeudor)
        PatrimonyTabs.push({
          label: 'Co-deudor', content: ( <CoPatrimony form={form} readOnly={step == 3}/> ),
        });

      return (
        <>
          { isCredit && (
            <Box collapse isOpen={!values.ReservaID}>
              <BoxHeader>
                <b>PRE APROBACIÓN DE CRÉDITO</b>
              </BoxHeader>
              <BoxContent>
                <div className="container-content bg-white pl-3 pr-3 pb-3">                  
                  {!IsCompany && ( <>
                    <article className="person-record pt-3">
                      <Labor values={values} group="Cliente" readOnly={step == 3}/>
                      <Renta group="Cliente" form={form}  readOnly={step == 3}/>
                    </article>

                    {values.Codeudor && (
                      <Codeudor
                        form={form}
                        removeCodeudor={evt => {
                          evt.preventDefault();
                          form.setFieldValue('Codeudor', null);
                          form.setFieldValue('CodeudorID', null);
                          form.setFieldValue('CoEmpleador', null);
                        }}
                        readOnly={step == 3}
                      />
                    )}
                  </>)}
                  {(step > 1 || values.ReservaID) && <Tab tabs={PatrimonyTabs} />}
                </div>
              </BoxContent>
              {values.Codeudor && <Summary form={form} />}
            </Box>
          )}
          {step < 3 && (
            <div className="p-3 d-flex align-items-center after-expands-2">
              <span className="order-1 font-14-rem">
                <b>RESERVA </b>| Paso {step} de 3
              </span>
              <Button
                disabled={new_moneyErr || !isConfirmed}
                className="order-3"
                onClick={evt => {
                  evt.preventDefault();
                  submitForm();
                }}
              >
                {step === 2 ? 'Continuar' : 'Continuar y Agregar Patrimonio'}
              </Button>

              <Button
                onClick={evt => {
                  evt.preventDefault();
                  dispatch(
                    push(`/proyectos/${values.ProyectoID}/cotizaciones`),
                  );
                }}
                className="order-3"
                color="white"
              >
                Cancelar
              </Button>
            </div>
          )}
        </>
      );
    }}
  </ExForm>
);

PhasePreCreditoForm.propTypes = {
  isCollapse: PropTypes.bool,
  isConfirmed: PropTypes.bool,
  step: PropTypes.number,
  initialValues: PropTypes.object,
  onSubmit: PropTypes.func,
  dispatch: PropTypes.func,
};
export default PhasePreCreditoForm;
