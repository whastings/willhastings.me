const DEFAULT_OPTIONS = {
  credentials: 'same-origin', // Allow setting cookies.
  headers: {},
  method: 'GET'
};

const JSON_HEADERS = {
  Accept: 'application/json',
  'Content-Type': 'application/json'
};

export function deleteResource(route) {
  return fetch(route, getOptions({
    method: 'DELETE'
  }));
}

export function getJSON(route) {
  return fetch(route, getOptions())
    .then((response) => {
      // TODO: Check response.ok
      return response.json();
    });
}

export function postJSON(route, body = null) {
  body = body ? JSON.stringify(body) : undefined;

  return fetch(route, getOptions({
    body,
    headers: JSON_HEADERS,
    method: 'POST',
  }))
    .then((response) => {
      // TODO: Check response.ok
      return response.json();
    });
}

export function putJSON(route, body) {
  body = JSON.stringify(body);

  return fetch(route, getOptions({
    body,
    headers: JSON_HEADERS,
    method: 'PUT'
  }))
    .then((response) => {
      // TODO: Check response.ok
      return response.json();
    });
}

export function sendDelete(route) {
  return fetch(route, getOptions({
    method: 'DELETE'
  }));
  // TODO: Check response.ok
}

export function stringifyQueryParams(queryParams) {
  return '?' + Object.keys(queryParams)
    .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(queryParams[key]))
    .join('&');
}

function getCsrfToken() {
  let tokenMetaTag = document.querySelector('meta[name=csrf-token]');

  if (!tokenMetaTag) {
    throw new Error('CSRF token metatag not present');
  }

  return tokenMetaTag.getAttribute('content');
}

function getOptions(custom = {}) {
  let options = Object.assign({}, DEFAULT_OPTIONS, custom);

  if (options.method !== 'GET') {
    options.headers = Object.assign({}, options.headers, {
      'X-CSRF-Token': getCsrfToken()
    });
  }

  return options;
}
