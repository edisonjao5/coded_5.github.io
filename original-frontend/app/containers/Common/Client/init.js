/**
 *
 * Clients
 *
 */

import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectClient from './selectors';
import reducer from './reducer';
import saga from './saga';
import { fetchClients } from './actions';

export function ClientInit({ dispatch }) {
  useInjectReducer({ key: 'client', reducer });
  useInjectSaga({ key: 'client', saga });

  useEffect(() => {
    dispatch(fetchClients());
  }, []);

  return null;
}

ClientInit.propTypes = {
  client: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  client: makeSelectClient(),
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

export default compose(withConnect)(ClientInit);
