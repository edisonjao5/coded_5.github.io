/**
 *
 * Main menu
 *
 */

import React from 'react';
import {
  Collapse,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
} from 'reactstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { push } from 'connected-react-router';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Auth } from 'containers/App/helpers';

const Menu = ({ collapse, dispatch }) => (
  <Collapse isOpen={window.innerWidth > 991 || collapse}>
    <ul id="mainMenu">
      <li>
        <i className="icon icon-documents">
          <i className="icon icon-documents-dtail" />
        </i>
        <span>Proyectos</span>
        <Link to="/proyectos" />
      </li>
      {Auth.isAdmin() && (
        <UncontrolledDropdown tag="li">
          <i className="icon icon-z-settings">
            <i className="icon icon-z-settings-dtail" />
          </i>
          <span>Admin</span>
          <DropdownToggle tag="a" />
          <DropdownMenu positionFixed>
            <DropdownItem header>Administración</DropdownItem>
            <DropdownItem divider />
            <DropdownItem
              tag="a"
              onClick={() => dispatch(push('/admin/usuarios'))}
            >
              Usuarios
            </DropdownItem>
            <DropdownItem divider />
            <DropdownItem
              tag="a"
              onClick={() => dispatch(push('/admin/clientes'))}
            >
              Clientes
            </DropdownItem>
            <DropdownItem divider />
            <DropdownItem
              tag="a"
              onClick={() => dispatch(push('/admin/inmobiliarias'))}
            >
              Inmobiliarias
            </DropdownItem>
            <DropdownItem divider />
            <DropdownItem
              tag="a"
              onClick={() => dispatch(push('/admin/constructoras'))}
            >
              Constructoras
            </DropdownItem>

            <DropdownItem divider />
            <DropdownItem
              tag="a"
              onClick={() => dispatch(push('/admin/aseguradoras'))}
            >
              Aseguradoras
            </DropdownItem>
            <DropdownItem divider />
            <DropdownItem
              tag="a"
              onClick={() => dispatch(push('/admin/InstitucionFinanciera'))}
            >
              Institucion Financieras
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      )}
      <li>
        <i className="icon icon-files">
          <i className="icon icon-files-dtail" />
        </i>
        <span>Reportes</span>
        <Link to="/reports" />
      </li>
      {!Auth.isAdmin() && 
       (Auth.isLegal() || Auth.isFinanza() || Auth.isVendor() || Auth.isPM()) &&
       (<li>
          {/* <i className="icon icon-users">
            <i className="icon" />
          </i> */}
          <span style={{width: '2.2em'}}></span>
          <span>Clientes</span>
          <Link to="/clientes" />
        </li>
      )}
      {!Auth.isInmobiliario() && (
        <li>
          {/* <i className="icon "></i> */}
          <span style={{ width: '2.2em' }}></span>
          <span>Dashboard</span>
          <Link to="/dashboard" />
        </li>
      )}
    </ul>
  </Collapse>
);

Menu.propTypes = {
  collapse: PropTypes.bool,
  dispatch: PropTypes.func,
};

export default compose(
  connect(
    () => ({}),
    dispatch => ({
      dispatch,
    }),
  ),
)(Menu);
