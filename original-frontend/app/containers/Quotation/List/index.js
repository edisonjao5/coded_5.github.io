/**
 *
 * Quotation
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
import ProjectMeta from 'containers/Common/ProjectMeta/Loadable';
import makeSelectReservations from 'containers/Reservation/List/selectors';
import { fetchReservations } from 'containers/Reservation/List/actions';
import makeSelectQuotation from './selectors';
import reducer from './reducer';
import saga from './saga';
import { fetchQuotations, resetContainer } from './actions';

import List from './List';
import query from 'express/lib/middleware/query';

const ListWithLoading = WithLoading(List);

export function Quotation({
  match,
  selectorProject,
  quotation,
  reservations,
  dispatch,
}) {
  const { project } = selectorProject;

  useInjectReducer({ key: 'quotation', reducer });
  useInjectSaga({ key: 'quotation', saga });

  useEffect(() => {
    if (match.params.id && !quotation.loading) {
      dispatch(fetchQuotations(match.params.id));
      dispatch(fetchReservations(match.params.id));
    }
    return () => dispatch(resetContainer());
  }, [match.params.id]);

  return (
    <>
      <InitData Project={{ ProyectoID: match.params.id }} />
      <Helmet title={`Cotizaciones - ${project.Name || '...'}`} />
      <ProjectMeta action="view" project={project} active="quotation" />
      <ListWithLoading
        {...quotation}
        project={project}
        reservations={reservations.reservations}
        dispatch={dispatch}
      />
    </>
  );
}

Quotation.propTypes = {
  match: PropTypes.object,
  quotation: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  selectorProject: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  quotation: makeSelectQuotation(),
  selectorProject: makeSelectInitProject(),
  reservations: makeSelectReservations()
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

export default compose(withConnect)(Quotation);
