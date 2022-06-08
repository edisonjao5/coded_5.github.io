/**
 *
 * Reservation Client Form
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import { isContadoType } from '../FormaDePago/helper';

export function PhaseClientView({ client = {}, payType }) {
  const { Comuna = { Name: ' ' } } = client;
  const isContado = isContadoType(payType);
  return (
    <ul className="row p-0 m-0 color-regular">
      <li className="col-md-6 p-0 my-2 d-flex align-items-center">
        <span className="font-14-rem" style={{ width: '11em' }}>
          <b>{client.IsCompany ? 'Razón Social' : 'Nombres'}</b>
        </span>
        <span className="font-14-rem">{client.Name}</span>
      </li>
      {client.IsCompany && (
        <li className="col-md-6 p-0 my-2 d-flex align-items-center">
          <span className="font-14-rem" style={{ width: '11em' }}>
            <b>Representante Legal</b>
          </span>
          <span className="font-14-rem">{client.ReprenetanteLegal}</span>
        </li>
      )}
      {client.IsCompany && (
        <li className="col-md-6 p-0 my-2 d-flex align-items-center">
          <span className="font-14-rem" style={{ width: '11em' }}>
            <b>Giro Empresa</b>
          </span>
          <span className="font-14-rem">{client.GiroEmpresa}</span>
        </li>
      )}
      {!client.IsCompany && (
        <li className="col-md-6 p-0 my-2 d-flex align-items-center">
          <span className="font-14-rem" style={{ width: '11em' }}>
            <b>Apellidos</b>
          </span>
          <span className="font-14-rem">{client.LastNames}</span>
        </li>
      )}
      <li className="col-md-6 p-0 my-2 d-flex align-items-center">
        <span className="font-14-rem" style={{ width: '11em' }}>
          <b>RUT</b>
        </span>
        <span className="font-14-rem">{client.Rut}</span>
      </li>
      {!client.IsCompany && (
        <li className="col-md-6 p-0 my-2 d-flex align-items-center">
          <span className="font-14-rem" style={{ width: '11em' }}>
            <b>Nacionalidad</b>
          </span>
          <span className="font-14-rem">{client.Nationality}</span>
        </li>
      )}
      {!client.IsCompany && (
        <li className="col-md-6 p-0 my-2 d-flex align-items-center">
          <span className="font-14-rem" style={{ width: '11em' }}>
            <b>Estado civil</b>
          </span>
          <span className="font-14-rem">{client.CivilStatus}</span>
        </li>
      )}
      {!client.IsCompany && (
        <li className="col-md-6 p-0 my-2 d-flex align-items-center">
          <span className="font-14-rem" style={{ width: '11em' }}>
            <b>Género</b>
          </span>
          <span className="font-14-rem">{client.Genre}</span>
        </li>
      )}
      {!client.IsCompany && !isContado && (
        <li className="col-md-6 p-0 my-2 d-flex align-items-center">
          <span className="font-14-rem" style={{ width: '11em' }}>
            <b>Cargo</b>
          </span>
          <span className="font-14-rem">{client.Position}</span>
        </li>
      )}
      {!client.IsCompany && !isContado && (
        <li className="col-md-6 p-0 my-2 d-flex align-items-center">
          <span className="font-14-rem" style={{ width: '11em' }}>
            <b>Antigüedad</b>
          </span>
          <span className="font-14-rem">{client.Antiquity}</span>
        </li>
      )}
      {!client.IsCompany && (
        <li className="col-md-6 p-0 my-2 d-flex align-items-center">
          <span className="font-14-rem" style={{ width: '11em' }}>
            <b>Dirección</b>
          </span>
          <span className="font-14-rem">{client.Address}</span>
        </li>
      )}
      {!client.IsCompany && (
        <li className="col-md-6 p-0 my-2 d-flex align-items-center">
          <span className="font-14-rem" style={{ width: '11em' }}>
            <b>Región</b>
          </span>
          <span className="font-14-rem">{client.Region}</span>
        </li>
      )}
      {!client.IsCompany && (
        <li className="col-md-6 p-0 my-2 d-flex align-items-center">
          <span className="font-14-rem" style={{ width: '11em' }}>
            <b>Provincia</b>
          </span>
          <span className="font-14-rem">{client.Provincia}</span>
        </li>
      )}
      {!client.IsCompany && Comuna && (
        <li className="col-md-6 p-0 my-2 d-flex align-items-center">
          <span className="font-14-rem" style={{ width: '11em' }}>
            <b>Comuna</b>
          </span>
          <span className="font-14-rem">{Comuna.Name || Comuna}</span>
        </li>
      )}
    </ul>
  );
}

PhaseClientView.propTypes = {
  client: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  payType: PropTypes.string,
};

export default PhaseClientView;
