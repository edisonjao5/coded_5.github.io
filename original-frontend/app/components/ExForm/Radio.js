import React from 'react';
import { Label, Input } from 'reactstrap';
import PropTypes from 'prop-types';
import { Field as FormikField } from 'formik';

const Radio = ({ label, ...props }) => (
  <FormikField {...props}>
    {({ field: { value, ...field } }) => (
      <div className="radio col-auto d-flex align-items-center font-14-rem">
        <div className="m-radio">
          <Input
            addon
            type="radio"
            {...field}
            value={props.defaultValue}
            /* eslint-disable-next-line */
            defaultChecked={value == props.defaultValue}
          />
          <Label />
        </div>
        <span className="ml-1 color-regular">
          <b>{label}</b>
        </span>
      </div>
    )}
  </FormikField>
);

Radio.propTypes = {
  label: PropTypes.string,
  defaultValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
  ]),
};

export default Radio;
