/* eslint-disable jsx-a11y/label-has-associated-control */
/**
 *
 * Project
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import { getFileName } from 'containers/App/helpers';
import { FormGroup, Label } from 'components/ExForm';

function DocumentItemView({ value, label }) {
  return (
    <FormGroup className="align-items-center">
      <Label style={{ width: 'auto' }} className="mr-4">
        {label}
      </Label>
      <span
        className="font-14-rem mx-2 text-nowrap overflow-hidden"
        style={{ textOverflow: 'ellipsis' }}
        title={getFileName(value)}
      >
        {getFileName(value)}
      </span>
      <a
        href={value}
        target="_blank"
        download
        className="font-14-rem mx-2 btn-arrow text-nowrap"
      >
        <b>Ver {label}</b>
      </a>
    </FormGroup>
  );
}

DocumentItemView.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
};

export default DocumentItemView;
