/*
 *
 * Project reducer
 *
 */
import produce from 'immer';
import {
  IMPORT_FILE,
  IMPORT_FILE_ERROR,
  IMPORT_FILE_SUCCESS,
  IMPORT_AUTH_FILE,
  IMPORT_AUTH_FILE_ERROR,
  IMPORT_AUTH_FILE_SUCCESS,
  RESET_CONTAINER,
  SAVE_ENTITIES,
  SAVE_ENTITIES_ERROR,
  SAVE_ENTITIES_SUCCESS,
  TOGGLE_SCREEN,
} from './constants';

export const initialState = {
  loading: false,
  error: false,
  success: false,
  restrictions: [],
  reviewInmuebles: false,
  screen: 'view',
  isAuth: false,
};

/* eslint-disable default-case, no-param-reassign */
const inmuebleReducer = (state = initialState, action) =>
  /* eslint-disable-next-line */
  produce(state, draft => {
    switch (action.type) {
      case RESET_CONTAINER:
        return initialState;
      case IMPORT_FILE:
        draft.loading = true;
        draft.error = false;
        draft.success = false;
        draft.screen = 'review';
        draft.isAuth = false;
        draft.reviewInmuebles = false;
        break;
      case IMPORT_FILE_ERROR:
        draft.loading = false;
        draft.error = action.error;
        draft.success = false;
        break;
      case IMPORT_FILE_SUCCESS:
        draft.loading = false;
        draft.error = false;
        draft.success = action.response.detail;
        draft.reviewInmuebles = action.response.inmuebles;
        break;
      case IMPORT_AUTH_FILE:
        draft.loading = true;
        draft.error = false;
        draft.success = false;
        draft.isAuth = true;
        break;
      case IMPORT_AUTH_FILE_ERROR:
        draft.loading = false;
        draft.error = action.error;
        draft.success = false;
        break;
      case IMPORT_AUTH_FILE_SUCCESS:
        draft.loading = false;
        draft.error = false;
        draft.success = action.response.detail;
        draft.isAuth = action.response.isauth;
        break;
      case SAVE_ENTITIES:
        draft.loading = true;
        draft.error = false;
        draft.success = false;
        break;
      case SAVE_ENTITIES_ERROR:
        draft.loading = false;
        draft.error = action.error;
        draft.success = false;
        break;
      case SAVE_ENTITIES_SUCCESS:
        draft.loading = false;
        draft.error = false;
        draft.success = action.response.detail;
        draft.reviewInmuebles = false;
        draft.screen = 'form';
        break;
      case TOGGLE_SCREEN:
        if (action.refresh) {
          return {
            ...initialState,
            screen: action.screen,
          };
        }
        draft.screen = action.screen;
        break;
    }
  });

export default inmuebleReducer;
