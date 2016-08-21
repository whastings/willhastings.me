import React from 'react';

export default function PostPage({post}) {
  let body = {__html: post.body};
  return (
    <section className="post-view-page post">
      <h1>{post.title}</h1>

      <div className="post__body" dangerouslySetInnerHTML={body}></div>
    </section>
  );
}
