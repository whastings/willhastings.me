import { AdminIndexPage, EditPostPage, NewPostPage, SignInPage } from './components';
import { signIn, signOut } from './actions';
import { createPost, loadPost, loadPosts, updatePost } from 'app/modules/posts/actions';

export default {
  index(req, res, store) {
    res.dispatchAction(loadPosts)
      .then(() => res.render(AdminIndexPage, {
        onSignOut: handleSignOut.bind(null, res),
        posts: store.getPosts()
      }))
      .catch(console.log.bind(console));
  },

  newPost(req, res, store) {
    res.render(NewPostPage, {onFormSubmit: handlePostCreate.bind(null, res)});
  },

  editPost(req, res, store) {
    let permalink = req.params.post,
        post = store.getPost(permalink);
    res.dispatchAction(loadPost, permalink)
      .then(() => res.render(
        EditPostPage,
        {post, onFormSubmit: handlePostEdit.bind(null, res, post)}
      ))
      .catch(console.log.bind(console));
  },

  signIn(req, res) {
    res.render(SignInPage, {
      onSubmit(username, password) {
        res.dispatchAction(signIn, username, password)
          .then(() => res.redirect('/admin'))
          .catch(console.log.bind(console));
      }
    });
  }
};

function handlePostCreate(res, postData) {
  res.dispatchAction(createPost, postData)
    .then(({payload: post}) => res.redirect(`/blog/${post.permalink}`))
    .catch(console.log.bind(console));
}

function handlePostEdit(res, post, postData) {
  post = post.merge(postData);
  res.dispatchAction(updatePost, post)
    .then(({payload: post}) => res.redirect(`/blog/${post.permalink}`))
    .catch(console.log.bind(console));
}

function handleSignOut(res) {
  res.dispatchAction(signOut)
    .then(() => res.redirect('/'))
    .catch(console.log.bind(console));
}
