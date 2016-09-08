import AdminPageLayout from 'admin/components/AdminPageLayout';
import React from 'react';
import { PostForm } from 'app/modules/posts/components';

const { PropTypes } = React;

export default function EditPostPage({onFormSubmit, onSignOut, post}) {
  return (
    <AdminPageLayout onSignOut={onSignOut}>
      <section className="edit-post-page post-form-page">
        <PostForm onSubmit={onFormSubmit} post={post}/>
      </section>
    </AdminPageLayout>
  );
}

EditPostPage.propTypes = {
  onFormSubmit: PropTypes.func.isRequired
};
