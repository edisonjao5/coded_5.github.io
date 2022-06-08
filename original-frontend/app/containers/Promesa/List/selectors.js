import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the promesa state domain
 */

const selectPromesasDomain = state => state.promesas || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Promesa
 */

const makeSelectPromesa = () =>
  createSelector(
    selectPromesasDomain,
    substate => substate,
  );

export default makeSelectPromesa;
export { selectPromesasDomain };
