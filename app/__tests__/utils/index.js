import asyncActionMiddleware from 'app/utils/asyncActionMiddleware';
import configureStore from 'redux-mock-store';
import { assert } from 'chai';

export function assertAction(action, type, payload) {
  assert.strictEqual(action.type, type, 'action has correct type');
  assert.strictEqual(action.payload, payload, 'action has correct payload');
}

export function createMockStore(api) {
  return configureStore([asyncActionMiddleware(api)]);
}
