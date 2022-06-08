/**
 *
 * Project
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
import { ESCRITURA_STATE } from 'containers/App/constants';

// function SubSteps({ escritura }) {
//   return (
//     <ul className="m-counter mt-3" style={{ marginLeft: '9.6em' }}>
//       <li className="m-counter-plus success">
//         <Link to="/" onClick={evt => evt.preventDefault()}>
//           <span>Confección Promesa</span>
//         </Link>
//       </li>
//       <li className="m-counter-plus">
//         <Link to="/" onClick={evt => evt.preventDefault()}>
//           <span>Pendiente Control</span>
//         </Link>
//       </li>
//     </ul>
//   );
// }

// SubSteps.propTypes = {
//   escritura: PropTypes.object,
// };

function Steps({ state }) {
  return (
    <nav className="second-breadcrumb">
      <ul>
        <li className={`item br-remove-right 
                    ${(state == ESCRITURA_STATE.Recep_Mun) ?
            "color-caution" : (state > ESCRITURA_STATE.Recep_Mun) ? "color-success" : ""}`}
        >
          <div className="number">
            <span>1</span>
          </div>
          <div className="text">
            <span className="title">Recep. Mun.</span>
            <span className="subtitle">GER. COMERCIAL</span>
          </div>
          <span className="triangle">►</span>
        </li>

        <li className={`item br-remove-left 
                    ${(parseInt(state) == ESCRITURA_STATE.Fechas_Avisos) ?
            "color-caution" : (parseInt(state) > ESCRITURA_STATE.Fechas_Avisos) ? "color-success" : ""}`}
        >
          <div className="number">
            <span>2</span>
          </div>
          <div className="text">
            <span className="title">Fechas y Avisos</span>
            <span className="subtitle">ESCRIT.</span>
          </div>
          <span className="triangle">►</span>
        </li>
        
        <div className="ml-1">
          <div className="d-flex">
            <li className={`item br-remove-right 
                      ${(parseInt(state) == ESCRITURA_STATE.A_Comercial) ?
                      "color-caution" : (parseInt(state) > ESCRITURA_STATE.A_Comercial) ? "color-success" : ""}`}
            >
              <div className="number">
                <span>3</span>
              </div>
              <div className="number ml-1">
                <span>A</span>
              </div>
              <div className="text">
                <span className="title">A. Comercial</span>
                <span className="subtitle">ESCRIT.</span>
              </div>
              <span className="triangle">►</span>
            </li>

            <li className={`item br-remove-left 
                      ${(parseInt(state) == ESCRITURA_STATE.ETitulo_Tasacion) ?
                "color-caution" : (parseInt(state) > ESCRITURA_STATE.ETitulo_Tasacion) ? "color-success" : ""}`}
            >
              <div className="number">
                <span>4</span>
              </div>
              <div className="text">
                <span className="title">E.Título y Tasación</span>
                <span className="subtitle">ESCRIT.</span>
              </div>
              <span className="triangle">►</span>
            </li>
          </div>
          <div className="mt-3 d-flex">
            <li className={`item w-100
                      ${(state >= ESCRITURA_STATE.A_Comercial && (parseInt(state) == ESCRITURA_STATE.A_Comercial || state === ESCRITURA_STATE.ETitulo_Tasacion)) ?
                      "color-caution" : (parseInt(state) > ESCRITURA_STATE.ETitulo_Tasacion) ? "color-success" : ""}`}
            >
              <div className="number">
                <span>3</span>
              </div>
              <div className="number ml-1">
                <span>B</span>
              </div>
              <div className="text">
                <span className="title">Apr. Créditos</span>
                <span className="subtitle">ASIS. COMERCIAL</span>
              </div>
              <span className="triangle">►</span>
            </li>
          </div>
        </div>

        <li className={`item ml-1 br-remove-right
                      ${(parseInt(state) == ESCRITURA_STATE.Matrices_Escrit) ?
                      "color-caution" : (parseInt(state) > ESCRITURA_STATE.Matrices_Escrit) ? "color-success" : ""}`}
        >
          <div className="number">
            <span>5</span>
          </div>
          <div className="text">
            <span className="title">Matrices Escrit.</span>
            <span className="subtitle">LEGAL</span>
          </div>
          <span className="triangle">►</span>
        </li>

        <li className={`item br-remove-right br-remove-left 
                      ${(parseInt(state) == ESCRITURA_STATE.Rev_Escrit) ?
                      "color-caution" : (parseInt(state) > ESCRITURA_STATE.Rev_Escrit) ? "color-success" : ""}`}
        >
          <div className="number">
            <span>6</span>
          </div>
          <div className="text">
            <span className="title">Rev. Escrit.</span>
            <span className="subtitle">ESCRIT.</span>
          </div>
          <span className="triangle">►</span>
        </li>

        <li className={`item br-remove-left 
                      ${(parseInt(state) == ESCRITURA_STATE.Notaria) ?
                      "color-caution" : (parseInt(state) > ESCRITURA_STATE.Notaria) ? "color-success" : ""}`}
        >
          <div className="number">
            <span>7</span>
          </div>
          <div className="text">
            <span className="title">Notaría</span>
            <span className="subtitle">ESCRIT.</span>
          </div>
          <span className="triangle">►</span>
        </li>
      </ul>
    </nav>
  );
}

Steps.propTypes = {
  state: PropTypes.number,
};

export default Steps;
