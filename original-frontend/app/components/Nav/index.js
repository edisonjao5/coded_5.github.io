/**
 *
 * Nav
 *
 */

import React, { useState } from 'react';
import Header from 'containers/Common/PageHeader/Header';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  UncontrolledDropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from 'reactstrap';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { logout } from 'containers/App/actions';
import { Auth } from 'containers/App/helpers';
import CurrencyConverter from 'containers/Common/CurrencyConverter';
import SimulatorCredito from 'containers/Common/SimulatorCredito';

function Nav({ dispatch }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenSimulator, setIsOpenSimulator] = useState(false);

  const authName = Auth.get('user').Roles[0].Name;
  return (
    <>
      <nav className="top-nav row mb-3">
        <Header />
        <div className="col-auto d-flex align-items-center p-0">
          <span className="font-14-rem color-regular mr-2">Vista:</span>
          <Link
            to="/"
            onClick={evt => evt.preventDefault()}
            className="font-14-rem color-main"
          >
            <b className="text-uppercase">
              {authName === 'Escritura' ? 'Escrituración' : authName}
            </b>
          </Link>
        </div>
        <ul className="col-auto row">
          <UncontrolledDropdown tag="li">
            <DropdownToggle tag="a" className="icon icon-book" />
            <DropdownMenu>
              <DropdownItem tag="a" onClick={() => setIsOpen(true)}>
                Calculadora de UF
              </DropdownItem>
              <DropdownItem tag="a" onClick={() => setIsOpenSimulator(true)}>
                Simulador de crédito
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
          <UncontrolledDropdown tag="li">
            <DropdownToggle tag="a" className="icon icon-notifications" />
            <DropdownMenu>
              <DropdownItem tag="a">...</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
          <UncontrolledDropdown tag="li">
            <DropdownToggle tag="a" className="icon icon-user circle-icon" />
            <DropdownMenu>
              <DropdownItem
                tag="a"
                onClick={evt => {
                  evt.preventDefault();
                  dispatch(logout());
                }}
              >
                Cerrar sesión
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </ul>
      </nav>
      {isOpen && (
        <CurrencyConverter isOpen={isOpen} onHide={() => setIsOpen(false)} />
      )}
      {isOpenSimulator && (
        <SimulatorCredito
          isOpen={isOpenSimulator}
          onHide={() => setIsOpenSimulator(false)}
        />
      )}
    </>
  );
}

Nav.propTypes = {
  dispatch: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(Nav);
