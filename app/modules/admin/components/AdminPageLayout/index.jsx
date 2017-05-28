// @flow

import './styles.scss';
import AdminNav from 'admin/components/AdminNav';
import React from 'react';
import type { Children } from 'react';

type Props = {
  children?: Children, // Flow bug requires making it optional param
  onSignOut: Function,
};

export default function AdminPageLayout({children, onSignOut}: Props) {
  return (
    <div className="admin-page">
      <div className="admin-sidebar">
        <AdminNav onSignOut={onSignOut}/>
      </div>
      <div className="admin-content">
        {children}
      </div>
    </div>
  );
}
