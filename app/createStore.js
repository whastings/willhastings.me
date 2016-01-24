import immutable from 'seamless-immutable';
import pagesReducer from 'app/reducers/pagesReducer';
import promiseMiddleware from 'redux-promise-middleware';
import thunk from 'redux-thunk';
import uiReducer from 'app/reducers/uiReducer';
import usersReducer from 'app/reducers/usersReducer';
import { applyMiddleware, createStore as createReduxStore } from 'redux';

const INITIAL_STATE = immutable(getInitialState() || {
  models: {
    users: {}
  },
  pages: {},
  ui: {
    currentUserId: null
  }
});

function dataReducer(state = INITIAL_STATE, action) {
  return state.merge({
    models: {
      users: usersReducer(state.models.users, action)
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
  return applyMiddleware(
    promiseMiddleware(),
    thunk
  )(createReduxStore)(dataReducer);
}
