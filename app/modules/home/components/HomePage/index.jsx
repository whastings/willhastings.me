import './styles.scss';
import React from 'react';
import SocialLinks from 'home/components/SocialLinks';
import { PostList } from 'posts/components';

export default function homePage({content, posts}) {
  content = {__html: content};
  return (
    <div className="home-page" id="home-page-content">
      <section className="home-about-me">
        <div className="wrapper">
          <div className="content" dangerouslySetInnerHTML={content}></div>
          <SocialLinks/>
        </div>
      </section>
      <section className="home-recent-posts">
        <h2>Recent Posts</h2>
        <PostList posts={posts}/>
      </section>
    </div>
  );
}
