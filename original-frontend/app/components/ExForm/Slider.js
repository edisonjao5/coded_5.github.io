import React, { useState } from 'react';
import Nouislider from 'nouislider-react';
import PropTypes from 'prop-types';

const Slider = ({
  range = { min: 20, max: 200 },
  start = [20, 80],
  connect = true,
  step = 10,
  ...props
}) => {
  const [textValue, setTextValue] = useState(null);
  const [percentage, setPercentage] = useState(null);

  const onSlide = (render, handle, value, un, percent) => {
    setTextValue(value[0].toFixed(2));
    setPercentage(percent[0].toFixed(2));
  };
  return (
    <div className="step-slider">
      <Nouislider
        className="step-slider-bar noUi-target noUi-ltr noUi-horizontal"
        range={range}
        start={start}
        connect={connect}
        step={step}
        onSlide={onSlide}
        {...props}
      />
    </div>
  );
};

Slider.propTypes = {
  range: PropTypes.object,
  start: PropTypes.array,
  connect: PropTypes.bool,
  step: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default Slider;
