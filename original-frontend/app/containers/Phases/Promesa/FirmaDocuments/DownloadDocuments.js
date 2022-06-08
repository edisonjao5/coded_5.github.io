/**
 *
 * Reservation Upload Form
 *
 */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'components/Button';
import { documentDownload } from 'containers/Promesa/helper'

export function PhaseDownloadDocumentsPromesa({ documents = {} }) {
  const [doc, setDoc] = useState(documents);

  return (
    <div className="p-3">
      <div className="row m-0 p-0">
        <div className="col-lg-6 border-bottom p-0 pb-2 d-flex align-items-center">
          <span className="font-16-rem">
            <strong>Descargar Documentos</strong>
          </span>
        </div>
      </div>
      <div className="pt-3 d-flex">
        <div className="d-flex mr-3">
          <div className="checkbox-01">
            <span>
              <input
                id="Cheques"
                type="checkbox"
                disabled={documents.Cheques === ""}
                checked={doc.Cheques !== ""}
                onChange={evt => {
                    setDoc({
                      ...doc, 
                      "Cheques": evt.currentTarget.checked ? documents["Cheques"] : ""
                    });
                }}
              />
              {/* eslint-disable-next-line */}
              <label />
            </span>
            <label className="font-14-rem color-regular m-0" for="Cheques">
              Cheques
            </label>
          </div>
        </div>
        <div className="d-flex mr-3">
          <div className="checkbox-01">
            <span>
              <input
                id="Promesa"
                type="checkbox"
                disabled={documents.Promesa === ""}
                checked={doc.Promesa !== ""}
                onChange={evt => {
                  setDoc({
                    ...doc,
                    "Promesa": evt.currentTarget.checked ? documents["Promesa"] : ""
                  });
                }}
              />
              {/* eslint-disable-next-line */}
              <label />
            </span>
            <label className="font-14-rem m-0 color-regular" for="Promesa">
              Promesa
            </label>
          </div>
        </div>
        <div className="d-flex mr-3">
          <div className="checkbox-01">
            <span>
              <input
                id="Planta"
                type="checkbox"
                disabled={documents.Planta === ""}
                checked={doc.Planta !== ""}
                onChange={evt => {
                  setDoc({
                    ...doc, 
                    "Planta": evt.currentTarget.checked ? documents["Planta"] : ""
                  });
                }}
              />
              {/* eslint-disable-next-line */}
              <label />
            </span>
            <label className="font-14-rem m-0 color-regular" for="Planta">
              Planta Inmueble
            </label>
          </div>
        </div>
        <div className="d-flex w-100 justify-content-end">
          <Button
            className="m-btn-white m-btn-download mx-2"
            onClick={()=>documentDownload(doc)}
          >
            Descargar Seleccionados
          </Button>
        </div>
      </div>
    </div>
  );
}

PhaseDownloadDocumentsPromesa.propTypes = {
  documents: PropTypes.object,
};

export default PhaseDownloadDocumentsPromesa;
