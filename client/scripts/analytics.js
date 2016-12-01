const GA_ID = 'UA-88292718-1';
const GA_SCRIPT_URL = 'https://www.google-analytics.com/analytics.js';

const trackingQueue = [];

export default {
  init() {
    let gaScript = document.createElement('script');
    gaScript.src = GA_SCRIPT_URL;
    gaScript.async = true;
    gaScript.onload = () => {
      let { ga } = window;
      ga('create', GA_ID, 'auto');
      while (trackingQueue.length > 0) {
        this.track(trackingQueue.shift());
      }
    };
    document.head.appendChild(gaScript);
  },

  track(path) {
    let { ga } = window;

    if (ga) {
      ga('set', 'page', path);
      ga('send', 'pageview');
    } else {
      trackingQueue.push(path);
    }
  }
};
