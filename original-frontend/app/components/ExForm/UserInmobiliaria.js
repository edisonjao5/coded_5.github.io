/**
 *
 * UserInmobiliariasElement
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import makeSelectUserInmobiliaria from 'containers/Common/UserInmobiliaria/selectors';
import ExField from './ExField';

const UserInmobiliaria = ({
  selector,
  InmobiliariaID,
  roleName = '',
  ...props
}) => {
  let formatRoleName = '';
  switch (roleName) {
    case 'Aprobador':
      formatRoleName = 'aprobadores';
      break;
    default:
      formatRoleName = `${roleName.toLowerCase()}s`;
      break;
  }

  return (
    <ExField type="select" {...props} loading={selector.loading}>
      <option value="">Selecciona...</option>
      {selector.users &&
        selector.users[InmobiliariaID] &&
        selector.users[InmobiliariaID][formatRoleName] &&
        selector.users[InmobiliariaID][formatRoleName].map(user => (
          <option key={user.UserID} value={user.UserID}>
            {`${user.Name} ${user.LastNames}`}
          </option>
        ))}
    </ExField>
  );
};

UserInmobiliaria.propTypes = {
  roleName: PropTypes.string,
  InmobiliariaID: PropTypes.string,
  selector: PropTypes.object,
};

export default compose(
  connect(
    createStructuredSelector({
      selector: makeSelectUserInmobiliaria(),
    }),
    () => ({}),
  ),
)(UserInmobiliaria);
