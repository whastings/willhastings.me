import api from 'home/api';
import Pretender from 'pretender';
import { assert } from 'chai';

describe('Home - API', function() {
  let server;

  beforeEach(function() {
    server = new Pretender();
  });

  afterEach(function() {
    server.shutdown();
  });

  describe('getHomePage()', function() {
    it('makes the correct API call', function() {
      server.get('/api/pages/home', function() {
        return [200, {'Content-Type': 'application/json'}, '[]'];
      });

      return api.getHomePage()
        .then(() => assert.equal(server.handlers[0].numberOfCalls, 1, 'right endpoint called'));
    });
  });
});
