import React, { useContext, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './Tab.module.css';
import { TabsContext } from './Tabs';

const Tab = ({ children, index }) => {
  const { activeTabIndex, incrementTabIndex, setActiveTabIndex, tabsName } = useContext(TabsContext);
  const buttonRef = useRef(null);
  const hasMountedRef = useRef(false);
  const isActive = activeTabIndex === index;
  const id = `${tabsName}-${index}-tab`;
  const panelId = `${tabsName}-${index}-panel`;

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowLeft') {
      incrementTabIndex(-1);
    } else if (event.key === 'ArrowRight') {
      incrementTabIndex(1);
    }
  };

  useEffect(() => {
    if (hasMountedRef.current && isActive) {
      buttonRef.current.focus();
    }
  }, [isActive, buttonRef, hasMountedRef]);
  useEffect(() => { hasMountedRef.current = true; }, []);

  return (
    <button
      id={id}
      ref={buttonRef}
      type="button"
      role="tab"
      tabIndex={isActive ? null : -1}
      aria-controls={panelId}
      aria-selected={isActive}
      onClick={() => setActiveTabIndex(index)}
      onKeyDown={handleKeyDown}
      className={classNames(
        styles.button,
        { [styles.buttonActive]: isActive },
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
