import pages from 'server/api/pages';

export default {
  getPage(page) {
    return pages.get(page);
  }
};
