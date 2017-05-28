// @flow

import AdminPageLayout from 'admin/components/AdminPageLayout';
import React from 'react';
import { PostForm } from 'posts/components';
import type { Post } from 'posts/types';

type Props = {
  onFormSubmit: Function,
  onSignOut: Function,
  post: Post,
};

export default function EditPostPage({onFormSubmit, onSignOut, post}: Props) {
  return (
    <AdminPageLayout onSignOut={onSignOut}>
      <section className="edit-post-page post-form-page">
        <PostForm onSubmit={onFormSubmit} post={post}/>
      </section>
    </AdminPageLayout>
  );
}
