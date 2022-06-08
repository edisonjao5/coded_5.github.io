/**
 *
 * Project
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { RESERVA_STATE } from '../../App/constants';

function SubSteps({ reservation }) {
  const { ReservaState } = reservation;
  if (ReservaState === RESERVA_STATE[3]) {
    return (
      <ul className="m-counter mt-3" style={{ marginLeft: '9.6em' }}>
        <li className="m-counter-plus warning-magent">
          <Link
            to="/"
            onClick={evt => evt.preventDefault()}
            className="m-counter-item"
          >
            <span>Rechazada</span>
          </Link>
        </li>
        <li className="m-counter-plus">
          <Link
            to="/"
            onClick={evt => evt.preventDefault()}
            className="m-counter-item"
          >
            <span>Pendiente Aprobación</span>
          </Link>
        </li>
        <li className="m-counter-plus">
          <Link
            to="/"
            onClick={evt => evt.preventDefault()}
            className="m-counter-item"
          >
            <span>Pendiente Control</span>
          </Link>
        </li>
        <li className="m-counter-plus">
          <Link
            to="/"
            onClick={evt => evt.preventDefault()}
            className="m-counter-item"
          >
            <span>Oferta</span>
          </Link>
        </li>
      </ul>
    );
  }
  return null;
}

SubSteps.propTypes = {
  reservation: PropTypes.object,
};

function Steps({ reservation }) {
  const {
    Graph = {
      Node: [
        { Label: 'V, JP', Description: 'Crear reserva', Color: 'red' },
        {
          Label: 'V',
          Description: 'Pendiente información ',
          Color: 'white',
        },
        { Label: 'AC', Description: 'Pendiente control', Color: 'white' },
        { Label: 'AC', Description: 'Oferta', Color: 'white' },
      ],
    },
  } = reservation;
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
                  <span>
                    {node.Description.trim() ===
                    'Pendiente información/Rechazada'
                      ? 'Pendiente información'
                      : node.Description}{' '}
                    ({node.Label})
                  </span>
                </Link>
              </li>
            );
          })}
      </ul>
      <SubSteps reservation={reservation} />
    </nav>
  );
}

Steps.propTypes = {
  reservation: PropTypes.object,
};

export default Steps;
