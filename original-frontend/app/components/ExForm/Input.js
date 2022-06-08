/**
 *
 * Input
 *
 */

import React, { useState } from 'react';
import { Input as ReactInput } from 'reactstrap';
import PropTypes from 'prop-types';

const Input = ({ className = '', loading = false, children, ...props }) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div
      className={`btype shadow-sm ${
        props.type === 'select' ? 'icon icon-select-arrows right-icon' : ''
        } ${className.includes('caution') ? 'caution' : ''}`}
    >
      {props.type === 'select' ? (
        <ReactInput
          className={`form-control form-control-sm ${className} ${
            loading ? 'italic-gray' : ''
            }`}
          disabled={loading}
          {...props}
        >
          {loading && (
            <option className="italic-gray font-italic" value="">
              Cargando ...{' '}
            </option>
          )}
          {!loading && children}
        </ReactInput>) :
      props.type === "number" ? (
        <>
          {isEditing && !(props.readOnly) ? (
            <ReactInput
              {...props}
              type="number"
              className={`form-control form-control-sm ${className} ${
                loading ? 'italic-gray' : ''
                }`}
              disabled={loading}
              onBlur={() => { setIsEditing(false) }}
            />) : (
            <ReactInput
              {...props}
              type="text"
              className={`form-control form-control-sm ${className} ${
                loading ? 'italic-gray' : ''
                }`}
              disabled={loading}
              onFocus={() => { setIsEditing(true) }}
              readOnly
              value = {props.value ? (`${props.prefix || ''}${props.value}`) : '' }
            />)
            }
        </>) : (
        <ReactInput
          className={`form-control form-control-sm ${className} ${
            loading ? 'italic-gray' : ''
            }`}
          disabled={loading}
          {...props}
        />)
      }
    </div>)
};

Input.propTypes = {
  loading: PropTypes.bool,
  name: PropTypes.string,
  type: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
};

export default Input;
