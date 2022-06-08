/**
 *
 * Reservation Upload Form
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import DocumentItemView from './ItemView';

export function PhaseFirmaDocumentsPromesaView({ entity }) {
  return (
    <>
      <div className="row m-0 p-0 mb-4">
        <div className="col-lg-6 border-bottom p-0 pb-2 d-flex align-items-center">
          <span className="font-16-rem">
            <strong>Documentos Firmados</strong>
          </span>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 mb-2">
          <DocumentItemView
            value={entity.DocumentChequesFirma}
            label="Cheques"
          />
        </div>
        <div className="col-md-6  mb-2">
          <DocumentItemView
            value={entity.DocumentPromesaFirma}
            label="Promesa"
          />
        </div>
        <div className="col-md-6  mb-2">
          <DocumentItemView value={entity.DocumentPlantaFirma} label="Planta" />
        </div>
      </div>
    </>
  );
}

PhaseFirmaDocumentsPromesaView.propTypes = {
  entity: PropTypes.object,
};

export default PhaseFirmaDocumentsPromesaView;
