import './styles.scss';
import React from 'react';
import PostTeaser from 'posts/components/PostTeaser';
import { map } from 'app/utils';

export default function PostList({posts}) {
  return (
    <div className="post-list">
      {map(posts, (post) => <PostTeaser post={post} key={post.id}/>)}
    </div>
  );
}
