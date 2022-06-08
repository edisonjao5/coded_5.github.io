import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the project state domain
 */

const selectPolizaDomain = state => state.poliza || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Project
 */

const makeSelectPoliza = () =>
  createSelector(
    selectPolizaDomain,
    substate => substate,
  );

export default makeSelectPoliza;
export { selectPolizaDomain };
