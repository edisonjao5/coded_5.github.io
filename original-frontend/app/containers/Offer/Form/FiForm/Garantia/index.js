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

import makeSelectOfferGarantia from './selectors';
import reducer from './reducer';
import saga from './saga';
import { resetContainer } from './actions';

export function OfferGarantia({ dispatch }) {
  useInjectReducer({ key: 'offergarantia', reducer });
  useInjectSaga({ key: 'offergarantia', saga });
  useEffect(() => () => dispatch(resetContainer()), []);
  return null;
}

OfferGarantia.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  selector: makeSelectOfferGarantia(),
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

export default compose(withConnect)(OfferGarantia);
