/**
 *
 * CurrencyConverter
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import makeSelectCurrencyConverter from './selectors';
import reducer from './reducer';
import Form from './Form';
import { convertAction, updateConverts } from './actions';
import saga from './saga';

function CurrencyConverter({ isOpen, selector, onHide, dispatch }) {
  useInjectReducer({ key: 'currencyConverter', reducer });
  useInjectSaga({ key: 'historySeller', saga });
  useEffect(() => {
    dispatch(convertAction({}));
  }, []);
  return (
    <Form
      isOpen={isOpen}
      onHide={onHide}
      selector={selector}
      onSubmit={values => dispatch(convertAction(values))}
      onChangeConvert={values => dispatch(updateConverts(values))}
    />
  );
}

CurrencyConverter.propTypes = {
  isOpen: PropTypes.bool,
  selector: PropTypes.object,
  onHide: PropTypes.func,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  selector: makeSelectCurrencyConverter(),
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

export default compose(withConnect)(CurrencyConverter);
