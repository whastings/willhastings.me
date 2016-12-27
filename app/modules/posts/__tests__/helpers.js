let lastId = 1;

export function createPost(props = {}) {
  return Object.assign({
    id: lastId++,
    title: 'Post Title',
    permalink: 'post-title',
    body: 'Post body.',
    bodyRaw: 'Post body.',
    preview: 'Post body. <strong>Foo!</strong>',
    published: true,
    publishDate: '2016-1-1'
  }, props);
}
