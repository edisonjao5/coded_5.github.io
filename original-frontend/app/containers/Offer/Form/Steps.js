/**
 *
 * Project
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  OFERTA_STATE,
  APROBACION_INMOBILIARIA_STATE,
  RECEPCION_GARANTIA_STATE,
  PRE_APROBACION_CREDITO_STATE,
} from 'containers/App/constants';
import { isPendienteContacto,isPendienteAprobacion } from '../helper';
import { isCreditType } from 'containers/Phases/FormaDePago/helper';

function SubSteps({ offer }) {
  const {
    AprobacionInmobiliariaState,
    PreAprobacionCreditoState,
    RecepcionGarantiaState,
    PayType,
  } = offer;
  const isCreditPayment = isCreditType(PayType);
  if (
    AprobacionInmobiliariaState === APROBACION_INMOBILIARIA_STATE[2] &&
    PreAprobacionCreditoState === PRE_APROBACION_CREDITO_STATE[2] &&
    RecepcionGarantiaState === RECEPCION_GARANTIA_STATE[1]
  )
    return null;
  const marginLeft = '14em';

  return (
    <>
      <ul className="m-counter mt-3 " style={{ marginLeft: marginLeft }}>
        <li className="m-counter-plus warning-magent">
          <Link
            to="/"
            className="m-counter-item"
            onClick={evt => evt.preventDefault()}
          >
            <span>IN</span>
          </Link>
        </li>
        <li
          className={`m-counter-plus ${
            AprobacionInmobiliariaState === APROBACION_INMOBILIARIA_STATE[2]
              ? 'success'
              : ''
          }`}
        >
          <Link
            to="/"
            className="m-counter-item"
            onClick={evt => evt.preventDefault()}
          >
            <span>Aprobar</span>
          </Link>
        </li>
      </ul>
      <ul className="m-counter mt-3 " style={{ marginLeft: marginLeft }}>
        <li className="m-counter-plus warning-magent">
          <Link
            to="/"
            className="m-counter-item"
            onClick={evt => evt.preventDefault()}
          >
            <span>FI</span>
          </Link>
        </li>
        <li
          className={`m-counter-plus ${
            RecepcionGarantiaState === RECEPCION_GARANTIA_STATE[1]
              ? 'success'
              : ''
          }`}
        >
          <Link
            to="/"
            className="m-counter-item"
            onClick={evt => evt.preventDefault()}
          >
            <span>Recibo de Grantía</span>
          </Link>
        </li>
      </ul>
      { isCreditPayment && (
        <ul className="m-counter mt-3 " style={{ marginLeft: marginLeft }}>
          <li className="m-counter-plus warning-magent">
            <Link
              to="/"
              className="m-counter-item"
              onClick={evt => evt.preventDefault()}
            >
              <span>AC</span>
            </Link>
          </li>
          {/* Commented by Artru */}
          {/* <li
            className={`m-counter-plus ${
              !isPendienteContacto(offer) ? 'success' : 'yellow'
            }`}
          >
            <Link
              to="/"
              className="m-counter-item"
              onClick={evt => evt.preventDefault()}
            >
              <span>Contato con cliente</span>
            </Link>
          </li> */}
          <li
            className={`m-counter-plus ${
              [
                PRE_APROBACION_CREDITO_STATE[0],
                PRE_APROBACION_CREDITO_STATE[2],
              ].includes(PreAprobacionCreditoState)
                ? 'success'
                : ''
            }`}
          >
            <Link
              to="/"
              className="m-counter-item"
              onClick={evt => evt.preventDefault()}
            >
              <span>Pre-Aprobacíon</span>
            </Link>
          </li>
          {/* {!isCreditPayment && (
            <li
              className={`m-counter-plus ${
                isPendienteContacto(offer) ? '' : 'success'
              }`}
            >
              <Link
                to="/"
                className="m-counter-item"
                onClick={evt => evt.preventDefault()}
              >
                <span>Aprobacíon Formal</span>
              </Link>
            </li>
          )} */}
        </ul>             
      )}
    </>
  );
}

SubSteps.propTypes = {
  offer: PropTypes.object,
};

function Steps({ offer }) {
  const { OfertaState, PayType } = offer;

  const Graph = {
    Node: [
      {
        Label: 'JP',
        Description: 'Pendiente Contacto',
        Color: isPendienteContacto(offer) ? 'yellow' : 'green',
      },
      {
        Label: isCreditType(PayType) ? 'IN, FI, AC' : 'IN, FI',
        Description: 'Pendiente Aprobación',
        Color: isPendienteContacto(offer) ? 'white' : 'red',
      },
      // {
      //   Label: 'LG',
      //   Description: 'Aprueba confeccion promesa',
      //   Color: 'white',
      // },
      { Label: '', Description: 'Promesa', Color: 'white' },
    ],
  };
  if (
    ![OFERTA_STATE[0], OFERTA_STATE[2], OFERTA_STATE[4]].includes(OfertaState)
  ) {
    Graph.Node[1].Color = 'green';
  }

  if (OfertaState === OFERTA_STATE[1]) {
    Graph.Node[2].Color = 'red';
  } else if (OfertaState === OFERTA_STATE[3]) {
    Graph.Node[2].Color = 'green';
  }

  if ([OFERTA_STATE[4], OFERTA_STATE[6]].includes(OfertaState)) return null;

  let colorStep = 0;
  return (
    <nav className="breadcrumb-step">
      <ul className="m-counter">
        {Graph.Node &&
          Graph.Node.map(node => {
            colorStep += 1;
            colorStep = colorStep > 3 ? 2 : colorStep;
            let color = '';
            switch (node.Color) {
              case 'green':
                color = 'success';
                if (colorStep > 1) color += `-0${colorStep}`;
                break;
              case 'yellow':
              case 'orange':
              case 'red':
                color = 'caution';
                break;
              default:
                color = node.Color;
            }
            return (
              <li key={node.Description} className={`m-counter-plus ${color}`}>
                <Link
                  to="/"
                  onClick={evt => evt.preventDefault()}
                  className="m-counter-item"
                >
                  <span>{`${node.Description.trim()} ${
                    node.Label ? `(${node.Label})` : ''
                  }`}</span>
                </Link>
              </li>
            );
          })}
      </ul>
      {!(isPendienteContacto(offer)) && <SubSteps offer={offer} />}
    </nav>
  );
}

Steps.propTypes = {
  offer: PropTypes.object,
};

export default Steps;
