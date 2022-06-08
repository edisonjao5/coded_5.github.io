/**
 *
 * Project
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { PROYECTO_DOCUMENT_STATE } from '../App/constants';

function subSteps(project = {}) {
  const {
    ConstructoraID,
    Aseguradora = {},
    EntregaInmediata,
    IngresoComisionesState,
    BorradorPromesaState,
    PlanMediosState,
  } = project;

  const marketingDone = PlanMediosState === PROYECTO_DOCUMENT_STATE[1];

  const legalDone = BorradorPromesaState === PROYECTO_DOCUMENT_STATE[1];
  let legalStatus = '';
  if (marketingDone) legalStatus = 'caution';
  if (legalDone) legalStatus = 'success-02';

  const finanzaDone = IngresoComisionesState === PROYECTO_DOCUMENT_STATE[1];
  let finanzaStatus = '';
  if (legalDone) finanzaStatus = 'caution';
  if (finanzaDone) finanzaStatus = 'success-02';
  if (
    ConstructoraID &&
    (!EntregaInmediata || Aseguradora.AseguradoraID) &&
    (!marketingDone || !legalDone || !finanzaDone)
  )
    return (
      <ul className="m-counter mt-3" style={{ marginLeft: '9.6em' }}>
        <li
          className={`m-counter-plus ${
            marketingDone ? 'success-02' : 'caution'
          }`}
        >
          <Link
            to="/"
            onClick={evt => evt.preventDefault()}
            className="m-counter-item"
          >
            <span>Documentos Marketing</span>
          </Link>
        </li>
        <li className={`m-counter-plus ${legalStatus}`}>
          <Link
            to="/"
            onClick={evt => evt.preventDefault()}
            className="m-counter-item"
          >
            <span>Documentos Legal</span>
          </Link>
        </li>
        <li className={`m-counter-plus ${finanzaStatus}`}>
          <Link
            to="/"
            onClick={evt => evt.preventDefault()}
            className="m-counter-item"
          >
            <span>Información Finanzas</span>
          </Link>
        </li>
      </ul>
    );

  return null;
}

function Steps({ project }) {
  const {
    Graph = {
      Node: [
        { Label: 'JP', Color: 'green', Description: 'Crear proyecto' },
        {
          Label: 'L',
          Color: 'white',
          Description: 'Pendiente de Información',
        },
        { Label: 'JP', Color: 'white', Description: 'Revisión Proyecto' },
        {
          Label: 'L',
          Color: 'white',
          Description: 'Aprobación Inmuebles',
        },
        { Label: 'GC', Color: 'white', Description: 'Aprobación Final' },
      ],
    },
  } = project;
  let colorStep = 0;
  return (
    <nav className="breadcrumb-step">
      <ul className="m-counter">
        {Graph.Node.map(node => {
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
      {subSteps(project)}
    </nav>
  );
}

Steps.propTypes = {
  project: PropTypes.object,
};

export default Steps;
