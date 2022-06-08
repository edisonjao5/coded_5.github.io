import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the inmueble state domain
 */

const selectInmuebleInitDomain = state => state.inmuebleInit || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Inmueble
 */

const makeSelectInmuebleInit = () =>
  createSelector(
    selectInmuebleInitDomain,
    substate => substate,
  );

export default makeSelectInmuebleInit;
export { selectInmuebleInitDomain };
