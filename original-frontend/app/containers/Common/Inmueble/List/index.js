/* eslint-disable no-restricted-syntax */
/**
 *
 * InmuebleItem
 *
 */
import React from 'react';

import PropTypes from 'prop-types';
import Table from 'reactstrap/es/Table';
import GroupItems from './Group';
import ListItem from './Item';

function List({ entities = {}, focusChange, onSelectItem, onModifyItem }) {
  const showEntities = entities.reduce((acc, entity) => {
    const { InmuebleType, BedroomsQuantity, BathroomQuantity } = entity;

    let key = '';
    if (InmuebleType === 'Departamento') {
      key = `Departamentos de ${BedroomsQuantity} ${
        BedroomsQuantity > 1 ? 'dormitorios' : 'dormitorio'
      } / ${BathroomQuantity} ${BathroomQuantity > 1 ? 'baños' : 'baño'}`;
    } else key = InmuebleType;

    acc[key] = acc[key] || [];
    acc[key].push(entity);
    return acc;
  }, {});

  // Sorts Entities by Type as follows: Departamento, Bodega, Estacionamiento, Bicicletero, Closet
  const departments = [];
  const sortedEntities = [];
  for (const entity in showEntities) {
    if (showEntities[entity] !== undefined) {
      switch (showEntities[entity][0].InmuebleType) {
        case 'Departamento':
          departments.push({ name: entity, entities: showEntities[entity] });
          break;
        case 'Bodega':
          sortedEntities[1] = { name: entity, entities: showEntities[entity] };
          break;
        case 'Estacionamiento':
          sortedEntities[2] = { name: entity, entities: showEntities[entity] };
          break;
        case 'Bicicletero':
          sortedEntities[3] = { name: entity, entities: showEntities[entity] };
          break;
        case 'Closet':
          sortedEntities[4] = { name: entity, entities: showEntities[entity] };
          break;
        default:
          break;
      }
    }
  }
  sortedEntities.unshift(...departments);

  return (
    <div className="accordion">
      {sortedEntities.map(entityObj => (
        <GroupItems label={entityObj.name} key={entityObj.name}>
          <Table responsive>
            <tbody>
              {entityObj.entities.map(entity => (
                <ListItem
                  focusChange={focusChange}
                  key={entity.InmuebleID}
                  onSelect={onSelectItem}
                  entity={entity}
                  onModifyItem={onModifyItem}
                />
              ))}
            </tbody>
          </Table>
        </GroupItems>
      ))}
    </div>
  );
}

List.propTypes = {
  focusChange: PropTypes.bool,
  entities: PropTypes.array,
  onSelectItem: PropTypes.func,
  onModifyItem: PropTypes.func,
};

export default List;
