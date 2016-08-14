import './styles.scss';
import React from 'react';

export default function PostListItem({post}) {
  return (
    <li className="post-list__item">
      <h3><a href={`/blog/${post.permalink}`}>{post.title}</a></h3>
    </li>
  );
}
