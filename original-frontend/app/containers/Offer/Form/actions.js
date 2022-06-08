/*
 *
 * Offer actions
 *
 */

import {
  GET_OFFER,
  GET_OFFER_ERROR,
  GET_OFFER_SUCCESS,
  UPDATE_OFFER,
  RESET_CONTAINER,
  CONFIRM,
  CONFIRM_ERROR,
  CONFIRM_SUCCESS,
  APPROVE_IN,
  APPROVE_IN_ERROR,
  APPROVE_IN_SUCCESS,
  APPROVE_CONFECCION_PROMESA,
  APPROVE_CONFECCION_PROMESA_ERROR,
  APPROVE_CONFECCION_PROMESA_SUCCESS,
  DELETE_OFFER,
  DELETE_OFFER_ERROR,
  DELETE_OFFER_SUCCESS,
  SAVE_OFFER,
  SAVE_OFFER_ERROR,
  SAVE_OFFER_SUCCESS,
  APPROVE_MODIFY,
  APPROVE_MODIFY_ERROR,
  APPROVE_MODIFY_SUCCESS,
  WITHDRAW_OFFER,
  WITHDRAW_OFFER_ERROR,
  WITHDRAW_OFFER_SUCCESS,
} from './constants';

export function resetContainer() {
  return {
    type: RESET_CONTAINER,
  };
}

export function confirmToClient(values) {
  return {
    type: CONFIRM,
    values,
  };
}

export function confirmError(error) {
  return {
    type: CONFIRM_ERROR,
    error,
  };
}

export function confirmSuccess(response) {
  return {
    type: CONFIRM_SUCCESS,
    response,
  };
}

export function approveIn(values) {
  return {
    type: APPROVE_IN,
    values,
  };
}

export function approveInError(error) {
  return {
    type: APPROVE_IN_ERROR,
    error,
  };
}

export function approveInSuccess(response) {
  return {
    type: APPROVE_IN_SUCCESS,
    response,
  };
}

export function approveConfeccionPromesa(values) {
  return {
    type: APPROVE_CONFECCION_PROMESA,
    values,
  };
}

export function approveConfeccionPromesaError(error) {
  return {
    type: APPROVE_CONFECCION_PROMESA_ERROR,
    error,
  };
}

export function approveConfeccionPromesaSuccess(response) {
  return {
    type: APPROVE_CONFECCION_PROMESA_SUCCESS,
    response,
  };
}

export function getOffer(OfertaID) {
  return {
    type: GET_OFFER,
    OfertaID,
  };
}

export function getOfferError(error) {
  return {
    type: GET_OFFER_ERROR,
    error,
  };
}

export function getOfferSuccess(response) {
  return {
    type: GET_OFFER_SUCCESS,
    response,
  };
}

export function updateOffer(data) {
  return {
    type: UPDATE_OFFER,
    data,
  };
}

export function deleteOffer(values) {
  return {
    type: DELETE_OFFER,
    values,
  };
}

export function deleteOfferError(error) {
  return {
    type: DELETE_OFFER_ERROR,
    error,
  };
}

export function deleteOfferSuccess(response) {
  return {
    type: DELETE_OFFER_SUCCESS,
    response,
  };
}

export function saveOffer(values, documents = false) {
  return {
    type: SAVE_OFFER,
    values,
    documents,
  };
}

export function saveOfferError(error) {
  return {
    type: SAVE_OFFER_ERROR,
    error,
  };
}

export function saveOfferSuccess(response) {
  return {
    type: SAVE_OFFER_SUCCESS,
    response,
  };
}

export function approveModifyOffer(values) {
  return {
    type: APPROVE_MODIFY,
    values,
  };
}

export function approveModifyOfferError(error) {
  return {
    type: APPROVE_MODIFY_ERROR,
    error,
  };
}

export function approveModifyOfferSuccess(response) {
  return {
    type: APPROVE_MODIFY_SUCCESS,
    response,
  };
}

export function withdrawOffer(values) {
  return {
    type: WITHDRAW_OFFER,
    values,
  };
}

export function withdrawOfferError(error) {
  return {
    type: WITHDRAW_OFFER_ERROR,
    error,
  };
}

export function withdrawOfferSuccess(response) {
  return {
    type: WITHDRAW_OFFER_SUCCESS,
    response,
  };
}
