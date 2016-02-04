import immutable from 'seamless-immutable';
import pagesReducer from 'app/reducers/pagesReducer';
import postsReducer from 'app/reducers/postsReducer';
import postsSelectors from 'app/selectors/posts';
import promiseMiddleware from 'redux-promise-middleware';
import thunk from 'redux-thunk';
import uiReducer from 'app/reducers/uiReducer';
import usersReducer from 'app/reducers/usersReducer';
import { applyMiddleware, createStore as createReduxStore } from 'redux';

const INITIAL_STATE = immutable(getInitialState() || {
  models: {
    posts: {},
    users: {}
  },
  pages: {},
  ui: {
    currentUserId: null
  }
});

function dataReducer(state = INITIAL_STATE, action) {
  let models = state.models;

  return state.merge({
    models: {
      posts: postsReducer(models.posts, action),
      users: usersReducer(models.users, action)
    },
    pages: pagesReducer(state.pages, action),
    ui: uiReducer(state.ui, action)
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
