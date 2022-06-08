/**
 *
 * Promesa
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { Helmet } from 'react-helmet';
import InitData from 'containers/Common/InitData';
import makeSelectInitProject from 'containers/Project/Init/selectors';
import WithLoading from 'components/WithLoading';
import Alert from 'components/Alert';
import ProjectMeta from 'containers/Common/ProjectMeta/Loadable';
import PageHeader from 'containers/Common/PageHeader';
import Factura from 'containers/Phases/Factura';
import PromesaRefundGarantia from 'containers/Phases/Promesa/RefundGarantia';
import makeSelectPromesas from './selectors';
import reducer from './reducer';
import saga from './saga';
import { fetchPromesas, searchPromesas, queryPromesas } from './actions';
import { isReadyData } from "../helper";
import List from './List';
import Filter from './Filter';

const SyncMessage = WithLoading();

export function Promesas({ match, selectorProject, selector, dispatch }) {
  const { project } = selectorProject;
  useInjectReducer({ key: 'promesas', reducer });
  useInjectSaga({ key: 'promesas', saga });

  useEffect(() => {
    if (match.params.id && !selector.loading)
      dispatch(fetchPromesas(match.params.id));
  }, []);

  // header
  const header = ['Proyectos'];
  if (project.Name) header.push(project.Name);

  return (
    <>
      <InitData Project={{ ProyectoID: match.params.id }} />
      <Helmet title={`Promesas - ${project.Name || '...'}`} />
      <PageHeader header={header} />
      <ProjectMeta action="view" project={project} active="promesa" />
      <Factura />
      <PromesaRefundGarantia />
      {<SyncMessage {...selector} />}
      {!selector.loading && selector.promesas && (
        <>
          <h4 className="color-regular mt-3 mb-0">
            {`${project.Name} - ${project.Symbol}`}
          </h4>
          <h5 className="font-18 d-flex align-items-center justify-content-between">
            <span className="line-height-1">Promesa</span>
            <Filter
              project={project}
              selector={selector}
              searchPromesas={(txtSearch, status) =>
                dispatch(searchPromesas(txtSearch, status))
              }
            />
          </h5>
          {!isReadyData(project) &&(
            <List {...selector} project={project}
              onQuery={query => {dispatch(queryPromesas(query))}}
              dispatch={dispatch}
            />
          )}
          {isReadyData(project) && (
            <Alert type="danger" className="mb-0">
              {`Faltan datos del proyecto. Para poder Promesar deben completar los datos del proyecto: ${isReadyData(project)}`}
            </Alert>
          )}
        </>
      )}
    </>
  );
}

Promesas.propTypes = {
  match: PropTypes.object,
  selectorProject: PropTypes.object,
  selector: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  selector: makeSelectPromesas(),
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

export default compose(withConnect)(Promesas);
