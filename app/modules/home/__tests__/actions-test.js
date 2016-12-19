import * as actions from 'home/actions';
import asyncActionMiddleware from 'app/utils/asyncActionMiddleware';
import configureStore from 'redux-mock-store';
import { assert } from 'chai';

describe('Home - Action creators', function() {
  let api;
  let mockStore;

  beforeEach(function() {
    api = {};
    mockStore = configureStore([asyncActionMiddleware(api)]);
  });

  describe('loadHomePage()', function() {
    it('calls api to load home page then returns PAGE_ADD action', function() {
      let page = {};
      let store = mockStore({pages: {}});
      api.getHomePage = () => Promise.resolve(page);

      return store.dispatch(actions.loadHomePage())
        .then(() => {
          let action = store.getActions()[0];
          assert.equal(action.type, 'PAGE_ADD', 'action has correct type');
          assert.equal(action.payload, page, 'action has correct payload');
        });
    });

    it('skips api call and dispatch if home page already in store', function() {
      let page = {};
      let store = mockStore({pages: {home: page}});
      api.getHomePage = () => {
        throw new Error('getHomePage called');
      };

      return store.dispatch(actions.loadHomePage())
        .then(() => {
          let actions = store.getActions();
          assert.equal(actions.length, 0, 'No action was fired');
        });
    });
  });
});
