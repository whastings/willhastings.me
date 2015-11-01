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
* Contact

## Tech

* Backend
  * Framework: Express
  * DB: Mongo
  * ORM: Mongoose
  * Build: Broccoli
    * Markdown to HTML
    * ES6 -> ES5
    * SCSS -> CSS
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
* /blog.json
* /projects
* /contact
* /api
  * /api/home
  * /api/blog
    * /api/blog/:post
  * /api/projects
  * /api/contact

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
* `ProjectsPage`
  * `ProjectTabs`
    * `ProjectList`
      * `Project`
* Post
  * `PostHeader`
* `PostList`
* `TabContainer`
  * `TabNav`
  * Tab

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
