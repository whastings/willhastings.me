import PostListItem from './PostListItem';
import React from 'react';
import { map } from 'app/utils';

export default function PostList({posts}) {
  return (
    <ul className="post-list">
      {map(posts, (post) => <PostListItem post={post} key={post.id}/>)}
    </ul>
  );
}
