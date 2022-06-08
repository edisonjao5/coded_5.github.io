/*
 *
 * Project reducer
 *
 */
import produce from 'immer';
import {
  GET_ENTITY,
  GET_ENTITY_ERROR,
  GET_ENTITY_SUCCESS,
  RESET_CONTAINER,
  REVIEW_FINANZA,
  REVIEW_FINANZA_ERROR,
  REVIEW_FINANZA_SUCCESS,
  SAVE_ENTITY,
  SAVE_ENTITY_ERROR,
  SAVE_ENTITY_SUCCESS,
  TOGGLE_SCREEN,
} from './constants';

export const initialState = {
  loading: false,
  error: false,
  success: false,
  entity: false,
  screen: 'view',
};

/* eslint-disable default-case, no-param-reassign */
const financeReducer = (state = initialState, action) =>
  /* eslint-disable-next-line */
  produce(state, draft => {
    switch (action.type) {
      case RESET_CONTAINER:
        return initialState;
      case GET_ENTITY:
        draft.loading = true;
        draft.error = false;
        draft.success = false;
        break;
      case GET_ENTITY_ERROR:
        draft.loading = false;
        draft.error = action.error;
        draft.success = false;
        break;
      case GET_ENTITY_SUCCESS:
        draft.loading = false;
        draft.error = false;
        draft.entity = action.response;
        draft.screen = action.response ? 'view' : 'form';
        break;
      case SAVE_ENTITY:
      case REVIEW_FINANZA:
        draft.loading = true;
        draft.error = false;
        draft.success = false;
        break;
      case SAVE_ENTITY_ERROR:
      case REVIEW_FINANZA_ERROR:
        draft.loading = false;
        draft.error = action.error;
        draft.success = false;
        break;
      case SAVE_ENTITY_SUCCESS:
      case REVIEW_FINANZA_SUCCESS:
        draft.loading = false;
        draft.error = false;
        draft.screen = 'view';
        draft.success = action.response.detail;
        draft.entity = action.response.comisiones;
        break;
      case TOGGLE_SCREEN:
        if (action.refresh) {
          return {
            ...initialState,
            screen: action.screen,
            entity: draft.entity,
          };
        }
        draft.screen = action.screen;
        break;
    }
  });

export default financeReducer;
