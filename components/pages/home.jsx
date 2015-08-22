import React from 'react';

export default function(content) {
  content = {__html: content};
  return (
    <section className="home-page" dangerouslySetInnerHTML={content}>
    </section>
  );
}
