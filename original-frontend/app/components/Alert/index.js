/**
 *
 * Alert
 *
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const Alert = ({
  type = 'regular',
  icon = true,
  children,
  onChange,
  onDismiss,
  checked,
  timeout = 0,
  size = '',
  className = '',
}) => {
  const [isChecked, setChecked] = useState(checked);
  const [isDismissed, setDismissed] = useState(false);
  let timeId;
  useEffect(() => {
    if (timeout && timeout > 0)
      timeId = setTimeout(() => {
        setDismissed(true);
      }, timeout);
    return () => {
      if (timeId) clearTimeout(timeId);
    };
  }, [isDismissed]);

  const space = size === 'small' ? 'px-1 font-14' : 'px-2 font-18';
  let showIcon = '';
  let color = '';
  let iconColor = '';
  switch (type) {
    case 'success':
      showIcon = icon === true ? 'check' : icon;
      color = 'success';
      iconColor = 'color-success-icon';
      break;
    case 'warning':
      showIcon = icon === true ? 'z-alert' : icon;
      color = 'caution';
      iconColor = 'color-caution-02-icon';
      break;
    case 'default':
      showIcon = icon === true ? '' : icon;
      color = 'white';
      iconColor = 'color-regular';
      break;
    default:
      showIcon = icon === true ? 'alert' : icon;
      color = 'warning';
      iconColor = 'color-warning-icon';
  }
  showIcon = icon === false ? '' : showIcon;
  if (isDismissed) return null;
  return (
    <div
      className={`background-color-${color} text-left ${
        type === 'danger' ? 'border-color-danger' : ''
      } ${space} ${
        isChecked ? 'border-color-danger' : ''
      } mb-2 mt-2  rounded-lg  alert fade show p-0 ${className}`}
    >
      <table className="table table-responsive-md table-borderless m-0 rounded-lg">
        <tbody>
          <tr className="align-middle-group">
            {(onChange || checked !== undefined) && (
              <td>
                <div className="checkbox-01 checkbox-dinamic">
                  <span>
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={evt => {
                        setChecked(evt.target.checked);
                        if (onChange) onChange(evt.target.checked);
                      }}
                    />
                    {/* eslint-disable-next-line */}
                      <label/>
                  </span>
                </div>
              </td>
            )}
            {showIcon && (
              <td>
                <i className={`icon icon-${showIcon} ${iconColor}`} />
              </td>
            )}
            <td className="w-100">
              <span className="font-14-rem color-regular">
                <b>{children}</b>
              </span>
            </td>
            <td>
              {onDismiss && (
                <button
                  type="button"
                  className="close"
                  onClick={() => {
                    if (typeof onDismiss === 'function') onDismiss();
                    else setDismissed(true);
                  }}
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </button>
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

Alert.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string,
  checked: PropTypes.bool,
  timeout: PropTypes.number,
  icon: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  size: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  onChange: PropTypes.func,
  onDismiss: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
};

export default Alert;
