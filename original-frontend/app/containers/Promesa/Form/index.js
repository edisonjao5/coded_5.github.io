/* eslint-disable no-unused-vars */
/**
 *
 * Promesa Form
 *
 */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import queryString from 'query-string';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import WithLoading from 'components/WithLoading';
import { UserProject } from 'containers/Project/helper';
import makeSelectInitProject from 'containers/Project/Init/selectors';
import makeSelectPromesaForm from './selectors';
import Form from './Form';
import reducer from './reducer';
import saga from './saga';
import { getPromesa, resetContainer } from './actions';
const SyncMessage = WithLoading();

export function PromesaForm({ selector, selectorProject, dispatch, location }) {
  useInjectReducer({ key: 'promesaform', reducer });
  useInjectSaga({ key: 'promesaform', saga });
  
  const query = queryString.parse(location.search);
  const { PromesaID } = query;
  const { project = {} } = selectorProject;

  useEffect(() => {
    if (PromesaID) dispatch(getPromesa(PromesaID));
    return () => dispatch(resetContainer());
  }, [location.search]);

  if (selector.redirect) {
    return <Redirect to={`/proyectos/${project.ProyectoID}/promesas`} />;
  }
  if (!project || !selector.promesa) return <SyncMessage loading />;

  return <Form selector={selector} dispatch={dispatch} />;
}

PromesaForm.propTypes = {
  location: PropTypes.object,
  selector: PropTypes.object,
  selectorProject: PropTypes.object,
  dispatch: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  selector: makeSelectPromesaForm(),
  selectorProject: makeSelectInitProject(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(PromesaForm);
