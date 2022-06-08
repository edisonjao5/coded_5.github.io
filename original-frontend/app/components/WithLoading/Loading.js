import React from 'react';
import PropTypes from 'prop-types';
import ImgLoad from 'images/img-load.svg';

export const LoadingImage = ({ className = '', style = {} }) => (
  <img src={ImgLoad} className={className} style={style} alt="" />
);

LoadingImage.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
};

const Loading = ({ className = '', style = {}, size = 50 }) => (
  <div
    className={`text-center p-2 ${className}`}
    style={{ color: '#a0bac8', ...style }}
  >
    <span className="spinner-border" style={{ height: size, width: size }} />
  </div>
);

Loading.propTypes = {
  size: PropTypes.number,
  className: PropTypes.string,
  style: PropTypes.object,
};
export default Loading;
