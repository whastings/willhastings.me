import React from "react"
import { useStaticQuery, graphql } from 'gatsby'

import Layout from "../components/layout"
import SEO from "../components/seo"
import FeedItem from '../components/home/FeedItem'
import styles from './index.module.css'

const feedQuery = graphql`
  query FeedQuery {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      nodes {
        id
        frontmatter {
          title
          date
          link
        }
        html
      }
    }
  }
`;

const IndexPage = () => {
  const data = useStaticQuery(feedQuery);
  const feed = data.allMarkdownRemark.nodes;

  return (
    <Layout>
      <SEO title="Home" />
      <ul className={styles.feedList}>
        {feed.map((feedItem) => (
          <li key={feedItem.id}>
            <FeedItem item={feedItem} />
          </li>
        ))}
      </ul>
    </Layout>
  )
}

export default IndexPage
