import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

import styles from './Header.module.css';
import GitHubIcon from '../../images/github-icon.svg';
import LinkedInIcon from '../../images/linkedin-icon.svg';

const Header = ({ siteTitle }) => (
  <header
    className={styles.header}
  >
    <div
      className={styles.contentContainer}
    >
      <h1 style={{ margin: 0 }}>
        <Link
          to='/'
          className={styles.link}
        >
          {siteTitle}
        </Link>
      </h1>
      <a
        className={styles.socialLink}
        href='https://github.com/whastings'
        target='_blank'
        rel='noopener noreferrer'
        aria-label="Will's GitHub"
      >
        <GitHubIcon className={styles.socialIcon} />
      </a>
      <a
        className={styles.socialLink}
        href='https://linkedin.com/in/willhastings4'
        target='_blank'
        rel='noopener noreferrer'
        aria-label="Will's LinkedIn"
      >
        <LinkedInIcon className={styles.socialIcon} />
      </a>
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

export default Header
