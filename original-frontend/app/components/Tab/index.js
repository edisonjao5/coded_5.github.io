/**
 *
 * Tab
 *
 */

/**
 Example of tabs:
 <Tabs title="Test" tabs={[
   {route: "/", title: 'Home', number: 100}
 ]}/>
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { TabContent, TabPane } from 'reactstrap';

const Tab = ({ activeTab = 0, tabs }) => {
  const [getActiveTab, setActiveTab] = useState(activeTab);
  return (
    <>
      <ul className="nav nav-tabs mt-3">
        {tabs.map((tab, index) => (
          /* eslint-disable-next-line */
          <li key={index}>
            <Link
              to="/"
              onClick={evt => {
                evt.preventDefault();
                setActiveTab(index);
              }}
              className={`font-14 px-4 py-2 rounded-top border border-top-0 border-bottom-0 ${
                getActiveTab === index ? 'active' : ''
              }`}
            >
              <b>{tab.label}</b>
            </Link>
          </li>
        ))}
      </ul>
      <TabContent>
        {tabs.map((tab, index) => (
          <TabPane
            className={`fade ${getActiveTab === index ? 'show active' : ''}`}
            tabId={index}
            /* eslint-disable-next-line */
            key={index}
          >
            {tab.content}
          </TabPane>
        ))}
      </TabContent>
    </>
  );
};

Tab.propTypes = {
  activeTab: PropTypes.number,
  tabs: PropTypes.array,
};
export default Tab;
