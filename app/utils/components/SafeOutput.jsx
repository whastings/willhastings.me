import React from 'react';

export default function(props) {
  let { content, ...rest } = props;

  return (
    <div dangerouslySetInnerHTML={{__html: content}} {...rest}></div>
  );
}
