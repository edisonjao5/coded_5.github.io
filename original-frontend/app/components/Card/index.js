/**
 *
 * Card
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import ProgressBar from '../ProgressBar';

const Card = ({ title, unit, amount, progress }) => (
  <article className="dash-card col-lg-6 col-12">
    <div className="box">
      <span className="sub-title">{title}</span>
      <span className="title">
        {unit} <b>{amount}</b>
      </span>
      {progress && (
        <ProgressBar
          name={progress.name}
          value={progress.value}
          max={progress.max}
          unit={unit}
          amount={amount}
        />
      )}
    </div>
  </article>
);

Card.propTypes = {
  title: PropTypes.string,
  unit: PropTypes.string,
  amount: PropTypes.string,
  progress: PropTypes.object,
};

export default Card;
