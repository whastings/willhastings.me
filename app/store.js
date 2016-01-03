import { applyMiddleware, createStore } from 'redux';
import immutable from 'seamless-immutable';
import promiseMiddleware from 'redux-promise-middleware';
import usersReducer from 'app/reducers/usersReducer';

const INITIAL_STATE = immutable({
  models: {
    users: {}
  }
});

function createDataStore() {
  return applyMiddleware(promiseMiddleware())(createStore)(dataReducer);
}

function dataReducer(state = INITIAL_STATE, action) {
  return state.merge({
    models: {
      users: usersReducer(state.models.users, action)
    }
  });
}

export default createDataStore();
