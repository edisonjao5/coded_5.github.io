import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectRouter = state => state.router;

const makeSelectLocation = () =>
  createSelector(
    selectRouter,
    routerState => routerState.location,
  );

const selectGlobal = state => state.global || initialState;

const makeSelectGlobal = () =>
  createSelector(
    selectGlobal,
    globalState => globalState,
  );

const makeSelectPreload = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.preload,
  );

export {
  selectGlobal,
  makeSelectLocation,
  makeSelectGlobal,
  makeSelectPreload,
};
