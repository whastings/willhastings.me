// @flow

import './styles.scss';
import React from 'react';
import { toFriendlyDate } from 'app/utils/dates';
import type { Post } from 'posts/types';
import type { Children } from 'react';

type Props = {
  post: Post,
  children?: Children,
  showPreview?: boolean,
};

export default function PostTeaser({post, children, showPreview = true}: Props) {
  const preview = { __html: post.preview };
  const publishDate = post.published && post.publishDate ?
    toFriendlyDate(post.publishDate) :
    'Unpublished';

  return (
    <article className="post-teaser card">
      <h3 className="post-teaser__title">
        <a href={`/blog/${post.permalink}`}>{post.title}</a>
      </h3>
      <p className="post-teaser__publish-date">{publishDate}</p>
      {showPreview && post.imageUrl &&
        <img className="post-teaser__image-thumbnail" src={toThumbnailUrl(post.imageUrl)} alt=""/>}
      {showPreview &&
        <p
          className="post-teaser__preview"
          dangerouslySetInnerHTML={preview}>
        </p>}
        {children}
    </article>
  );
}

function toThumbnailUrl(url: string): string {
  let urlParts = url.split('/');
  urlParts.pop();
  urlParts.push('thumbnail.jpg');
  return urlParts.join('/');
}
