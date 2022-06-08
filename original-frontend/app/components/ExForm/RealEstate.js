/**
 *
 * RealEstates
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import makeSelectRealEstate from 'containers/Common/RealEstate/selectors';
import ExField from './ExField';

const RealEstate = ({ selector, ...props }) => (
  <ExField type="select" {...props}>
    <option value="">Selecciona...</option>
    {selector.realEstates &&
      selector.realEstates.map(realEstate => (
        <option
          key={realEstate.InmobiliariaID}
          value={realEstate.InmobiliariaID}
        >
          {realEstate ? realEstate.RazonSocial : ''}
        </option>
      ))}
  </ExField>
);

RealEstate.propTypes = {
  selector: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  selector: makeSelectRealEstate(),
});

function mapDispatchToProps() {
  return {};
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(RealEstate);
