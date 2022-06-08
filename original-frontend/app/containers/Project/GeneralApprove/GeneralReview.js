import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { BoxFooter } from 'components/Box';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { canApproveGeneral } from '../helper';
import makeSelectInitProject from '../Init/selectors';
import { generalReview } from '../Init/actions';

const GeneralReview = ({ selectorProject, dataType, dispatch }) => {
  useEffect(() => {
    dispatch(generalReview({ [dataType]: '' }));
  }, [dataType]);
  if (!canApproveGeneral(selectorProject.project)) return null;
  return (
    <BoxFooter className="d-flex justify-content-end">
      <div className="d-flex align-items-center mr-3">
        <div className="radio d-flex align-items-center font-14-rem mr-2">
          <div className="m-radio">
            <input
              onChange={() =>
                dispatch(generalReview({ [dataType]: 'approve' }))
              }
              type="radio"
              name={`approveGeneral_${dataType}`}
            />
            <label />
          </div>
          <span className="ml-1 color-regular">
            <b>Aprobar</b>
          </span>
        </div>
        <div className="radio d-flex align-items-center font-14-rem">
          <div className="m-radio">
            <input
              onChange={() => dispatch(generalReview({ [dataType]: 'reject' }))}
              type="radio"
              name={`approveGeneral_${dataType}`}
            />
            <label />
          </div>
          <span className="ml-1 color-regular">
            <b>Rechazar</b>
          </span>
        </div>
      </div>
    </BoxFooter>
  );
};
GeneralReview.propTypes = {
  dataType: PropTypes.string,
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

export default compose(withConnect)(GeneralReview);
