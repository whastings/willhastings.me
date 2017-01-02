import PostForm from '../';
import React from 'react';
import sinon from 'sinon';
import { assert } from 'chai';
import { createPost } from 'posts/__tests__/helpers';
import { mount } from 'enzyme';
import { PostFormPageObject } from './helpers';

describe('Posts - PostForm component', function() {
  let pageObject;
  let postForm;
  let onSubmit;

  function render(props = {}) {
    onSubmit = sinon.spy();
    postForm = mount(<PostForm onSubmit={onSubmit} {...props}/>);
    pageObject = new PostFormPageObject(postForm);
  }

  it('renders a form with title, body, image URL, and published fields', function() {
    render();

    let { publishedRadioNo, publishedRadioYes } = pageObject;

    assert.isOk(pageObject.hasOne('form', {type: 'form'}), 'renders form');

    assert.isOk(pageObject.hasOne('titleInput', {type: 'input'}), 'renders title input');
    assert.isOk(pageObject.hasLabelFor('titleInput'), 'title input has label');

    assert.isOk(pageObject.hasOne('bodyInput', {type: 'textarea'}), 'renders body input');
    assert.isOk(pageObject.hasLabelFor('bodyInput'), 'body input has label');

    assert.isOk(pageObject.hasOne('imageUrlInput', {type: 'input'}), 'renders image URL input');
    assert.isOk(pageObject.hasLabelFor('imageUrlInput'), 'image url input has label');

    assert.isOk(
      pageObject.hasOne('publishedRadioNo', {type: 'input'}),
      'renders no publish radio input'
    );
    assert.isOk(pageObject.hasLabelFor('publishedRadioNo'), 'no publish radio has label');
    assert.isOk(publishedRadioNo.is('[type="radio"]'), 'no publish radio is a radio');
    assert.strictEqual(publishedRadioNo.prop('value'), false, 'no publish radio value is false');

    assert.isOk(
      pageObject.hasOne('publishedRadioYes', {type: 'input'}),
      'renders yes publish radio input'
    );
    assert.isOk(pageObject.hasLabelFor('publishedRadioYes'), 'yes publish radio has label');
    assert.isOk(publishedRadioYes.is('[type="radio"]'), 'yes publish radio is a radio');
    assert.strictEqual(publishedRadioYes.prop('value'), true, 'no publish radio value is false');
  });

  it('invokes onSubmit callback with new post data on form submit', function() {
    render();
    let imageUrl = 'http://foo.com/image.jpg';

    pageObject.fillIn('titleInput', 'Foo');
    pageObject.fillIn('bodyInput', 'Bar');
    pageObject.fillIn('imageUrlInput', imageUrl);
    pageObject.publishedRadioYes.simulate('change');
    pageObject.form.simulate('submit');

    sinon.assert.calledOnce(onSubmit);
    sinon.assert.calledWith(onSubmit, {
      id: undefined,
      title: 'Foo',
      body: 'Bar',
      imageUrl,
      published: true
    });
  });

  it('renders a form for an existing post when passed one', function() {
    let post = createPost();
    render({post});

    assert.equal(pageObject.getValueFor('titleInput'), post.title, 'title is correct');
    assert.equal(pageObject.getValueFor('bodyInput'), post.body, 'body is correct');
    assert.equal(pageObject.getValueFor('imageUrlInput'), post.imageUrl, 'image URL is correct');
    assert.isOk(
      post.published ? pageObject.isPublishedCheckedYes() :
        pageObject.isPublishedCheckedNo(),
      'published is correct'
    );
  });

  it('invokes onSubmit callback with existing post data on form submit', function() {
    let post = createPost();
    render({post});

    pageObject.fillIn('bodyInput', post.body + ' baz qux');
    pageObject.publishedRadioNo.simulate('change');
    pageObject.form.simulate('submit');

    sinon.assert.calledOnce(onSubmit);
    sinon.assert.calledWith(onSubmit, {
      id: post.id,
      title: post.title,
      body: post.body + ' baz qux',
      imageUrl: post.imageUrl,
      published: false
    });
  });
});
