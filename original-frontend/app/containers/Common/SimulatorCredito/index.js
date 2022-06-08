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
import makeSelectSimulatorCredito from './selectors';
import reducer from './reducer';
import Form from './Form';
import { simulatorAction, updateSimulators } from './actions';
import saga from './saga';

function SimulatorCredito({ isOpen, selector, onHide, dispatch }) {
  useInjectReducer({ key: 'simulatorCredito', reducer });
  useInjectSaga({ key: 'simulatorCredito', saga });
  useEffect(() => {
    dispatch(simulatorAction({}));
  }, []);
  return (
    <Form
      isOpen={isOpen}
      onHide={onHide}
      selector={selector}
      onSubmit={values => dispatch(simulatorAction(values))}
      onChangeConvert={values => dispatch(updateSimulators(values))}
    />
  );
}

SimulatorCredito.propTypes = {
  isOpen: PropTypes.bool,
  selector: PropTypes.object,
  onHide: PropTypes.func,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  selector: makeSelectSimulatorCredito(),
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

export default compose(withConnect)(SimulatorCredito);
