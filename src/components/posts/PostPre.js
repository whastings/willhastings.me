import React from 'react'
import Highlight, { defaultProps } from 'prism-react-renderer'

// Based on: https://malikgabroun.com/syntax-highlighting-in-gatsby-mdx
const PostPre = (props) => {
  const languageClassName = props.children.props.className || '';
  const languageMatch = languageClassName.match(/language-(.*)/);
  const language = languageMatch ? languageMatch[1] : ''

  return (
    <Highlight
      {...defaultProps}
      code={props.children.props.children}
      language={language}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={className} style={style}>
          {tokens.map((line, i) => (
            <div {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  )
}

export default PostPre
