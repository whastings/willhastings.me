import './styles.scss';
import React from 'react';
import { PostType } from 'posts/propTypes';
import { toFriendlyDate } from 'app/utils/dates';

const { PropTypes } = React;

export default function PostTeaser({post, children, showPreview = true}) {
  let preview = {__html: post.preview};
  let publishDate = post.published && post.publishDate ?
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

PostTeaser.propTypes = {
  children: PropTypes.any,
  post: PostType,
  showPreview: PropTypes.bool
};

function toThumbnailUrl(url) {
  let urlParts = url.split('/');
  urlParts.pop();
  urlParts.push('thumbnail.jpg');
  return urlParts.join('/');
}
