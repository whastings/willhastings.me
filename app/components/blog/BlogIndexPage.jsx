import PostList from 'app/components/posts/PostList';
import React from 'react';

export default function BlogIndexPage({posts}) {
  return (
    <section className="blog-index-page">
      <h1>Blog</h1>
      <PostList posts={posts}/>
    </section>
  );
}
