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

import makeSelectPromesaRefundGarantia from './selectors';
import reducer from './reducer';
import saga from './saga';
import { resetContainer } from './actions';

function PromesaRefundGarantia({ dispatch }) {
  useInjectReducer({ key: 'promesarefundgarantia', reducer });
  useInjectSaga({ key: 'promesarefundgarantia', saga });
  useEffect(() => () => dispatch(resetContainer()), []);
  return null;
}

PromesaRefundGarantia.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  selector: makeSelectPromesaRefundGarantia(),
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

export default compose(withConnect)(PromesaRefundGarantia);
