/**
 *
 * ClientsElement
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { getIn } from 'formik';
import Element from 'containers/Common/Client/Element';
import ExField from './ExField';

const ExClients = props => {
  const { style = { width: '11.65em' }, onSelect, ...restProps } = props;
  let className = props.className || '';

  return (
    <ExField
      {...props}
      component={(field, form) => {
        if (props.required && !field.value) className += 'caution';

        const getInTouched = getIn(form.touched, field.name);
        const getInErrors = getIn(form.errors, field.name);

        return (
          <div style={style}>
            <Element
              value={field.value}
              onSelect={client => {
                if (onSelect) onSelect(client);
                else if (form) form.setFieldValue(field.name, client.UserID);
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

ExClients.propTypes = {
  focusHide: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
  info: PropTypes.string, // advance
  canEdit: PropTypes.bool,
  className: PropTypes.string,
  required: PropTypes.bool,
  style: PropTypes.object,
  onSelect: PropTypes.func,
};

export default ExClients;
