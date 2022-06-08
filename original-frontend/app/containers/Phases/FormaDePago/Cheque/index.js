/**
 *
 * Cheque
 *
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import Button from 'components/Button';
import makeSelectCheque from './selectors';
import reducer from './reducer';
import saga from './saga';
import ChequeForm from './Form';
import { generateCheque, resetContainer } from './actions';

export function Cheque({ cuotas, onSetCuotas, selector, dispatch }) {
  useInjectReducer({ key: 'cheque', reducer });
  useInjectSaga({ key: 'cheque', saga });

  useEffect(() => () => dispatch(resetContainer()), []);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        className="m-btn-printer"
        color="white"
        onClick={() => setIsOpen(true)}
      >
        Cheques
      </Button>
      <ChequeForm
        cuotas={cuotas}
        selector={selector}
        isOpen={isOpen}
        onHide={() => setIsOpen(false)}
        onSubmit={values => {
          setIsOpen(false);
          if(onSetCuotas) onSetCuotas(values);
        }}
        onPrint={cheques => dispatch(generateCheque(cheques))}
      />
    </>
  );
}

Cheque.propTypes = {
  cuotas: PropTypes.array,
  selector: PropTypes.object,
  onSetCuotas: PropTypes.func,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  selector: makeSelectCheque(),
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

export default compose(withConnect)(Cheque);
