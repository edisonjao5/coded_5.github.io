/**
 *
 * Create Project
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import Project from 'containers/Project';

export function EditProjectPage({ match, location }) {
  let user;
  switch(queryString.parse(location.search).user){
    case "legal":
      user = 1; break;
    case "finanzas":
      user = 2; break;
    default:
      user = 0;
  }

  return <Project action="edit" match={match} user={user} />;
}

EditProjectPage.propTypes = {
  match: PropTypes.object,
  location: PropTypes.object,
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

export default compose(withConnect)(EditProjectPage);
