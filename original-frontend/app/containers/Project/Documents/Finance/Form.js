/**
 *
 * Project
 *
 */
import React from 'react';

import PropTypes from 'prop-types';
import { BoxFooter } from 'components/Box';
import { Form as ExForm, Field, FormGroup, Label } from 'components/ExForm';
import Button from 'components/Button';
import WithLoading from 'components/WithLoading';
import { Auth } from 'containers/App/helpers';

const SyncMessage = WithLoading();
function FinanceForm({ selector, onSubmit, onReset }) {
  const { loading, entity, ...restSelector } = selector;
  const initialValues = {
    PromesaFirmada:
      entity && entity.PromesaFirmada ? entity.PromesaFirmada : '',
    EscrituraFirmada:
      entity && entity.EscrituraFirmada ? entity.EscrituraFirmada : '',
    CierreGestion: entity && entity.CierreGestion ? entity.CierreGestion : '',
  };

  return (
    <ExForm initialValues={initialValues} onSubmit={values => onSubmit(values)}>
      {({ submitForm }) => (
        <>
          <SyncMessage {...restSelector} />
          <div className="p-0 mt-3 font-14 row">
            <FormGroup className="col-md-6 my-2">
              <Label style={{ width: '13.5em' }}>Contra Firma de Promesa</Label>
              <Field
                name="PromesaFirmada"
                style={{ width: '13.5em' }}
                required
                type="number"
                min={0}
                max={100}
                placeholder="%"
                disabled = {!Auth.isFinanza()}
              />
            </FormGroup>
            <FormGroup className="col-md-6 my-2">
              <Label style={{ width: '13.5em' }}>Firma de Escritura</Label>
              <Field
                name="EscrituraFirmada"
                style={{ width: '13.5em' }}
                required
                min={0}
                max={100}
                type="number"
                placeholder="%"
                disabled = {!Auth.isFinanza()}
              />
            </FormGroup>
            <FormGroup className="col-md-6 my-2">
              <Label style={{ width: '13.5em' }}>Cierre de Operación </Label>
              <Field
                name="CierreGestion"
                style={{ width: '13.5em' }}
                required
                min={0}
                max={100}
                type="number"
                placeholder="%"
                disabled = {!Auth.isFinanza()}
              />
            </FormGroup>
          </div>
          { Auth.isFinanza() &&
            (<BoxFooter inside>
              <Button
                loading={loading}
                disabled={loading}
                onClick={evt => {
                  evt.preventDefault();
                  submitForm();
                }}
              >
                Aceptar
              </Button>
              <Button
                disabled={loading}
                onClick={onReset}
                className="font-14-rem shadow-sm m-btn m-btn-white ml-2"
              >
                Cancelar
              </Button>
            </BoxFooter>)
          }     
        </>
      )}
    </ExForm>
  );
}

FinanceForm.propTypes = {
  selector: PropTypes.object,
  selectorProject: PropTypes.object,
  onSubmit: PropTypes.func,
  onReset: PropTypes.func,
};

export default FinanceForm;
