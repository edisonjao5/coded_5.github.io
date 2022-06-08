import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';

import WithLoading from 'components/WithLoading';
import makeSelectDesistimento from './selectors';
import reducer from './reducer';
import saga from './saga';
import { desistimento, resetContainer, uploadConfeccion } from './actions';
import RegisterDesistimiento from './RegisterDesistimiento';
import {
  canConfeccion,
  canConfeccionFirma,
  showConfeccion,
  showConfeccionFirma,
  showDesistimiento,
} from './helper';
import DesistimientoConfeccion from './Confeccion';
import DesistimientoFirmaConfeccion from './FirmaConfeccion';
const SyncMassage = WithLoading();

export function Desistimiento({ selector, promesa, dispatch }) {
  useInjectReducer({ key: 'desistimiento', reducer });
  useInjectSaga({ key: 'desistimiento', saga });
  useEffect(() => () => dispatch(resetContainer()), []);

  return (
    <>
      {showDesistimiento(promesa) && (
        <div className="text-right mt-3">
          <RegisterDesistimiento
            promesa={promesa}
            selector={selector}
            onSubmit={values =>
              dispatch(
                desistimento({
                  ...values,
                  PromesaID: promesa.PromesaID,
                }),
              )
            }
          />
        </div>
      )}
      {showConfeccion(promesa) && (
        <DesistimientoConfeccion
          canUpload={canConfeccion(promesa)}
          promesa={promesa}
          selector={selector}
          onSubmit={values =>
            dispatch(uploadConfeccion(promesa.PromesaID, values))
          }
        />
      )}
      {showConfeccionFirma(promesa) && (
        <DesistimientoFirmaConfeccion
          canUpload={canConfeccionFirma(promesa)}
          promesa={promesa}
          selector={selector}
          onSubmit={values =>
            dispatch(uploadConfeccion(promesa.PromesaID, values))
          }
        />
      )}
      <SyncMassage {...selector} />
    </>
  );
}

Desistimiento.propTypes = {
  selector: PropTypes.object,
  promesa: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  selector: makeSelectDesistimento(),
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

export default compose(withConnect)(Desistimiento);
