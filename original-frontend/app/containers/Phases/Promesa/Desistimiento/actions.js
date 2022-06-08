import {
  RESET_CONTAINER,
  DESISTIMIENTO,
  DESISTIMIENTO_ERROR,
  DESISTIMIENTO_SUCCESS,
  UPLOAD_CONFECCION,
  UPLOAD_CONFECCION_ERROR,
  UPLOAD_CONFECCION_SUCCESS,
} from './constants';

export function resetContainer() {
  return {
    type: RESET_CONTAINER,
  };
}
export function desistimento(values) {
  return {
    type: DESISTIMIENTO,
    values,
  };
}

export function desistimentoError(error) {
  return {
    type: DESISTIMIENTO_ERROR,
    error,
  };
}

export function desistimentoSuccess(response) {
  return {
    type: DESISTIMIENTO_SUCCESS,
    response,
  };
}

export function uploadConfeccion(PromesaID, values) {
  return {
    type: UPLOAD_CONFECCION,
    PromesaID,
    values,
  };
}

export function uploadConfeccionError(error) {
  return {
    type: UPLOAD_CONFECCION_ERROR,
    error,
  };
}

export function uploadConfeccionSuccess(response) {
  return {
    type: UPLOAD_CONFECCION_SUCCESS,
    response,
  };
}
