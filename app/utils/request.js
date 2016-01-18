export function getJSON(route) {
  return fetch(route)
    .then((response) => {
      // TODO: Check response.ok
      return response.json();
    });
}

export function postJSON(route, body = null) {
  body = body ? JSON.stringify(body) : undefined;

  return fetch(route, {
    body,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
  })
    .then((response) => {
      // TODO: Check response.ok
      return response.json();
    });
}
