/**
 *
 * Create Project
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import OfferForm from 'containers/Offer/Form';
import { Helmet } from 'react-helmet';
import PageHeader from 'containers/Common/PageHeader';
import InitData from 'containers/Common/InitData';

export function EditOfferPage({ match, location }) {
  const { project = {} } = window;
  return (
    <>
      <Helmet title={`Oferta - ${project.Name || '...'}`} />
      <PageHeader header={['Proyectos', project.Name || '...']} />
      <InitData
        Project={{ ProyectoID: match.params.id }}
        Inmueble={{ ProyectoID: match.params.id }}
        InstitucionFinanciera
      />
      <OfferForm action="edit" match={match} location={location} />
    </>
  );
}

EditOfferPage.propTypes = {
  match: PropTypes.object,
  location: PropTypes.object,
};

export default EditOfferPage;
