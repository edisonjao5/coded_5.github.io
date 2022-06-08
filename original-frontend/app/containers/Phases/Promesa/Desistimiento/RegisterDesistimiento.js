/**
 *
 * Reservation Upload Form
 *
 */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'components/Button';
import {
  PROMESA_STATE,
  PROMESA_DESISTIMIENTO_STATE,
} from 'containers/App/constants';
import {
  canDesistimiento,
  canModificacion,
  canResciliacion,
  canResolucion,
} from './helper';

export function RegisterDesistimiento({ selector, promesa, onSubmit }) {
  const {
    PromesaState,
    PromesaDesistimientoState,
    PromesaResciliacionState,
    PromesaResolucionState,
    PromesaModificacionState,
    Comment,
  } = promesa;

  const isDesistimiento = (PromesaState === "Desistimiento");
  const [withText, setWithText] = useState(
    { text: isDesistimiento ? Comment:'',
      open: isDesistimiento
    }
  );

  let labelButton = '';
  if (
    [
      PROMESA_STATE[16],
      PROMESA_STATE[17],
      PROMESA_STATE[18],
      PROMESA_STATE[19],
    ].includes(PromesaState)
  ) {
    labelButton = PromesaState;
  }
  if (
    PromesaDesistimientoState ||
    PromesaResciliacionState ||
    PromesaResolucionState ||
    PromesaModificacionState
  )
    labelButton = `Aproba ${labelButton}`;

  return (
    <>
      {!withText.open && (
        <Button
          className="m-btn-warning-02 d-inline"
          disabled={selector.loading}
          onClick={() => setWithText({ text: '', open: true })}
        >
          {labelButton || 'Desistimiento'}
        </Button>
      )}
      {withText.open && (
        <div className="py-3 ">
          <span className="d-block text-left font-14-rem">
            <b>Comentarios</b>
          </span>
          <div className="py-3 ">
            <textarea
              className="w-100 d-block rounded-lg shadow-sm"
              rows="5"
              onChange={evt =>
                setWithText({ ...withText, text: evt.currentTarget.value })
              }
              value= {Comment}
              readOnly = {isDesistimiento}
            />
          </div>
          {canDesistimiento(promesa) && (
            <Button
              className="m-btn-warning-02 d-inline"
              disabled={selector.loading}
              onClick={() =>
                onSubmit({
                  Comment: withText.text.trim(),
                  PromesaState: PROMESA_STATE[16],
                })
              }
            >
              {labelButton || PROMESA_STATE[16]}
            </Button>
          )}
          {canResciliacion(promesa) && (
            <Button
              className="m-btn-warning-02 d-inline"
              disabled={selector.loading}
              onClick={() =>
                onSubmit({
                  Comment: withText.text.trim(),
                  PromesaState: PROMESA_STATE[17],
                })
              }
            >
              {labelButton || PROMESA_STATE[17]}
            </Button>
          )}
          {canResolucion(promesa) && (
            <Button
              className="m-btn-warning-02 d-inline"
              disabled={selector.loading}
              onClick={() =>
                onSubmit({
                  Comment: withText.text.trim(),
                  PromesaState: PROMESA_STATE[18],
                })
              }
            >
              {labelButton || PROMESA_STATE[18]}
            </Button>
          )}
          {canModificacion(promesa) && (
            <Button
              className="m-btn-warning-02 d-none"
              disabled={selector.loading}
              onClick={() =>
                onSubmit({
                  Comment: withText.text.trim(),
                  PromesaState: PROMESA_STATE[19],
                })
              }
            >
              {labelButton || PROMESA_STATE[19]}
            </Button>
          )}
        </div>
      )}
    </>
  );
}

RegisterDesistimiento.propTypes = {
  selector: PropTypes.object,
  promesa: PropTypes.object,
  onSubmit: PropTypes.func,
};

export default RegisterDesistimiento;
