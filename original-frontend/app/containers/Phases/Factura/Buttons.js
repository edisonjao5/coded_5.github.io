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
import { FACTURA_STATE } from 'containers/App/constants';
import WithLoading from 'components/WithLoading';
import { isNoteCredit } from 'containers/Promesa/helper';
import makeSelectFactura from './selectors';
import { paidFactura, resumeFactura } from './actions';
const SyncMessage = WithLoading();

function FacturaButton({ promesa, selector, dispatch }) {
  const { Factura } = promesa;
  const noteCredit = isNoteCredit(promesa);
  return (
    <>
      <div className="order-3">
        <SyncMessage
          error={selector.error[Factura.FacturaID]}
          success={selector.success[Factura.FacturaID]}
        />
      </div>
      <Button
        className="order-3 m-btn-white m-btn-download"
        disabled={selector.loading[Factura.FacturaID]}
        onClick={() => dispatch(resumeFactura(Factura, noteCredit))}
      >
        {noteCredit && 'Resumen Nota Crédito'}
        {!noteCredit && 'Resumen Facturación'}
      </Button>
      {Factura.FacturaState === FACTURA_STATE[0] &&
        (!selector.success[Factura.FacturaID] && (
          <Button
            className="order-3"
            disabled={selector.loading[Factura.FacturaID]}
            onClick={() => dispatch(paidFactura(Factura, noteCredit))}
          >
            {noteCredit && 'OK Nota Crédito'}
            {!noteCredit && 'Facturación'}
          </Button>
        ))}
      {(Factura.FacturaState !== FACTURA_STATE[0] ||
        selector.success[Factura.FacturaID]) && (
        <Button className="order-3" disabled>
          {selector.success[Factura.FacturaID] || Factura.FacturaState}
        </Button>
      )}
    </>
  );
}

FacturaButton.propTypes = {
  promesa: PropTypes.object,
  selector: PropTypes.object,
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

export default compose(withConnect)(FacturaButton);
