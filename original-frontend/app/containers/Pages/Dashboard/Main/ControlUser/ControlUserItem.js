/**
 *
 * Dashboard Control User Item
 *
 **/

import React from 'react';
import PropTypes from 'prop-types';

export function ControlUItem({ userAction }) {
  return (
    <tr className="align-middle-group no-whitespace">
      <td className="pl-3">
        <span className="font-14-rem color-regular">{userAction.UserName}</span>
      </td>
      <td className="pl-3">
        <span className="font-14-rem color-regular">{userAction.Role}</span>
      </td>
      <td className="pl-3">
        <span className="font-14-rem color-regular">{userAction.Pendientes}</span>
      </td>
      <td className="pl-3">
        <span className="font-14-rem color-regular">{userAction.Dias}</span>
      </td>
      <td className="pl-3">
        <span className="font-14-rem color-regular">{userAction.Average}</span>
      </td>
      <td className="px-3">
        <div className="dropdown dropleft text-right">
          <a className="icon icon-dots color-main font-21" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true"></a>
          <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
            <a className="dropdown-item" href="#">Ver detalles</a>
          </div>
        </div>
      </td>
    </tr>
  );
}

ControlUItem.propTypes = {
  userAction: PropTypes.object
};

export default ControlUItem;
