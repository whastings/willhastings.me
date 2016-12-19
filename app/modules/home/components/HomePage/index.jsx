import './styles.scss';
import React from 'react';
import SafeOutput from 'app/utils/components/SafeOutput';
import SocialLinks from 'home/components/SocialLinks';
import { PostList } from 'posts/components';
import { PostType } from 'posts/propTypes';

const { PropTypes } = React;

export default function homePage({content, posts}) {
  return (
    <div className="home-page" id="home-page-content">
      <section className="home-about-me">
        <div className="card">
          <SafeOutput content={content} className="content"/>
          <SocialLinks/>
        </div>
      </section>
      <section className="home-recent-posts">
        <h2 className="section-title">Recent Posts</h2>
        <PostList posts={posts}/>
      </section>
    </div>
  );
}

homePage.propTypes = {
  content: PropTypes.string.isRequired,
  posts: PropTypes.arrayOf(PostType)
};
