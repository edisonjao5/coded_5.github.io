/*
 *
 * Offer reducer
 *
 */
import produce from 'immer';
import { calculates } from 'containers/Phases/FormaDePago/helper';
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

export const initialState = {
  loading: false,
  error: false,
  success: false,
  offer: false,
  reserva_id: null,
  redirect: '',
};

/* eslint-disable default-case, no-param-reassign */
const offerReducer = (state = initialState, action) =>
  /* eslint-disable-next-line */
  produce(state, draft => {
    switch (action.type) {
      case RESET_CONTAINER:
        return initialState;
      case GET_OFFER:
      case CONFIRM:
      case APPROVE_IN:
      case APPROVE_CONFECCION_PROMESA:
      case DELETE_OFFER:
      case SAVE_OFFER:
      case APPROVE_MODIFY:
      case WITHDRAW_OFFER:
        draft.loading = true;
        draft.error = false;
        draft.success = false;
        draft.redirect = '';
        break;
      case GET_OFFER_ERROR:
      case CONFIRM_ERROR:
      case APPROVE_IN_ERROR:
      case APPROVE_CONFECCION_PROMESA_ERROR:
      case DELETE_OFFER_ERROR:
      case SAVE_OFFER_ERROR:
      case APPROVE_MODIFY_ERROR:
      case WITHDRAW_OFFER_ERROR:
        draft.loading = false;
        draft.error = action.error;
        draft.success = false;
        draft.redirect = '';
        draft.reserva_id = null;
        break;
      case APPROVE_IN_SUCCESS:
      case WITHDRAW_OFFER_SUCCESS:
        draft.loading = false;
        draft.error = false;
        draft.success = action.response.detail;
        draft.redirect = 'ofertas';
        draft.reserva_id = action.response.reserva;
        break;
      case CONFIRM_SUCCESS:
      case APPROVE_CONFECCION_PROMESA_SUCCESS:
      case DELETE_OFFER_SUCCESS:
      case SAVE_OFFER_SUCCESS:
      case APPROVE_MODIFY_SUCCESS:
        draft.loading = false;
        draft.error = false;
        draft.success = action.response.detail;
        draft.redirect = 'list';
        draft.reserva_id = action.response.reserva;
        break;
      case GET_OFFER_SUCCESS:
        draft.loading = false;
        draft.error = false;
        // draft.screen = 'edit';
        draft.offer = {
          ...action.response,
          Empleador: action.response.Cliente.Empleador,
          CoEmpleador: (action.response.Codeudor || {}).Empleador,
          percent: calculates(action.response).percent,
          convert: calculates(action.response).convert,
        };
        break;
      case UPDATE_OFFER:
        draft.offer = { ...draft.offer, ...action.data };
        break;
    }
  });

export default offerReducer;
