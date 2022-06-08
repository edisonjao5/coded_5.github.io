/**
 *
 * Escritura
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { push } from 'connected-react-router';
import { compose } from 'redux';
import { Helmet } from 'react-helmet';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';

import InitData from 'containers/Common/InitData';
import ProjectMeta from 'containers/Common/ProjectMeta/Loadable';
import PageHeader from 'containers/Common/PageHeader';
import makeSelectInitProject from 'containers/Project/Init/selectors';
import { Auth } from 'containers/App/helpers';
import { UserProject } from 'containers/Project/helper';
import WithLoading from 'components/WithLoading';
import Alert from 'components/Alert';
import Button from 'components/Button';

import reducer from './reducer';
import saga from './saga';
import makeSelectEscrituras from './selectors';
import { 
  fetchEscrituras,
  searchEscrituras,
  queryEscrituras,
  confirmEscritura
} from './actions';
import List from './List';
import Filter from './Filter';
import Confirm from './Confirm';

const SyncMessage = WithLoading();

export function Escrituras({ match, selectorProject, selector, dispatch }) {
  const { project } = selectorProject;
  useInjectReducer({ key: 'escrituras', reducer });
  useInjectSaga({ key: 'escrituras', saga });

  useEffect(() => {
    if (match.params.id && project && project.EscrituraProyectoState !== null)
      dispatch(fetchEscrituras(match.params.id));
  }, [project]);

  // header
  const header = ['Proyectos'];
  if (project.Name) header.push(project.Name);

  const onConfirm = () =>{
    dispatch(confirmEscritura(project.ProyectoID));
  }

  const blockEscritura = () => {
    if(project && project.EscrituraProyectoState === null) {
      return (UserProject.isPM()) ?
        <Confirm project={project} onConfirm={onConfirm} /> :
        <Alert type="danger"> Didn't Confirm Escritura </Alert>;
    }

    // if (project && Auth.isGerenteComercial())
    //   return <Redirect to={`/proyectos/escritura/?projectID=${project.ProyectoID}/`} />

    return (
      <>
        {<SyncMessage {...selector} />}
        {selector.escrituras && (<>
          <h5 className="font-18 d-flex align-items-center justify-content-between">                      
            <Button
                className="mr-3"
                onClick={()=>dispatch(
                  push(`/proyectos/${project.ProyectoID}/escritura-proyecto`)
                )}
            >
              Ver proceso
            </Button>
            <Filter
              project={project}
              selector={selector}
              searchEscrituras={(txtSearch, status) =>
                dispatch(searchEscrituras(txtSearch, status))
              }
            />
          </h5>
          <List {...selector} project={project}
            onQuery={query => {dispatch(queryEscrituras(query))}}
            dispatch={dispatch}
          />
        </>)}
      </>);
  }

  return (
    <>
      <InitData Project={{ ProyectoID: match.params.id }} User />
      <Helmet title={`Escritura - ${project.Name || '...'}`} />
      <PageHeader header={header} />
      <ProjectMeta action="view" project={selector.proyecto || project} active="escritura" />
      { blockEscritura() }
    </>
  );
}

Escrituras.propTypes = {
  match: PropTypes.object,
  selectorProject: PropTypes.object,
  selector: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  selector: makeSelectEscrituras(),
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

export default compose(withConnect)(Escrituras);
