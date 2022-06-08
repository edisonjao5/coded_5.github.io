/**
 *
 * Create Project
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import InitData from 'containers/Common/InitData';
import TopPage from 'containers/Project/TopPage';
import General from 'containers/Project/General';
import { compose } from 'redux';
import makeSelectInitProject from 'containers/Project/Init/selectors';
import Ban from 'components/Ban';
import { Auth } from 'containers/App/helpers';

export function CreateProjectPage({ selectorProject, dispatch }) {
  if (!Auth.isPM()) return <Ban />;
  if (selectorProject.project && selectorProject.project.ProyectoID)
    return <Redirect to={`/proyectos/${selectorProject.project.ProyectoID}`} />;

  return (
    <>
      <InitData StageState RealEstate User Project />
      <TopPage action="create" dispatch={dispatch} />
      <General action="create" />
    </>
  );
}

CreateProjectPage.propTypes = {
  selectorProject: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  selectorProject: makeSelectInitProject(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(CreateProjectPage);
