---
title: Tips for Building Universal JavaScript Apps
date: 2016-12-1
link: /posts/tips-for-building-universal-javascript-apps
---

Following in the footsteps of some great JavaScript developers, I've built my own, over-engineered blog. In my case, I built it as a single-page application running on React and Redux client-side and Express server-side. While the endeavor hasn't been the most practical I've ever undertaken (a blog hardly needs to be a SPA), it's been extremely helpful to me in learning an awesome technology stack.

One challenge I wanted to tackle as part of this project was to get my blogging app to support both server-side and client-side rendering (make it a "universal" app). In my experience, server-side rendering is great for enabling a quick initial render and client-side rendering is great for quick subsequent page views. As part of achieving this goal, I discovered a few handy tips. I'm going to share these in the hopes they'll be of help to others.
