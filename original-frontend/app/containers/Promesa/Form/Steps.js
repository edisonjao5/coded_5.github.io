/**
 *
 * Project
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { PROMESA_STATE, FACTURA_STATE } from 'containers/App/constants';

function SubSteps({ promesa }) {
  return (
    <ul className="m-counter mt-3" style={{ marginLeft: '9.6em' }}>
      <li className="m-counter-plus success">
        <Link to="/" onClick={evt => evt.preventDefault()}>
          <span>Confección Promesa</span>
        </Link>
      </li>
      <li className="m-counter-plus">
        <Link to="/" onClick={evt => evt.preventDefault()}>
          <span>Pendiente Control</span>
        </Link>
      </li>
    </ul>
  );
}

SubSteps.propTypes = {
  promesa: PropTypes.object,
};

function Steps({ promesa }) {
  const reject_approve = [PROMESA_STATE[13], PROMESA_STATE[14]];

  const Graph = {
    Node: [
      { Label: 'LG', Description: 'Confección', Color: 'white' },
      { Label: reject_approve.includes(promesa.PromesaState) ?'JP, IN':'AC, JP',
        Description: 'Aprobaciónes', Color: 'white' },
      { Label: 'V', Description: 'Firma Comprador', Color: 'white' },
      { Label: 'AC', Description: 'Aprobación Firmas', Color: 'white' },
      { Label: 'JP', Description: 'Firmas', Color: 'white' },
      { Label: 'FI', Description: 'Facturación', Color: 'white' },
    ],
  };

  switch (promesa.PromesaState) {
    case PROMESA_STATE[0]:
    case PROMESA_STATE[10]:
      Graph.Node[0].Color = 'yellow';
      Graph.Node[1].Color = 'white';
      Graph.Node[2].Color = 'white';
      Graph.Node[3].Color = 'white';
      break;
    case PROMESA_STATE[2]:
    // case PROMESA_STATE[5]:
    // case PROMESA_STATE[6]:
      Graph.Node[0].Color = 'green';
      Graph.Node[1].Color = 'green';
      Graph.Node[2].Color = 'green';
      Graph.Node[3].Color = 'green';
      Graph.Node[4].Color = 'yellow';
      break;
    case PROMESA_STATE[3]:
    case PROMESA_STATE[4]:
    case PROMESA_STATE[5]:
    case PROMESA_STATE[6]:
      Graph.Node[0].Color = 'green';
      Graph.Node[1].Color = 'green';
      Graph.Node[2].Color = 'green';
      Graph.Node[3].Color = 'green';
      Graph.Node[4].Color = 'green';
      if (promesa.Factura && promesa.Factura.FacturaState === FACTURA_STATE[0])
        Graph.Node[5].Color = 'green';
      else Graph.Node[5].Color = 'yellow';
      break;
    case PROMESA_STATE[7]:
    case PROMESA_STATE[8]:
      Graph.Node[0].Color = 'green';
      Graph.Node[1].Color = 'green';
      Graph.Node[2].Color = 'green';
      Graph.Node[3].Color = 'green';
      Graph.Node[4].Color = 'green';
      Graph.Node[5].Color = 'green';
      break;
    case PROMESA_STATE[13]:
    case PROMESA_STATE[14]:
      Graph.Node[0].Color = 'green';
      Graph.Node[1].Color = 'yellow';
      Graph.Node[2].Color = 'white';
      Graph.Node[3].Color = 'white';
      break;
    case PROMESA_STATE[9]:
    case PROMESA_STATE[11]:
      Graph.Node[0].Color = 'green';
      Graph.Node[1].Color = 'yellow';
      Graph.Node[2].Color = 'white';
      Graph.Node[3].Color = 'white';
      break;
    case PROMESA_STATE[1]:
    case PROMESA_STATE[20]:
      Graph.Node[0].Color = 'green';
      Graph.Node[1].Color = 'green';
      Graph.Node[2].Color = 'yellow';
      Graph.Node[3].Color = 'white';
      break;
    case PROMESA_STATE[12]:
      Graph.Node[0].Color = 'green';
      Graph.Node[1].Color = 'green';
      Graph.Node[2].Color = 'green';
      Graph.Node[3].Color = 'yellow';
      break;
    default:
      Graph.Node[0].Color = 'green';
      Graph.Node[1].Color = 'green';
      Graph.Node[2].Color = 'green';
      Graph.Node[3].Color = 'green';
      break;
  }

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
    </nav>
  );
}

Steps.propTypes = {
  promesa: PropTypes.object,
};

export default Steps;
