/* eslint-disable jsx-a11y/anchor-has-content,jsx-a11y/anchor-is-valid */
/**
 *
 * ProjectItem
 *
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { push } from 'connected-react-router';
import { Link } from 'react-router-dom';
import ProgressBar from 'components/ProgressBar';
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from 'reactstrap';

import { fetchProjectExist, fetchProjectMeta } from 'containers/Common/ProjectMeta/helper';

const Item = ({ project, dispatch }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
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
    fetchProjectExist(ProyectoID).then(res => setResult(res));
    setMetas(fetchProjectMeta(project));
  }, []);

  return (
    <article className="proyect-item-box col-sm-6 col-xl-4 px-2">
      <div className="box shadow-sm">
        <h4 className="d-flex align-items-center justify-content-between">
          <span
            role="presentation"
            className="pointer"
            onClick={() =>
              dispatch(push(`/proyectos/${project.ProyectoID}/cotizaciones`))
            }
          >
            {project.Symbol} - {project.Name}
          </span>
          <Dropdown
            isOpen={dropdownOpen}
            toggle={() => setDropdownOpen(!dropdownOpen)}
          >
            <DropdownToggle
              tag="a"
              className="icon icon-dots main_color ml-1"
            />
            <DropdownMenu right positionFixed>
              <DropdownItem
                tag="a"
                onClick={() => {
                  dispatch(push(`/proyectos/${project.ProyectoID}`));
                }}
              >
                Ver Info proyecto
              </DropdownItem>
              <DropdownItem
                tag="a"
                onClick={() =>
                  dispatch(push(`/proyectos/${project.ProyectoID}/editar`))
                }
              >
                Editar Proyecto
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </h4>
        <div className="content">
          <span className="statement">Metas proyecto</span>
          <div className="graphics">
            <div className="row">
              <span className="title col-5">
                UF <b>{result.totalPrice}</b>
              </span>
              <div className="col-7">
                <ProgressBar
                  title="de"
                  percent={result.totalPrice ? 100*result.totalPrice/metas.metaPrice : 0}
                  label={
                    <>
                      UF <b>{metas.metaPrice}</b>
                    </>
                  }
                />
              </div>
            </div>
            <div className="row">
              <span className="title col-5">
                Promesas <b>{result.promesas}</b>
              </span>
              <div className="col-7">
                <ProgressBar
                  title="de"
                  percent={result.promesas ? 100*result.promesas/metas.metaPromesas : 0}
                  label={
                    <>
                      <b>{metas.metaPromesas}</b>
                    </>
                  }
                  barColor='yellow'
                />
              </div>
            </div>
          </div>
          <ul className="proyect-links">
            <li className="row justify-content-between">
              <span className="col-auto">Reservas</span>
              <Link
                to={`/proyectos/${project.ProyectoID}/reservas`}
                className="col-auto icon icon-arrow-complete icon-right"
              >
                Ver reservas
              </Link>
            </li>
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
            <li className="row justify-content-between">
              <span className="col-auto">Escrituración</span>
              <Link
                to={`/proyectos/${project.ProyectoID}/escrituras`}
                className="col-auto icon icon-arrow-complete icon-right"
              >
                Ver escrituración
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </article>
  );
};

Item.propTypes = {
  project: PropTypes.object,
  dispatch: PropTypes.func,
};

export default Item;
