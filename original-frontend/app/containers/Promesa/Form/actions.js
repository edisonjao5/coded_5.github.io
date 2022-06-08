/*
 *
 * Promesa actions
 *
 */

import {
  GET_PROMESA,
  GET_PROMESA_ERROR,
  GET_PROMESA_SUCCESS,
  UPDATE_PROMESA,
  RESET_CONTAINER,
  UPLOAD_CONFECCION_PROMESA,
  UPLOAD_CONFECCION_PROMESA_ERROR,
  UPLOAD_CONFECCION_PROMESA_SUCCESS,
  REJECT_CONFECCION_PROMESA,
  REJECT_CONFECCION_PROMESA_ERROR,
  REJECT_CONFECCION_PROMESA_SUCCESS,
  APPROVE_UPLOAD_CONFECCION_PROMESA_ERROR,
  APPROVE_UPLOAD_CONFECCION_PROMESA_SUCCESS,
  APPROVE_UPLOAD_CONFECCION_PROMESA,
  UPLOAD_FIRMA_DOCUMENTS_PROMESA,
  UPLOAD_FIRMA_DOCUMENTS_PROMESA_ERROR,
  UPLOAD_FIRMA_DOCUMENTS_PROMESA_SUCCESS,
  CONTROL_PROMESA,
  CONTROL_PROMESA_ERROR,
  CONTROL_PROMESA_SUCCESS,
  SEND_PROMESA_TO_IN,
  SEND_PROMESA_TO_IN_ERROR,
  SEND_PROMESA_TO_IN_SUCCESS,
  SIGN_IN,
  SIGN_IN_ERROR,
  SIGN_IN_SUCCESS,
  LEGALIZE,
  LEGALIZE_ERROR,
  LEGALIZE_SUCCESS,
  SEND_COPY,
  SEND_COPY_ERROR,
  SEND_COPY_SUCCESS,
  SEND_TO_REVIEW_NEGOCIACION,
  SEND_TO_REVIEW_NEGOCIACION_ERROR,
  SEND_TO_REVIEW_NEGOCIACION_SUCCESS,
  REVIEW_NEGOCIACION_ERROR,
  REVIEW_NEGOCIACION,
  REVIEW_NEGOCIACION_SUCCESS,
  CONTROL_NEGOCIACION,
  CONTROL_NEGOCIACION_ERROR,
  CONTROL_NEGOCIACION_SUCCESS,
  GENERATE_FACTURA,
  GENERATE_FACTURA_ERROR,
  GENERATE_FACTURA_SUCCESS,
  SEND_PROMESA_TO_CLIENTE,
  SEND_PROMESA_TO_CLIENTE_ERROR,
  SEND_PROMESA_TO_CLIENTE_SUCCESS,
} from './constants';

export function resetContainer() {
  return {
    type: RESET_CONTAINER,
  };
}

export function updatePromesa(values) {
  return {
    type: UPDATE_PROMESA,
    values,
  };
}

export function getPromesa(PromesaID) {
  return {
    type: GET_PROMESA,
    PromesaID,
  };
}

export function getPromesaError(error) {
  return {
    type: GET_PROMESA_ERROR,
    error,
  };
}

export function getPromesaSuccess(response) {
  return {
    type: GET_PROMESA_SUCCESS,
    response,
  };
}

export function uploadConfeccionPromesa(PromesaID, values) {
  return {
    type: UPLOAD_CONFECCION_PROMESA,
    PromesaID,
    values,
  };
}

export function uploadConfeccionPromesaError(error) {
  return {
    type: UPLOAD_CONFECCION_PROMESA_ERROR,
    error,
  };
}

export function uploadConfeccionPromesaSuccess(response) {
  return {
    type: UPLOAD_CONFECCION_PROMESA_SUCCESS,
    response,
  };
}

export function rejectConfeccionPromesa(PromesaID, Comment) {
  return {
    type: REJECT_CONFECCION_PROMESA,
    PromesaID,
    Comment,
  };
}

export function rejectConfeccionPromesaError(error) {
  return {
    type: REJECT_CONFECCION_PROMESA_ERROR,
    error,
  };
}

export function rejectConfeccionPromesaSuccess(response) {
  return {
    type: REJECT_CONFECCION_PROMESA_SUCCESS,
    response,
  };
}

export function approveUploadConfeccionPromesa(values) {
  return {
    type: APPROVE_UPLOAD_CONFECCION_PROMESA,
    values,
  };
}

export function approveUploadConfeccionPromesaError(error) {
  return {
    type: APPROVE_UPLOAD_CONFECCION_PROMESA_ERROR,
    error,
  };
}

export function approveUploadConfeccionPromesaSuccess(response) {
  return {
    type: APPROVE_UPLOAD_CONFECCION_PROMESA_SUCCESS,
    response,
  };
}

export function uploadFirmaDocumentsPromesa(PromesaID, values) {
  return {
    type: UPLOAD_FIRMA_DOCUMENTS_PROMESA,
    PromesaID,
    values,
  };
}

export function uploadFirmaDocumentsPromesaError(error) {
  return {
    type: UPLOAD_FIRMA_DOCUMENTS_PROMESA_ERROR,
    error,
  };
}

export function uploadFirmaDocumentsPromesaSuccess(response) {
  return {
    type: UPLOAD_FIRMA_DOCUMENTS_PROMESA_SUCCESS,
    response,
  };
}

export function controlPromesa(values) {
  return {
    type: CONTROL_PROMESA,
    values,
  };
}

export function controlPromesaError(error) {
  return {
    type: CONTROL_PROMESA_ERROR,
    error,
  };
}

export function controlPromesaSuccess(response) {
  return {
    type: CONTROL_PROMESA_SUCCESS,
    response,
  };
}

export function sendPromesaToIn(values) {
  return {
    type: SEND_PROMESA_TO_IN,
    values,
  };
}

export function sendPromesaToInError(error) {
  return {
    type: SEND_PROMESA_TO_IN_ERROR,
    error,
  };
}

export function sendPromesaToInSuccess(response) {
  return {
    type: SEND_PROMESA_TO_IN_SUCCESS,
    response,
  };
}

export function sendPromesaToCliente(values) {
  return {
    type: SEND_PROMESA_TO_CLIENTE,
    values,
  };
}

export function sendPromesaToClienteError(error) {
  return {
    type: SEND_PROMESA_TO_CLIENTE_ERROR,
    error,
  };
}

export function sendPromesaToClienteSuccess(response) {
  return {
    type: SEND_PROMESA_TO_CLIENTE_SUCCESS,
    response,
  };
}

export function signIn(values) {
  return {
    type: SIGN_IN,
    values,
  };
}

export function signInError(error) {
  return {
    type: SIGN_IN_ERROR,
    error,
  };
}

export function signInSuccess(response) {
  return {
    type: SIGN_IN_SUCCESS,
    response,
  };
}

export function legalize(values) {
  return {
    type: LEGALIZE,
    values,
  };
}

export function legalizeError(error) {
  return {
    type: LEGALIZE_ERROR,
    error,
  };
}

export function legalizeSuccess(response) {
  return {
    type: LEGALIZE_SUCCESS,
    response,
  };
}

export function sendCopy(values) {
  return {
    type: SEND_COPY,
    values,
  };
}

export function sendCopyError(error) {
  return {
    type: SEND_COPY_ERROR,
    error,
  };
}

export function sendCopySuccess(response) {
  return {
    type: SEND_COPY_SUCCESS,
    response,
  };
}

export function sendToReviewNegociacion(values) {
  return {
    type: SEND_TO_REVIEW_NEGOCIACION,
    values,
  };
}

export function sendToReviewNegociacionError(error) {
  return {
    type: SEND_TO_REVIEW_NEGOCIACION_ERROR,
    error,
  };
}

export function sendToReviewNegociacionSuccess(response) {
  return {
    type: SEND_TO_REVIEW_NEGOCIACION_SUCCESS,
    response,
  };
}

export function reviewNegociacion(values) {
  return {
    type: REVIEW_NEGOCIACION,
    values,
  };
}

export function reviewNegociacionError(error) {
  return {
    type: REVIEW_NEGOCIACION_ERROR,
    error,
  };
}

export function reviewNegociacionSuccess(response) {
  return {
    type: REVIEW_NEGOCIACION_SUCCESS,
    response,
  };
}

export function controlNegociacion(values) {
  return {
    type: CONTROL_NEGOCIACION,
    values,
  };
}

export function controlNegociacionError(error) {
  return {
    type: CONTROL_NEGOCIACION_ERROR,
    error,
  };
}

export function controlNegociacionSuccess(response) {
  return {
    type: CONTROL_NEGOCIACION_SUCCESS,
    response,
  };
}

export function generateFactura(values) {
  return {
    type: GENERATE_FACTURA,
    values,
  };
}

export function generateFacturaError(error) {
  return {
    type: GENERATE_FACTURA_ERROR,
    error,
  };
}

export function generateFacturaSuccess(response) {
  return {
    type: GENERATE_FACTURA_SUCCESS,
    response,
  };
}
