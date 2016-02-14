import React from 'react';

export default function PostPage({post}) {
  return (
    <section className="post-view-page post">
      <h1>{post.title}</h1>

      <div className="post__body">
        {post.body}
      </div>
    </section>
  );
}
