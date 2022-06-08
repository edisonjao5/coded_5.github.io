/**
 *
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import moment from 'components/moment';
import { userFullname } from 'containers/Common/User/helper';
import { clientFullname } from 'containers/Common/Client/helper';
import { stringToBoolean } from 'containers/App/helpers';

// eslint-disable-next-line no-unused-vars
function PhaseGeneralView({ values }) {
  const {
    Vendedor,
    Cliente,
    DateFirmaPromesa,
    CotizacionType,
    ContactMethodTypeID,
    IsNotInvestment,
    Codeudor,
    CodeudorID
  } = values;

  return (
    <div className="row m-0 p-0">
      <ul className="col-md-6 m-0 p-0">
        <li className="d-flex align-items-center my-2">
          <span
            className="font-14-rem color-regular mr-3"
            style={{ width: '10em' }}
          >
            <b>Vendedor</b>
          </span>
          <span className="font-14-rem color-regular">
            {userFullname(Vendedor)}
          </span>
        </li>

        <li className="d-flex align-items-center my-3">
          <span
            className="font-14-rem color-regular mr-3"
            style={{ width: '10em' }}
          >
            <b>Fecha</b>
          </span>
          <span className="font-14-rem color-regular">
            {moment(DateFirmaPromesa).format('DD MMM YYYY')}
          </span>
        </li>
        {CotizacionType ===
          window.preload.quotationUtils.CotizacionTypes[0].Name && (
          <>
            {/*
            <li className="col-md-6 d-flex align-items-center my-2">
              <span
                className="font-14-rem color-regular mr-3"
                style={{ width: '10em' }}
              >
                <b>Medio de Llegada</b>
              </span>
              <span className="font-14-rem color-regular">
                {Cliente.FindingTypeID &&
                  window.preload.quotationUtils.FindingTypes.find(
                    item => item.FindingTypeID === Cliente.FindingTypeID,
                  ).Name}
              </span>
            </li>
            */}
          </>
        )}

        {CotizacionType ===
          window.preload.quotationUtils.CotizacionTypes[1].Name && (
          <>
            <li className="d-flex align-items-center my-2">
              <span
                className="font-14-rem color-regular mr-3"
                style={{ width: '10em' }}
              >
                <b>Destino de la Compra</b>
              </span>
              <span className="font-14-rem color-regular">
                {stringToBoolean(IsNotInvestment) ? 'Vivienda' : 'Inversión'}
              </span>
            </li>
            <li className="d-flex align-items-center my-2">
              <span
                className="font-14-rem color-regular mr-3"
                style={{ width: '10em' }}
              >
                <b>Medio de Llegada</b>
              </span>
              <span className="font-14-rem color-regular">
                {ContactMethodTypeID &&
                  window.preload.quotationUtils.ContactMethodTypes.find(
                    item => item.ContactMethodTypeID === ContactMethodTypeID,
                  ).Name}
              </span>
            </li>
          </>
        )}
      </ul>    
      <ul className="col-md-6 m-0 p-0">
        <li className="d-flex my-2 align-top">
          <span
            className="font-14-rem color-regular mr-3"
            style={{ width: '10em' }}
          >
            <b>Cliente</b>
          </span>
          <span className="font-14-rem color-regular">
            <p>{clientFullname(Cliente)}</p>
            <p>{ CodeudorID && clientFullname(Codeudor) } </p>        
          </span>
        </li>
      </ul>
    </div>
  );
}

PhaseGeneralView.propTypes = {
  values: PropTypes.object,
};

export default PhaseGeneralView;
