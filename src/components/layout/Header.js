import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

import styles from './Header.module.css';

const Header = ({ siteTitle }) => (
  <header
    className={styles.header}
  >
    <div
      className={styles.contentContainer}
    >
      <h1 style={{ margin: 0 }}>
        <Link
          to="/"
          className={styles.link}
        >
          {siteTitle}
        </Link>
      </h1>
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

export default Header
