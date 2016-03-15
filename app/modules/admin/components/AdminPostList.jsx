import AdminPostListItem from './AdminPostListItem';
import React from 'react';
import { map } from 'app/utils';

export default function AdminPostList({posts, onPostDelete}) {
  return (
    <ul className="post-list admin-post-list">
      {map(posts, (post) =>
        <AdminPostListItem
          post={post}
          key={post.id}
          onDelete={onPostDelete}
        />
      )}
    </ul>
  );
}
