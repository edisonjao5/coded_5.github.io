/**
 *
 * PageHeader
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';

import makeSelectPageHeader from './selectors';

function Header({ pageHeader = {} }) {
  const { header, actions } = pageHeader;

  return (
    <h3 className="col title-link">
      {header &&
        Array.isArray(header) &&
        header.map((item, index) => (
          /* eslint-disable-next-line */
          <React.Fragment key={index}>
            <span>{item}</span>
            {index < header.length - 1 && (
              <span className="ml-1 mr-1"> / </span>
            )}
          </React.Fragment>
        ))}
      {header && !Array.isArray(header) && header}
      {actions && (
        <UncontrolledDropdown>
          <DropdownToggle tag="a" className="icon icon-dots" />
          <DropdownMenu right positionFixed>
            {actions.map(({ component, ...props }, index) => (
              /* eslint-disable-next-line */
              <DropdownItem tag="a" {...props} key={index}>
                {component}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </UncontrolledDropdown>
      )}
    </h3>
  );
}

Header.propTypes = {
  pageHeader: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  pageHeader: makeSelectPageHeader(),
});

const withConnect = connect(mapStateToProps);

export default compose(withConnect)(Header);
