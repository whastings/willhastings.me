import HomePage from './index';
import React from 'react';
import { assert } from 'chai';
import { shallow } from 'enzyme';

describe('HomePage', function() {
  it('renders about me content', function() {
    let content = 'Foo bar baz';
    let homePage = shallow(<HomePage content={content}/>);
    assert.equal(homePage.find('.content').prop('content'), content);
  });

  it('renders a PostList with provided posts', function() {
    let posts = ['post1', 'post2', 'post3'];
    let homePage = shallow(<HomePage posts={posts}/>);
    assert.equal(homePage.find('PostList').prop('posts'), posts);
  });
});
