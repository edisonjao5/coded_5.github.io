/*
 *
 * Project reducer
 *
 */
import produce from 'immer';
import {
  APPROVE_DOCUMENTS,
  APPROVE_DOCUMENTS_ERROR,
  APPROVE_DOCUMENTS_SUCCESS,
  SAVE_ENTITY,
  SAVE_ENTITY_ERROR,
  SAVE_ENTITY_SUCCESS,
  REVIEW_ENTITY,
  REVIEW_ENTITY_ERROR,
  REVIEW_ENTITY_SUCCESS,
  TOGGLE_SCREEN,
  RESET_CONTAINER,
} from './constants';

export const initialState = {
  loading: false,
  error: false,
  success: false,
};

/* eslint-disable default-case, no-param-reassign */
const legalReducer = (state = initialState, action) =>
  /* eslint-disable-next-line */
  produce(state, draft => {
    switch (action.type) {
      case RESET_CONTAINER:
        return initialState;
      case SAVE_ENTITY:
      case REVIEW_ENTITY:
      case APPROVE_DOCUMENTS:
        draft.loading = true;
        draft.error = false;
        draft.success = false;
        break;
      case SAVE_ENTITY_ERROR:
      case REVIEW_ENTITY_ERROR:
      case APPROVE_DOCUMENTS_ERROR:
        draft.loading = false;
        draft.error = action.error;
        draft.success = false;
        break;
      case SAVE_ENTITY_SUCCESS:
        draft.loading = false;
        draft.error = false;
        draft.success = action.response.detail;
        break;
      case REVIEW_ENTITY_SUCCESS:
        draft.loading = false;
        draft.error = false;
        draft.success = 'Exitosa';
        break;
      case APPROVE_DOCUMENTS_SUCCESS:
        draft.loading = false;
        draft.error = false;
        draft.success = action.response.detail;
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

export default legalReducer;
