import React from 'react'

const PostLink = (props) => {
  const externalLinkProps = (props.href.charAt(0) === '/') ? {} :
    {
      target: '_blank',
      rel: 'noopener noreferrer',
    }

  return (
    <a {...props} {...externalLinkProps} />
  )
}

export default PostLink
