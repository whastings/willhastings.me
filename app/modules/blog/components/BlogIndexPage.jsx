import React from 'react';
import { PostList } from 'app/modules/posts/components';

export default function BlogIndexPage({posts}) {
  return (
    <section className="blog-index-page">
      <h2 className="page-title">Blog</h2>
      <PostList posts={posts}/>
    </section>
  );
}
