/**
 *
 * View
 *
 */

import React, { useState } from 'react';
import View from './View';

function RealEstateView(Component) {
  /* eslint-disable-next-line */
  return function WihLoadingComponent({ isOpen = false, ID, ...props }) {
    const [open, setOpen] = useState(isOpen);
    return (
      <>
        <Component {...props} onOpen={() => setOpen(true)} />
        <View ID={ID} isOpen={open} onHide={() => setOpen(false)} />
      </>
    );
  };
}

export default RealEstateView;
