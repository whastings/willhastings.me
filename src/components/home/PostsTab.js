import React from 'react';
import { Link, useStaticQuery, graphql } from 'gatsby';

const postsQuery = graphql`
  query {
    allSitePage(filter: { path: { regex: "/^\/posts/" }}) {
      nodes {
        path
        context {
          frontmatter {
            title
          }
        }
      }
    }
  }
`;

const PostsTab = () => {
  const data = useStaticQuery(postsQuery);
  const posts = data.allSitePage.nodes;

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.path}>
          <Link to={post.path}>{post.context.frontmatter.title}</Link>
        </li>
      ))}
    </ul>
  );
};

export default PostsTab;
