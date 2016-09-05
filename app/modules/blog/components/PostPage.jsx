import React from 'react';
import SafeOutput from 'app/utils/components/SafeOutput';

export default function PostPage({post}) {
  return (
    <section className="post-view-page post">
      <h2 className="page-title">{post.title}</h2>

      <SafeOutput className="post__body card" content={post.body}/>
    </section>
  );
}
