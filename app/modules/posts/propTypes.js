import PropTypes from 'prop-types';
import React from 'react';

export const PostType = PropTypes.shape({
  title: PropTypes.string.isRequired,
  body: PropTypes.string,
  preview: PropTypes.string.isRequired,
  published: PropTypes.bool.isRequired,
  publishDate: PropTypes.string
});
