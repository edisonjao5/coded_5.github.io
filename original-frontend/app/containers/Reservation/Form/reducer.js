/*
 *
 * Reservation reducer
 *
 */
import produce from 'immer';
import { calculates } from 'containers/Phases/FormaDePago/helper';
import {
  GET_RESERVATION,
  GET_RESERVATION_ERROR,
  GET_RESERVATION_SUCCESS,
  SAVE_RESERVATION,
  SAVE_RESERVATION_ERROR,
  SAVE_RESERVATION_SUCCESS,
  GET_QUOTATION,
  GET_QUOTATION_ERROR,
  GET_QUOTATION_SUCCESS,
  UPDATE_RESERVATION,
  RESET_CONTAINER,
  SEND_TO_CONTROL,
  SEND_TO_CONTROL_ERROR,
  SEND_TO_CONTROL_SUCCESS,
  CANCEL_RESERVATION,
  CANCEL_RESERVATION_ERROR,
  CANCEL_RESERVATION_SUCCESS,
  CONTROL_REVIEW,
  CONTROL_REVIEW_ERROR,
  CONTROL_REVIEW_SUCCESS,
  PRINT_DOCUMENTS,
  PRINT_DOCUMENTS_ERROR,
  PRINT_DOCUMENTS_SUCCESS,
  APROVE_MODIFICATION,
  APROVE_MODIFICATION_ERROR,
  APROVE_MODIFICATION_SUCCESS,
} from './constants';

export const initialState = {
  loading: false,
  error: false,
  success: false,
  reservation: false,
  redirect: false,
  // screen: 'view',
};

/* eslint-disable default-case, no-param-reassign */
const reservationReducer = (state = initialState, action) =>
  /* eslint-disable-next-line */
  produce(state, draft => {
    switch (action.type) {
      case RESET_CONTAINER:
        return initialState;
      case GET_QUOTATION:
        draft.loading = true;
        draft.error = false;
        draft.success = false;
        draft.reservation = false;
        break;
      case GET_RESERVATION:
      case SAVE_RESERVATION:
      case SEND_TO_CONTROL:
      case CONTROL_REVIEW:
      case CANCEL_RESERVATION:
      case PRINT_DOCUMENTS:
      case APROVE_MODIFICATION:
        draft.loading = true;
        draft.error = false;
        draft.success = false;
        break;
      case PRINT_DOCUMENTS_SUCCESS:        
        draft.loading = false;
        draft.error = false;
        draft.success = true;
        break;
      case GET_QUOTATION_ERROR:
      case GET_RESERVATION_ERROR:
      case SAVE_RESERVATION_ERROR:
      case SEND_TO_CONTROL_ERROR:
      case CONTROL_REVIEW_ERROR:
      case CANCEL_RESERVATION_ERROR:
      case PRINT_DOCUMENTS_ERROR:
      case APROVE_MODIFICATION_ERROR:
        draft.loading = false;
        draft.error = action.error;
        draft.success = false;
        break;
      case GET_QUOTATION_SUCCESS:
        draft.loading = false;
        draft.error = false;
        draft.reservation = {
          ...action.response.quotation,
          Cliente: action.response.client,
          Empleador: action.response.client.Empleador,
          ...draft.reservation,
          percent: calculates(action.response.quotation).percent,
          convert: calculates(action.response.quotation).convert,
        };
        break;
      case SAVE_RESERVATION_SUCCESS:
      case SEND_TO_CONTROL_SUCCESS:
      case CANCEL_RESERVATION_SUCCESS:
        draft.loading = false;
        draft.error = false;
        // draft.screen = 'view';
        draft.success = action.response.detail;
        draft.reservation = {
          ...action.response.reserva,
          Empleador: action.response.reserva.Cliente.Empleador,
          CoEmpleador: (action.response.reserva.Codeudor || {}).Empleador,
          percent: calculates(action.response).percent,
          convert: calculates(action.response).convert,
        };
        break;
      case CONTROL_REVIEW_SUCCESS:
      case APROVE_MODIFICATION_SUCCESS:
        draft.loading = false;
        draft.error = false;
        draft.success = action.response.detail;
        draft.reservation = {
          ...state.reservation,
          ...action.response.reserva,
        };
        draft.redirect = 'list';
        break;
      case GET_RESERVATION_SUCCESS:
        draft.loading = false;
        draft.error = false;
        // draft.screen = 'edit';
        draft.reservation = {
          ...action.response,
          Empleador: action.response.Cliente.Empleador,
          CoEmpleador: (action.response.Codeudor || {}).Empleador,
          percent: calculates(action.response).percent,
          convert: calculates(action.response).convert,
        };
        break;
      case UPDATE_RESERVATION:
        draft.reservation = { ...draft.reservation, ...action.data };
        break;
    }
  });

export default reservationReducer;
