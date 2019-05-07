import React from 'react';
import PropTypes from 'prop-types';

import styles from './TabsList.module.css';

const TabsList = ({ children }) => {
  let nextTabIndex = 0;
  const renderedChildren = React.Children.map(children, (child) => {
    const props = { index: nextTabIndex };
    nextTabIndex += 1;
    return React.cloneElement(child, props);
  });

  return (
    <div className={styles.container}>
      {renderedChildren}
    </div>
  )
};

TabsList.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TabsList;
