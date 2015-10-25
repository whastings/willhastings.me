import React from 'react';

export default function homePage(content) {
  content = {__html: content};
  return (
    <section className="home-page" id="home-page-content" dangerouslySetInnerHTML={content}>
    </section>
  );
}
