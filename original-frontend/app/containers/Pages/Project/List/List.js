/**
 *
 * ProjectList
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { UserProject } from 'containers/Project/helper';
import Filter from './Filter';
import { filterEntites } from './actions';
import Item from './Item';
import ItemPending from './ItemPending';

export function List({ dispatch, selector }) {
  const { entities } = selector;
  const assignEntities = [];
  const otherEntities = [];
  const creationEntities = [];
  (entities || []).forEach(entity => {
    if (!entity.IsFinished) {
      return creationEntities.push(entity);
    }
    if (UserProject.in(entity)) {
      return assignEntities.push(entity);
    }
    return otherEntities.push(entity);
  });
  return (
    <>
      <Filter onFilter={query => dispatch(filterEntites(query))} />
      <hr />
      <section className="proyect-group row mx-n2">
        <h3 className="title col-12 px-2">Proyectos Asignados</h3>
        {assignEntities.map(project => (
          <Item
            key={project.ProyectoID}
            project={project}
            dispatch={dispatch}
          />
        ))}
      </section>
      <section className="proyect-group row mx-n2">
        <h3 className="title col-12 px-2">Proyectos Empresa</h3>
        {otherEntities.map(project => (
          <Item
            key={project.ProyectoID}
            project={project}
            dispatch={dispatch}
          />
        ))}
      </section>
      <section className="proyect-group row mx-n2">
        <h3 className="title col-12 px-2">Proyectos en Creación</h3>
        {creationEntities.map(project => (
          <ItemPending
            key={project.ProyectoID}
            project={project}
            dispatch={dispatch}
          />
        ))}
      </section>
    </>
  );
}

List.propTypes = {
  selector: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
};

export default List;
