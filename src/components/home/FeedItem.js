import React from 'react'
import { Link } from 'gatsby'

import styles from './FeedItem.module.css'

const FeedItem = (props) => {
  const { item } = props

  const renderLink = (text, url) => {
    if (url.charAt(0) === '/') {
      return (
        <Link to={url}>{text}</Link>
      )
    }

    return (
      <a href={url} target='_blank' rel="noopener noreferrer">
        {text}
      </a>
    )
  }

  return (
    <article className={styles.container}>
      <h2 className={styles.title}>
        {renderLink(item.frontmatter.title, item.frontmatter.link)}
      </h2>
      <div dangerouslySetInnerHTML={{ __html: item.html }} />
    </article>
  )
}

export default FeedItem
