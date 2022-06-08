/**
 *
 * Restriction
 *
 */

import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import reducer from './reducer';
import saga from './saga';
import { fetchEntities } from './actions';

export function RestrictionInit({ ProyectoID, dispatch }) {
  useInjectReducer({ key: 'restrictionInit', reducer });
  useInjectSaga({ key: 'restrictionInit', saga });

  useEffect(() => {
    if (ProyectoID) dispatch(fetchEntities(ProyectoID));
  }, [ProyectoID]);
  return null;
}

RestrictionInit.propTypes = {
  ProyectoID: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(RestrictionInit);
