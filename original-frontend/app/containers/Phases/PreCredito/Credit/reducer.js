/*
 *
 * Credit reducer
 *
 */
import produce from 'immer';
import {
  FETCH_IF,
  FETCH_IF_ERROR,
  FETCH_IF_SUCCESS,
  REGISTER_IF,
  REGISTER_IF_ERROR,
  REGISTER_IF_SUCCESS,
  REGISTER_SELECT_IF,
  REGISTER_SELECT_IF_ERROR,
  REGISTER_SELECT_IF_SUCCESS,
  RESET_CONTAINER,
  DOWNLOAD_PRE_APPROBATION,
} from './constants';

export const initialState = {
  loading: false,
  error: false,
  success: false,
  entities: false,
  redirect: false,
};

/* eslint-disable default-case, no-param-reassign */
const creditReducer = (state = initialState, action) =>
  /* eslint-disable-next-line */
  produce(state, draft => {
    switch (action.type) {
      case RESET_CONTAINER:
        return initialState;
      case FETCH_IF:
      case REGISTER_IF:
      case REGISTER_SELECT_IF:
        draft.loading = true;
        draft.error = false;
        draft.success = false;
        draft.redirect = false;
        break;
      case FETCH_IF_ERROR:
      case REGISTER_IF_ERROR:
      case REGISTER_SELECT_IF_ERROR:
        draft.loading = false;
        draft.error = action.error;
        draft.success = false;
        break;
      case FETCH_IF_SUCCESS:
        draft.loading = false;
        draft.error = false;
        draft.entities = action.response;
        break;
      case REGISTER_IF_SUCCESS:
        draft.loading = false;
        draft.error = false;
        draft.success = action.response.detail;
        draft.entities = [
          ...draft.entities,
          ...action.response.InstitucionFinancieras,
        ];
        break;
      case REGISTER_SELECT_IF_SUCCESS:
        draft.loading = false;
        draft.error = false;
        draft.success = action.response.detail;
        draft.redirect = 'refresh';
        break;
      case DOWNLOAD_PRE_APPROBATION:
    }
  });

export default creditReducer;
