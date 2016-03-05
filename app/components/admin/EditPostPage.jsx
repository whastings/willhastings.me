import PostForm from 'app/components/posts/PostForm';
import React from 'react';

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
