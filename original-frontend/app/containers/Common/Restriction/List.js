import React from 'react';
import PropTypes from 'prop-types';
import Table from 'reactstrap/es/Table';
import Item from './Item';

const List = ({ viewOnly, entities, editRestriction, deleteRestriction }) => (
  <div className="mt-3 table-responsive-md border">
    <Table className="m-0" responsive size="sm">
      <thead className="background-color-tab">
        <tr>
          <td className="pl-3 no-whitespace">
            <span className="font-14-rem color-regular">
              <b>Dpto</b>
            </span>
          </td>
          <td className="no-whitespace mx-3">
            <div className="d-flex">
              <span
                className="font-14-rem color-regular"
                style={{ width: '5.5em' }}
              >
                <b>Status</b>
              </span>
              <span className="font-14-rem color-regular">
                <b>Adicional</b>
              </span>
            </div>
          </td>
          <td />
          <td />
        </tr>
      </thead>
      <tbody>
        {entities &&
          entities.map(entity => (
            <Item
              viewOnly={viewOnly}
              key={entity.InmuebleAID}
              entity={entity}
              editRestriction={editRestriction}
              deleteRestriction={deleteRestriction}
            />
          ))}
      </tbody>
    </Table>
  </div>
);
List.propTypes = {
  viewOnly: PropTypes.bool,
  entities: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
  editRestriction: PropTypes.func,
  deleteRestriction: PropTypes.func,
};
export default List;
