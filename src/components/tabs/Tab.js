import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './Tab.module.css';
import { TabsContext } from './Tabs';

const Tab = ({ children, index }) => {
  const { activeTabIndex, incrementTabIndex, setActiveTabIndex } = useContext(TabsContext);

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowLeft') {
      incrementTabIndex(-1);
    } else if (event.key === 'ArrowRight') {
      incrementTabIndex(1);
    }
  };

  return (
    <button
      type="button"
      onClick={() => setActiveTabIndex(index)}
      onKeyDown={handleKeyDown}
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
  index: PropTypes.number,
};

export default Tab;
