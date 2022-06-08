/**
 *
 * Project
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  RECEPCION_GARANTIA_STATE,
  OFERTA_STATE,
} from 'containers/App/constants';
import { isPendienteContacto } from '../../helper';

function FiSteps({ offer }) {
  const Graph = {
    Node: [
      { Label: 'V', Description: 'Oferta', Color: 'green' },
      {
        Label: 'I',
        Description: 'Pendiente Recibí Garantía',
        Color: isPendienteContacto(offer) ? 'white' : 'red',
      },
    ],
  };

  if (offer.RecepcionGarantiaState === RECEPCION_GARANTIA_STATE[1])
    Graph.Node[1] = {
      Label: 'I',
      Description: 'Recibo De Garantía',
      Color: 'green',
    };

  if (offer.RecepcionGarantiaState === RECEPCION_GARANTIA_STATE[2])
    Graph.Node[1] = {
      Label: 'I',
      Description: 'Devolución De Garantía',
      Color: 'green',
    };

  if (
    offer.OfertaState === OFERTA_STATE[4] &&
    offer.RecepcionGarantiaState === RECEPCION_GARANTIA_STATE[1]
  ) {
    Graph.Node[1] = {
      Label: 'I',
      Description: 'DEVOLUVIÓN DE GARANTÍA',
      Color: 'red',
    };
  }

  if (
    offer.OfertaState === OFERTA_STATE[4] &&
    offer.RecepcionGarantiaState === RECEPCION_GARANTIA_STATE[0]
  )
    return null;

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
              case 'red':
                color = 'caution';
                break;
              default:
                color = '';
            }
            return (
              <li key={node.Description} className={`m-counter-plus ${color}`}>
                <Link
                  to="/"
                  onClick={evt => evt.preventDefault()}
                  className="m-counter-item"
                >
                  <span>{node.Description}</span>
                </Link>
              </li>
            );
          })}
      </ul>
    </nav>
  );
}

FiSteps.propTypes = {
  offer: PropTypes.object,
};

export default FiSteps;
