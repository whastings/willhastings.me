import React, { useState } from 'react';
import PropTypes from 'prop-types';

import styles from './Tabs.module.css';

export const TabsContext = React.createContext();

const renderChildren = (children) => {
  let nextTabPanelIndex = 0;
  return React.Children.map(children, (child) => {
    if (child.type.displayName === 'TabPanel') {
      const props = { index: nextTabPanelIndex };
      nextTabPanelIndex += 1;
      return React.cloneElement(child, props);
    }
    return child;
  });
};

const Tabs = ({ children }) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const numTabs = React.Children.toArray(children).reduce(
    (count, child) => count + (child.type.displayName === 'TabPanel' ? 1 : 0),
    0
  );
  const incrementTabIndex = (increment) => {
    const newIndex = activeTabIndex + increment;
    if (newIndex < 0) {
      setActiveTabIndex(numTabs - 1);
    } else if (newIndex >= numTabs) {
      setActiveTabIndex(0);
    } else {
      setActiveTabIndex(newIndex);
    }
  };

  return (
    <div className={styles.container}>
      <TabsContext.Provider value={{ activeTabIndex, incrementTabIndex, setActiveTabIndex }}>
        {renderChildren(children)}
      </TabsContext.Provider>
    </div>
  )
};

Tabs.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Tabs;
