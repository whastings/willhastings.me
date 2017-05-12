import './styles.scss';
import React from 'react';
import SafeOutput from 'app/utils/components/SafeOutput';
import profiler from 'app/utils/components/profiler';

export function PostPage({post}) {
  return (
    <section className="post-view-page post">
      <h2 className="page-title">{post.title}</h2>

      <div className="post__body card">
        {post.imageUrl &&
          <img className="post__image" src={post.imageUrl} alt=""/>}
        <SafeOutput className="post__content" content={post.body}/>
      </div>
    </section>
  );
}

export default profiler(PostPage);
