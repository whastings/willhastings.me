require('lib/env');
const co = require('co');
const faker = require('faker');
const initDB = require('server/db/initDB');
const Post = require('server/modules/posts/model');
const User = require('server/modules/users/model');
const { rand } = require('@whastings/js_utils');

const NUM_POSTS = 25;

initDB()
  .then((connection) => connection.transaction())
  .then(co.wrap(function* seedDB(transaction) {
    let UserModel = User.model;

    let user = yield UserModel.createWithPassword('will', 'foobar', {transaction});

    yield* createPosts(user, transaction, NUM_POSTS);

    return transaction;
  }))
  .then((transaction) => transaction.commit())
  .catch(console.log.bind(console));

function* createPosts(user, transaction, numPosts) {
  let posts = new Array(numPosts);
  let PostModel = Post.model;
  let userId = user.id;
  let published = true;

  for (let i = 0; i < numPosts; i++) {
    let title = faker.hacker.phrase();
    let body = faker.lorem.paragraphs(rand(3, 10));

    posts.push(
      yield PostModel.create({title, body, userId, published}, {transaction})
    );
  }

  return posts;
}
