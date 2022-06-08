/**
 *
 * Project
 *
 */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Label } from 'components/ExForm';
import Restriction from 'containers/Common/Restriction';
import { Auth } from 'containers/App/helpers';
import { UserProject } from '../../helper';

function Restrictions({ project }) {
  const [openRestriction, setOpenRestriciton] = useState(false);
  return (
    <>
      <Label style={{ width: '10em' }}>Restricciones</Label>
      {!project.IsFinished && UserProject.isPM(project) && (
        <Link
          className="font-14-rem color-main btn-plus mt-2"
          to="/"
          onClick={evt => {
            evt.preventDefault();
            setOpenRestriciton(true);
          }}
        >
          <b>Añadir Restricciones</b>
        </Link>
      )}
      {!(!project.IsFinished && UserProject.isPM(project)) && (
        <Link
          className="font-14-rem color-main btn-arrow mt-2"
          to="/"
          onClick={evt => {
            evt.preventDefault();
            setOpenRestriciton(true);
          }}
        >
          <b>Ver Detalle Restricciones</b>
        </Link>
      )}
      <Restriction
        isOpen={openRestriction}
        ProyectoID={project.ProyectoID}
        onHide={() => setOpenRestriciton(false)}
        viewOnly={!UserProject.isPM(project) && !Auth.isGerenteComercial()}
      />
    </>
  );
}

Restrictions.propTypes = {
  project: PropTypes.object,
};

export default Restrictions;
