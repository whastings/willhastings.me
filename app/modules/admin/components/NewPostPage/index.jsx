import './styles.scss';
import AdminPageLayout from 'admin/components/AdminPageLayout';
import React from 'react';
import { PostForm } from 'app/modules/posts/components';

const { PropTypes } = React;

export default function NewPostPage({onFormSubmit, onSignOut}) {
  return (
    <AdminPageLayout onSignOut={onSignOut}>
      <section className="new-post-page">
        <PostForm onSubmit={onFormSubmit}/>
      </section>
    </AdminPageLayout>
  );
}

NewPostPage.propTypes = {
  onFormSubmit: PropTypes.func.isRequired
};
