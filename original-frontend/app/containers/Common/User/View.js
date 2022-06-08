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
  const { loading, user = {}, ...restSelector } = selector;

  return (
    <Modal isOpen={selector.screen === 'view'} size="xl" scrollable>
      <ModalHeader> {user && user.Name ? user.Name : 'Ver datos'} </ModalHeader>
      <ModalBody className="p-3 bg-light">
        <SyncMessage {...restSelector} loading={loading} />
        {user && !loading && (
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
                          <b>Nombres</b>
                        </span>
                        <span className="font-14-rem">{user.Name}</span>
                      </li>

                      <li className="col-md-12 p-0 my-2 d-flex align-items-center">
                        <span className="font-14-rem" style={{ width: '11em' }}>
                          <b>Apellidos</b>
                        </span>
                        <span className="font-14-rem">{user.LastNames}</span>
                      </li>

                      <li className="col-md-12 p-0 my-2 d-flex align-items-center">
                        <span className="font-14-rem" style={{ width: '11em' }}>
                          <b>Rut</b>
                        </span>
                        <span className="font-14-rem">{user.Rut}</span>
                      </li>

                      <li className="col-md-12 p-0 my-2 d-flex align-items-center">
                        <span className="font-14-rem" style={{ width: '11em' }}>
                          <b>Email</b>
                        </span>
                        <span className="font-14-rem">{user.Email}</span>
                      </li>
                    </ul>
                  </BoxContent>
                </Box>
              </div>
              <div className="col-md-6">
                <Box collapse>
                  <BoxHeader>
                    <b>Roles</b>
                  </BoxHeader>
                  <BoxContent className="p-3">
                    <ul className="row p-0 m-0 color-regular">
                      {(user.Roles || []).map(role => (
                        <li
                          key={role.RoleID}
                          className="col-md-12 p-0 my-2 d-flex align-items-center"
                        >
                          <span className="font-14-rem">{role.Name}</span>
                        </li>
                      ))}
                    </ul>
                  </BoxContent>
                </Box>
              </div>
            </div>
            <HistorySeller UserID={user.UserID} />
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
