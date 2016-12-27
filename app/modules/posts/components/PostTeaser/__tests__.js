import PostTeaser from './';
import React from 'react';
import { assert } from 'chai';
import { createPost } from 'posts/__tests__/helpers';
import { shallow } from 'enzyme';

describe('Posts - PostTeaser component', function() {
  let post;
  let postTeaser;

  beforeEach(function() {
    post = createPost();
  });

  function render(props = {}) {
    postTeaser = shallow(<PostTeaser post={post} {...props}/>);
  }

  it('renders a teaser with title, publish date, and preview', function() {
    render();

    let teaser = postTeaser.find('.post-teaser');
    let title = teaser.find('.post-teaser__title');
    let publishDate = teaser.find('.post-teaser__publish-date');
    let preview = teaser.find('.post-teaser__preview');

    assert.equal(teaser.length, 1, 'renders teaser');
    assert.equal(title.length, 1, 'renders title');
    assert.equal(title.text(), post.title, 'title has correct text');
    assert.equal(publishDate.length, 1, 'renders publish date');
    assert.equal(publishDate.text(), 'January 1, 2016', 'publish date has correct text');
    assert.equal(preview.length, 1, 'preview rendered');
    assert.include(preview.html(), post.preview, 'preview rendered with HTML');
  });

  it('links post title to its page', function() {
    render();

    let titleLink = postTeaser.find('.post-teaser__title').find('a');

    assert.equal(titleLink.length, 1, 'link rendered');
    assert.equal(titleLink.prop('href'), `/blog/${post.permalink}`, 'links to correct URL');
  });

  it('does not render preview if passed showPreview = false', function() {
    render({showPreview: false});

    let preview = postTeaser.find('.post-teaser__preview');

    assert.isNotOk(preview.length, 'does not render preview');
  });

  it('renders any passed children', function() {
    postTeaser = shallow(
      <PostTeaser post={post}>
        <span className="foo">Foo</span>
      </PostTeaser>
    );

    let child = postTeaser.find('.foo');

    assert.equal(child.length, 1, 'renders child');
  });
});
