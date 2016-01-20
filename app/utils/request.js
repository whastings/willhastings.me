const DEFAULT_OPTIONS = {
  credentials: 'same-origin' // Allow setting cookies.
};

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
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
  }))
    .then((response) => {
      // TODO: Check response.ok
      return response.json();
    });
}

function createOptions(options) {
  return Object.assign({}, DEFAULT_OPTIONS, options);
}
