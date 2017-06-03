import './styles.scss';
import React from 'react';
import { AdminIndexPage, EditPostPage, NewPostPage, SignInPage } from './components';
import { signIn, signOut } from './actions';
import {
  createPost, deletePost, loadPost, loadPosts, updatePost
} from 'posts/actions';
import { getPost } from 'posts/selectors';

export default {
  index(req, store) {
    return store.dispatch(loadPosts({ includeUnpublished: true }))
      .then(() => <AdminIndexPage onPostDelete={handlePostDelete} onSignOut={handleSignOut} />);
  },

  newPost() {
    return <NewPostPage onFormSubmit={handlePostCreate} onSignOut={handleSignOut} />;
  },

  editPost(req, store) {
    const permalink = req.params.post;

    return store.dispatch(loadPost(permalink, { editable: true }))
      .then(() => {
        const post = getPost(store.getState(), permalink);
        return <EditPostPage post={post} onFormSubmit={handlePostEdit} onSignOut={handleSignOut} />;
      });
  },

  signIn(req) {
    return <SignInPage onSubmit={handleSignIn} />;
  }
};

function handlePostCreate(res, postData) {
  res.dispatch(createPost(postData))
    .then(({payload: post}) => res.redirect(`/blog/${post.permalink}`))
    .catch(res.handleError);
}

function handlePostDelete(res, post) {
  res.dispatch(deletePost(post))
    .catch(res.handleError);
}

function handlePostEdit(res, postData) {
  res.dispatch(updatePost(postData))
    .then(({payload: post}) => res.redirect(`/blog/${post.permalink}`))
    .catch(res.handleError);
}

function handleSignIn(store, res, username, password) {
  store.dispatch(signIn(username, password))
    .then(() => res.redirect('/admin'))
    .catch(res.handleError);
}

function handleSignOut(res) {
  res.dispatch(signOut())
    .then(() => res.redirect('/'))
    .catch(res.handleError);
}
