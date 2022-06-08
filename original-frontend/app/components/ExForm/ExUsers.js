/**
 *
 * UsersElement
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { getIn } from 'formik';
import Element from 'containers/Common/User/Element';
import ExField from './ExField';

const ExUsers = props => {
  const { style = {}, onSelect, ...restProps } = props;
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
              onSelect={user => {
                if (onSelect) onSelect(user);
                else if (form) form.setFieldValue(field.name, user.UserID);
              }}
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

ExUsers.propTypes = {
  className: PropTypes.string,
  required: PropTypes.bool,
  style: PropTypes.object,
  onSelect: PropTypes.func,
};

export default ExUsers;
