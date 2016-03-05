const DEFAULT_OPTIONS = {
  credentials: 'same-origin' // Allow setting cookies.
};

const JSON_HEADERS = {
  Accept: 'application/json',
  'Content-Type': 'application/json'
};

export function deleteResource(route) {
  return fetch(route, createOptions({
    method: 'DELETE'
  }));
}

export function getJSON(route) {
  return fetch(route, DEFAULT_OPTIONS)
    .then((response) => {
      // TODO: Check response.ok
      return response.json();
    });
}

export function postJSON(route, body = null) {
  body = body ? JSON.stringify(body) : undefined;

  return fetch(route, createOptions({
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

  return fetch(route, createOptions({
    body,
    headers: JSON_HEADERS,
    method: 'PUT'
  }))
    .then((response) => {
      // TODO: Check response.ok
      return response.json();
    });
}

function createOptions(options) {
  return Object.assign({}, DEFAULT_OPTIONS, options);
}
