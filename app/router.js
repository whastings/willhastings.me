export default {
  '/': function(data, next) {
    // TODO: Load data.
    if (data.props) {
      return next();
    }

    data.props = {
      html: '<p>Foobar</p>'
    };
    next();
  },

  '/projects': function(data, next) {
    // TODO: Load data.
  }
}
