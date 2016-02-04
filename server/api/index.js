import pages from 'server/api/pages';
import posts from 'server/api/posts';

export default Object.assign({
  getPage(page) {
    return pages.get(page);
  }
}, posts);
