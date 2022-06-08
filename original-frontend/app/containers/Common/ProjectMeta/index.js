/**
 *
 * ProjectMeta
 *
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ProjectPhases from '../ProjectPhases';
import { Auth } from 'containers/App/helpers';
import { fetchProjectExist, fetchProjectMeta } from './helper';

export function ProjectMeta({ project = {}, active, entities = [] }) {
  if (Auth.isInmobiliario()) return null;
  const { ProyectoID } = project;

  const [result, setResult] = useState({
    promesas: 0,
    totalPrice: 0, 
  }); 
  const [metas, setMetas] = useState({
    metaPromesas: 0,
    metaPrice: 0,
  });
  useEffect(() => {
    fetchProjectExist(ProyectoID, entities).then(res => setResult(res));
    setMetas(fetchProjectMeta(project, entities));
  }, [ProyectoID]);

  return (
    <>
      <div className="heading row justify-content-between">
        <h2 className="title-01 col-auto">Metas {project.Name}</h2>
      </div>

      <div className="mt-3">
        <ul className="dash-card-container">
          <div className="row">
            <article className="dash-card col-lg-6 col-12">
              <div className="box">
                <span className="sub-title">Llevamos</span>
                <span className="title">
                  UF <b>{result.totalPrice}</b>
                </span>
                <figure className="progress-card green">
                  <progress max="100" 
                    value={result.totalPrice ? 100*result.totalPrice/metas.metaPrice : 0} 
                  />
                  <span className="key">Meta</span>
                  <span className="value">
                    UF <b>{metas.metaPrice}</b>
                  </span>
                </figure>
              </div>
            </article>
            <article className="dash-card col-lg-6 col-12">
              <div className="box">
                <span className="sub-title">Llevamos</span>
                <span className="title">
                  Promesas <b>{result.promesas}</b>
                </span>
                <figure className="progress-card yellow">
                  <progress max="100"
                    value={result.promesas ? 100*result.promesas/metas.metaPromesas : 0}
                  />
                  <span className="key">Meta</span>
                  <span className="value">
                    <b>{metas.metaPromesas}</b>
                  </span>
                </figure>
              </div>
            </article>
          </div>
        </ul>
      </div>

      <ProjectPhases project={project} active={active} />
    </>
  );
}

ProjectMeta.propTypes = {
  active: PropTypes.string,
  project: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};

export default ProjectMeta;