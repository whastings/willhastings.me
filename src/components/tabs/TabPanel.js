import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { TabsContext } from './Tabs';
import styles from './TabPanel.module.css';

const TabPanel = ({ children, index }) => {
  const { activeTabIndex } = useContext(TabsContext);
  const isActive = activeTabIndex === index;

  return (
    <div hidden={!isActive} className={styles.container}>
      {isActive && children}
    </div>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node.isRequired,
  index: PropTypes.number,
};

export default TabPanel;
