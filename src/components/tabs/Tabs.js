import React, { useState } from 'react';
import PropTypes from 'prop-types';

import styles from './Tabs.module.css';

export const TabsContext = React.createContext();

const Tabs = ({ children }) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  return (
    <div className={styles.container}>
      <TabsContext.Provider value={{ activeTabIndex, setActiveTabIndex }}>
        {children}
      </TabsContext.Provider>
    </div>
  )
};

Tabs.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Tabs;
