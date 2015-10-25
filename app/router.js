export default {
  '/': function(data, next) {
    if (data.props) {
      return next();
    }

    loadData('home')
      .then((responseData) => {
        data.props = responseData;
        next();
      });
  },

  '/projects': function(data, next) {
    if (data.props) {
      return next();
    }

    loadData('projects')
      .then((responseData) => {
        data.props = responseData;
        next();
      });
  }
}

function loadData(route) {
  return fetch(`/api/${route}`)
    .then((response) => {
      // TODO: Check response.ok
      return response.json();
    });
}
