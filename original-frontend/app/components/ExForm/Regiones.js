/**
 *
 * Regiones
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { makeSelectPreload } from 'containers/App/selectors';
import ExField from './ExField';

const Regiones = ({ preload, selectedAttribute = 'RegionID', ...props }) => (
  <ExField type="select" {...props}>
    <option selected="true" disabled="disabled" value="">
      Selecciona una Región...
    </option>
    {preload.local.map(region => (
      <option key={region.regionID} value={region[selectedAttribute]}>
        {region.Name}
      </option>
    ))}
  </ExField>
);

Regiones.propTypes = {
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

export default compose(withConnect)(Regiones);
