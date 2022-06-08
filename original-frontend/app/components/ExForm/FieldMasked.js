/**
 *
 * Input
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import MaskedInput from 'react-text-mask';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';

const defaultMaskOptionsNumber = {
  prefix: '$ ',
  suffix: '',
  includeThousandsSeparator: true,
  thousandsSeparatorSymbol: '.',
  allowDecimal: true,
  decimalSymbol: ',',
  decimalLimit: 2, // how many digits allowed after the decimal
  integerLimit: 10, // limit length of integer numbers
  allowNegative: false,
  allowLeadingZeroes: false,
};

const FieldMasked = ({
  onChange,
  maskOptions = {},
  type = 'text',
  placeholder,
  ...props
}) => {
  let mask = { ...maskOptions };
  switch (type) {
    case 'number':
      mask = createNumberMask({
        ...defaultMaskOptionsNumber,
        ...maskOptions,
      });
      break;
    default:
      mask = { ...maskOptions };
  }
  return (
    <div className="btype shadow-sm flex-fill mr-3">
      <MaskedInput
        onChange={evt => onChange(evt.currentTarget.value)}
        placeholder={placeholder || maskOptions.prefix || ''}
        mask={mask}
        {...props}
        className="form-control form-control-sm"
      />
    </div>
  );
};

FieldMasked.propTypes = {
  type: PropTypes.string,
  maskOptions: PropTypes.object,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
};
export default FieldMasked;
