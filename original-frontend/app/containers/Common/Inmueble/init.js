/**
 *
 * Inmueble
 *
 */

import { useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectRestrictionInit from 'containers/Common/Restriction/selectors';
import reducer from './reducer';
import saga from './saga';
import { fetchEntities, matchRestriction, selectEntity } from './actions';
import makeSelectInmuebleInit from './selectors';

export function InmuebleInit({ ProyectoID, selectorRestriction, dispatch }) {
  useInjectReducer({ key: 'inmuebleInit', reducer });
  useInjectSaga({ key: 'inmuebleInit', saga });
  useEffect(() => {
    if (ProyectoID) dispatch(fetchEntities(ProyectoID));
  }, [ProyectoID]);

  useEffect(() => {
    dispatch(matchRestriction(selectorRestriction.entities));
  }, [selectorRestriction.entities]);

  return null;
}

InmuebleInit.propTypes = {
  ProyectoID: PropTypes.string,
  selectorRestriction: PropTypes.object,
  selectorInmueble: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  selectorRestriction: makeSelectRestrictionInit(),
  selectorInmueble: makeSelectInmuebleInit(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onSelectItem: entity => dispatch(selectEntity(entity)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(InmuebleInit);
