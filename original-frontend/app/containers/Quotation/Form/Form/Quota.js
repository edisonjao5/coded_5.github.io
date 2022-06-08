/**
 *
 * Quota Form
 *
 */
import React from 'react';

import { FormattedNumber, intlShape } from 'react-intl';
import PropTypes from 'prop-types';
import { Box, BoxContent, BoxHeader, BoxFooter } from 'components/Box';
import Button from 'components/Button';
import FormaDePageForm from 'containers/Phases/FormaDePago/Form';
import { calculates } from 'containers/Phases/FormaDePago/helper';

// eslint-disable-next-line no-unused-vars
function QuotaForm({ defaultPercent={}, goReserva, onCancel, form }) {
  const { values, submitForm } = form;

  const { total, discount, moneyErr } = calculates(values);

  return (
    <Box className="financing-form">
      <BoxHeader>
        <span className="title">Forma de pago valor final UF </span>
        <span
          style={{
            fontSize: '1.3em',
            marginLeft: '.5rem',
            fontWeight: 600,
          }}
        >
          <FormattedNumber value={total - discount} />
        </span>
      </BoxHeader>
      <BoxContent>
        <FormaDePageForm defaultPercent={defaultPercent} form={form} />
      </BoxContent>
      <BoxFooter>
        <Button
          name="submitForm"
          disabled={moneyErr}
          type="submit"
          onClick={evt => {
            evt.preventDefault();
            submitForm();
          }}
        >
          Cotizar
        </Button>
        <Button disabled={moneyErr} color="white" onClick={goReserva}>
          Crear reserva
        </Button>
        <Button color="white" onClick={onCancel}>
          Volver
        </Button>
      </BoxFooter>
    </Box>
  );
}

QuotaForm.propTypes = {
  form: PropTypes.object,
  goReserva: PropTypes.func,
  onCancel: PropTypes.func,
};
QuotaForm.contextTypes = {
  intl: intlShape,
};
export default QuotaForm;
