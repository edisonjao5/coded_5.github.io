import produce from 'immer';
import {
  RESET_CONTAINER,
  DESISTIMIENTO,
  DESISTIMIENTO_ERROR,
  DESISTIMIENTO_SUCCESS,
  UPLOAD_CONFECCION,
  UPLOAD_CONFECCION_ERROR,
  UPLOAD_CONFECCION_SUCCESS,
} from './constants';

export const initialState = {
  loading: false,
  error: false,
  success: false,
};
/* eslint-disable default-case, no-param-reassign */
const desistimentoReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case RESET_CONTAINER:
        return initialState;
      case DESISTIMIENTO:
      case UPLOAD_CONFECCION:
        draft.loading = true;
        draft.error = false;
        draft.success = false;
        break;
      case DESISTIMIENTO_ERROR:
      case UPLOAD_CONFECCION_ERROR:
        draft.loading = false;
        draft.error = action.error;
        break;
      case DESISTIMIENTO_SUCCESS:
      case UPLOAD_CONFECCION_SUCCESS:
        draft.loading = false;
        draft.error = false;
        draft.success = action.response.detail;
        break;
    }
  });

export default desistimentoReducer;
