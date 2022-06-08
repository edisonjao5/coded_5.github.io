import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the realEstates state domain
 */

const selectRealEstateDomain = state => state.realEstate || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Entities
 */

const makeSelectRealEstate = () =>
  createSelector(
    selectRealEstateDomain,
    substate => substate,
  );

export default makeSelectRealEstate;
export { selectRealEstateDomain };
