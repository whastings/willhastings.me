import HomePage from '../index';
import React from 'react';
import { assert } from 'chai';
import { createPost } from 'posts/__tests__/helpers';
import { shallow } from 'enzyme';

describe('Home - HomePage component', function() {
  let content = 'Foo bar baz';
  let homePage;
  let posts;

  beforeEach(function() {
    posts = [createPost(), createPost(), createPost()];
    homePage = shallow(<HomePage content={content} posts={posts}/>);
  });

  it('renders about me content', function() {
    assert.equal(homePage.find('.content').prop('content'), content);
  });

  it('renders a PostList with provided posts', function() {
    assert.equal(homePage.find('PostList').prop('posts'), posts);
  });

  it('renders socials links', function() {
    assert.equal(homePage.find('SocialLinks').length, 1);
  });
});
