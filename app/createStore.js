import immutable from 'seamless-immutable';
import pagesReducer from 'app/reducers/pagesReducer';
import promiseMiddleware from 'redux-promise-middleware';
import { applyMiddleware, createStore as createReduxStore } from 'redux';
import usersReducer from 'app/reducers/usersReducer';

const INITIAL_STATE = immutable({
  models: {
    users: {}
  },
  pages: {}
});

function dataReducer(state = INITIAL_STATE, action) {
  return state.merge({
    models: {
      users: usersReducer(state.models.users, action)
    },
    pages: pagesReducer(state.pages, action)
  });
}

export default function createStore() {
  return applyMiddleware(
    promiseMiddleware()
  )(createReduxStore)(dataReducer);
}
