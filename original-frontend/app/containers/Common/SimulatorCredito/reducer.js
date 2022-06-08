/*
 *
 * CurrencyConverter reducer
 *
 */
import produce from 'immer';
import {
  SIMULATOR_ACTION,
  SIMULATOR_ACTION_ERROR,
  SIMULATOR_ACTION_SUCCESS,
  UPDATE_SIMULATORS,
} from './constants';
import { convertStringToNumber } from '../../App/helpers';

export const initialState = {
  loading: false,
  error: false,
  entity: {
    dividendo: '',
    renta: '',
    monto: 1,
    porcentaje: 80,
    tasa: 3.2,
    plazo: 20,
    titular: 0,
  },
  converts: {
    fromUF: 0,
    toCLP: 0,
    fromCLP: 0,
    toUF: 0,
  },
};

const doConvert = (rate, converts) => ({
  ...converts,
  toCLP: convertStringToNumber(converts.fromUF) * rate,
  toUF: convertStringToNumber(converts.fromCLP) / rate,
});
/* eslint-disable default-case, no-param-reassign */
const SimulatorCreditoReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SIMULATOR_ACTION:
        draft.loading = true;
        draft.error = false;
        break;
      case SIMULATOR_ACTION_ERROR:
        draft.loading = false;
        draft.error = true;
        break;
      case SIMULATOR_ACTION_SUCCESS:
        draft.loading = false;
        draft.error = false;
        draft.entity = action.response;
        // draft.converts = doConvert(draft.entity.plazo, state.converts);
        break;
      case UPDATE_SIMULATORS:
        draft.converts = doConvert(state.entity.valor, {
          ...state.converts,
          ...action.converts,
        });
        break;
    }
  });

export default SimulatorCreditoReducer;
