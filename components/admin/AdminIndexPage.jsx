import React from 'react';

export default function adminIndexPage({user}) {
  return (
    <section className="admin-index-page">
      <h1>Welcome, {user.username}!</h1>
    </section>
  );
}
