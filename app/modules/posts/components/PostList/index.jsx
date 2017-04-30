import './styles.scss';
import PropTypes from 'prop-types';
import React from 'react';
import PostTeaser from 'posts/components/PostTeaser';
import { map } from 'app/utils';
import { PostType } from 'posts/propTypes';

export default function PostList({posts}) {
  return (
    <div className="post-list">
      {map(posts, (post) => <PostTeaser post={post} key={post.id}/>)}
    </div>
  );
}

PostList.propTypes = {
  posts: PropTypes.arrayOf(PostType)
};
