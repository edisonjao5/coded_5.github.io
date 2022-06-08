/**
 *
 * Entities
 *
 */

import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectRealEstate from './selectors';
import reducer from './reducer';
import saga from './saga';
import { fetchEntities } from './actions';

export function EntityInit({ dispatch }) {
  useInjectReducer({ key: 'realEstate', reducer });
  useInjectSaga({ key: 'realEstate', saga });

  useEffect(() => {
    dispatch(fetchEntities());
  }, []);

  return null;
}

EntityInit.propTypes = {
  selector: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  selector: makeSelectRealEstate(),
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

export default compose(withConnect)(EntityInit);
