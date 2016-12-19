import createStore from 'app/createStore';
import HomePage from 'home/components/HomePage';
import routes from 'home/routes';
import sinon from 'sinon';
import { assert } from 'chai';
import { createPost } from 'posts/__tests__/helpers';

describe('Home - Routes', function() {
  let api;
  let store;

  beforeEach(function() {
    api = {};
    store = createStore(api);
  });

  describe('index()', function() {
    it('renders HomePage component with content and posts', function() {
      let page = {id: 'home', content: 'Foo bar'};
      let posts = [createPost(), createPost(), createPost()];
      let res = {
        dispatch: store.dispatch,
        render: sinon.spy()
      };

      api.getHomePage = () => Promise.resolve(page);
      api.getPosts = () => Promise.resolve(posts);

      return routes.index({}, res, store.getState)
        .then(() => {
          sinon.assert.calledOnce(res.render);
          let renderCall = res.render.getCall(0);
          assert.equal(renderCall.args[0], HomePage, 'called with HomePage component');
          let propsArg = renderCall.args[1];
          assert.equal(propsArg.content, page.content, 'provided with page content');
          assert.equal(propsArg.posts.length, posts.length, 'provided with posts');
        });
    });
  });
});
