/**
 *
 * Client Form
 *
 */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Button from 'components/Button';
import { Box, BoxContent, BoxHeader } from 'components/Box';
import makeSelectClient from 'containers/Common/Client/selectors';
import { toggleScreen, saveClient } from 'containers/Common/Client/actions';
import ClienteForm from 'containers/Common/Client/Form';
import { Auth } from 'containers/App/helpers';
import { UserProject } from 'containers/Project/helper';
import PhaseClientView from './View';
import { isValidClient } from './helper';

export function PhaseClient({
  payType,
  canEdit,
  canConfirm,
  client,
  selectorClient,
  onHide,
  onSubmit,
  onEdit,
  onConfirm,
  onUpdate,
  isCollapse = false,
  canVNEdit,
  codeudor=null,
}) {
  useEffect(() => {
    if (selectorClient.success) onUpdate(selectorClient.client);
  }, [selectorClient.client]);
  const isValid = isValidClient({ Cliente: client, PayType: payType });
  const isContado =
    payType === window.preload.paymentUtils[0].PayTypeID ||
    payType === window.preload.paymentUtils[0].Name;
  return (
    <Box collapse isOpen={isCollapse}>
      <BoxHeader className={!isValid ? 'background-color-warning' : ''}>
        <b>DATOS CLIENTE</b>
        {!isValid && (
          <span className="font-14-rem order-3 mr-3">
            <i className="icon icon-alert color-warning" />
            <b>Faltan Datos del Cliente</b>
          </span>
        )}
        {canConfirm && (
          <div className="d-flex align-items-center mr-3 order-3">
            <div className="checkbox-01 checkbox-medium">
              <span>
                <input
                  type="checkbox"
                  onChange={evt => {
                    onConfirm('client', evt.currentTarget.checked);
                  }}
                />
                <label />
              </span>
            </div>
            <span>
              <b>Confirmar</b>
            </span>
          </div>
        )}
        {!canVNEdit &&
          ((canEdit || (UserProject.in(window.project) && Auth.isVendor())) && (
            <Button
              color="white"
              disabled={selectorClient.loading}
              className="m-btn-pen order-3"
              onClick={() => onEdit(client)}
            >
              Editar
            </Button>
          ))}
      </BoxHeader>
      <BoxContent>
        <PhaseClientView client={client} payType={payType} />
      </BoxContent>
      { codeudor && codeudor.UserID &&
        <BoxContent className="border-top m-3">
          <p>Codeudor</p>
          <PhaseClientView client={codeudor} />
        </BoxContent>
      }
      <ClienteForm
        focusHide={isContado ? ['Cargo', 'Other'] : []}
        info="advance"
        selector={selectorClient}
        onHide={() => onHide(selectorClient.client)}
        onSubmit={onSubmit}
      />
    </Box>
  );
}

PhaseClient.propTypes = {
  isCollapse: PropTypes.bool,
  payType: PropTypes.string,
  canEdit: PropTypes.bool,
  canConfirm: PropTypes.bool,
  client: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  selectorClient: PropTypes.object,
  onEdit: PropTypes.func,
  onSubmit: PropTypes.func,
  onHide: PropTypes.func,
  onConfirm: PropTypes.func,
  onUpdate: PropTypes.func,
  canVNEdit: PropTypes.bool,
  codeudor: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};

const mapStateToProps = createStructuredSelector({
  selectorClient: makeSelectClient(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onEdit: client => dispatch(toggleScreen('form', client)),
    onSubmit: values => dispatch(saveClient(values)),
    onHide: client => dispatch(toggleScreen(false, client)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(PhaseClient);
