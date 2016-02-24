import AdminIndexPage from 'app/components/admin/AdminIndexPage';
import NewPostPage from 'app/components/admin/NewPostPage';
import SignInPage from 'app/components/admin/SignInPage';
import { signIn, signOut } from 'app/actions/authActions';
import { createPost, loadPosts } from 'app/actions/postActions';

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

function handleSignOut(res) {
  res.dispatchAction(signOut)
    .then(() => res.redirect('/'))
    .catch(console.log.bind(console));
}
