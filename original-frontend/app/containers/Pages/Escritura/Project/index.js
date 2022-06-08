/**
 *
 * Create Project
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import PageHeader from 'containers/Common/PageHeader';
import InitData from 'containers/Common/InitData';
import EscrituraForm from 'containers/Escritura/Form';

export function EscrituraProyectoPage({ match }) {
  const { project = {} } = window;
  return (
    <>
      <Helmet title={`Escritura - ${project.Name || '...'}`} />
      <PageHeader header={['Proyectos', project.Name || '...']} />
      <InitData
        Project={{ ProyectoID: match.params.id }}
        Inmueble={{ ProyectoID: match.params.id }}
        InstitucionFinanciera
      />
      <EscrituraForm action="project" match={match} />
    </>
  );
}

EscrituraProyectoPage.propTypes = {
  match: PropTypes.object,
};

export default EscrituraProyectoPage;
