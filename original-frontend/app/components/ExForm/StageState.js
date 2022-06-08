/**
 *
 * StageStates
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import ExField from 'components/ExForm/ExField';
import makeSelectStageState from 'containers/Common/StageState/selectors';

const StageState = ({ selector, ...props }) => (
  <ExField type="select" {...props}>
    <option value="">Selecciona...</option>
    {selector.stageStates &&
      selector.stageStates.map(stageState => (
        <option key={stageState.EtapaStateID} value={stageState.EtapaStateID}>
          {stageState.Name}
        </option>
      ))}
  </ExField>
);

StageState.propTypes = {
  selector: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  selector: makeSelectStageState(),
});

function mapDispatchToProps() {
  return {};
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(StageState);
