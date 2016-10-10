import './styles.scss';
import React from 'react';
import { toFriendlyDate } from 'app/utils/dates';

export default function PostTeaser({post, children, showPreview = true}) {
  let preview = {__html: post.preview};
  let publishDate = post.published && post.publishDate ? toFriendlyDate(post.publishDate) : 'Unpublished';

  return (
    <article className="post-teaser card">
      <h3 className="post-teaser__title">
        <a href={`/blog/${post.permalink}`}>{post.title}</a>
      </h3>
      <p className="post-teaser__publish-date">{publishDate}</p>
      {showPreview &&
        <p
          className="post-teaser__preview"
          dangerouslySetInnerHTML={preview}>
        </p>}
        {children}
    </article>
  );
}
