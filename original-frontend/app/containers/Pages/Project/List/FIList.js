/**
 *
 * ProjectList
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { push } from 'connected-react-router';
import { Link } from 'react-router-dom';
import ProgressBar from 'components/ProgressBar';
import Empty from 'components/Empty';
import { UserProject } from 'containers/Project/helper';
export function FiList({ dispatch, selector }) {
  const { entities = [] } = selector;
  const projects = entities.filter(entity => UserProject.in(entity));
  if (projects.length < 1) return <Empty tag="h2" />;
  
  return (
    <section className="proyect-group row mx-n2">
      {projects.map(project => {
        const path = (project.ProyectoApprovalState === "Aprobado") ? 'ofertas' : '';
        return(
          <article
            key={project.ProyectoID}
            className="proyect-item-box col-sm-6 col-xl-4 px-2"
          >
            <div className="box shadow-sm">
              <h4 className="d-flex align-items-center justify-content-between">
                <span
                  role="presentation"
                  className="pointer"
                  onClick={() =>
                    dispatch(push(`/proyectos/${project.ProyectoID}/${path}`))
                  }
                >
                  {project.Symbol} - {project.Name}
                </span>
              </h4>
              <div className="content">
                <span className="statement">Metas proyecto</span>
                <div className="graphics">
                  <div className="row">
                    <span className="title col-5">
                      UF <b>15.607</b>
                    </span>
                    <div className="col-7">
                      <ProgressBar
                        title="de"
                        percent={40}
                        label={
                          <>
                            UF <b>500.000</b>
                          </>
                        }
                      />
                    </div>
                  </div>
                  <div className="row">
                    <span className="title col-5">
                      UF <b>15.607</b>
                    </span>
                    <div className="col-7">
                      <ProgressBar
                        title="de"
                        percent={40}
                        label={
                          <>
                            UF <b>500.000</b>
                          </>
                        }
                      />
                    </div>
                  </div>
                </div>
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
          </article>)
        }
      )}
    </section>
  );
}

FiList.propTypes = {
  selector: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
};

export default FiList;
