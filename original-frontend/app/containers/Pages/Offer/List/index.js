/**
 *
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import Offers from 'containers/Offer/List/Loadable';

export function OffersPage({ match }) {
  return <Offers match={match} />;
}

OffersPage.propTypes = {
  match: PropTypes.object,
};

export default OffersPage;
