import React, { useState } from 'react';
import PropTypes from 'prop-types';

import styles from './Tabs.module.css';

export const TabsContext = React.createContext();

const Tabs = ({ children }) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  let nextTabPanelIndex = 0;
  const renderedChildren = React.Children.map(children, (child) => {
    if (child.type.displayName === 'TabPanel') {
      const props = { index: nextTabPanelIndex };
      nextTabPanelIndex += 1;
      return React.cloneElement(child, props);
    }
    return child;
  });

  return (
    <div className={styles.container}>
      <TabsContext.Provider value={{ activeTabIndex, setActiveTabIndex }}>
        {renderedChildren}
      </TabsContext.Provider>
    </div>
  )
};

Tabs.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Tabs;
