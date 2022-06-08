/**
 *
 * Project
 *
 */
import React from 'react';

import PropTypes from 'prop-types';
import { Box, BoxContent, BoxHeader, BoxFooter } from 'components/Box';
import { Form as ExForm, Field, FormGroup, Label } from 'components/ExForm';
import Button from 'components/Button';
import WithLoading from 'components/WithLoading';
import { getPolizaFields } from '../fields';

const SyncMessage = WithLoading();
export function PolizaForm({ selector, selectorProject, onSubmit, onReset }) {
  const { project = {} } = selectorProject;
  const { Aseguradora = {}, ProyectoID } = project;
  const { loading, ...restSelector } = selector;
  const initialValues = {
    ProyectoID,
    Aseguradora: {
      AseguradoraID: Aseguradora.AseguradoraID ? Aseguradora.AseguradoraID : '',
      Amount: Aseguradora.Amount ? Aseguradora.Amount : '',
      ExpirationDate: Aseguradora.ExpirationDate
        ? Aseguradora.ExpirationDate
        : '',
    },
  };
  const fields = getPolizaFields(initialValues);

  return (
    <ExForm initialValues={initialValues} onSubmit={values => onSubmit(values)}>
      {({ submitForm }) => (
        <Box>
          <BoxHeader>
            <b>PÓLIZAS</b>
          </BoxHeader>
          <BoxContent>
            <SyncMessage {...restSelector} />
            <div className="row p-0 m-0 color-regular">
              {fields.map(
                ({ label, name, view, Component = Field, ...attributes }) => (
                  <FormGroup key={name} className="col-md-6 my-2">
                    <Label style={{ width: '13.5em' }}>{label}</Label>
                    <Component
                      name={name}
                      style={{ width: '13.5em' }}
                      {...attributes}
                    />
                  </FormGroup>
                ),
              )}
            </div>
          </BoxContent>
          <BoxFooter>
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
            {Aseguradora.AseguradoraID && (
              <Button
                disabled={loading}
                type="reset"
                onClick={onReset}
                className="font-14-rem shadow-sm m-btn m-btn-white ml-2"
              >
                Cancelar
              </Button>
            )}
          </BoxFooter>
        </Box>
      )}
    </ExForm>
  );
}

PolizaForm.propTypes = {
  selector: PropTypes.object,
  selectorProject: PropTypes.object,
  onSubmit: PropTypes.func,
  onReset: PropTypes.func,
};

export default PolizaForm;
