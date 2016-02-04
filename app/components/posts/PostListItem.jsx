import React from 'react';

export default function PostListItem({post}) {
  return (
    <li className="post-list__item">
      <a href={`/blog/${post.permalink}`}>{post.title}</a>
    </li>
  );
}
