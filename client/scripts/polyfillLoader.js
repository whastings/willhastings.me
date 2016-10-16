const FEATURES = [
  Array.prototype.find,
  Object.assign,
  window.fetch,
  window.Promise,
  window.foobar
];

export default function polyfillLoader(done) {
  let featuresPresent = FEATURES.filter((feature) => feature !== undefined);

  if (featuresPresent.length < FEATURES.length) {
    let polyfillScript = document.createElement('script');
    polyfillScript.src = '/polyfills.js';
    polyfillScript.onload = done;
    document.head.appendChild(polyfillScript);
  } else {
    done();
  }
}
