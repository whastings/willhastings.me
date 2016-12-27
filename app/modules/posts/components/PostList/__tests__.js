import PostList from './';
import React from 'react';
import { assert } from 'chai';
import { createPost } from 'posts/__tests__/helpers';
import { shallow } from 'enzyme';

describe('Posts - PostList component', function() {
  let postList;
  let posts;

  beforeEach(function() {
    posts = [createPost(), createPost(), createPost(), createPost()];
    postList = shallow(<PostList posts={posts}/>);
  });

  it('renders a PostTeaser for every post', function() {
    let teasers = postList.find('PostTeaser');

    posts.forEach((post, i) => {
      let teaser = teasers.at(i);
      assert.equal(teaser.prop('post'), post, 'passes the post');
      assert.equal(teaser.key(), post.id, 'uses post ID as key');
    });
  });
});
