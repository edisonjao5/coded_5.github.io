/**
 *
 * Reservation Upload Form
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Box, BoxContent, BoxHeader } from 'components/Box';
import { isCreditPayment } from 'containers/App/helpers';
import Tab from 'components/Tab';
import Button from 'components/Button';
import Alert from 'components/Alert';
import Credit from './Credit';
import Promise from './Promise';
import Offer from './Offer';
import { Codeudor } from './Codeudor';

export function CarpetaDigital({
  isCollapse,
  canEdit,
  canReview,
  entity,
  isReview,
  onReview,
  onPrint,
  promesa,
}) {
  const oferta_docments =  {
    label: 'OFERTA',
    content: (
      <Offer
        canUpload={canEdit}
        canReview={canReview && !entity.OfertaID}
        entity={entity}
        onReview={onReview}
      />
    ),
  }

  const credito_docments = {
    label: 'CRÉDITO',
    content: (
      <Credit
        canUpload={canEdit}
        canReview={canReview && !entity.OfertaID}
        entity={entity}
        onReview={onReview}
      />
    ),
  }

  const tabs = [oferta_docments];

  if(isCreditPayment(entity.PayType)){
    tabs.push( credito_docments );
  }

  if(promesa) {
    tabs.push(
      {
        label: 'PROMESA',
        content: <Promise entity={entity} />,
      },
    )
  }

  const codeudor_document = 
  {
    label: 'CODEUDOR',
    content: (
      <Codeudor
        canUpload={canEdit}
        canReview={canReview && !entity.OfertaID}
        entity={entity}
        onReview={onReview}
      />
    ),
  };
  if(entity.Codeudor)
    tabs.push( codeudor_document )

  let pdfURL = `/proyectos/${entity.ProyectoID}/carpeta`;
  if(entity.ReservaID)
    pdfURL = `${pdfURL}?ReservaID=${entity.ReservaID}`;
  else if(entity.OfertaID)
    pdfURL = `${pdfURL}?OfertaID=${entity.OfertaID}`;
  else
    pdfURL = pdfURL;
  
  return (
    <>
      <Box collapse isOpen={isCollapse}>
        <BoxHeader>
          <b>CARPETA DIGITAL</b>
          <Button
            onClick={() => window.open(pdfURL, '_blank')}
            className="m-btn-plant order-3"
          >
            Ver Carpeta
          </Button>
        </BoxHeader>
        <BoxContent>
          {canEdit && (
            <div className="p-3">
              <div className="row m-0">
                <div className="col border-bottom p-0">
                  <span className="font-16-rem color-regular pb-2 d-block">
                    <strong>Carga de Documentos</strong>
                  </span>
                </div>
                <div className="col-auto p-0 d-flex align-items-center">
                  <span className="font-14-rem color-em mr-2">
                    <em>
                      Debes Imprimir los documentos, firmarlos y cargarlos al
                      sistema:
                    </em>
                  </span>
                  <Button className="font-14-rem no-whitespace m-btn m-btn-white m-btn-printer"
                    disabled={ false } 
                    onClick={ onPrint }
                  >
                    Imprimir Documentos
                  </Button>
                </div>
              </div>
            </div>
          )}
          {canReview && !isReview && (
            <Alert type="warning">
              Debes revisar los documentos y si es sujeto a crédito
            </Alert>
          )}
          <Tab
            tabs={tabs}
          />
        </BoxContent>
      </Box>
    </>
  );
}

CarpetaDigital.propTypes = {
  isCollapse: PropTypes.bool,
  isReview: PropTypes.bool,
  canEdit: PropTypes.bool,
  canReview: PropTypes.bool,
  entity: PropTypes.object,
  onReview: PropTypes.func,
  onPrint: PropTypes.func,
  promesa: PropTypes.bool,
};

export default CarpetaDigital;
