import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { TabsContext } from './Tabs';
import styles from './TabPanel.module.css';

const TabPanel = ({ children, index }) => {
  const { activeTabIndex, tabsName } = useContext(TabsContext);
  const isActive = activeTabIndex === index;
  const id = `${tabsName}-${index}-panel`;
  const tabId = `${tabsName}-${index}-tab`;

  return (
    <div id={id} role="tabpanel" hidden={!isActive} className={styles.container} aria-labelledby={tabId}>
      {isActive && children}
    </div>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node.isRequired,
  index: PropTypes.number,
};

export default TabPanel;
