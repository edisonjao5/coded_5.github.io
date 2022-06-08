import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the entities state domain
 */

const selectInstitucionFinancieraDomain = state =>
  state.institucionFinanciera || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Entities
 */

const makeSelectInstitucionFinanciera = () =>
  createSelector(
    selectInstitucionFinancieraDomain,
    substate => substate,
  );

export default makeSelectInstitucionFinanciera;
export { selectInstitucionFinancieraDomain };
