# objectdotcreate.net V2 Plan

## Content

* Home
  * Photo (me coding?)
  * About
  * Interests (word cloud?)
* Projects (tabs for subpages)
  * Open-source
  * Learning
  * Presentations
  * Personal
* Blog
  * Posts
    * Comments
* Contact

## Tech

* Backend
  * Framework: Express
  * DB: Mongo
  * ORM: Mongoose
  * Build: Broccoli
    * Markdown to HTML
    * ES6 -> ES5
  * Rendering: React
* Frontend
  * Rendering: React
  * Routing: `https://github.com/rackt/react-router`
  * Responsive Images (Picturefill.js)

## Project Structure

* content
  * pages
  * partials
  * posts
  * projects
* dist
* components
* images
* lib
* models
* styles
* routes
* templates
  * layouts
  * components

## Server Routes

* /
* /admin
* /blog
  * /blog/:post
  * /blog/:post.json
* /blog.json
* /projects
  * /projects/:project
  * /projects/:project.json
* /projects.json
* /:page
* /:page.json

## Models

* comment
* message
* post
* project

## Components

* `CommentList`
* Comment
* `CommentForm`
* `ContactForm`
* Page
* `ProjectList`
  * Project
* Post
  * `PostHeader`
* `PostList`
* `TabContainer`
  * `TabNav`
  * Tab

## Resources

* `https://github.com/koajs/examples`
* `https://github.com/koajs/api-boilerplate`
* `http://koajs.in/doc/`
* `https://github.com/alexmingoia/koa-router`
