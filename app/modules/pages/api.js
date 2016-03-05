import { getJSON } from 'app/utils/request';

export default {
  getPage(page) {
    return getJSON(`/api/pages/${page}`);
  }
};
