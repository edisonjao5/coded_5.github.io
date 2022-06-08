/**
 *
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import Button from 'components/Button';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { PROMESA_REFUND_STATE } from 'containers/App/constants';
import WithLoading from 'components/WithLoading';
import { getExtraPromesaState } from 'containers/Promesa/helper';
import makeSelectPromesaRefundGarantia from './selectors';
import { refundGarantia } from './actions';

const SyncMessage = WithLoading();

function RefundGrantiaButton({ promesa, selector, dispatch }) {
  const extraPromesaState = getExtraPromesaState(promesa);
  return (
    <>
      <div className="order-3">
        <SyncMessage
          error={selector.error[promesa.PromesaID]}
          success={selector.success[promesa.PromesaID]}
        />
      </div>
      {extraPromesaState === PROMESA_REFUND_STATE[0] &&
        (!selector.success[promesa.PromesaID] && (
          <Button
            className="order-3"
            loading={selector.loading[promesa.PromesaID]}
            onClick={() => dispatch(refundGarantia(promesa.PromesaID))}
          >
            Devolución Garantía
          </Button>
        ))}
      {(extraPromesaState === PROMESA_REFUND_STATE[1] ||
        selector.success[promesa.PromesaID]) && (
        <Button className="order-3" disabled>
          Refund
        </Button>
      )}
    </>
  );
}

RefundGrantiaButton.propTypes = {
  promesa: PropTypes.object,
  selector: PropTypes.object,
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

export default compose(withConnect)(RefundGrantiaButton);
