import PostList from 'app/components/posts/PostList';
import React from 'react';

export default function adminIndexPage({posts}) {
  return (
    <section className="admin-index-page">
      <PostList posts={posts}/>
    </section>
  );
}
