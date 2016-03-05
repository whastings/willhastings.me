import React from 'react';

export default function AdminPostListItem({post}) {
  let { permalink } = post;
  return (
    <li className="admin-post-list__item">
      <a href={`/blog/${permalink}`}>{post.title}</a> -
      <a href={`/admin/posts/${permalink}/edit`}>Edit</a>
    </li>
  );
}
