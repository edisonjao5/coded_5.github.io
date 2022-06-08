/**
 *
 * Project
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { isAprobacionInmobiliariaState } from '../../helper';
import { APROBACION_INMOBILIARIA_STATE } from 'containers/App/constants';

function InSteps({ offer }) {
  const { AprobacionInmobiliaria, AprobacionInmobiliariaState } = offer;
  const Graph = {
    Node: [
      { Label: 'V', Description: 'Oferta', Color: 'green' },
    ],
  };

  if(AprobacionInmobiliaria["Autorizador"]){
    let Color = "";
    const values = Object.values(AprobacionInmobiliaria["Autorizador"]);

    if (values.includes(false)) Color = "red";
    else if (values.includes(null)) Color = "orange";
    else Color = "green";
  
    Graph.Node.push({
      Label: 'I',
      Description: 'Aproba Authorizador Inmobiliario',
      Color,
    });
  }

  if(AprobacionInmobiliaria["Aprobador"]){
    let Color = "white";
    const values = Object.values(AprobacionInmobiliaria["Aprobador"]);

    if([APROBACION_INMOBILIARIA_STATE[1], APROBACION_INMOBILIARIA_STATE[4]].includes(AprobacionInmobiliariaState)) Color = "white";
    else if (values.includes(false)) Color = "red";
    else if (values.includes(null)) Color = "orange";
    else Color = "green";

    Graph.Node.push({
      Label: 'II',
      Description: 'Aproba Aprobador Inmobiliario',
      Color,
    });
  }
    

  // if (isAprobacionInmobiliariaState(offer))
  //   Graph.Node[1] = {
  //     Label: 'I',
  //     Description: 'Aprobada Inmobiliario',
  //     Color: 'green',
  //   };

  // if (offer.AprobacionInmobiliariaState === APROBACION_INMOBILIARIA_STATE[3])
  //   Graph.Node[1] = {
  //     Label: 'I',
  //     Description: 'Aprobada Inmobiliario',
  //     Color: 'red',
  //   };

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
              case 'orange':
                color = 'caution';
                break;
              case 'red':
                color = 'warning-magent';
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

InSteps.propTypes = {
  offer: PropTypes.object,
};

export default InSteps;
