# objectdotcreate.net V2 Plan

## Content

* Home
  * Photo (me coding?)
  * About
  * Recent posts
  * Interests (word cloud?)
* Projects (tabs for subpages)
  * Open-source
  * Learning
  * Presentations
  * Personal
* Blog
  * Posts
    * Comments
  * Search
* Contact
* Admin
  * Index
    * List of posts (each with view, edit, view comments, delete)
  * Sign In
    * Form redirects to index on success
  * Create Post
  * Edit Post

## Tech

* Backend
  * Framework: Express
  * DB: Postgres
  * ORM: Sequelize
  * Build: Broccoli
    * Markdown to HTML
    * ES6 -> ES5
    * SCSS -> CSS
  * Rendering: React
* Frontend
  * Rendering: React
  * Routing: page.js
  * Responsive Images (Picturefill.js)

## Project Structure

* content
  * images
  * pages
  * partials
  * posts
  * projects
* config
* dist
* app
  * actions
  * components
  * reducers
  * routes
  * utils
* client
  * scripts
  * styles
* lib
* server
  * db
  * middleware
  * models
  * styles
  * routes
  * templates
    * layouts
    * components

## Server Routes

* /
* /projects
* /blog
  * /blog/:post
* /contact
* /admin
  * /admin/sign-in
  * /admin/posts/new
  * /admin/posts/:post/edit
* /api/pages/:page
* /api/posts (get for index, post to create)
  * /api/posts/:post (get for view, patch for update, delete for removal)
* /api/sessions (post to create)

## Models

* comment
* message
* post
* user
* session

## Components

* `AdminIndexPage`
  * `PostList`
    * `AdminPostListItem`
* `BlogIndexPage`
  * `PostList`
    * `PostListItem`
* `CommentList`
* Comment
* `CommentForm`
* `ContactForm`
* `ProjectsPage`
  * `ProjectTabs`
    * `ProjectList`
      * `Project`
* `PostCreatePage`
  * `PostForm`
* `PostEditPage`
  * `PostForm`
* `PostViewPage`
  * Post
    * `PostHeader`

## Resources

* expressjs.com

## Inspirations

* aerotwist.com
* nolanlawson.com
* christianheilmann.com
* davidwalsh.name
* jakearchibald.com
* nczonline.net
* ponyfoo.com
* programwitherik.com
* ruben.verborgh.org
