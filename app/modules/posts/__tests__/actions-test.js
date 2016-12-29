import * as actions from 'posts/actions';
import sinon from 'sinon';
import { assert } from 'chai';
import { assertAction, createMockStore } from 'app/__tests__/utils';
import { createPost } from 'posts/__tests__/helpers';

describe('Posts - Action creators', function() {
  let api;
  let mockStore;

  function setupStore(initState = {}) {
    return mockStore(Object.assign({
      admin: {},
      posts: {}
    }, initState));
  }

  beforeEach(function() {
    api = {};
    mockStore = createMockStore(api);
  });

  describe('createPost()', function() {
    it('calls API to create post and returns POST_ADD action', function() {
      let postData = {};
      let post = {};
      let store = setupStore();
      api.createPost = sinon.spy(() => Promise.resolve(post));

      return store.dispatch(actions.createPost(postData))
        .then(() => {
          sinon.assert.calledOnce(api.createPost);
          sinon.assert.calledWith(api.createPost, postData);

          let action = store.getActions()[0];
          assertAction(action, 'POST_ADD', post);
        });
    });
  });

  describe('deletePost()', function() {
    it('calls API to delete post and returns POST_REMOVE action', function() {
      let post = {id: 1};
      let store = setupStore();
      api.deletePost = sinon.spy(() => Promise.resolve());

      return store.dispatch(actions.deletePost(post))
        .then(() => {
          sinon.assert.calledOnce(api.deletePost);
          sinon.assert.calledWith(api.deletePost, post.id);

          let action = store.getActions()[0];
          assertAction(action, 'POST_REMOVE', post.id);
        });
    });
  });

  describe('loadPost()', function() {
    it('calls API to get post and returns POST_ADD action', function() {
      let post = createPost();
      let store = setupStore();
      api.getPost = sinon.spy(() => Promise.resolve(post));

      return store.dispatch(actions.loadPost('foo'))
        .then(() => {
          sinon.assert.calledOnce(api.getPost);
          sinon.assert.calledWith(api.getPost, 'foo');

          let action = store.getActions()[0];
          assertAction(action, 'POST_ADD', post);
        });
    });

    it('skips API call and dispatch if post is already in the store', function() {
      let post = createPost();
      let store = setupStore({
        posts: {
          [post.id]: post
        }
      });
      api.getPost = sinon.spy();

      return store.dispatch(actions.loadPost(post.permalink))
        .then(() => {
          sinon.assert.notCalled(api.getPost);
          assert.notOk(store.getActions().length, 'no action was fired');
        });
    });

    it('requests editable post if editable option is true', function() {
      let store = setupStore();
      api.getPost = sinon.spy(() => Promise.resolve());

      return store.dispatch(actions.loadPost('foo', {editable: true}))
        .then(() => {
          sinon.assert.calledWith(api.getPost, 'foo', {editable: true})         ;
        });
    });

    it('requests existing post if editable option is true and post missing raw body', function() {
      let post = createPost();
      delete post.bodyRaw;
      let store = setupStore({
        posts: {
          [post.id]: post
        }
      });
      api.getPost = sinon.spy(() => Promise.resolve());

      return store.dispatch(actions.loadPost(post.permalink, {editable: true}))
        .then(() => {
          sinon.assert.calledOnce(api.getPost);
        });
    });

    it('does not dispatch POST_ADD if post is not published and no user is signed in', function() {
      let post = createPost();
      post.published = false;
      let store = setupStore();
      api.getPost = () => Promise.resolve(post);

      return store.dispatch(actions.loadPost('foo'))
        .then(() => {
          assert.notOk(store.getActions().length, 'no action was fired');
        });
    });

    it('does dispatch POST_ADD if post is not published and user is signed in', function() {
      let post = createPost();
      post.published = false;
      let store = setupStore({
        admin: {
          currentUserId: 1
        }
      });
      api.getPost = () => Promise.resolve(post);

      return store.dispatch(actions.loadPost('foo'))
        .then(() => {
          let action = store.getActions()[0];
          assertAction(action, 'POST_ADD', post);
        });
    });
  });

  describe('loadPosts()', function() {
    it('calls API to load posts and returns POSTS_ADD action', function() {
      let posts = [];
      let options = {};
      let store = setupStore();
      api.getPosts = sinon.spy(() => Promise.resolve(posts));

      return store.dispatch(actions.loadPosts(options))
        .then(() => {
          sinon.assert.calledOnce(api.getPosts);
          sinon.assert.calledWith(api.getPosts, options);

          let action = store.getActions()[0];
          assertAction(action, 'POSTS_ADD', posts);
        });
    });
  });

  describe('updatePost()', function() {
    it('calls API to save post and returns POST_UPDATE action', function() {
      let post = {};
      let postData = {};
      let store = setupStore();
      api.savePost = sinon.spy(() => Promise.resolve(post));

      return store.dispatch(actions.updatePost(postData))
        .then(() => {
          sinon.assert.calledOnce(api.savePost);
          sinon.assert.calledWith(api.savePost, postData);

          let action = store.getActions()[0];
          assertAction(action, 'POST_UPDATE', post);
        });
    });
  });
});
