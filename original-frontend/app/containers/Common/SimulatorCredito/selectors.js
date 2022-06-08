import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the currencyConverter state domain
 */

const selectSimulatorCreditoDomain = state =>
  state.simulatorCredito || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by CurrencyConverter
 */

const makeSelectSimulatorCredito = () =>
  createSelector(
    selectSimulatorCreditoDomain,
    substate => substate,
  );

export default makeSelectSimulatorCredito;
export { selectSimulatorCreditoDomain };
