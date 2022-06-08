/**
 *
 * ProjectList
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { UserProject } from 'containers/Project/helper';
import { push } from 'connected-react-router';
import { Link } from 'react-router-dom';
import ProgressBar from 'components/ProgressBar';
import Empty from 'components/Empty';
export function InList({ dispatch, selector }) {
  const { entities = [] } = selector;
  const projects = entities.filter(
    entity => UserProject.in(entity) && entity.IsFinished,
  );
  if (projects.length < 1) return <Empty tag="h2" />;
  return (
    <section className="proyect-group row mx-n2">
      {projects.map(project => (
        <article
          key={project.ProyectoID}
          className="proyect-item-box col-sm-6 col-xl-4 px-2"
        >
          <div className="box shadow-sm">
            <h4 className="d-flex align-items-center justify-content-between">
              <span
                role="presentation"
                className="pointer"
                // onClick={() =>
                //   dispatch(push(`/proyectos/${project.ProyectoID}/reservas`))
                // }
              >
                {project.Symbol} - {project.Name}
              </span>
            </h4>
            <div className="content">
              <ul className="proyect-links">
                <li className="row justify-content-between">
                  <span className="col-auto">Ofertas</span>
                  <Link
                    to={`/proyectos/${project.ProyectoID}/ofertas`}
                    className="col-auto icon icon-arrow-complete icon-right"
                  >
                    Ver ofertas
                  </Link>
                </li>
                <li className="row justify-content-between">
                  <span className="col-auto">Promesas</span>
                  <Link
                    to={`/proyectos/${project.ProyectoID}/promesas`}
                    className="col-auto icon icon-arrow-complete icon-right"
                  >
                    Ver promesas
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </article>
      ))}
    </section>
  );
}

InList.propTypes = {
  selector: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
};

export default InList;
