import './styles.scss';
import AdminNav from 'admin/components/AdminNav';
import React from 'react';

export default function AdminPageLayout({children, onSignOut}) {
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
