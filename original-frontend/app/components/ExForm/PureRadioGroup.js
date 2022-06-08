import React from 'react';
import { Input, Label } from 'reactstrap';
import PropTypes from 'prop-types';

const PureRadioGroup = ({ options = [], name, value, ...props }) => (
  <div className="row">
    <div className="d-flex">
      {options.map(option => (
        <div
          className="radio col-auto d-flex align-items-center font-14-rem"
          key={option.label}
        >
          <div className="m-radio">
            <Input
              addon
              type="radio"
              name={name}
              value={option.value}
              // eslint-disable-next-line eqeqeq
              checked={value == option.value}
              {...props}
            />
            <Label />
          </div>
          <span className="ml-1 font-14-rem">
            <b>{option.label}</b>
          </span>
        </div>
      ))}
    </div>
  </div>
);

PureRadioGroup.propTypes = {
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  options: PropTypes.array,
};

export default PureRadioGroup;
