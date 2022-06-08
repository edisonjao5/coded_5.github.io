/**
 *
 * Layout
 *
 */

import React from 'react';
import LoginBg from 'images/login-bg.jpg';

import Header from 'components/Header';
import Nav from 'components/Nav';

export default function withLayout(Component, layout = 'default') {
  return function WithLayoutComponent(props) {
    switch (layout) {
      case 'login':
        return (
          <div className="container">
            <div
              className="shadow-lg rounded-lg overflow-hidden"
              style={{ backgroundImage: `url(${LoginBg})` }}
            >
              <Component {...props} />
            </div>
          </div>
        );
      default:
        return (
          <div className="container">
            <div className="row">
              <Header />
              <main className="col">
                <Nav />
                <Component {...props} />
              </main>
            </div>
          </div>
        );
    }
  };
}
