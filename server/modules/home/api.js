import co from 'co';
import loadHtml from 'server/utils/loadHtml';

export default {
  getHomePage: co.wrap(function* loadHomePage() {
    return {
      content: (yield loadHtml('pages/home.html')).toString(),
      id: 'home'
    };
  })
};
