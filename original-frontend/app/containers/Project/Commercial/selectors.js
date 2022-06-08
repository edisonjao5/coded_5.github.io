import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the project state domain
 */

const selectCommercialDomain = state => state.commercial || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Project
 */

const makeSelectCommercial = () =>
  createSelector(
    selectCommercialDomain,
    substate => substate,
  );

export default makeSelectCommercial;
export { selectCommercialDomain };
