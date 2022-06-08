/*
 *
 * StageStates reducer
 *
 */
import produce from 'immer';
import {
  FETCH_STAGE_STATES,
  FETCH_STAGE_STATES_ERROR,
  FETCH_STAGE_STATES_SUCCESS,
} from './constants';

export const initialState = {
  loading: false,
  error: false,
  stageStates: false,
};

/* eslint-disable default-case, no-param-reassign */
const stageStatesReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case FETCH_STAGE_STATES:
        draft.loading = true;
        draft.error = false;
        break;
      case FETCH_STAGE_STATES_ERROR:
        draft.loading = false;
        draft.error = action.error;
        break;
      case FETCH_STAGE_STATES_SUCCESS:
        draft.loading = false;
        draft.error = false;
        draft.stageStates = action.stageStates.sort((a, b) => {
          if (a.RazonSocial > b.RazonSocial) return 1;
          if (a.RazonSocial < b.RazonSocial) return -1;
          return 0;
        });
        break;
    }
  });

export default stageStatesReducer;
