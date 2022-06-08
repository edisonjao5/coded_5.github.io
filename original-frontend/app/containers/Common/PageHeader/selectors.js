import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the pageHeader state domain
 */

const selectPageHeaderDomain = state => state.pageHeader || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by PageHeader
 */

const makeSelectPageHeader = () =>
  createSelector(
    selectPageHeaderDomain,
    substate => substate,
  );

export default makeSelectPageHeader;
export { selectPageHeaderDomain };
