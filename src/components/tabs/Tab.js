import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './Tab.module.css';
import { TabsContext } from './Tabs';

const Tab = ({ children, index }) => {
  const { activeTabIndex, setActiveTabIndex } = useContext(TabsContext);

  return (
    <button
      type="button"
      onClick={() => setActiveTabIndex(index)}
      className={classNames(
        styles.button,
        { [styles.buttonActive]: activeTabIndex === index },
      )}
    >
      {children}
    </button>
  )
};

Tab.propTypes = {
  children: PropTypes.node.isRequired,
  index: PropTypes.number.isRequired,
};

export default Tab;
