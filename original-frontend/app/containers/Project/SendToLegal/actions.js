/*
 *
 * SendToLegal actions
 *
 */

import {
  RESET_CONTAINER,
  SEND_TO_LEGAL,
  SEND_TO_LEGAL_ERROR,
  SEND_TO_LEGAL_SUCCESS,
} from './constants';
export function resetContainer() {
  return {
    type: RESET_CONTAINER,
  };
}

export function sendToLegal(ProyectoID) {
  return {
    type: SEND_TO_LEGAL,
    ProyectoID,
  };
}

export function sendToLegalError(error) {
  return {
    type: SEND_TO_LEGAL_ERROR,
    error,
  };
}

export function sendToLegalSuccess(response) {
  return {
    type: SEND_TO_LEGAL_SUCCESS,
    response,
  };
}
