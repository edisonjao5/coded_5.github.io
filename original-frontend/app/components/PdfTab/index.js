/**
 *
 * PdfTab
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
// import PDFViewer from 'pdf-viewer-reactjs'

const PdfTab = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="pdf-tab">
      <ul>
        {tabs.map((tab, index) => (
          /* eslint-disable-next-line */
          <li key={index} className={activeTab === index ? 'active' : ''}>
            <a
              onClick={evt => {
                evt.preventDefault();
                setActiveTab(index);
              }}
            >
              <b>{tab.label}</b>
            </a>
          </li>
        ))}
      </ul>
      <div className="tab-content">
        {tabs.map((tab, index) => (
          /* eslint-disable-next-line */
          <div id={index} key={index} className={activeTab === index ? "tab-pane active" : 'tab-pane'}>
            {tab.content.map((content, idx) => {
              const { url } = content;
              if (url && url !== '' && url.slice(-3) === 'pdf') {
                return (
                  <>
                    <p>{content.title}</p>
                    {/*
                    <PDFViewer document={{ url }} scale={1.2} scaleStep={0.2} />
                    */}
                  </>
                );
              }
              return null;
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

PdfTab.propTypes = {
  tabs: PropTypes.array,
};
export default PdfTab;
