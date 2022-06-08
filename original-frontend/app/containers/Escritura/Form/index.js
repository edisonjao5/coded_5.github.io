/* eslint-disable no-unused-vars */
/**
 *
 * Escritura Form
 *
 */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';

// import { UserProject } from 'containers/Project/helper';
import makeSelectInitProject from 'containers/Project/Init/selectors';
import WithLoading from 'components/WithLoading';

import makeSelectEscrituraForm from './selectors';
import saga from './saga';
import reducer from './reducer';
import { getEscritura } from './actions';
import Form from './Form';
import ProjectForm from './ProjectForm';

const SyncMessage = WithLoading();

export function EscrituraForm({ 
  action="escritura", location, 
  selector, selectorProject, dispatch 
}) {
  useInjectReducer({ key: 'escrituraform', reducer });
  useInjectSaga({ key: 'escrituraform', saga });
  const { project = {} } = selectorProject;

  const header = ['Proyectos'];
  if (project.Name) header.push(project.Name);

  if(action === "escritura"){
    const query = queryString.parse(location.search);
    const { EscrituraID } = query;

    useEffect(() => {
      if (EscrituraID) dispatch(getEscritura(EscrituraID));
    }, [location.search]);
  }

  if (!project) return <SyncMessage loading />;

  if (action === "project")
    return <>
      <SyncMessage {...selector} />
      <ProjectForm project={selector.project || project} dispatch={dispatch}/>
    </>

  return <Form selector={selector} project={project} dispatch={dispatch}/>
}

EscrituraForm.propTypes = {
  action: PropTypes.string,
  location: PropTypes.object,
  selector: PropTypes.object,
  selectorProject: PropTypes.object,
  dispatch: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  selector: makeSelectEscrituraForm(),
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

export default compose(withConnect)(EscrituraForm);