import React from 'react';
import profiler from 'app/utils/components/profiler';
import { PostList } from 'app/modules/posts/components';

export function BlogIndexPage({posts}) {
  return (
    <section className="blog-index-page">
      <h2 className="page-title">Blog</h2>
      <PostList posts={posts}/>
    </section>
  );
}

export default profiler(BlogIndexPage);
