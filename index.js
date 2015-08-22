// Process all further dependencies through Babel.
require('babel/register')({
  blacklist: [
    'regenerator',
    'es6.blockScoping',
    'es6.constants',
    'es6.templateLiterals'
  ]
});

// Start server.
require('./server.js');
