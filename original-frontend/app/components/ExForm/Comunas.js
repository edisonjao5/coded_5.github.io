/**
 *
 * Comunas
 *
 */

import React from 'react';
// eslint-disable-next-line no-unused-vars
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import ExField from 'components/ExForm/ExField';

const Comunas = ({ ...props }) => (
  <ExField type="select" {...props}>
    <option value="">Selecciona una Comuna...</option>

    {window.preload.local.map(local => (
      <optgroup key={local.RegionID} label={local.Name}>
        {local.provincias.map(provincia => (
          <React.Fragment key={provincia.ProvinciaID}>
            {provincia.comunas.map(comuna => (
              <option key={comuna.ComunaID} value={comuna.ComunaID}>
                {comuna.Name}
              </option>
            ))}
          </React.Fragment>
        ))}
      </optgroup>
    ))}
  </ExField>
);

Comunas.propTypes = {};

const mapStateToProps = createStructuredSelector({});

const withConnect = connect(
  mapStateToProps,
  () => ({}),
);

export default compose(withConnect)(Comunas);
