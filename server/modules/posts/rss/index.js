const api = require('../api');
const asyncRoute = require('server/utils/asyncRoute');
const express = require('express');
const RSS = require('rss');

const app = express();
const FEED_OPTIONS = {
  title: 'Will Hastings - Blog',
  description: 'Thoughts from Will Hastings, front end engineer and JavaScript enthusiast',
  'feed_url': 'http://www.willhastings.me/rss',
  'site_url': 'http://www.willhastings.me'
};

app.get('/', asyncRoute(function* rssRouteIndex(req, res) {
  let posts = yield api.getPosts();
  let feed = new RSS(FEED_OPTIONS);

  // TODO: Cache this.
  posts
    .sort((post1, post2) => post1.publishDate > post2.publishDate ? -1 : 1)
    .forEach((post) => feed.item({
      title: post.title,
      description: post.preview,
      url: `http://www.willhastings.me/${post.permalink}`,
      date: post.publishDate,
      author: 'Will Hastings'
    }));

  res.type('application/rss+xml');
  res.end(feed.xml());
}));

module.exports = app;
