import React from 'react';
import PropTypes from 'prop-types';

import styles from './TabsList.module.css';

const TabsList = ({ children }) => {
  return (
    <div className={styles.container}>
      {children}
    </div>
  )
};

TabsList.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TabsList;
