/**
 *
 * Offer
 *
 */
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';

import reducer from './reducer';
import saga from './saga';
import { resetContainer } from './actions';
import makeSelectFactura from './selectors';

export function Factura({ dispatch }) {
  useInjectReducer({ key: 'factura', reducer });
  useInjectSaga({ key: 'factura', saga });
  useEffect(() => () => dispatch(resetContainer()), []);
  return null;
}

Factura.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  selector: makeSelectFactura(),
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

export default compose(withConnect)(Factura);
