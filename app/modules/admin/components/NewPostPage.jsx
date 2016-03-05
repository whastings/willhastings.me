import React from 'react';
import { PostForm } from 'app/modules/posts/components';

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
