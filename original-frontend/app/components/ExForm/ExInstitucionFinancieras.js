/**
 *
 * ExInstitucionFinancieras
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { getIn } from 'formik';
import Element from 'containers/Common/InstitucionFinanciera/Element';
import ExField from './ExField';

const ExInstitucionFinancieras = props => {
  const {
    style = {},
    applyPropertyName = 'InstitucionFinancieraID',
    ...restProps
  } = props;
  let className = props.className || '';

  return (
    <ExField
      {...props}
      component={(field, form) => {
        if (props.required && !field.value) className += 'caution';

        const getInTouched = getIn(form.touched, field.name);
        const getInErrors = getIn(form.errors, field.name);
        return (
          <div
            style={{
              width: style.width || '11.65em',
            }}
          >
            <Element
              value={field.value}
              onSelect={item =>
                form
                  ? form.setFieldValue(field.name, item[applyPropertyName])
                  : ''
              }
              {...restProps}
              applyPropertyName={applyPropertyName}
              className={className}
              isInvalid={!!(getInTouched && getInErrors)}
            />
            {getInTouched && getInErrors && (
              <div className="invalid-feedback d-block m-0">{getInErrors}</div>
            )}
          </div>
        );
      }}
    />
  );
};

ExInstitucionFinancieras.propTypes = {
  className: PropTypes.string,
  required: PropTypes.bool,
  style: PropTypes.object,
  applyPropertyName: PropTypes.string,
};

export default ExInstitucionFinancieras;
