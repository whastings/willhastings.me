import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { TabsContext } from './Tabs';

const TabPanel = ({ children, index }) => {
  const { activeTabIndex } = useContext(TabsContext);
  const isActive = activeTabIndex === index;

  return (
    <div hidden={!isActive}>
      {isActive && children}
    </div>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node.isRequired,
  index: PropTypes.number.isRequired,
};

export default TabPanel;
