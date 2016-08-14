import './styles.scss';
import React from 'react';
import { PostList } from 'app/modules/posts/components';

export default function homePage({content, posts}) {
  content = {__html: content};
  return (
    <div className="home-page" id="home-page-content">
      <section className="home-about-me">
        <div className="wrapper" dangerouslySetInnerHTML={content}></div>
      </section>
      <section className="home-recent-posts">
        <h2>Recent Posts</h2>
        <PostList posts={posts}/>
      </section>
    </div>
  );
}
