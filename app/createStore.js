import asyncActionMiddleware from 'app/utils/asyncActionMiddleware';
import immutable from 'seamless-immutable';
import { applyMiddleware, combineReducers, createStore as createReduxStore } from 'redux';

// Reducers:
import adminReducer from 'app/modules/admin/reducer';
import pagesReducer from 'app/modules/pages/reducer';
import postsReducer from 'app/modules/posts/reducer';
import uiReducer from 'app/modules/ui/reducer';
import usersReducer from 'app/modules/users/reducer';

const rootReducer = combineReducers({
  admin: adminReducer,
  pages: pagesReducer,
  posts: postsReducer,
  ui: uiReducer,
  users: usersReducer
});

export default function createStore(api) {
  let createStoreWithMiddleware = applyMiddleware(
    asyncActionMiddleware(api)
  )(createReduxStore);
  let initialState = getInitialState();

  return initialState ? createStoreWithMiddleware(rootReducer, initialState) :
    createStoreWithMiddleware(rootReducer);
}

function getInitialState() {
  if (typeof document === 'undefined') {
    return null;
  }

  let initDataEl = document.getElementById('init-data');
  return initDataEl ? immutable(JSON.parse(initDataEl.textContent)) : null;
}
