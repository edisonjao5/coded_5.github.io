/**
 *
 * Quotation
 *
 */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { push } from 'connected-react-router';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';
import InitData from 'containers/Common/InitData';
import { Helmet } from 'react-helmet';
import PageHeader from 'containers/Common/PageHeader';
import makeSelectInitProject from 'containers/Project/Init/selectors';
import ProjectPhases from 'containers/Common/ProjectPhases';
import WithLoading from 'components/WithLoading';
import Form from './Form/index';
import makeSelectQuotationForm from './selectors';
import reducer from './reducer';
import saga from './saga';
import {
  saveQuotation,
  resetContainer,
  getQuotation,
  downloadQuotation,
} from './actions';
import QuotationView from './View';
const SyncMassage = WithLoading();
const SyncQuotationView = WithLoading(QuotationView);

export function QuotationForm({
  match,
  selectorProject,
  selectorQuotation,
  dispatch,
}) {
  const { project } = selectorProject;
  const { success, redirect, quotation } = selectorQuotation;

  useEffect(() => {
    if (match.params.cid) dispatch(getQuotation(match.params.cid));
    return () => dispatch(resetContainer());
  }, [project]);

  const header = ['Proyectos'];

  if (project.Name) header.push(project.Name);

  useInjectReducer({ key: 'quotationform', reducer });
  useInjectSaga({ key: 'quotationform', saga });

  if (success && redirect === 'reserva')
    return (
      <Redirect
        to={`/proyectos/${project.ProyectoID}/reserva/crear?CotizacionID=${
          quotation.CotizacionID
        }`}
      />
    );
  if (success && redirect === 'list')
    return <Redirect to={`/proyectos/${project.ProyectoID}/cotizaciones`} />;
  return (
    <>
      <Helmet title={project.Name} />
      <PageHeader header={header} />
      <InitData
        Client
        User
        Project={{ ProyectoID: match.params.id }}
        Inmueble={{ ProyectoID: project.ProyectoID }}
        InstitucionFinanciera
      />
      {selectorProject.loading && <SyncMassage {...selectorProject} />}
      {selectorProject.project && (
        <>
          <ProjectPhases project={project} active="quotation" />
          {match.params.cid && (
            <SyncQuotationView
              shouldShow={!!quotation}
              selector={selectorQuotation}
              onDownload={() => dispatch(downloadQuotation(quotation))}
            />
          )}
          {!match.params.cid && (
            <Form
              selector={selectorQuotation}
              onCancel={() =>
                dispatch(push(`/proyectos/${project.ProyectoID}/cotizaciones`))
              }
              onSubmit={(values, directAfterSubmitted) =>
                dispatch(saveQuotation(values, directAfterSubmitted))
              }
              selectorProject={selectorProject}
              dispatch={dispatch}
            />
          )}
        </>
      )}
    </>
  );
}

QuotationForm.propTypes = {
  match: PropTypes.object,
  selectorProject: PropTypes.object,
  selectorQuotation: PropTypes.object,
  dispatch: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  selectorQuotation: makeSelectQuotationForm(),
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

export default compose(withConnect)(QuotationForm);
