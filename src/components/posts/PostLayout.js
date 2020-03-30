import React from 'react'
import { MDXProvider } from '@mdx-js/react'

import Layout from '../layout/Layout'
import SEO from '../layout/SEO'
import styles from './PostLayout.module.css'
import PostPre from './PostPre'

const PostLayout = (props) => {
  const postTitle = props.pageContext.frontmatter.title

  const getPostDate = () => {
    const date = new Date(props.pageContext.frontmatter.date)
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  }

  return (
    <Layout>
      <div className={styles.container}>
        <SEO title={postTitle} />
        <h1 className={styles.title}>
          {postTitle}
        </h1>
        <p className={styles.postedDate}>
          Posted on {getPostDate()}
        </p>
        <MDXProvider
          components={{
            pre: PostPre,
          }}
        >
          {props.children}
        </MDXProvider>
      </div>
    </Layout>
  )
}

export default PostLayout
