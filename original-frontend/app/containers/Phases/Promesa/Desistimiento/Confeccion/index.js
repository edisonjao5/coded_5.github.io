import React from 'react';
import PropTypes from 'prop-types';
import { Box, BoxContent, BoxHeader, BoxFooter } from 'components/Box';
import Button from 'components/Button';
import { Form as ExForm } from 'components/ExForm';
import {
  PROMESA_RESCILIACION_STATE,
  PROMESA_STATE,
} from 'containers/App/constants';
import DocumentItem from './DocumentItem';

export function DesistimientoConfeccion({
  canUpload,
  selector,
  promesa,
  onSubmit,
}) {
  let elemName = '';
  switch (promesa.PromesaState) {
    case PROMESA_STATE[17]:
      elemName = 'DocumentResciliacion';
      break;
    case PROMESA_STATE[18]:
      elemName = 'DocumentResolucion';
      break;
    default:
      elemName = '';
  }
  if (!elemName) return null;
  return (
    <ExForm
      initialValues={{
        [elemName]: promesa[elemName] || '',
      }}
      onSubmit={onSubmit}
    >
      {form => (
        <Box>
          <BoxHeader>
            <b className="text-uppercase">{`Confección de ${
              promesa.PromesaState
            }`}</b>
          </BoxHeader>
          <BoxContent>
            <div className="pt-4 pb-4">
              <div className="d-flex align-items-center">
                <span className="font-14-rem mr-3">
                  {form.values[elemName] ? 'Documento' : 'Cargar Documento'}
                </span>
                <DocumentItem canUpload={canUpload} name={elemName} />
              </div>
            </div>
          </BoxContent>
          {canUpload && (
            <BoxFooter>
              <Button
                disabled={
                  selector.loading ||
                  !(form.values[elemName] && form.values[elemName].name)
                }
                onClick={() => form.submitForm()}
              >
                Aceptar
              </Button>
            </BoxFooter>
          )}
        </Box>
      )}
    </ExForm>
  );
}

DesistimientoConfeccion.propTypes = {
  canUpload: PropTypes.bool,
  promesa: PropTypes.object,
  selector: PropTypes.object,
  onSubmit: PropTypes.func,
};

export default DesistimientoConfeccion;
