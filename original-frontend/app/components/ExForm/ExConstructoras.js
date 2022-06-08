/**
 *
 * ConstructionsElement
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { getIn } from 'formik';
import Element from 'containers/Common/RealEstate/Element';
import ExField from './ExField';

const ExConstructoras = props => {
  const { style = {}, query = { type: 'constructora' }, ...restProps } = props;
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
              onSelect={Id => (form ? form.setFieldValue(field.name, Id) : '')}
              query={query}
              {...restProps}
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

ExConstructoras.propTypes = {
  className: PropTypes.string,
  required: PropTypes.bool,
  style: PropTypes.object,
  query: PropTypes.object,
};

export default ExConstructoras;
