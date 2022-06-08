/**
 *
 * Comunas
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import ExField from 'components/ExForm/ExField';
import { makeSelectPreload } from 'containers/App/selectors';

const Provincia = ({
  preload,
  selectedAttribute = 'ProvinciaID',
  ...props
}) => (
  <ExField type="select" {...props}>
    <option>Selecciona una Provincia...</option>
    {preload.local.map(local => (
      <optgroup key={local.RegionID} label={local.Name}>
        {local.provincias.map(provincia => (
          <option
            key={provincia.ProvinciaID}
            value={provincia[selectedAttribute]}
          >
            {provincia.Name}
          </option>
        ))}
      </optgroup>
    ))}
  </ExField>
);

Provincia.propTypes = {
  selectedAttribute: PropTypes.string,
  preload: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
};

const mapStateToProps = createStructuredSelector({
  preload: makeSelectPreload(),
});

const withConnect = connect(
  mapStateToProps,
  () => ({}),
);

export default compose(withConnect)(Provincia);
