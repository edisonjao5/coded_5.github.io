import React from 'react';
import PropTypes from 'prop-types';
import { FormattedNumber } from 'react-intl';

const IntlFormatNumber = props => {
  if (props.value)
    return (
      <span>
        {props.prefix || ' '}
        <FormattedNumber {...props} />
      </span>
    );

  return '-';
};

IntlFormatNumber.propTypes = {
  value: PropTypes.number,
  prefix: PropTypes.string,
};

export default IntlFormatNumber;
