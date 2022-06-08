import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the project state domain
 */

const selectInmuebleDomain = state => state.inmueble || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Project
 */

const makeSelectInmueble = () =>
  createSelector(
    selectInmuebleDomain,
    substate => substate,
  );

export default makeSelectInmueble;
export { selectInmuebleDomain };
