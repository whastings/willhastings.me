import PostForm from 'app/components/posts/PostForm';
import React from 'react';

const { Component, PropTypes } = React;

export default function NewPostPage({onFormSubmit}) {
  return (
    <PostForm onSubmit={onFormSubmit}/>
  );
}

NewPostPage.propTypes = {
  onFormSubmit: PropTypes.func.isRequired
};
