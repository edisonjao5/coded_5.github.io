/*
 *
 * CurrencyConverter actions
 *
 */

import {
  SIMULATOR_ACTION,
  SIMULATOR_ACTION_ERROR,
  SIMULATOR_ACTION_SUCCESS,
  UPDATE_SIMULATORS,
} from './constants';

export function simulatorAction(values) {
  return {
    type: SIMULATOR_ACTION,
    values,
  };
}

export function simulatorActionError(error) {
  return {
    type: SIMULATOR_ACTION_ERROR,
    error,
  };
}

export function simulatorActionSuccess(response) {
  return {
    type: SIMULATOR_ACTION_SUCCESS,
    response,
  };
}

export function updateSimulators(simulators) {
  return {
    type: UPDATE_SIMULATORS,
    simulators,
  };
}
