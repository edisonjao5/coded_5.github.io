/**
 *
 * Reservation Upload Form
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Box, BoxContent, BoxHeader, BoxFooter } from 'components/Box';
import Button from 'components/Button';
import WithLoading from 'components/WithLoading';
import { Form as ExForm, Field as ExField } from 'components/ExForm';
import DocumentItem from './DocumentItem';
import PhaseDownloadDocumentsPromesa from './DownloadDocuments';
import Alert from 'components/Alert';

const SyncMassage = WithLoading();

export function PhaseFirmaDocumentsPromesa({
  selector,
  entity,
  isEntregaInmediata = false,
  onSubmit,
  onCancel,
  canUpload,
}) {
  const initialValues = {
    DocumentChequesFirma: entity.DocumentChequesFirma,
    DocumentPromesaFirma: entity.DocumentPromesaFirma,
    DocumentPlantaFirma: entity.DocumentPlantaFirma,
  };
  
  const documents = {
    Cheques: entity.Documents.DocumentFirmadoCheques,
    Promesa: entity.DocumentPromesa,
    Planta: entity.Documents.DocumentPlanoFirmada,
  };

  return (
    <>
      <Box>
        <BoxHeader>
          <b>Documento De Firma</b>
        </BoxHeader>
        {canUpload && (
          <BoxContent className="p-0 border-bottom">
            <PhaseDownloadDocumentsPromesa
              documents={documents}
            />
          </BoxContent>
        )}
        <ExForm initialValues={initialValues} onSubmit={onSubmit}>
          {form => (
            <>
              <BoxContent>
                { entity.DocumentChequesFirma &&
                  entity.DocumentPromesaFirma &&
                  entity.DocumentPlantaFirma && (
                    <Alert type="success">
                      Se enviará a Asistente Comercial para su aprobación.
                    </Alert>
                  )}
                <div className="row m-0 p-0 mb-4">
                  <div className="col-lg-6 border-bottom p-0 pb-2 d-flex align-items-center">
                    <span className="font-16-rem">
                      <strong>
                        {canUpload
                          ? 'Cargar Documentos Firmados'
                          : 'Documentos Firmados'}
                      </strong>
                    </span>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 mb-2">
                    <DocumentItem
                      name="DocumentChequesFirma"
                      label="Cheques"
                      canUpload={canUpload}
                      required={documents.Cheques !== ""}
                    />
                  </div>
                  <div className="col-md-6  mb-2">
                    <DocumentItem
                      name="DocumentPromesaFirma"
                      label="Promesa"
                      canUpload={canUpload}
                      required={documents.Promesa !== ""}
                    />
                  </div>
                  <div className="col-md-6  mb-2">
                    <DocumentItem
                      name="DocumentPlantaFirma"
                      label="Planta"
                      canUpload={canUpload}
                      required={documents.Planta !== ""}
                    />
                  </div>
                </div>
              </BoxContent>
              <BoxFooter>
                <div className="d-flex justify-content-end">
                  {canUpload && (
                    <>
                      {isEntregaInmediata && (
                        <ExField
                          type="checkbox"
                          name="request_policy"
                          label="Solicitar póliza"
                          checked={false}
                        />
                      )}
                      <Button
                        disabled={selector.loading}
                        onClick={() => form.submitForm()}
                      >
                        Aceptar
                      </Button>
                    </>
                  )}
                  <Button
                    disabled={selector.loading}
                    color="white"
                    onClick={onCancel}
                  >
                    Cancelar
                  </Button>
                </div>
              </BoxFooter>
            </>
          )}
        </ExForm>
      </Box>
      <SyncMassage {...selector} />
    </>
  );
}

PhaseFirmaDocumentsPromesa.propTypes = {
  canUpload: PropTypes.bool,
  entity: PropTypes.object,
  selector: PropTypes.object,
  isEntregaInmediata:PropTypes.bool,
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,
};

export default PhaseFirmaDocumentsPromesa;
