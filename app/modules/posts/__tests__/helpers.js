let lastId = 1;

export function createPost(props = {}) {
  return Object.assign({
    id: lastId++,
    title: 'Post Title',
    body: 'Post body.',
    preview: 'Post body.',
    published: true,
    publishDate: '2016-1-1'
  }, props);
}
