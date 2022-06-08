/**
 *
 * Header
 *
 */

import React, { useState } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Logo from 'images/logo.svg';
import Menu from 'components/Menu';

const Header = () => {
  const [collapse, toggleCollapse] = useState(false);

  const toggle = () => {
    toggleCollapse(!collapse);
  };

  return (
    <header className="col-md-auto">
      <button
        className="btn btn-primary icon icon-bars d-block d-lg-none"
        type="button"
        onClick={toggle}
      />
      <figure>
        <Link to="/home">
          <img src={Logo} width="157" height="43" alt="" />
        </Link>
      </figure>
      <Menu collapse={collapse} />
    </header>
  );
};

Header.propTypes = {};

export default Header;
