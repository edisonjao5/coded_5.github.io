/**
 *
 * Quotation
 *
 */
import React, { useEffect } from 'react';

import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { Redirect } from 'react-router-dom';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { Form as ExForm } from 'components/ExForm';
import { push } from 'connected-react-router';
import Button from 'components/Button';
import { calculates } from 'containers/Phases/FormaDePago/helper';
import reducer from 'containers/Quotation/Form/reducer';
import saga from 'containers/Quotation/Form/saga';
import {
  saveQuotation,
  resetContainer,
} from 'containers/Quotation/Form/actions';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import makeSelectInitProject from 'containers/Project/Init/selectors';
import model from 'containers/Quotation/model';
import makeSelectQuotationForm from 'containers/Quotation/Form/selectors';
import WithLoading from 'components/WithLoading';
import DetailForm from './DetailForm';
import Quota from './Quota';
const SyncMessage = WithLoading();

export function ReservationCreation({
  selectorQuotation,
  selectorProject,
  dispatch,
}) {
  useInjectReducer({ key: 'quotationform', reducer });
  useInjectSaga({ key: 'quotationform', saga });
  useEffect(() => () => dispatch(resetContainer()), []);
  const { project = {} } = selectorProject;

  const initialValues = model({ project });

  if (selectorQuotation.success)
    return (
      <Redirect
        to={`/proyectos/${project.ProyectoID}/reserva/crear?CotizacionID=${
          selectorQuotation.quotation.CotizacionID
        }`}
      />
    );
  return (
    <ExForm
      initialValues={initialValues}
      onSubmit={values => dispatch(saveQuotation(values, 'reserva'))}
      validationSchema={{
        Inmuebles: Yup.array().required('Debe seleccionar inmuebles'),
      }}
    >
      {form => {
        const { moneyErr } = calculates(form.values);
        return (
          <>
            <SyncMessage {...selectorQuotation} />
            <DetailForm form={form} />
            <Quota form={form} />
            <div className="p-2 mt-2 d-flex align-items-center after-expands-2">
              <Button
                disabled={moneyErr}
                loading={selectorQuotation.loading}
                className="order-3"
                onClick={() => form.submitForm()}
              >
                Continuar
              </Button>
              <Button
                color="white"
                className="order-3"
                onClick={() =>
                  dispatch(push(`/proyectos/${project.ProyectoID}/reservas`))
                }
              >
                Volver
              </Button>
            </div>
          </>
        );
      }}
    </ExForm>
  );
}

ReservationCreation.propTypes = {
  selectorQuotation: PropTypes.object,
  selectorProject: PropTypes.object,
  dispatch: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  selectorQuotation: makeSelectQuotationForm(),
  selectorProject: makeSelectInitProject(),
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

export default compose(withConnect)(ReservationCreation);
