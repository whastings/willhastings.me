import React from 'react';
import { PostForm } from 'app/modules/posts/components';

const { Component, PropTypes } = React;

export default function EditPostPage({onFormSubmit, post}) {
  return (
    <section className="edit-post-page">
      <PostForm onSubmit={onFormSubmit} post={post}/>
    </section>
  );
}

EditPostPage.propTypes = {
  onFormSubmit: PropTypes.func.isRequired
};
