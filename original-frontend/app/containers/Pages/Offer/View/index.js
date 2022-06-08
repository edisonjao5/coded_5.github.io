/**
 *
 * Create Project
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import OfferForm from 'containers/Offer/Form';
import { Helmet } from 'react-helmet';
import InitData from 'containers/Common/InitData';
import PageHeader from 'containers/Common/PageHeader';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import makeSelectInitProject from 'containers/Project/Init/selectors';

export function OfferPage({ match, location, selectorProject }) {
  const { project = {} } = selectorProject;
  return (
    <>
      <Helmet title={`Oferta - ${project.Name || '...'}`} />
      <PageHeader header={['Proyectos', project.Name || '...']} />
      <InitData
        Project={{ ProyectoID: match.params.id }}
        Inmueble={{ ProyectoID: match.params.id }}
        InstitucionFinanciera
      />
      <OfferForm match={match} location={location} />
    </>
  );
}

OfferPage.propTypes = {
  match: PropTypes.object,
  location: PropTypes.object,
  selectorProject: PropTypes.object,
};
const mapStateToProps = createStructuredSelector({
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

export default compose(withConnect)(OfferPage);
