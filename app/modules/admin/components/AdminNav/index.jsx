// @flow

import './styles.scss';
import React from 'react';

type Props = {
  onSignOut: () => void,
};

export default function AdminNav({onSignOut}: Props) {
  return (
    <nav className="admin-nav card-primary">
      <ul className="admin-nav__links">
        <li><a href="/admin">All Posts</a></li>
        <li><a href="/admin/posts/new">New Post</a></li>
      </ul>

      <div className="admin-nav__actions">
        <button type="button" className="btn-sign-out" onClick={onSignOut}>
          Sign Out
        </button>
      </div>
    </nav>
  );
}
