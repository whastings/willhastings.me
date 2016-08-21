import './styles.scss';
import React from 'react';

export default function PostListItem({post}) {
  let preview = {__html: post.preview};
  return (
    <li className="post-teaser">
      <h3><a href={`/blog/${post.permalink}`}>{post.title}</a></h3>
      <p className="post-teaser__publish-date">{post.publishDate}</p>
      <p className="post-teaser__preview" dangerouslySetInnerHTML={preview}></p>
    </li>
  );
}
