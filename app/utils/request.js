// @flow

type QueryParamMap = { [string]: number | string | boolean };
type URL = string;

const DEFAULT_OPTIONS = {
  credentials: 'same-origin', // Allow setting cookies.
  headers: {},
  method: 'GET'
};

const JSON_HEADERS = {
  Accept: 'application/json',
  'Content-Type': 'application/json'
};

export function deleteResource(route: URL): Promise<Response> {
  return fetch(route, getOptions({
    method: 'DELETE'
  }));
}

export function getJSON(route: URL): Promise<Object> {
  return fetch(route, getOptions())
    .then((response) => {
      // TODO: Check response.ok
      return response.json();
    });
}

export function postJSON(route: URL, body: ?Object = null): Promise<Object> {
  const postBody = body ? JSON.stringify(body) : undefined;

  return fetch(route, getOptions({
    body: postBody,
    headers: JSON_HEADERS,
    method: 'POST',
  }))
    .then((response) => {
      // TODO: Check response.ok
      return response.json();
    });
}

export function putJSON(route: URL, body: Object): Promise<Object> {
  const putBody = JSON.stringify(body);

  return fetch(route, getOptions({
    putBody,
    headers: JSON_HEADERS,
    method: 'PUT'
  }))
    .then((response) => {
      // TODO: Check response.ok
      return response.json();
    });
}

export function stringifyQueryParams(queryParams: QueryParamMap) {
  return '?' + Object.keys(queryParams)
    .map((key) => encodeURIComponent(key.toString()) + '=' +
      encodeURIComponent(queryParams[key].toString()))
    .join('&');
}

function getCsrfToken(): string {
  const tokenMetaTag = document.querySelector('meta[name=csrf-token]');

  if (!tokenMetaTag) {
    throw new Error('CSRF token metatag not present');
  }

  const token = tokenMetaTag.getAttribute('content');

  if (typeof token !== 'string') {
    throw new Error('Token not present on CSRF metatag');
  }

  return token;
}

function getOptions(custom? = {}): Object {
  let options = Object.assign({}, DEFAULT_OPTIONS, custom);

  if (options.method !== 'GET') {
    options.headers = Object.assign({}, options.headers, {
      'X-CSRF-Token': getCsrfToken()
    });
  }

  return options;
}
