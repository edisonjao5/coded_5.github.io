import React from 'react';
import PropTypes from 'prop-types';
import { Box, BoxContent, BoxHeader, BoxFooter } from 'components/Box';
import Button from 'components/Button';
import { Form as ExForm } from 'components/ExForm';
import DocumentItem from './DocumentItem';

export function DesistimientoFirmaConfeccion({
  canUpload,
  selector,
  promesa,
  onSubmit,
}) {
  return (
    <ExForm
      initialValues={{
        DocumentResciliacionFirma: promesa.DocumentResciliacionFirma || '',
      }}
      onSubmit={onSubmit}
    >
      {form => (
        <Box>
          <BoxHeader>
            <b className="text-uppercase">{`Firma de ${
              promesa.PromesaState
            }`}</b>
          </BoxHeader>
          <BoxContent>
            <div className="row m-0 p-0">
              <div className="col-lg-6 border-bottom p-0 pb-3 d-flex align-items-center">
                <a
                  className="m-btn m-btn-white m-btn-download"
                  href={promesa.DocumentResciliacion}
                  target="_blank"
                  download
                >
                  Descargar Documento
                </a>
              </div>
            </div>
            <div className="pt-4 pb-4">
              <div className="d-flex align-items-center">
                <span className="font-14-rem mr-3">
                  {form.values.DocumentResciliacionFirma
                    ? 'Documento'
                    : 'Cargar Documento'}
                </span>
                <DocumentItem
                  canUpload={canUpload}
                  name="DocumentResciliacionFirma"
                />
              </div>
            </div>
          </BoxContent>
          {canUpload && (
            <BoxFooter>
              <Button
                disabled={
                  selector.loading ||
                  !(
                    form.values.DocumentResciliacionFirma &&
                    form.values.DocumentResciliacionFirma.name
                  )
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

DesistimientoFirmaConfeccion.propTypes = {
  canUpload: PropTypes.bool,
  promesa: PropTypes.object,
  selector: PropTypes.object,
  onSubmit: PropTypes.func,
};

export default DesistimientoFirmaConfeccion;
