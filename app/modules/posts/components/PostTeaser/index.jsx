import './styles.scss';
import React from 'react';
import { toFriendlyDate } from 'app/utils/dates';

export default function PostTeaser({post}) {
  let preview = {__html: post.preview};
  let publishDate = toFriendlyDate(post.publishDate);

  return (
    <article className="post-teaser card">
      <h3 className="post-teaser__title">
        <a href={`/blog/${post.permalink}`}>{post.title}</a>
      </h3>
      <p className="post-teaser__publish-date">{publishDate}</p>
      <p className="post-teaser__preview" dangerouslySetInnerHTML={preview}></p>
    </article>
  );
}
