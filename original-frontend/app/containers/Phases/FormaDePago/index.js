/**
 *
 * Reservation Inmueble Form
 *
 */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedNumber } from 'react-intl';
import { Form as ExForm } from 'components/ExForm';
import Button from 'components/Button';
import { Box, BoxContent, BoxHeader } from 'components/Box';
import { formatNumber } from 'containers/App/helpers';
import { calculates } from './helper';
import FormaDePagoView from './View';
import FormModal from './FormModal';

export function PhaseFormaDePago({
  isCollapse = false,
  onConfirm,
  initialValues,
  canEdit,
  canConfirm,
  onUpdate,
}) {
  const [isOpen, setOpen] = useState(false);

  return (
    <ExForm initialValues={initialValues}
            onSubmit={onUpdate}
    >
      {form => {
        const { total, discount, balance, moneyErr } = calculates(form.values);
        return (
          <Box collapse isOpen={isCollapse}>
            <BoxHeader className={moneyErr ? 'background-color-warning' : ''}>
              <b>FORMA DE PAGO VALOR FINAL UF</b>
              <span className="order-1 mx-4 font-21">
                <b>
                  <FormattedNumber value={total - discount} />
                </b>
              </span>
              {moneyErr && (
                <span className="font-14-rem order-3 mr-3">
                  <i className="icon icon-alert color-warning" />
                  <b>La diferencia es de: {formatNumber(balance)}</b>
                </span>
              )}
              {canConfirm && !moneyErr && (
                <div className="d-flex align-items-center mr-3 order-3">
                  <div className="checkbox-01 checkbox-medium">
                    <span>
                      <input
                        type="checkbox"
                        onChange={evt => {
                          onConfirm('forma', evt.currentTarget.checked);
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
              {canEdit && (
                <Button
                  color="white"
                  className="m-btn-pen order-3"
                  onClick={() => setOpen(true)}
                >
                  Editar
                </Button>
              )}
            </BoxHeader>
            <BoxContent>
              <FormaDePagoView values={form.values} />
            </BoxContent>
            {canEdit && (
              <FormModal
                form={form}
                onHide={() => setOpen(false)}
                isOpen={isOpen}
                onUpdate={() => {
                  setOpen(false);
                  form.submitForm();
                }}
              />
            )}
          </Box>
        );
      }}
    </ExForm>
  );
}

PhaseFormaDePago.propTypes = {
  isCollapse: PropTypes.bool,
  canEdit: PropTypes.bool,
  canConfirm: PropTypes.bool,
  initialValues: PropTypes.object,
  onConfirm: PropTypes.func,
  onUpdate: PropTypes.func,
};

export default PhaseFormaDePago;
