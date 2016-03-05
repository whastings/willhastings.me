import immutable from 'seamless-immutable';
import promiseMiddleware from 'redux-promise-middleware';
import thunk from 'redux-thunk';
import { applyMiddleware, createStore as createReduxStore } from 'redux';

// Reducers:
import adminReducer from 'app/modules/admin/reducer';
import pagesReducer from 'app/modules/pages/reducer';
import postsReducer from 'app/modules/posts/reducer';
import usersReducer from 'app/modules/users/reducer';

// Selectors:
import postsSelectors from 'app/modules/posts/selectors';

const INITIAL_STATE = immutable(getInitialState() || {
  admin: {
    currentUserId: null
  },
  models: {
    posts: {},
    users: {}
  },
  pages: {}
});

function dataReducer(state = INITIAL_STATE, action) {
  let models = state.models;

  return state.merge({
    admin: adminReducer(state.admin, action),
    models: {
      posts: postsReducer(models.posts, action),
      users: usersReducer(models.users, action)
    },
    pages: pagesReducer(state.pages, action)
  });
}

function getInitialState() {
  if (typeof document === 'undefined') {
    return null;
  }

  let initDataEl = document.getElementById('init-data');
  return initDataEl ? JSON.parse(initDataEl.textContent) : null;
}

export default function createStore() {
  let store = applyMiddleware(
    promiseMiddleware(),
    thunk
  )(createReduxStore)(dataReducer);

  postsSelectors(store);

  return store;
}
