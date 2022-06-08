/**
 *
 * Quota Form
 *
 */
import React from 'react';

import { FormattedNumber } from 'react-intl';
import PropTypes from 'prop-types';
import { Box, BoxContent, BoxHeader } from 'components/Box';
import FormaDePageForm from 'containers/Phases/FormaDePago/Form';
import { calculates } from 'containers/Phases/FormaDePago/helper';

// eslint-disable-next-line no-unused-vars
function Quota({ form }) {
  const { values } = form;
  const { total, discount } = calculates(values);

  return (
    <Box className="financing-form">
      <BoxHeader>
        <span className="title">Forma de pago final UF X</span>
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
        <FormaDePageForm form={form} />
      </BoxContent>
    </Box>
  );
}

Quota.propTypes = {
  form: PropTypes.object,
};

export default Quota;
