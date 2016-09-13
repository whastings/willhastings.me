import './styles.scss';
import { AdminIndexPage, EditPostPage, NewPostPage, SignInPage } from './components';
import { signIn, signOut } from './actions';
import {
  createPost, deletePost, loadPost, loadPosts, updatePost
} from 'app/modules/posts/actions';

export default {
  index(req, res) {
    res.dispatchAction(loadPosts)
      .then(() => res.render(AdminIndexPage, {
        onPostDelete: handlePostDelete.bind(null, res),
        onSignOut: handleSignOut.bind(null, res)
      }))
      .catch(console.log.bind(console));
  },

  newPost(req, res) {
    res.render(NewPostPage, {
      onFormSubmit: handlePostCreate.bind(null, res),
      onSignOut: handleSignOut.bind(null, res)
    });
  },

  editPost(req, res, store) {
    let permalink = req.params.post;

    res.dispatchAction(loadPost, permalink, {editable: true})
      .then(() => {
        let post = store.getPost(permalink);
        res.render(
          EditPostPage,
          {
            post,
            onFormSubmit: handlePostEdit.bind(null, res),
            onSignOut: handleSignOut.bind(null, res)
          }
        );
      })
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

function handlePostDelete(res, post) {
  res.dispatchAction(deletePost, post)
    .catch(console.log.bind(console));
}

function handlePostEdit(res, postData) {
  res.dispatchAction(updatePost, postData)
    .then(({payload: post}) => res.redirect(`/blog/${post.permalink}`))
    .catch(console.log.bind(console));
}

function handleSignOut(res) {
  res.dispatchAction(signOut)
    .then(() => res.redirect('/'))
    .catch(console.log.bind(console));
}
