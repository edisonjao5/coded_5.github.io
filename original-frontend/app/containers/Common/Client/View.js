/**
 *
 * View
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import Button from 'components/Button';
import { Modal, ModalFooter, ModalHeader, ModalBody } from 'components/Modal';
import WithLoading from 'components/WithLoading';
import HistorySeller from 'containers/Common/HistorySeller';
import { Box, BoxContent, BoxHeader } from 'components/Box';

const SyncMessage = WithLoading();

function View({ selector, onHide }) {
  const { loading, client = {}, ...restSelector } = selector;

  return (
    <Modal isOpen={selector.screen === 'view'} size="xl" scrollable>
      <ModalHeader> {'Ver datos'} </ModalHeader>
      <ModalBody className="p-3 bg-light">
        <SyncMessage {...restSelector} loading={loading} />
        {client && !loading && (
          <>
            <div className="row">
              <div className="col-12">
                <Box collapse>
                  <BoxHeader>
                    <b>DATOS GENERALES</b>
                  </BoxHeader>
                  <BoxContent className="p-3">
                    <ul className="row p-0 m-0 color-regular">
                      <li className="col-md-6 p-0 my-2 d-flex align-items-center">
                        <span className="font-14-rem" style={{ width: '11em' }}>
                          <b>Nombres</b>
                        </span>
                        <span className="font-14-rem">{client.Name}</span>
                      </li>

                      <li className="col-md-6 p-0 my-2 d-flex align-items-center">
                        <span className="font-14-rem" style={{ width: '11em' }}>
                          <b>Apellidos</b>
                        </span>
                        <span className="font-14-rem">{client.LastNames}</span>
                      </li>

                      <li className="col-md-6 p-0 my-2 d-flex align-items-center">
                        <span className="font-14-rem" style={{ width: '11em' }}>
                          <b>RUT</b>
                        </span>
                        <span className="font-14-rem">{client.Rut}</span>
                      </li>

                      <li className="col-md-6 p-0 my-2 d-flex align-items-center">
                        <span className="font-14-rem" style={{ width: '11em' }}>
                          <b>Nacionalidad</b>
                        </span>
                        <span className="font-14-rem">
                          {client.Nationality}
                        </span>
                      </li>

                      <li className="col-md-6 p-0 my-2 d-flex align-items-center">
                        <span className="font-14-rem" style={{ width: '11em' }}>
                          <b>Estado civil</b>
                        </span>
                        <span className="font-14-rem">
                          {client.CivilStatus}
                        </span>
                      </li>

                      <li className="col-md-6 p-0 my-2 d-flex align-items-center">
                        <span className="font-14-rem" style={{ width: '11em' }}>
                          <b>Género</b>
                        </span>
                        <span className="font-14-rem">{client.Genre}</span>
                      </li>

                      <li className="col-md-6 p-0 my-2 d-flex align-items-center">
                        <span className="font-14-rem" style={{ width: '11em' }}>
                          <b>Cargo</b>
                        </span>
                        <span className="font-14-rem">{client.Position}</span>
                      </li>

                      <li className="col-md-6 p-0 my-2 d-flex align-items-center">
                        <span className="font-14-rem" style={{ width: '11em' }}>
                          <b>Antigüedad</b>
                        </span>
                        <span className="font-14-rem">{client.Antiquity}</span>
                      </li>

                      <li className="col-md-6 p-0 my-2 d-flex align-items-center">
                        <span className="font-14-rem" style={{ width: '11em' }}>
                          <b>Dirección</b>
                        </span>
                        <span className="font-14-rem">{client.Address}</span>
                      </li>

                      <li className="col-md-6 p-0 my-2 d-flex align-items-center">
                        <span className="font-14-rem" style={{ width: '11em' }}>
                          <b>Región</b>
                        </span>
                        <span className="font-14-rem">{client.Region}</span>
                      </li>

                      <li className="col-md-6 p-0 my-2 d-flex align-items-center">
                        <span className="font-14-rem" style={{ width: '11em' }}>
                          <b>Provincia</b>
                        </span>
                        <span className="font-14-rem">{client.Provincia}</span>
                      </li>

                      <li className="col-md-6 p-0 my-2 d-flex align-items-center">
                        <span className="font-14-rem" style={{ width: '11em' }}>
                          <b>Comuna</b>
                        </span>
                        <span className="font-14-rem">{client.Comuna}</span>
                      </li>
                    </ul>
                  </BoxContent>
                </Box>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <Box collapse>
                  <BoxHeader>
                    <b>MEDIOS DE CONTACTO</b>
                  </BoxHeader>
                  <BoxContent className="p-3">
                    <ul className="row p-0 m-0 color-regular">
                      {(client.Contact || []).map((contact, index) => (
                        /* eslint-disable-next-line */
                        <li key={index}
                          className="col-md-6 p-0 my-2 d-flex align-items-center"
                        >
                          <span
                            className="font-14-rem"
                            style={{ width: '11em' }}
                          >
                            <b>{contact.ContactInfoType}</b>
                          </span>
                          <span className="font-14-rem">{contact.Value}</span>
                        </li>
                      ))}
                    </ul>
                  </BoxContent>
                </Box>
              </div>
            </div>
            <HistorySeller UserID={client.UserID} />
            <p />
          </>
        )}
      </ModalBody>
      <ModalFooter>
        <Button
          disabled={loading}
          className="ml-2"
          color="white"
          onClick={onHide}
        >
          Cancelar
        </Button>
      </ModalFooter>
    </Modal>
  );
}

View.propTypes = {
  selector: PropTypes.object,
  onHide: PropTypes.func,
};

export default View;
