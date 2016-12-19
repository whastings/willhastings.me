/**
 * HACK:
 * Since the app uses fetch() for API requests and mocking tools like Pretender
 * don't yet support fetch(), we kill the browser's native fetch() implementation
 * and will load the polyfill instead, which uses XMLHttpRequest.
 */
window.fetch = null;
