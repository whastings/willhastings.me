// @flow

import AdminPostControls from 'admin/components/AdminPostControls';
import PostTeaser from 'posts/components/PostTeaser';
import React from 'react';
import { map } from 'app/utils';
import type { Post } from 'posts/types';

type Props = {
  onPostDelete: Function,
  posts: Post[],
};

export default function AdminPostList({posts, onPostDelete}: Props) {
  return (
    <div className="post-list admin-post-list">
      {map(posts, (post) =>
        <PostTeaser
          post={post}
          showPreview={false}
          key={post.id}
        >
          <AdminPostControls post={post} onDelete={onPostDelete}/>
        </PostTeaser>
      )}
    </div>
  );
}
