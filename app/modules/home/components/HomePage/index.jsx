import './styles.scss';
import React from 'react';
import SocialLinks from 'home/components/SocialLinks';
import { PostList } from 'posts/components';

export default function homePage({content, posts}) {
  content = {__html: content};
  return (
    <div className="home-page" id="home-page-content">
      <section className="home-about-me">
        <div className="card">
          <div className="content" dangerouslySetInnerHTML={content}></div>
          <SocialLinks/>
        </div>
      </section>
      <section className="home-recent-posts">
        <PostList posts={posts}/>
      </section>
    </div>
  );
}
