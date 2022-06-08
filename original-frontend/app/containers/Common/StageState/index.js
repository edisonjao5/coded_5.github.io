/**
 *
 * StageState
 *
 */

import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectStageState from './selectors';
import reducer from './reducer';
import saga from './saga';
import { fetchStageStates } from './actions';

export function StageState({ dispatch, selector }) {
  useInjectReducer({ key: 'stageState', reducer });
  useInjectSaga({ key: 'stageState', saga });

  useEffect(() => {
    if (!selector.stageStates && !selector.loading)
      dispatch(fetchStageStates());
  }, []);
  return null;
}

StageState.propTypes = {
  selector: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  selector: makeSelectStageState(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(StageState);
