import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the currencyConverter state domain
 */

const selectCurrencyConverterDomain = state =>
  state.currencyConverter || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by CurrencyConverter
 */

const makeSelectCurrencyConverter = () =>
  createSelector(
    selectCurrencyConverterDomain,
    substate => substate,
  );

export default makeSelectCurrencyConverter;
export { selectCurrencyConverterDomain };
