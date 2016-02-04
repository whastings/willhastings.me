import PostListItem from './PostListItem';
import React from 'react';

export default function PostList({posts, ItemComponent}) {
  ItemComponent = ItemComponent || PostListItem;
  return (
    <ul className="post-list">
      {posts.map((post) => <ItemComponent post={post} key={post.id}/>)}
    </ul>
  );
}
