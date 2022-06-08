/**
 *
 * View
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import Button from 'components/Button';
import { Modal, ModalFooter, ModalHeader, ModalBody } from 'components/Modal';
import HistorySeller from 'containers/Common/HistorySeller';
import { Box, BoxContent, BoxHeader } from 'components/Box';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import makeSelectRealEstate from './selectors';

function View({ ID, selector, onHide, isOpen }) {
  const { local } = window.preload;
  const inmobiliaria = (selector.inmobiliarias || []).find(
    item => item.InmobiliariaID === ID,
  );
  const constructora = (selector.constructoras || []).find(
    item => item.ConstructoraID === ID,
  );
  let entity;
  if (inmobiliaria || constructora)
    entity = {
      ...(constructora || {}),
      ...(inmobiliaria || {}),
    };

  let Comuna;
  let Provincia;
  let Region;
  if (entity && entity.ComunaID) {
    local.forEach(region => {
      region.provincias.forEach(provincia => {
        provincia.comunas.forEach(comuna => {
          if (comuna.ComunaID === entity.ComunaID) {
            Comuna = comuna.Name;
            Provincia = provincia.Name;
            Region = region.Name;
          }
        });
      });
    });
  }
  return (
    <Modal isOpen={isOpen} size="xl" scrollable>
      <ModalHeader> {entity && entity.RazonSocial} </ModalHeader>
      <ModalBody className="p-3 bg-light">
        {entity && (
          <>
            <div className="row">
              <div className="col-md-6">
                <Box collapse>
                  <BoxHeader>
                    <b>DATOS GENERALES</b>
                  </BoxHeader>
                  <BoxContent className="p-3">
                    <ul className="row p-0 m-0 color-regular">
                      <li className="col-md-12 p-0 my-2 d-flex align-items-center">
                        <span className="font-14-rem" style={{ width: '11em' }}>
                          <b>Razón social</b>
                        </span>
                        <span className="font-14-rem">
                          {entity.RazonSocial}
                        </span>
                      </li>
                      {entity.IsInmobiliaria && (
                        <li className="col-md-12 p-0 my-2 d-flex align-items-center">
                          <span
                            className="font-14-rem"
                            style={{ width: '11em' }}
                          >
                            <b>Rut</b>
                          </span>
                          <span className="font-14-rem">{entity.Rut}</span>
                        </li>
                      )}
                      {entity.IsInmobiliaria && (
                        <li className="col-md-12 p-0 my-2 d-flex align-items-center">
                          <span
                            className="font-14-rem"
                            style={{ width: '11em' }}
                          >
                            <b>Es constructora</b>
                          </span>
                          <span className="font-14-rem">
                            {entity.IsConstructora ? 'Si' : 'No'}
                          </span>
                        </li>
                      )}
                      {entity.IsInmobiliaria && (
                        <li className="col-md-12 p-0 my-2 d-flex align-items-center">
                          <span
                            className="font-14-rem"
                            style={{ width: '11em' }}
                          >
                            <b>Dirección</b>
                          </span>
                          <span className="font-14-rem">
                            {entity.Direccion}
                          </span>
                        </li>
                      )}
                      {entity.IsInmobiliaria && (
                        <li className="col-md-12 p-0 my-2 d-flex align-items-center">
                          <span
                            className="font-14-rem"
                            style={{ width: '11em' }}
                          >
                            <b>Comuna</b>
                          </span>
                          <span className="font-14-rem">{Comuna}</span>
                        </li>
                      )}
                      {entity.IsInmobiliaria && (
                        <li className="col-md-12 p-0 my-2 d-flex align-items-center">
                          <span
                            className="font-14-rem"
                            style={{ width: '11em' }}
                          >
                            <b>Provincia</b>
                          </span>
                          <span className="font-14-rem">{Provincia}</span>
                        </li>
                      )}
                      {entity.IsInmobiliaria && (
                        <li className="col-md-12 p-0 my-2 d-flex align-items-center">
                          <span
                            className="font-14-rem"
                            style={{ width: '11em' }}
                          >
                            <b>Región</b>
                          </span>
                          <span className="font-14-rem">{Region}</span>
                        </li>
                      )}
                    </ul>
                  </BoxContent>
                </Box>
              </div>
              {entity.IsInmobiliaria && (
                <div className="col-md-6">
                  <Box collapse>
                    <BoxHeader>
                      <b>REPRESENTANTES</b>
                    </BoxHeader>
                    <BoxContent className="p-3">
                      <ul className="row p-0 m-0 color-regular">
                        {(entity.UsersInmobiliaria || [])
                          .filter(
                            user =>
                              user.UserInmobiliariaType === 'Representante',
                          )
                          .map(user => (
                            <li
                              key={user.UserID}
                              className="col-md-12 p-0 my-2 d-flex align-items-center"
                            >
                              <span className="font-14-rem">
                                <b>{user.Name}</b>
                                {` / ${user.LastNames} / ${user.Rut}`}
                              </span>
                            </li>
                          ))}
                      </ul>
                    </BoxContent>
                  </Box>
                  <Box collapse>
                    <BoxHeader>
                      <b>APROBADORES</b>
                    </BoxHeader>
                    <BoxContent className="p-3">
                      <ul className="row p-0 m-0 color-regular">
                        {(entity.UsersInmobiliaria || [])
                          .filter(
                            user => user.UserInmobiliariaType === 'Aprobador',
                          )
                          .map(user => (
                            <li
                              key={user.UserID}
                              className="col-md-12 p-0 my-2 d-flex align-items-center"
                            >
                              <span className="font-14-rem">
                                <b>{user.Name}</b>
                                {` / ${user.LastNames} / ${user.Rut}`}
                              </span>
                            </li>
                          ))}
                      </ul>
                    </BoxContent>
                  </Box>
                  <Box collapse>
                    <BoxHeader>
                      <b>AUTORIZADORS</b>
                    </BoxHeader>
                    <BoxContent className="p-3">
                      <ul className="row p-0 m-0 color-regular">
                        {(entity.UsersInmobiliaria || [])
                          .filter(
                            user => user.UserInmobiliariaType === 'Autorizador',
                          )
                          .map(user => (
                            <li
                              key={user.UserID}
                              className="col-md-12 p-0 my-2 d-flex align-items-center"
                            >
                              <span className="font-14-rem">
                                <b>{user.Name}</b>
                                {` / ${user.LastNames} / ${user.Rut}`}
                              </span>
                            </li>
                          ))}
                      </ul>
                    </BoxContent>
                  </Box>
                  <Box collapse>
                    <BoxHeader>
                      <b>MEDIOS DE CONTACTO</b>
                    </BoxHeader>
                    <BoxContent className="p-3">
                      <ul className="row p-0 m-0 color-regular">
                        {(entity.Contact || []).map((contact, index) => (
                          <li
                            /* eslint-disable-next-line */
                          key={`contact_${index}`}
                            className="col-md-12 p-0 my-2 d-flex align-items-center"
                          >
                            <span
                              className="font-14-rem"
                              style={{ width: '11em' }}
                            >
                              <b>{contact.ContactInfoTypeName}</b>
                            </span>
                            <span className="font-14-rem">{contact.Value}</span>
                          </li>
                        ))}
                      </ul>
                    </BoxContent>
                  </Box>
                </div>
              )}
            </div>
            {entity.IsInmobiliaria && <HistorySeller UserID={entity.UserID} />}
            <p />
          </>
        )}
      </ModalBody>
      <ModalFooter>
        <Button className="ml-2" color="white" onClick={onHide}>
          Cancelar
        </Button>
      </ModalFooter>
    </Modal>
  );
}

View.propTypes = {
  selector: PropTypes.object,
  ID: PropTypes.string,
  isOpen: PropTypes.bool,
  onHide: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  selector: makeSelectRealEstate(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(View);
