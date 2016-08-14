import './styles.scss';
import React from 'react';
import PostListItem from 'posts/components/PostListItem';
import { map } from 'app/utils';

export default function PostList({posts}) {
  return (
    <ul className="post-list">
      {map(posts, (post) => <PostListItem post={post} key={post.id}/>)}
    </ul>
  );
}
