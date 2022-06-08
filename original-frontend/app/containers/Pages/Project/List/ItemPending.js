/* eslint-disable jsx-a11y/anchor-has-content,jsx-a11y/anchor-is-valid */
/**
 *
 * ProjectItem
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { push } from 'connected-react-router';
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from 'reactstrap';
import { pending } from 'containers/Project/helper';

const ItemPending = ({ project, dispatch }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { pendings, progress, color } = pending(project);

  return (
    <article className="proyect-item-box col-sm-6 col-xl-4 px-2">
      <div className="box shadow-sm">
        <h4 className="d-flex align-items-center justify-content-between">
          {project.Symbol} - {project.Name}
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
        <div className="content"
          
        >
          {pendings.length > 0 && (
            <>
              <span className="statement mb-4">Pendientes</span>
              {pendings.map((item, index) => (
                <div key={String(index)} className="status row mt-0"
                      onClick={() => {
                        dispatch(push(`/proyectos/${project.ProyectoID}/editar?user=${item.remind}`));
                      }}
                >
                  <span className="col">{item.label}</span>
                  <Link
                    to="#"
                    onClick={e => e.preventDefault()}
                    className="col icon icon-alert icon-right font-14-rem"
                  >
                    <b>Enviar recordatorio</b>
                  </Link>
                </div>
              ))}
            </>
          )}

          <div className="advance">
            <span className="title">Avance del Proyecto</span>
            <div className="percent">
              <progress className={color} value={progress} max="100" />
              <span className="percent-number">{progress}%</span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

ItemPending.propTypes = {
  project: PropTypes.object,
  dispatch: PropTypes.func,
};

export default ItemPending;
