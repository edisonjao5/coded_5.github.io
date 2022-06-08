import React from 'react';
import PropTypes from 'prop-types';
import { FormattedNumber } from 'react-intl';

const IntlFormatCurrency = props => {
  const {
    className = '',
    style = {},
    value,
    currency = 'CLP',
    minimumFractionDigits = 0,
    maximumFractionDigits = 2,
    currencyDisplay = 'symbol',
    prefix = '$',
    ...rest
  } = props;
  if (value !== undefined)
    return (
      <span className={className} style={style}>
        {prefix}
        {value ?
        <FormattedNumber
          value={value}
          currency={currency}
          minimumFractionDigits={minimumFractionDigits}
          maximumFractionDigits={maximumFractionDigits}
          currencyDisplay={currencyDisplay}
          {...rest}
        /> : null}
      </span>
    );

  return '-';
};

IntlFormatCurrency.propTypes = {
  value: PropTypes.number,
  className: PropTypes.string,
  style: PropTypes.object,
  prefix: PropTypes.string,
};

export default IntlFormatCurrency;
