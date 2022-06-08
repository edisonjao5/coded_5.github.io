/*
 *
 * Quotation reducer
 *
 */
import produce from 'immer';
import {
  RESET_CONTAINER,
  GET_QUOTATION,
  GET_QUOTATION_ERROR,
  GET_QUOTATION_SUCCESS,
  SAVE_QUOTATION,
  SAVE_QUOTATION_ERROR,
  SAVE_QUOTATION_SUCCESS,
  UPDATE_QUOTATION,
  DOWNLOAD_QUOTATION,
  DOWNLOAD_QUOTATION_ERROR,
  DOWNLOAD_QUOTATION_SUCCESS,
} from './constants';

export const initialState = {
  loading: false,
  error: false,
  success: false,
  quotation: false,
  redirect: 'view',
};

/* eslint-disable default-case, no-param-reassign */
const quotationReducer = (state = initialState, action) =>
  /* eslint-disable-next-line */
  produce(state, draft => {
    switch (action.type) {
      case RESET_CONTAINER:
        return initialState;
      case GET_QUOTATION:
      case DOWNLOAD_QUOTATION:
        draft.loading = true;
        draft.error = false;
        draft.success = false;
        break;
      case SAVE_QUOTATION:
        draft.loading = true;
        draft.error = false;
        draft.success = false;
        draft.redirect = action.redirect;
        break;
      case GET_QUOTATION_ERROR:
      case SAVE_QUOTATION_ERROR:
      case DOWNLOAD_QUOTATION_ERROR:
        draft.loading = false;
        draft.error = action.error;
        draft.success = false;
        break;
      case SAVE_QUOTATION_SUCCESS:
        draft.loading = false;
        draft.error = false;
        // draft.redirect = 'list';
        draft.success = action.response.detail;
        draft.quotation = action.response.cotizacion;
        break;
      case GET_QUOTATION_SUCCESS:
        draft.loading = false;
        draft.error = false;
        draft.quotation = action.quotation;
        break;
      case DOWNLOAD_QUOTATION_SUCCESS:
        draft.loading = false;
        draft.error = false;
        draft.success = false;
        break;
      case UPDATE_QUOTATION:
        draft.quotation = { ...draft.quotation, ...action.data };
        break;
    }
  });

export default quotationReducer;
