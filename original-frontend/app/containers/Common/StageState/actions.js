/*
 *
 * StageStates actions
 *
 */

import {
  FETCH_STAGE_STATES,
  FETCH_STAGE_STATES_ERROR,
  FETCH_STAGE_STATES_SUCCESS,
} from './constants';

export function fetchStageStates() {
  return {
    type: FETCH_STAGE_STATES,
  };
}

export function fetchStageStatesError(error) {
  return {
    type: FETCH_STAGE_STATES_ERROR,
    error,
  };
}

export function fetchStageStatesSuccess(stageStates) {
  return {
    type: FETCH_STAGE_STATES_SUCCESS,
    stageStates,
  };
}
