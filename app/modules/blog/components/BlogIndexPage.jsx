import React from 'react';
import { PostList } from 'app/modules/posts/components';

export default function BlogIndexPage({posts}) {
  return (
    <section className="blog-index-page">
      <h1>Blog</h1>
      <PostList posts={posts}/>
    </section>
  );
}
