// @flow

import AdminPageLayout from 'admin/components/AdminPageLayout';
import PropTypes from 'prop-types';
import React from 'react';
import { PostForm } from 'app/modules/posts/components';

type Props = {
  onFormSubmit: Function,
  onSignOut: Function,
};

export default function NewPostPage({onFormSubmit, onSignOut}: Props) {
  return (
    <AdminPageLayout onSignOut={onSignOut}>
      <section className="new-post-page post-form-page">
        <PostForm onSubmit={onFormSubmit}/>
      </section>
    </AdminPageLayout>
  );
}

NewPostPage.propTypes = {
  onFormSubmit: PropTypes.func.isRequired
};
