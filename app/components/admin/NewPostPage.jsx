import PostForm from 'app/components/posts/PostForm';
import React from 'react';

const { Component, PropTypes } = React;

export default function NewPostPage({onFormSubmit}) {
  return (
    <section className="new-post-page">
      <PostForm onSubmit={onFormSubmit}/>
    </section>
  );
}

NewPostPage.propTypes = {
  onFormSubmit: PropTypes.func.isRequired
};
