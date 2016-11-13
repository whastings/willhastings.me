import './styles.scss';
import React from 'react';

export default function Page404() {
  return (
    <section className="page-404">
      <h2 className="page-title">Page Not Found</h2>
      <div className="message-404 card">
        <div className="message-404__graphic" aria-hidden="true">
          ¯\_(ツ)_/¯
        </div>
        <p>
          Not sure how you got here. Head <a href="/">home</a> to get back on track.
        </p>
      </div>
    </section>
  );
}
