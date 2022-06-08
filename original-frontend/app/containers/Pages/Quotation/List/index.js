/**
 *
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import Quotations from 'containers/Quotation/List/Loadable';

export function QuotationsPage({ match }) {
  return <Quotations match={match} />;
}

QuotationsPage.propTypes = {
  match: PropTypes.object,
};

export default QuotationsPage;
